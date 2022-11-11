import { Allergen, ECategory, NECategory } from "@prisma/client";
import * as trpc from "@trpc/server";
import { z } from "zod";

import {
  categorySchema,
  productCreateSchema,
  productSchema,
} from "../../../utils/validations/product";
import { adminProcedure, publicProcedure, router } from "../trpc";

export const productRouter = router({
  getAllProducts: publicProcedure
    .output(z.array(productSchema))
    .query(async ({ ctx }) => {
      const products = await ctx.prisma.product.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          imageURL: true,
          stock: true,
          Edible: {
            select: {
              priceByWeight: true,
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
              category: true,
              origin: true,
              conservation: true,
            },
          },
          NonEdible: {
            select: {
              category: true,
              price: true,
            },
          },
        },
        orderBy: {
          name: "asc",
        },
      });
      const productsParsed = z.array(productSchema).parse(products);
      return productsParsed;
    }),
  getAllEdibleCategories: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.eCategoryInSpanish.findMany({
      select: {
        id: true,
        category: true,
        imageURL: true,
        categoryInSpanish: true,
      },
    });
  }),
  getAllNonEdibleCategories: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.nECategoryInSpanish.findMany({
      select: {
        id: true,
        category: true,
        imageURL: true,
        categoryInSpanish: true,
      },
    });
  }),
  getAllAllergensInSpanish: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.allergenInSpanish.findMany();
  }),
  getAllergenInSpanishDictionary: publicProcedure.query(async ({ ctx }) => {
    const allergen = await ctx.prisma.allergenInSpanish.findMany();
    const dictionary = new Map<Allergen, string>();
    allergen.forEach((a) => {
      dictionary.set(a.allergen, a.allergenInSpanish);
    });
    return dictionary;
  }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.product.findFirst({
        select: {
          id: true,
          name: true,
          description: true,
          imageURL: true,
          stock: true,
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
        where: { id: input.id },
      });
    }),
  getByCategory: publicProcedure
    .input(z.object({ category: categorySchema }))
    .query(async ({ input, ctx }) => {
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
    }),
  createNewProduct: publicProcedure
    .input(productCreateSchema)
    .mutation(async ({ input, ctx }) => {
      const { name, description, stock, imageURL, Edible, NonEdible } = input;

      if (Edible) {
        const productEdible = await ctx.prisma.product.create({
          data: {
            name,
            plainName: name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
            description,
            stock,
            imageURL,
            Edible: {
              create: {
                priceByWeight: Edible.priceByWeight,
                category: Edible.category,
                Ingredient: { create: { name } }, //Se crea ingrediente con el mismo nombre
                origin: Edible.origin,
                conservation: Edible.conservation,
                nutritionFacts: {
                  create: {
                    ingredients: Edible.nutritionFacts.ingredients,
                    energy: Edible.nutritionFacts.energy,
                    fat: Edible.nutritionFacts.fat,
                    carbohydrates: Edible.nutritionFacts.carbohydrates,
                    protein: Edible.nutritionFacts.protein,
                  },
                },
              },
            },
          },
        });

        Edible.allergens.map(async ({ allergen }) => {
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
            plainName: name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
            description,
            stock,
            imageURL,
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
    }),
  update: adminProcedure
    .input(productSchema)
    .mutation(async ({ input, ctx }) => {
      const { id, name, description, stock, imageURL, Edible, NonEdible } =
        input;

      if (Edible) {
        const productEdible = await ctx.prisma.product.update({
          where: { id },
          data: {
            name,
            description,
            stock,
            imageURL,
            Edible: {
              update: {
                priceByWeight: Edible.priceByWeight,
                category: Edible.category,
                Ingredient: { update: { name } }, //Se crea ingrediente con el mismo nombre
                origin: Edible.origin,
                conservation: Edible.conservation,
                nutritionFacts: {
                  update: {
                    ingredients: Edible.nutritionFacts.ingredients,
                    energy: Edible.nutritionFacts.energy,
                    fat: Edible.nutritionFacts.fat,
                    carbohydrates: Edible.nutritionFacts.carbohydrates,
                    protein: Edible.nutritionFacts.protein,
                  },
                },
              },
            },
          },
        });

        await ctx.prisma.edibleAllergen.deleteMany({
          where: {
            allergen: { notIn: Edible.allergens.map((a) => a.allergen) },
            edibleId: id,
          },
        });

        await ctx.prisma.edibleAllergen.createMany({
          data: Edible.allergens.map((a) => {
            return { allergen: a.allergen, edibleId: id };
          }),
          skipDuplicates: true,
        });

        return {
          status: 201,
          product: productEdible,
        };
      }

      if (NonEdible) {
        const productNonEdible = await ctx.prisma.product.update({
          where: { id },
          data: {
            name,
            description,
            stock,
            imageURL,
            NonEdible: {
              update: {
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
    }),
  delete: adminProcedure
    .input(
      z.object({
        productId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { productId } = input;
      await ctx.prisma.product.delete({
        where: {
          id: productId,
        },
      });
    }),
});
