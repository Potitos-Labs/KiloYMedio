import { IngredientUnit } from "@prisma/client";
import * as z from "zod";
import { Promise as PromiseBB } from "bluebird";

import {
  commentSchema,
  createRecipeSchema,
  filterRecipeSchema,
  updateRecipeSchema,
} from "../../../utils/validations/recipe";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import { findOrCreteRecipeIngredients } from "./common/recipe-ingredients";
import { getProductById } from "./common/product";
import { TRPCError } from "@trpc/server";

export const recipeRouter = router({
  getAllRecipes: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.recipe.findMany({
      select: {
        id: true,
        createdAt: false,
        _count: false,
        description: false,
        difficulty: false,
        directions: false,
        imageURL: true,
        name: true,
        portions: false,
        RecipeIngredient: false,
        cookingTime: false,
        User: true,
        userId: true,
      },
    });
  }),
  getFilteredRecipes: publicProcedure
    .input(filterRecipeSchema)
    .query(async ({ ctx, input }) => {
      const {
        adminRecipes,
        minTime,
        maxTime,
        minPortion,
        maxPortion,
        difficulty,
        allergens,
      } = input;
      const recipes = await ctx.prisma.recipe.findMany({
        where: {
          portions: { gte: minPortion, lte: maxPortion },
          preparationTime: { gte: minTime, lte: maxTime },
          difficulty,
          User: {
            role: adminRecipes == true ? "admin" : "client",
          },
          RecipeIngredient: {
            every: {
              OR: [
                {
                  Ingredient: {
                    Edible: {
                      allergens: {
                        every: { allergen: { notIn: allergens ?? [] } },
                      },
                    },
                  },
                },
                { Ingredient: { Edible: { is: null } } },
              ],
            },
          },
        },
        select: {
          id: true,
          name: true,
          imageURL: true,
          userId: true,
          description: true,
          cookingTime: true,
          preparationTime: true,
          portions: true,
        },
      });

      const listAverageAndFav = await PromiseBB.map(
        recipes,
        async (recipe) => {
          const avg = await ctx.prisma.comment.aggregate({
            where: { recipeId: recipe.id },
            _avg: { rating: true },
          });
          const isFav = (await ctx.prisma.recipeUser.findFirst({
            where: { recipeId: recipe.id, userId: ctx.session?.user?.id },
          }))
            ? true
            : false;
          return { rating: avg?._avg.rating, isFav };
        },
        { concurrency: 8 },
      );

      return recipes.map((r, i) => ({
        ...r,
        ...listAverageAndFav[i],
      }));
    }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id } }) => {
      const recipe = await ctx.prisma.recipe.findFirst({
        where: { id },
        select: {
          id: true,
          createdAt: true,
          _count: true,
          description: true,
          difficulty: true,
          directions: true,
          imageURL: true,
          name: true,
          portions: true,
          RecipeIngredient: {
            select: {
              Ingredient: {
                select: {
                  id: true,
                  name: true,
                  Edible: { select: { productId: true } },
                },
              },
              amount: true,
              unit: true,
            },
          },
          cookingTime: true,
          preparationTime: true,
          User: true,
          userId: true,
        },
      });

      if (!recipe) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Recipe not found" });
      }

      const recipeIngredient = recipe.RecipeIngredient.map(async (e) => {
        const Ingredient: {
          id: string;
          name: string;
          Edible: Awaited<ReturnType<typeof getProductById>> | null;
        } = {
          id: e.Ingredient.id,
          name: e.Ingredient.name,
          Edible: null,
        };
        const amount = e.amount;
        const unit = e.unit;

        if (e.Ingredient.Edible) {
          Ingredient.Edible = await getProductById(
            e.Ingredient.Edible.productId,
            ctx.prisma,
          );
        }

        return { Ingredient, amount, unit };
      });

      const newRecipe = {
        ...recipe,
        RecipeIngredient: await Promise.all(recipeIngredient),
      };

      const isFav = (await ctx.prisma.recipeUser.findFirst({
        where: { recipeId: id, userId: ctx.session?.user?.id },
      }))
        ? true
        : false;

      return { ...newRecipe, isFav };
    }),
  getRecentRecipes: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.recipe.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
    });
  }),
  update: protectedProcedure
    .input(updateRecipeSchema)
    .mutation(
      async ({
        ctx,
        input: {
          description,
          difficulty,
          directions,
          imageURL,
          name,
          ingredients,
          portions,
          allergens,
          cookingTime,
          id,
        },
      }) => {
        // Delete all recipe ingredients and directions, then recreate them
        await ctx.prisma.recipeIngredient.deleteMany({
          where: { recipeId: id },
        });
        await ctx.prisma.recipeDirections.deleteMany({
          where: { recipeId: id },
        });

        const prismaIngredients = await findOrCreteRecipeIngredients(
          ingredients,
          ctx.prisma,
        );

        return await ctx.prisma.recipe.update({
          where: { id },
          data: {
            difficulty,
            imageURL,
            name,
            portions,
            cookingTime: cookingTime.hour * 60 + cookingTime.minute,
            description,
            directions: {
              createMany: {
                data: directions.map(({ direction }, index) => ({
                  direction: direction,
                  number: index,
                })),
              },
            },
            User: { connect: { id: ctx.session.user.id } },
            RecipeIngredient: {
              createMany: {
                data: prismaIngredients.map(({ id, amount, unit }) => ({
                  amount: amount,
                  unit: unit,
                  ingredientId: id,
                })),
              },
            },
            allergens: allergens && {
              createMany: {
                data: allergens.map((allergen) => ({ allergen })),
              },
            },
          },
        });
      },
    ),
  create: protectedProcedure
    .input(createRecipeSchema)
    .mutation(
      async ({
        ctx,
        input: {
          description,
          difficulty,
          directions,
          imageURL,
          name,
          ingredients,
          portions,
          cookingTime,
          allergens,
        },
      }) => {
        const prismaIngredients = await findOrCreteRecipeIngredients(
          ingredients,
          ctx.prisma,
        );

        return await ctx.prisma.recipe.create({
          data: {
            difficulty,
            imageURL,
            name,
            portions,
            cookingTime: cookingTime.hour * 60 + cookingTime.minute,
            preparationTime: 30,
            description,
            directions: {
              createMany: {
                data: directions.map(({ direction }, index) => ({
                  direction: direction,
                  number: index,
                })),
              },
            },
            User: { connect: { id: ctx.session.user.id } },
            RecipeIngredient: {
              createMany: {
                data: prismaIngredients.map(({ id, amount, unit }) => ({
                  amount: amount,
                  unit: unit,
                  ingredientId: id,
                })),
              },
            },
            allergens: allergens && {
              createMany: {
                data: allergens.map((allergen) => ({ allergen })),
              },
            },
          },
        });
      },
    ),
  delete: publicProcedure
    .input(
      z.object({
        recipeId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { recipeId } = input;
      await ctx.prisma.recipe.delete({
        where: {
          id: recipeId,
        },
      });
    }),
  getIngredientUnitInSpanish: publicProcedure.query(async ({ ctx }) => {
    const allergen = await ctx.prisma.ingredientUnitInSpanish.findMany();
    const keys = Object.keys(IngredientUnit) as IngredientUnit[];

    const res: Record<IngredientUnit, string> = {} as Record<
      IngredientUnit,
      string
    >;

    keys.forEach((key) => {
      res[key] =
        allergen.find((a) => a.ingredientUnit === key)?.unitInSpanish ?? "";
    });
    return res;
  }),
  newComment: protectedProcedure
    .input(commentSchema)
    .mutation(async ({ ctx, input }) => {
      const { recipeId, description, rating } = input;
      await ctx.prisma.comment.create({
        data: {
          Recipe: { connect: { id: recipeId } },
          description,
          rating,
          User: { connect: { id: ctx.session.user.id } },
        },
      });
      return {
        status: 201,
        message: "Account updated successfully",
      };
    }),

  getComments: publicProcedure
    .input(
      z.object({ recipeId: z.string(), countLoadMore: z.number().default(0) }),
    )
    .query(async ({ ctx, input: { recipeId, countLoadMore } }) => {
      const comments = await ctx.prisma.comment.findMany({
        take: 2 * (countLoadMore + 1),
        where: {
          recipeId,
        },
        select: {
          description: true,
          rating: true,
          createdAt: true,
          User: {
            select: {
              name: true,
              image: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });
      return comments;
    }),
  getCommentsStatistics: publicProcedure
    .input(z.object({ recipeId: z.string() }))
    .query(async ({ ctx, input: { recipeId } }) => {
      const ratings = await ctx.prisma.comment.findMany({
        where: {
          recipeId,
        },
        select: {
          rating: true,
        },
      });

      const average =
        Math.round(
          (ratings.reduce(
            (acumulator, current) => acumulator + current.rating,
            0,
          ) /
            ratings.length) *
            10,
        ) / 10 || 0;

      //Obtener repetidos
      const ranges: Record<number, number> = {};
      ratings.forEach((e: { rating: number }) => {
        const rangeStar = Math.ceil(e.rating);
        ranges[rangeStar] = (ranges[rangeStar] || 0) + 1;
      });

      const rangesPercentage = {
        1: Math.round(((ranges[1] ?? 0) * 1000) / ratings.length || 0) / 10,
        2: Math.round(((ranges[2] ?? 0) * 1000) / ratings.length || 0) / 10,
        3: Math.round(((ranges[3] ?? 0) * 1000) / ratings.length || 0) / 10,
        4: Math.round(((ranges[4] ?? 0) * 1000) / ratings.length || 0) / 10,
        5: Math.round(((ranges[5] ?? 0) * 1000) / ratings.length || 0) / 10,
      };

      return { count: ratings.length, average, rangesPercentage };
    }),
});
