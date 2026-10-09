import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

export default async function image(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET" && req.method !== "HEAD")
    return res.setHeader("Allow", "GET, HEAD").status(405).end();
  const key = req.query.key;
  if (
    !Array.isArray(key) ||
    key.length !== 2 ||
    !/^[a-zA-Z0-9_-]{1,64}$/.test(key[0] ?? "") ||
    !/^[a-f0-9-]{36}\.(png|jpg|webp|svg|gif|ico)$/.test(key[1] ?? "")
  )
    return res.status(404).end();
  const object = await getCloudflareContext().env.IMAGES_BUCKET.get(
    key.join("/"),
  );
  if (!object) return res.status(404).end();
  res.setHeader(
    "Content-Type",
    object.httpMetadata?.contentType ?? "application/octet-stream",
  );
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Content-Length", object.size);
  res.setHeader("ETag", object.httpEtag);
  if (key[1]?.endsWith(".svg"))
    res.setHeader(
      "Content-Security-Policy",
      "default-src 'none'; img-src data:; style-src 'unsafe-inline'; sandbox",
    );
  res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  if (req.method === "HEAD") return res.end();
  await pipeline(Readable.from(object.body, { objectMode: false }), res);
}
