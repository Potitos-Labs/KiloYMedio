import { IngredientUnit } from "@prisma/client";
import * as z from "zod";

import {
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
          preparationTime: { gte: minTime, lte: maxTime },
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
