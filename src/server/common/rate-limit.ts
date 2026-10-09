import { getCloudflareContext } from "@opennextjs/cloudflare";
import { TRPCError } from "@trpc/server";

export async function enforceRateLimit(
  scope: string,
  identity: string,
  maximum: number,
  windowSeconds: number,
) {
  const now = Math.floor(Date.now() / 1000);
  const bucket = Math.floor(now / windowSeconds);
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(identity),
  );
  const hash = Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
  const db = getCloudflareContext().env.DB;
  const result = await db.batch<{ hits: number }>([
    db.prepare("DELETE FROM RequestLimit WHERE expiresAt <= ?").bind(now),
    db
      .prepare(
        "INSERT INTO RequestLimit (key, hits, expiresAt) VALUES (?, 1, ?) ON CONFLICT(key) DO UPDATE SET hits = hits + 1 RETURNING hits",
      )
      .bind(`${scope}:${hash}:${bucket}`, (bucket + 1) * windowSeconds),
  ]);
  const hits = result[1]?.results[0]?.hits;
  if (typeof hits !== "number" || hits > maximum)
    throw new TRPCError({
      code: "TOO_MANY_REQUESTS",
      message: "Has realizado demasiadas solicitudes. Inténtalo más tarde.",
    });
}
