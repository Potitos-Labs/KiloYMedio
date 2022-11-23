import { IngredientUnit } from "@prisma/client";
import { Context } from "@server/trpc/context";

export async function findOrCreteRecipeIngredients(
  ingredients: { name: string; amount: number; unit: IngredientUnit }[],
  prisma: Context["prisma"],
) {
  const allEdibles = await prisma.edible.findMany({
    select: { product: { select: { name: true, id: true } } },
  });

  const prismaIngredients = await Promise.all(
    ingredients.map(async ({ name, amount, unit }) => {
      const productFound = allEdibles.find(
        ({ product }) =>
          product.name.toLocaleLowerCase() == name.toLocaleLowerCase(),
      );

      let Edible;
      if (productFound) {
        Edible = { connect: { productId: productFound.product.id } };
      }
      const res = await prisma.ingredient.upsert({
        where: { name },
        update: {},
        create: {
          name,
          Edible,
        },
        select: { id: true, name: true },
      });

      return { ...res, amount, unit };
    }),
  );
  return prismaIngredients;
}
