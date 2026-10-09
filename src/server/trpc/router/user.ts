import { z } from "zod";
import { adminProcedure, clientProcedure, router } from "../trpc";
import { clientRouter } from "./user/client";

export const userRouter = router({
  getAllUsers: adminProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, image: true },
    });
  }),

  getAllClientAllergen: clientProcedure.query(async ({ ctx }) => {
    const clientAllergen = await ctx.prisma.allergenClient.findMany({
      select: {
        clientId: true,
        allergen: true,
      },
      where: { Client: { userId: ctx.session.user.id } },
    });
    return clientAllergen;
  }),

  client: clientRouter,

  delete: adminProcedure
    .input(
      z.object({
        clientEmail: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { clientEmail } = input;

      const client = await ctx.prisma.user.findFirst({
        where: { email: clientEmail },
      });

      if (!client) {
        return;
      }

      await ctx.prisma.user.delete({
        where: {
          id: client.id,
        },
      });
    }),
});
