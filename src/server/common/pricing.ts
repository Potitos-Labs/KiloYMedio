import type { ProductUnit } from "@prisma/client";

export const unitDivisor: Record<ProductUnit, number> = {
  grams: 1000,
  kilograms: 1,
  liters: 1,
  milliliters: 1000,
  unit: 1,
};

export function linePrice(
  product: {
    ProductUnit: ProductUnit;
    Edible: { priceByWeight: number } | null;
    NonEdible: { price: number } | null;
  },
  amount: number,
) {
  const price = product.Edible?.priceByWeight ?? product.NonEdible?.price;
  if (price === undefined) throw new Error("El producto no tiene precio.");
  return (
    Math.round(
      ((price * amount) / unitDivisor[product.ProductUnit] + Number.EPSILON) *
        100,
    ) / 100
  );
}
