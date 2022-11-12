import { IngredientUnit, RecipeDifficulty } from "@prisma/client";
import * as z from "zod";

export const createRecipeSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Título muy corto" })
    .max(30, { message: "Título muy largo" }),
  description: z.string().nullable(),
  difficulty: z.nativeEnum(RecipeDifficulty),
  directions: z.array(
    z.object({
      index: z.number(),
      direction: z.string().min(2).max(120),
    }),
  ),
  imageURL: z.string().url(),
  portions: z.number().min(1),
  ingredients: z.array(
    z.object({
      name: z.string().min(2),
      amount: z.number().nonnegative(),
      unit: z.nativeEnum(IngredientUnit),
    }),
  ),
  timeSpan: z.object({
    hour: z.number().min(0).max(24),
    minute: z.number().min(0).max(60),
  }),
});

export type ICreateRecipe = z.infer<typeof createRecipeSchema>;
