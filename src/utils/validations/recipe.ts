import * as z from "zod";
import { RecipeDifficulty } from "@prisma/client";

export const createRecipeSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Título muy corto" })
    .max(30, { message: "Título muy largo" }),
  difficulty: z.nativeEnum(RecipeDifficulty),
  directions: z.string().array().nonempty(),
  imageURL: z.string().url(),
  portions: z.number().min(1),
  ingredients: z.string().array().nonempty(),
  timeSpan: z.number().min(1),
});

export type ICreateRecipe = z.infer<typeof createRecipeSchema>;
