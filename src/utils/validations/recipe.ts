import * as z from "zod";
import { RecipeDifficulty } from "@prisma/client";

export const createRecipeSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Título muy corto" })
    .max(30, { message: "Título muy largo" }),
  description: z.string(),
  difficulty: z.nativeEnum(RecipeDifficulty),
  directions: z.string().min(2).max(120),
  imageURL: z.string().url(),
  portions: z.number().min(1),
  ingredients: z.object({
    name: z.string().min(2),
    amount: z.number().nonnegative(),
    unit: z.string(),
  }),
  timeSpan: z.number().min(1),
});

export type ICreateRecipe = z.infer<typeof createRecipeSchema>;
