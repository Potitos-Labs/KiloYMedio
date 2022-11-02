import { Allergen } from "@prisma/client";
import { z } from "zod";

import { clientProcedure, router } from "../../trpc";

export const clientRouter = router({
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

      return {
        status: 201,
      };
    }),
});