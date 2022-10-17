import { createRouter } from "./context";
import { z } from "zod";
import { categorySchema, productSchema } from "../../utils/validations/product";
import * as trpc from "@trpc/server";
import {
  Allergen,
  AllergenInSpanish,
  ECategory,
  NECategory,
} from "@prisma/client";

export const productRouter = createRouter()
  .query("getAllProducts", {
    async resolve({ ctx }) {
      return await ctx.prisma.product.findMany({
        orderBy: {
          name: "asc",
        },
      });
    },
  })
  .query("getAllEdibleCategories", {
    async resolve({ ctx }) {
      return await ctx.prisma.eCategoryInSpanish.findMany({
        select: {
          id: true,
          category: true,
          imageURL: true,
          categoryInSpanish: true,
        },
      });
    },
  })
  .query("getAllNonEdibleCategories", {
    async resolve({ ctx }) {
      return await ctx.prisma.nECategoryInSpanish.findMany({
        select: {
          id: true,
          category: true,
          imageURL: true,
          categoryInSpanish: true,
        },
      });
    },
  })
  .query("getAllAllergensInSpanish", {
    async resolve({ ctx }) {
      return await ctx.prisma.allergenInSpanish.findMany();
    },
  })
  .query("getAllergenInSpanishDictionary", {
    async resolve({ ctx }) {
      const allergen = await ctx.prisma.allergenInSpanish.findMany();
      const dictionary = new Map<Allergen, string>();
      allergen.forEach((a) => {
        dictionary.set(a.allergen, a.allergenInSpanish);
      });
      return dictionary;
    },
  })
  .query("getById", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.product.findFirst({
        select: {
          id: true,
          name: true,
          description: true,
          imageURL: true,
          Edible: {
            select: {
              priceByWeight: true,
              category: true,
              allergens: {
                select: {
                  allergen: true,
                },
              },
            },
          },
          NonEdible: {
            select: {
              price: true,
            },
          },
        },
        where: { id: input.id },
      });
    },
  })
  .query("getByCategory", {
    input: z.object({ category: categorySchema }),
    async resolve({ input, ctx }) {
      let { category } = input;

      try {
        category = z.nativeEnum(ECategory).parse(category);

        return await ctx.prisma.product.findMany({
          orderBy: {
            name: "asc",
          },
          where: {
            Edible: { category },
          },
        });
      } catch {}

      try {
        category = z.nativeEnum(NECategory).parse(category);

        z.nativeEnum(NECategory).parse(category);
        return await ctx.prisma.product.findMany({
          orderBy: {
            name: "asc",
          },
          where: {
            NonEdible: { category },
          },
        });
      } catch {}
      try {
        z.enum(["all"]).parse(category);
        return await ctx.prisma.product.findMany({
          orderBy: {
            name: "asc",
          },
        });
      } catch {}
    },
  })
  .mutation("createNewProduct", {
    input: productSchema,
    resolve: async ({ input, ctx }) => {
      const { name, description, stock, image, Edible, NonEdible } = input;

      if (!Edible && !NonEdible) {
        throw new trpc.TRPCError({
          code: "BAD_REQUEST",
          message: "Product must be Edible or NonEdible",
        });
      }

      if (Edible && NonEdible) {
        throw new trpc.TRPCError({
          code: "BAD_REQUEST",
          message: "Product can not be Edible and NonEdible at the same time",
        });
      }

      if (Edible) {
        const productEdible = await ctx.prisma.product.create({
          data: {
            name,
            description,
            stock,
            imageURL: image,
            Edible: {
              create: {
                priceByWeight: Edible.price,
                category: Edible.category,
                Ingredient: { create: { name } }, //Se crea ingrediente con el mismo nombre
                origin: Edible.origin,
                conservation: Edible.conservation,
                nutritionFacts: {
                  create: {
                    ingredients: Edible.nutrittionFacts.ingredients,
                    energy: Edible.nutrittionFacts.energy,
                    fat: Edible.nutrittionFacts.fat,
                    carbohydrates: Edible.nutrittionFacts.carbohydrates,
                    protein: Edible.nutrittionFacts.protein,
                  },
                },
              },
            },
          },
        });

        Edible.allergens.map(async (allergen) => {
          await ctx.prisma.edibleAllergen.create({
            data: { allergen, edibleId: productEdible.id },
          });
        });

        return {
          status: 201,
          product: productEdible,
        };
      }

      if (NonEdible) {
        const productNonEdible = await ctx.prisma.product.create({
          data: {
            name,
            description,
            stock,
            imageURL: image,
            NonEdible: {
              create: {
                category: NonEdible.category,
                price: NonEdible.price,
              },
            },
          },
        });
        return {
          status: 201,
          product: productNonEdible,
        };
      }

      throw new trpc.TRPCError({
        code: "BAD_REQUEST",
        message: "Error not controlled",
      });
    },
  });
