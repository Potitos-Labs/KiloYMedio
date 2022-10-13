import * as z from "zod";
import { ECategory, NECategory, Allergen } from "@prisma/client";

export const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  stock: z.number(),
  image: z.string(),
  Edible: z
    .object({
      price: z.number(),
      category: z.nativeEnum(ECategory),
      nutrittionFacts: z.object({
        ingredients: z.string(),
        energy: z.number(),
        fat: z.number(),
        protein: z.number(),
        carbohydrates: z.number(),
      }),
      allergens: z.array(z.nativeEnum(Allergen)),
      origin: z.string().optional(),
      conservation: z.string().optional(),
    })
    .nullable(),
  NonEdible: z
    .object({ price: z.number(), category: z.nativeEnum(NECategory) })
    .nullable(),
});

export const categorySchema = z.union([
  z.nativeEnum(ECategory),
  z.nativeEnum(NECategory),
  z.enum(["all"]),
]);

export type IProduct = z.infer<typeof productSchema>;
