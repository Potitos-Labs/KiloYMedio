import { createProtectedRouter } from "./context";
import { z } from "zod";

export const cartRouter = createProtectedRouter()
  .query("getAllCartProduct", {
    async resolve({ ctx }) {
      const cartProduct = await ctx.prisma.cartProduct.findMany({
        orderBy: {
          product: {
            name: "asc",
          },
        },
        select: {
          productId: true,
          amount: true,
          product: {
            select: {
              name: true,
              Edible: { select: { priceByWeight: true } },
              NonEdible: { select: { price: true } },
              imageURL: true,
              stock: true,
            },
          },
        },
        where: { cart: { client: { userId: ctx.session.user.id } } },
      });

      const cartProductWithPrice = cartProduct.map((cp) => {
        let price = 0;

        if (cp.product.Edible != null)
          price = (cp.product.Edible.priceByWeight * cp.amount) / 1000;
        else if (cp.product.NonEdible != null)
          price = cp.product.NonEdible.price * cp.amount;

        return { ...cp, price };
      });

      return cartProductWithPrice;
    },
  })
  .mutation("addProduct", {
    input: z.object({
      productId: z.string(),
      amount: z.number(),
    }),
    resolve: async ({ input, ctx }) => {
      const { productId, amount } = input;

      const { cartId } = await ctx.prisma.client.findFirstOrThrow({
        select: { cartId: true },
        where: { userId: ctx.session.user.id },
      });

      await ctx.prisma.cartProduct.upsert({
        create: { cartId, productId, amount },
        update: { amount: { increment: amount } },
        where: {
          cartId_productId: {
            cartId,
            productId,
          },
        },
      });

      return {
        status: 201,
      };
    },
  })
  .mutation("deleteProduct", {
    input: z.object({
      productId: z.string(),
    }),
    resolve: async ({ input, ctx }) => {
      const { productId } = input;

      const { cartId } = await ctx.prisma.client.findFirstOrThrow({
        select: { cartId: true },
        where: { userId: ctx.session.user.id },
      });

      await ctx.prisma.cartProduct.delete({
        where: {
          cartId_productId: {
            cartId,
            productId,
          },
        },
      });

      return {
        status: 201,
      };
    },
  })
  .mutation("updateAmountProduct", {
    input: z.object({
      productId: z.string(),
      amount: z.number(),
    }),
    resolve: async ({ input, ctx }) => {
      const { productId, amount } = input;

      const { cartId } = await ctx.prisma.client.findFirstOrThrow({
        select: { cartId: true },
        where: { userId: ctx.session.user.id },
      });

      await ctx.prisma.cartProduct.update({
        data: { amount: amount },
        where: {
          cartId_productId: {
            cartId,
            productId,
          },
        },
      });
    },
  });
