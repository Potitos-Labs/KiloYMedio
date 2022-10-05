import { createRouter } from "./context";

export const productRouter = createRouter().query("getAllProducts", {
  async resolve({ ctx }) {
    return await ctx.prisma.product.findMany();
  },
});
