import { Prisma, type PrismaClient, type User } from "@prisma/client";

export async function findUserByEmail(prisma: PrismaClient, email: string) {
  const users = await prisma.$queryRaw<User[]>(
    Prisma.sql`SELECT * FROM User WHERE email = ${email} COLLATE NOCASE LIMIT 1`,
  );
  return users[0] ?? null;
}
