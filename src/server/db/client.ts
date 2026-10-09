import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";

const clients = new WeakMap<object, PrismaClient>();

export function getPrisma() {
  const { DB } = getCloudflareContext().env;
  let client = clients.get(DB);
  if (!client) {
    client = new PrismaClient({ adapter: new PrismaD1(DB) });
    clients.set(DB, client);
  }
  return client;
}

// Resolve the binding inside the request, never while importing a page at build time.
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, property) {
    const client = getPrisma();
    const value = Reflect.get(client, property);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
export default prisma;
