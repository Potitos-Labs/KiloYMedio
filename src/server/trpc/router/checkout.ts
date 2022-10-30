import { z } from "zod";

import { clientProcedure, router } from "../trpc";

export const checkoutRouter = router({
  createNewOrder: clientProcedure
    .input(z.object({ shipmentAddress: z.string() }))
    .mutation(async ({ ctx, input: { shipmentAddress } }) => {
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

      const cartProductWithPriceAndTotal = {
        ...cartProductWithPrice,
        totalPrice: cartProductWithPrice.reduce((sum, i) => sum + i.price, 0),
      };

      const productIdAndAmount = cartProduct.map((cp) => {
        return { productId: cp.productId, amount: cp.amount };
      });

      const order = await ctx.prisma.order.create({
        data: {
          price: cartProductWithPriceAndTotal.totalPrice.toString() + " €",
          clientId: ctx.session.user.id,
          shipmentAddress: shipmentAddress,
          ProductOrder: { createMany: { data: productIdAndAmount } },
        },
      });

      await ctx.prisma.cartProduct.deleteMany({
        where: { cart: { client: { userId: ctx.session.user.id } } },
      });

      return order;
    }),
});
