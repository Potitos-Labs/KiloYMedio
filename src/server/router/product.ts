import { createRouter } from "./context";
import { z } from "zod";
export const productRouter = createRouter()
  .query("getAllProducts", {
    async resolve({ ctx }) {
      return await ctx.prisma.product.findMany();
    },
  })
  .query("getById", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.product.findFirst({
        where: { id: input.id },
      });
    },
  });
