import { Allergen } from "@prisma/client";
//import { i } from "vitest/dist/index-2f5b6168";
import { z } from "zod";

import { clientProcedure, router } from "../../trpc";

export const clientRouter = router({
  addFavoriteRecipe: clientProcedure
    .input(z.object({ recipeId: z.string() }))
    .mutation(async ({ ctx, input: { recipeId } }) => {
      const userId = ctx.session.user.id;
      await ctx.prisma.recipeUser.upsert({
        where: {
          recipeId_userId: { recipeId, userId },
        },
        create: { recipeId, userId },
        update: {},
      });

      return { status: 201 };
    }),
  deleteFavouriteRecipe: clientProcedure
    .input(z.object({ recipeId: z.string() }))
    .mutation(async ({ ctx, input: { recipeId } }) => {
      await ctx.prisma.recipeUser.delete({
        where: { recipeId_userId: { recipeId, userId: ctx.session.user.id } },
      });

      return { status: 201 };
    }),
  getFavoriteRecipes: clientProcedure.query(async ({ ctx }) => {
    const recipes = await ctx.prisma.recipeUser.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      select: {
        Recipe: { select: { name: true, imageURL: true, id: true } },
      },
    });
    return recipes;
  }),
  updateAllergen: clientProcedure
    .input(
      z.object({
        allergen: z.array(z.nativeEnum(Allergen)),
      }),
    )
    .mutation(async ({ ctx, input: { allergen: newAllergens } }) => {
      const clientAllergen = await ctx.prisma.allergenClient.findMany({
        select: {
          clientId: true,
          allergen: true,
        },
        where: { Client: { userId: ctx.session.user.id } },
      });
      const oldAllergens = clientAllergen.map((a) => a.allergen);

      const allergensToDelete = oldAllergens.filter(
        (a) => !newAllergens.includes(a),
      );

      const allergensToCreate = newAllergens.filter(
        (a) => !oldAllergens.includes(a),
      );

      await ctx.prisma.allergenClient.deleteMany({
        where: { allergen: { in: allergensToDelete } },
      });

      await ctx.prisma.allergenClient.createMany({
        data: allergensToCreate.map((a) => {
          return { allergen: a, clientId: ctx.session.user.id };
        }),
      });

      return { status: 201 };
    }),
});
