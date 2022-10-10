import { createProtectedRouter } from "./context";
import { z } from "zod";
import * as trpc from "@trpc/server";

export const cartRouter = createProtectedRouter()
  .query("getAllCartProduct", {
    async resolve({ ctx }) {
      const cartProduct = await ctx.prisma.cartProduct.findMany({
        select: {
          productId: true,
          amount: true,
          product: {
            select: {
              name: true,
              Edible: { select: { priceByWeight: true } },
              NonEdible: { select: { price: true } },
              imageURL: true,
            },
          },
        },
        where: { cart: { client: { userId: ctx.session.user.id } } },
      });

      return cartProduct;
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

      const exists = await ctx.prisma.cartProduct.findFirst({
        where: { cartId, productId },
      });

      if (exists) {
        throw new trpc.TRPCError({
          code: "CONFLICT",
          message: "El producto ya está en la cesta",
        });
      }

      await ctx.prisma.cartProduct.create({
        data: {
          cartId,
          productId,
          amount,
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

      const exists = await ctx.prisma.cartProduct.findFirst({
        where: { cartId, productId },
      });

      if (!exists) {
        throw new trpc.TRPCError({
          code: "CONFLICT",
          message: "El producto no está en la cesta",
        });
      }

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
  });
