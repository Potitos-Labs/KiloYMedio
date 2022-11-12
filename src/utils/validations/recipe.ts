import { IngredientUnit, RecipeDifficulty } from "@prisma/client";
import * as z from "zod";

export const createRecipeSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Título muy corto" })
    .max(30, { message: "Título muy largo" }),
  difficulty: z.nativeEnum(RecipeDifficulty),
  timeSpan: z
    .object(
      {
        hour: z.number().min(0).max(23),
        minute: z.number().min(1).max(59),
      },
      { required_error: "Duración inválida" },
    )
    .or(
      z.object(
        {
          hour: z.number().min(1).max(23),
          minute: z.number().min(0).max(59),
        },
        { required_error: "Duración inválida" },
      ),
    ),
  portions: z.number().min(1, { message: "Las raciones no pueden ser 0" }),
  imageURL: z.string({ required_error: "Campo obligatorio" }).url(),
  description: z.string().nullable(),
  ingredients: z.array(
    z.object({
      name: z.string().min(1, { message: "Campo obligatorio" }),
      amount: z.number().nonnegative().min(1, { message: "Cantidad inválida" }),
      unit: z.nativeEnum(IngredientUnit),
    }),
  ),
  directions: z.array(
    z.object({
      index: z.number(),
      direction: z
        .string()
        .min(2, { message: "Campo muy corto" })
        .max(120, { message: "Campo muy largo" }),
    }),
  ),
});

export type ICreateRecipe = z.infer<typeof createRecipeSchema>;
