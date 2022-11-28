import { Context } from "@server/trpc/context";

export async function findOrCreteRecipeIngredients(
  id: string,
  prisma: Context["prisma"],
) {
  await prisma.product.findFirst({
    select: {
      id: true,
      name: true,
      description: true,
      imageURL: true,
      stock: true,
      ProductUnit: true,
      Edible: {
        select: {
          priceByWeight: true,
          category: true,
          nutritionFacts: {
            select: {
              ingredients: true,
              energy: true,
              fat: true,
              protein: true,
              carbohydrates: true,
            },
          },
          allergens: {
            select: {
              allergen: true,
            },
          },
          origin: true,
          conservation: true,
        },
      },
      NonEdible: {
        select: {
          price: true,
          category: true,
        },
      },
    },
    where: { id: id },
  });
}
