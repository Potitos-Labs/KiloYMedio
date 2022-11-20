import { PrismaClient } from "@prisma/client";
import { createContextInner } from "../context";
import { appRouter } from "./_app";

test("Probando jest con mocking de Prisma", async () => {
  // Arrange
  const ctxMock = await createContextInner({
    session: { user: { id: "1" }, expires: "" },
  });
  //TODO: Ver porque no funciona prisma con createContexInner
  ctxMock.prisma = new PrismaClient();

  // Act
  const trpc = appRouter.createCaller(ctxMock);
  const recipe = await trpc.recipe.getFilteredRecipes({
    allergens: ["cereals"],
  });

  // Assert
  console.log({ recipe });
});
