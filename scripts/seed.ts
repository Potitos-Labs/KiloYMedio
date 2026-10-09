import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";
import { getPlatformProxy } from "wrangler";
import { readFile } from "node:fs/promises";
import { seed } from "../prisma/seed";

async function main() {
  const remote = process.argv.includes("--remote");
  const config = JSON.parse(await readFile("wrangler.jsonc", "utf8"));
  const proxy = remote
    ? undefined
    : await getPlatformProxy<CloudflareEnv>({ remoteBindings: false });
  const required = (name: string) => {
    const value = process.env[name];
    if (!value) throw new Error(`Missing ${name}`);
    return value;
  };
  const adapter = remote
    ? new PrismaD1({
        CLOUDFLARE_D1_TOKEN: required("CLOUDFLARE_API_TOKEN"),
        CLOUDFLARE_ACCOUNT_ID: required("CLOUDFLARE_ACCOUNT_ID"),
        CLOUDFLARE_DATABASE_ID: config.d1_databases[0].database_id,
      })
    : new PrismaD1(proxy!.env.DB);
  const prisma = new PrismaClient({ adapter });
  try {
    if (await prisma.demoSeed.findUnique({ where: { id: "original-v1" } })) {
      console.log(
        "El seed original ya está cargado; no se modifican los datos.",
      );
      return;
    }
    if (
      (await prisma.user.count()) ||
      (await prisma.allergenInSpanish.count())
    ) {
      throw new Error(
        "El seed necesita una base vacía. No se borran datos automáticamente.",
      );
    }
    const password = required("SEED_ADMIN_PASSWORD");
    if (
      password.length < 12 ||
      password.length > 128 ||
      password === "potitos2022"
    ) {
      throw new Error(
        "SEED_ADMIN_PASSWORD debe ser privada y tener entre 12 y 128 caracteres.",
      );
    }
    await seed(prisma, password);
    await prisma.demoSeed.create({ data: { id: "original-v1" } });
    console.log("Seed original cargado.");
  } finally {
    await prisma.$disconnect();
    await proxy?.dispose();
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
