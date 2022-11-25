import { IngredientUnit } from "@prisma/client";
import * as z from "zod";

import {
  createRecipeSchema,
  filterRecipeSchema,
  updateRecipeSchema,
} from "../../../utils/validations/recipe";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import { findOrCreteRecipeIngredients } from "./common/recipe-ingredients";

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
        timeSpan: false,
        User: false,
        userId: true,
      },
    });
  }),
  getFilteredRecipes: publicProcedure
    .input(filterRecipeSchema)
    .query(async ({ ctx, input }) => {
      const {
        minTime,
        maxTime,
        minPortion,
        maxPortion,
        difficulty,
        allergens,
      } = input;
      return await ctx.prisma.recipe.findMany({
        where: {
          portions: { gte: minPortion, lte: maxPortion },
          timeSpan: { gte: minTime, lte: maxTime },
          difficulty,

          RecipeIngredient: {
            every: {
              OR: [
                {
                  Ingredient: {
                    Edible: {
                      allergens: { some: { allergen: { notIn: allergens } } },
                    },
                  },
                },
                { Ingredient: { Edible: { is: null } } },
              ],
            },
          },
        },
      });
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
                  Edible: { select: { product: true } },
                },
              },
              amount: true,
              unit: true,
            },
          },
          timeSpan: true,
          User: true,
          userId: true,
        },
      });
      const isFav = (await ctx.prisma.recipeUser.findFirst({
        where: { recipeId: id, userId: ctx.session?.user?.id },
      }))
        ? true
        : false;
      return recipe != null ? { ...recipe, isFav } : null;
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
          timeSpan,
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
            timeSpan: timeSpan.hour * 60 + timeSpan.minute,
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
          timeSpan,
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
            timeSpan: timeSpan.hour * 60 + timeSpan.minute,
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
});
