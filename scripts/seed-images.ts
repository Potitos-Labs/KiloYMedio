import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { promisify } from "node:util";
import { z } from "zod";

const run = promisify(execFile);
const imageSchema = z.object({
  name: z.string(),
  file: z.string().regex(/^[a-z0-9-]+\.(jpg|png|webp|svg|gif|ico)$/),
  key: z
    .string()
    .regex(
      /^(seed|recipes|media|site)\/[a-f0-9-]{36}\.(jpg|png|webp|svg|gif|ico)$/,
    ),
  contentType: z
    .enum([
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/svg+xml",
      "image/gif",
      "image/x-icon",
    ])
    .default("image/jpeg"),
  sha256: z.string().regex(/^[a-f0-9]{64}$/),
});

async function main() {
  const remote = process.argv.includes("--remote");
  const checkOnly = process.argv.includes("--check");
  const collections = process.argv.includes("--all")
    ? ["products", "recipes", "media", "site"]
    : [
        process.argv.includes("--recipes")
          ? "recipes"
          : process.argv.includes("--media")
            ? "media"
            : process.argv.includes("--site")
              ? "site"
              : "products",
      ];
  const images = [] as (z.infer<typeof imageSchema> & { folder: string })[];
  for (const collection of collections) {
    const folder = resolve(
      collection === "site"
        ? "assets/site-images"
        : `assets/seed-${collection}`,
    );
    const manifest = JSON.parse(
      await readFile(resolve(folder, "manifest.json"), "utf8"),
    );
    const entries = z
      .array(imageSchema)
      .nonempty()
      .parse(manifest[collection] ?? manifest.images);
    for (const entry of entries) images.push({ ...entry, folder });
  }
  if (new Set(images.map((image) => image.key)).size !== images.length) {
    throw new Error("El manifiesto contiene claves de R2 duplicadas.");
  }
  // Comprueba todas las copias antes de iniciar ninguna subida.
  for (const image of images) {
    const bytes = await readFile(resolve(image.folder, image.file));
    if (createHash("sha256").update(bytes).digest("hex") !== image.sha256) {
      throw new Error(`La copia de ${image.name} no coincide con su SHA-256.`);
    }
  }
  if (checkOnly) {
    console.log(`Las ${images.length} copias de imágenes son correctas.`);
    return;
  }
  const config = JSON.parse(await readFile("wrangler.jsonc", "utf8"));
  const bucket = config.r2_buckets.find(
    (entry: { binding: string }) => entry.binding === "IMAGES_BUCKET",
  )?.bucket_name;
  if (!bucket)
    throw new Error("Falta el bucket IMAGES_BUCKET en wrangler.jsonc.");
  const queue = [...images];
  await Promise.all(
    Array.from({ length: remote ? 4 : 1 }, async () => {
      while (queue.length) {
        const image = queue.shift()!;
        await run(
          "pnpm",
          [
            "exec",
            "wrangler",
            "r2",
            "object",
            "put",
            `${bucket}/${image.key}`,
            "--file",
            resolve(image.folder, image.file),
            "--content-type",
            image.contentType,
            "--cache-control",
            "public, max-age=31536000, immutable",
            remote ? "--remote" : "--local",
          ],
          { maxBuffer: 1024 * 1024 },
        );
        console.log(`R2 ${remote ? "remoto" : "local"}: ${image.name}`);
      }
    }),
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
