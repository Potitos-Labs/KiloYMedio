import { Allergen, ECategory, NECategory } from "@prisma/client";
import * as trpc from "@trpc/server";
import { z } from "zod";

import {
  categorySchema,
  filterProduct,
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
          ProductUnit: true,
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
  getFilteredProducts: publicProcedure
    .input(filterProduct)
    .query(async ({ ctx, input }) => {
      /*#################### EN PRUEBAS ####################*/
      const {
        name,
        minPrice,
        maxPrice,
        eCategories,
        neCategories,
        allergens,
        orderByPrice,
        orderByName,
      } = input;

      let products = await ctx.prisma.product.findMany({
        where: {
          plainName: { contains: name.trimEnd() },
          OR: [
            {
              AND: [
                {
                  Edible: {
                    category:
                      eCategories?.length == 0 && neCategories.length == 0
                        ? { notIn: eCategories }
                        : { in: eCategories },
                    priceByWeight: { gte: minPrice, lte: maxPrice },
                    allergens: { none: { allergen: { in: allergens } } },
                  },
                },
              ],
            },
            {
              AND: [
                {
                  NonEdible: {
                    category:
                      eCategories?.length == 0 && neCategories.length == 0
                        ? { notIn: neCategories }
                        : { in: neCategories },
                    price: { gte: minPrice, lte: maxPrice },
                  },
                },
              ],
            },
          ],
        },
        include: {
          Edible: { include: { allergens: true, nutritionFacts: true } },
          NonEdible: true,
        },
      });

      if (orderByName) {
        products =
          orderByName == "asc"
            ? products.sort((a, b) => a.name.localeCompare(b.name))
            : products.sort((a, b) => b.name.localeCompare(a.name));
      } else if (orderByPrice) {
        products =
          orderByPrice == "asc"
            ? products.sort((a, b) => {
                return (
                  (a.Edible
                    ? a.Edible.priceByWeight
                    : a.NonEdible?.price ?? 0) -
                  (b.Edible ? b.Edible.priceByWeight : b.NonEdible?.price ?? 0)
                );
              })
            : products.sort((a, b) => {
                return (
                  (b.Edible
                    ? b.Edible.priceByWeight
                    : b.NonEdible?.price ?? 0) -
                  (a.Edible ? a.Edible.priceByWeight : a.NonEdible?.price ?? 0)
                );
              });
      }

      return products;
    }),
  getAllCategories: publicProcedure.query(async ({ ctx }) => {
    const eCategories = await ctx.prisma.eCategoryInSpanish.findMany({
      select: {
        id: true,
        category: true,
        imageURL: true,
        categoryInSpanish: true,
      },
    });
    const neCategories = await ctx.prisma.nECategoryInSpanish.findMany({
      select: {
        id: true,
        category: true,
        imageURL: true,
        categoryInSpanish: true,
      },
    });

    const res = {
      eCategories,
      neCategories,
    };

    return res;
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
      const {
        name,
        description,
        stock,
        imageURL,
        Edible,
        NonEdible,
        ProductUnit,
      } = input;

      if (Edible) {
        const productEdible = await ctx.prisma.product.create({
          data: {
            name,
            plainName: name.normalize("NFD").replace(/[\u0300-\u0301]/g, ""),
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
            ProductUnit,
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
            plainName: name.normalize("NFD").replace(/[\u0300-\u0301]/g, ""),
            description,
            stock,
            imageURL,
            NonEdible: {
              create: {
                category: NonEdible.category,
                price: NonEdible.price,
              },
            },
            ProductUnit,
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
      const {
        id,
        name,
        description,
        stock,
        imageURL,
        Edible,
        NonEdible,
        ProductUnit,
      } = input;

      if (Edible) {
        const productEdible = await ctx.prisma.product.update({
          where: { id },
          data: {
            name,
            plainName: name.normalize("NFD").replace(/[\u0300-\u0301]/g, ""),
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
            ProductUnit,
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
            plainName: name.normalize("NFD").replace(/[\u0300-\u0301]/g, ""),
            description,
            stock,
            imageURL,
            NonEdible: {
              update: {
                category: NonEdible.category,
                price: NonEdible.price,
              },
            },
            ProductUnit,
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
