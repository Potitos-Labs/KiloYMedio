import { Allergen } from "@prisma/client";
import { z } from "zod";

import { clientProcedure, router } from "../../trpc";

export const clientRouter = router({
  addFavouriteRecipe: clientProcedure
    .input(z.object({ recipeId: z.string() }))
    .mutation(async ({ ctx, input: { recipeId } }) => {
      await ctx.prisma.recipeUser.create({
        data: {
          recipeId,
          userId: ctx.session.user.id,
        },
      });

      return { status: 201 };
    }),
  getFavouriteRecipes: clientProcedure.query(async ({ ctx }) => {
    const recipes = await ctx.prisma.recipeUser.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      select: {
        Recipe: { select: { name: true, imageURL: true } },
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
