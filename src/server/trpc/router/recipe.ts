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
});
