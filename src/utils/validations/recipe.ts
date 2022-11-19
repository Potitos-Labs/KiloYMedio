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
        hour: z.number().min(0, { message: "Duración inválida" }).max(23),
        minute: z.number().min(1, { message: "Duración inválida" }).max(59),
      },
      { required_error: "Duración inválida" },
    )
    .or(
      z.object(
        {
          hour: z.number().min(1, { message: "Duración inválida" }).max(23),
          minute: z.number().min(0, { message: "Duración inválida" }).max(59),
        },
        { required_error: "Duración inválida" },
      ),
    ),
  portions: z.number().min(1, { message: "Las raciones no pueden ser 0" }),
  imageURL: z.string({ required_error: "Campo obligatorio" }).url(),
  description: z
    .string()
    .max(600, {
      message: "La descripción no puede tener más de 600 caracteres",
    })
    .nullable(),
  ingredients: z
    .array(
      z.object({
        name: z.string().min(1, { message: "Campo obligatorio" }),
        amount: z
          .number()
          .nonnegative()
          .min(1, { message: "Cantidad inválida" }),
        unit: z.nativeEnum(IngredientUnit),
      }),
    )
    .nonempty({ message: "La receta debe tener al menos un ingrediente" }),
  directions: z
    .array(
      z.object({
        index: z.number(),
        direction: z
          .string()
          .min(2, { message: "Campo muy corto" })
          .max(120, { message: "Campo muy largo" }),
      }),
    )
    .nonempty({ message: "Debes añadir al menos una instrucción" }),
});
export const updateRecipeSchema = createRecipeSchema.extend({ id: z.string() });

export const filterRecipeSchema = z.object({
  minPortion: z.number().optional(),
  maxPortion: z.number().optional(),
  minTime: z.number().optional(),
  maxTime: z.number().optional(),
  difficulty: z.nativeEnum(RecipeDifficulty).optional(),
});
export type ICreateRecipe = z.infer<typeof createRecipeSchema>;
export type IUpdateRecipe = z.infer<typeof updateRecipeSchema>;
export type IFilterRecipe = z.infer<typeof filterRecipeSchema>;
