import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  //  await createNewClientMutate({
  //    email: "a@a.com",
  //    password: "aaaaa",
  //    username: "Aaa",
  //  });
  await prisma.user.create({ data: { email: "a@a.com", name: "Aaa" } });
}

main()
  .then(async () => {
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  });
