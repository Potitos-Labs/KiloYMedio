import { getCloudflareContext } from "@opennextjs/cloudflare";
import { z } from "zod";
import { createDemoOrder } from "../../common/checkout";
import { clientProcedure, router } from "../trpc";

export const checkoutRouter = router({
  createNewOrder: clientProcedure
    .input(
      z.object({
        shipmentAddress: z.string().trim().min(3).max(500),
        requestId: z.string().uuid(),
      }),
    )
    .mutation(({ ctx, input }) =>
      createDemoOrder(
        getCloudflareContext().env.DB,
        ctx.prisma,
        ctx.session.user.id,
        input.shipmentAddress,
        input.requestId,
      ),
    ),
});
