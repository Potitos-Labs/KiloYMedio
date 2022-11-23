import { clientProcedure, publicProcedure, router } from "../trpc";
import { clientRouter } from "./user/client";

export const userRouter = router({
  getAllUsers: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findMany();
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
});
