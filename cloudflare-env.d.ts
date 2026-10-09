import type { D1Database, R2Bucket } from "@cloudflare/workers-types";

declare global {
  interface CloudflareEnv {
    DB: D1Database;
    IMAGES_BUCKET: R2Bucket;
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;
  }
}
export {};
