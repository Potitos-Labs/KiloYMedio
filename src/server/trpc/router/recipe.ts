import * as z from "zod";

import { publicProcedure, router } from "../trpc";

export const recipeRouter = router({
  getAllRecipes: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.recipe.findMany({
      select: {
        id: true,
        createdAt: false,
        _count: false,
        description: false,
        difficulty: false,
        Directions: false,
        directionsId: false,
        imageURL: true,
        name: true,
        portions: false,
        RecipeComment: false,
        RecipeIngredient: false,
        timeSpan: false,
        User: false,
        userId: false,
      },
    });
  }),
  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return await ctx.prisma.recipe.findFirst({
      where: { id: input },
      select: {
        id: true,
        createdAt: true,
        _count: true,
        description: true,
        difficulty: true,
        Directions: true,
        directionsId: true,
        imageURL: true,
        name: true,
        portions: true,
        RecipeComment: true,
        RecipeIngredient: true,
        timeSpan: true,
        User: true,
        userId: true,
      },
    });
  }),
  getRecentRecipes: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.recipe.findMany({
      take: 6,
      orderBy: { createdAt: "desc" },
    });
  }),
});
