import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import { enforceRateLimit } from "../../../server/common/rate-limit";
import { imageExtension, maxImageBytes } from "../../../server/storage/image";

export const config = { api: { bodyParser: false } };
export default async function upload(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST")
    return res.setHeader("Allow", "POST").status(405).end();
  const origin = new URL(
    process.env.NEXTAUTH_URL ?? `http://${req.headers.host}`,
  ).origin;
  if (req.headers.origin !== origin)
    return res.status(403).json({ message: "Origen no permitido." });
  const session = await getServerAuthSession({ req, res });
  if (!session?.user)
    return res
      .status(401)
      .json({ message: "Inicia sesión para subir imágenes." });
  try {
    await enforceRateLimit("upload", session.user.id, 20, 3600);
  } catch {
    return res.status(429).json({ message: "Inténtalo más tarde." });
  }
  const { IMAGES_BUCKET } = getCloudflareContext().env;
  const prefix = `${session.user.id}/`;
  const existing = await IMAGES_BUCKET.list({ prefix, limit: 20 });
  if (existing.objects.length >= 20)
    return res
      .status(429)
      .json({
        message: "Has alcanzado el límite de 20 imágenes para esta demo.",
      });
  const chunks: Uint8Array[] = [];
  let size = 0;
  for await (const chunk of req) {
    const bytes = new Uint8Array(chunk);
    size += bytes.byteLength;
    if (size > maxImageBytes)
      return res
        .status(413)
        .json({ message: "La imagen no puede superar 1 MB." });
    chunks.push(bytes);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.length;
  }
  const extension = imageExtension(bytes, req.headers["content-type"] ?? "");
  if (!extension)
    return res
      .status(415)
      .json({ message: "Selecciona una imagen PNG o JPEG válida." });
  const key = `${prefix}${crypto.randomUUID()}.${extension}`;
  await IMAGES_BUCKET.put(key, bytes, {
    httpMetadata: {
      contentType: extension === "png" ? "image/png" : "image/jpeg",
    },
  });
  return res.status(201).json({ url: `/api/images/${key}` });
}
