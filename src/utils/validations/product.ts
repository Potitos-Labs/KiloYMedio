import { Allergen, ECategory, NECategory } from "@prisma/client";
import * as z from "zod";

export const productCreateSchema = z.object({
  name: z.string(),
  description: z.string(),
  stock: z.number(),
  imageURL: z.string(),
  Edible: z
    .object({
      priceByWeight: z.number(),
      category: z.nativeEnum(ECategory),
      nutritionFacts: z.object({
        ingredients: z.string(),
        energy: z.number(),
        fat: z.number(),
        protein: z.number(),
        carbohydrates: z.number(),
      }),
      allergens: z.array(z.object({ allergen: z.nativeEnum(Allergen) })),
      origin: z.string().nullable().optional(),
      conservation: z.string().nullable().optional(),
    })
    .nullable()
    .optional(),
  NonEdible: z
    .object({ price: z.number(), category: z.nativeEnum(NECategory) })
    .nullable()
    .optional(),
});

export const productSchema = productCreateSchema.extend({ id: z.string() });

export const categorySchema = z.union([
  z.nativeEnum(ECategory),
  z.nativeEnum(NECategory),
  z.enum(["all"]),
]);

export type IProductCreate = z.infer<typeof productCreateSchema>;
export type IProduct = z.infer<typeof productSchema>;
