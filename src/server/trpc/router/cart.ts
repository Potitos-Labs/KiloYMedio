import { z } from "zod";

import { clientProcedure, router } from "../trpc";

import { linePrice, unitDivisor } from "../../common/pricing";
import { TRPCError } from "@trpc/server";

export const cartRouter = router({
  getAllCartProduct: clientProcedure.query(async ({ ctx }) => {
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
            ProductUnit: true,
          },
        },
      },
      where: { cart: { client: { userId: ctx.session.user.id } } },
    });

    const cartProductWithPrice = cartProduct.map((cp) => {
      const price = linePrice(cp.product, cp.amount);

      return { ...cp, price };
    });

    const cartProductWithPriceAndTotal = {
      productList: cartProductWithPrice,
      totalPrice: cartProductWithPrice
        .reduce((sum, i) => sum + i.price, 0)
        .toFixed(2),
      totalKilograms: cartProductWithPrice.reduce(
        (sum, i) => sum + (i.product.ProductUnit == "kilograms" ? i.amount : 0),
        0,
      ),
      totalGrams: cartProductWithPrice.reduce(
        (sum, i) => sum + (i.product.ProductUnit == "grams" ? i.amount : 0),
        0,
      ),
      totalLiters: cartProductWithPrice.reduce(
        (sum, i) => sum + (i.product.ProductUnit == "liters" ? i.amount : 0),
        0,
      ),
      totalMilliliters: cartProductWithPrice.reduce(
        (sum, i) =>
          sum + (i.product.ProductUnit == "milliliters" ? i.amount : 0),
        0,
      ),
      totalUnits: cartProductWithPrice.reduce(
        (sum, i) => sum + (i.product.ProductUnit == "unit" ? i.amount : 0),
        0,
      ),
    };

    return cartProductWithPriceAndTotal;
  }),
  addProduct: clientProcedure
    .input(
      z.object({
        productId: z.string(),
        amount: z.number().finite().positive().max(1_000_000),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { productId, amount } = input;

      const { cartId } = await ctx.prisma.client.findFirstOrThrow({
        select: { cartId: true },
        where: { userId: ctx.session.user.id },
      });

      const product = await ctx.prisma.product.findUniqueOrThrow({
        where: { id: productId },
      });
      const previous = await ctx.prisma.cartProduct.findUnique({
        where: { cartId_productId: { cartId, productId } },
      });
      if (
        amount + (previous?.amount ?? 0) >
          product.stock * unitDivisor[product.ProductUnit] ||
        (product.ProductUnit === "unit" && !Number.isInteger(amount))
      )
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cantidad no disponible.",
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
    }),
  deleteProduct: clientProcedure
    .input(
      z.object({
        productId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
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
        productId,
      };
    }),
  updateAmountProduct: clientProcedure
    .input(
      z.object({
        productId: z.string(),
        amount: z.number().finite().positive().max(1_000_000),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { productId, amount } = input;

      const { cartId } = await ctx.prisma.client.findFirstOrThrow({
        select: { cartId: true },
        where: { userId: ctx.session.user.id },
      });

      const product = await ctx.prisma.product.findUniqueOrThrow({
        where: { id: productId },
      });
      if (
        amount > product.stock * unitDivisor[product.ProductUnit] ||
        (product.ProductUnit === "unit" && !Number.isInteger(amount))
      )
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cantidad no disponible.",
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
    }),
});
