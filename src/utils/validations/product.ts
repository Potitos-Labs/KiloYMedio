import * as z from "zod";
import { Category, Allergen } from "@prisma/client";

export const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  category: z.nativeEnum(Category),
  stock: z.number(),
  image: z.string(),
  Edible: z
    .object({
      price: z.number(),
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
  NonEdible: z.object({ price: z.number() }).nullable(),
});

export type IProduct = z.infer<typeof productSchema>;
