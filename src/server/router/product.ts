import { createRouter } from "./context";
import { z } from "zod";
import { productSchema } from "../../utils/validations/product";
import * as trpc from "@trpc/server";

export const productRouter = createRouter()
  .query("getAllProducts", {
    async resolve({ ctx }) {
      return await ctx.prisma.product.findMany();
    },
  })
  .query("getAllEdibleCategories", {
    input: z
      .object({ getImages: z.boolean() })
      .optional()
      .default({ getImages: false }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.eCategoryInSpanish.findMany({
        select: { imageURL: input.getImages, categoryInSpanish: true },
      });
    },
  })
  .query("getAllNonEdibleCategories", {
    input: z
      .object({ getImages: z.boolean() })
      .optional()
      .default({ getImages: false }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.nECategoryInSpanish.findMany({
        select: { imageURL: input.getImages, categoryInSpanish: true },
      });
    },
  })
  .query("getAllergenInSpanish", {
    async resolve({ ctx }) {
      return await ctx.prisma.allergenInSpanish.findMany();
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
              category: true,
              allergens: {
                select: {
                  allergen: true,
                },
              },
            },
          },
        },
        where: { id: input.id },
      });
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

        Edible.allergens.map((allergen) => {
          ctx.prisma.edibleAllergen.create({
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
