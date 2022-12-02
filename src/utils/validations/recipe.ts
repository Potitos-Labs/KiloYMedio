import { Allergen, IngredientUnit, RecipeDifficulty } from "@prisma/client";
import * as z from "zod";
import { productSchema } from "./product";

export const createRecipeSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Título muy corto" })
    .max(30, { message: "Título muy largo" }),
  difficulty: z.nativeEnum(RecipeDifficulty),
  cookingTime: z
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
  preparationTime: z
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

export const recipeSchema = z.object({
  id: z.string(),
  name: z.string(),
  imageURL: z.string(),
  userId: z.string(),
  cookingTime: z.number().optional().nullable(),
  preparationTime: z.number().optional().nullable(),
  description: z.string().optional().nullable(),
  portions: z.number().optional().nullable(),
  rating: z.number().optional().nullable(),
  isFav: z.boolean().optional().nullable(),
  difficulty: z.nativeEnum(RecipeDifficulty).optional().nullable(),
  directions: z
    .array(z.object({ number: z.number(), direction: z.string() }))
    .optional()
    .nullable(),
  RecipeIngredient: z
    .array(
      z.object({
        Ingredient: z.object({
          id: z.string(),
          name: z.string(),
          Edible: productSchema.nullable(),
        }),
        amount: z.number(),
        unit: z.nativeEnum(IngredientUnit),
      }),
    )
    .optional()
    .nullable(),
});
export const updateRecipeSchema = createRecipeSchema.extend({ id: z.string() });
export const commentSchema = z.object({
  recipeId: z.string(),
  description: z.string(),
  rating: z.number(),
});

export const filterRecipeSchema = z.object({
  adminRecipes: z.boolean().optional(),
  minPortion: z.number().optional(),
  maxPortion: z.number().optional(),
  minTime: z.number().optional(),
  maxTime: z.number().optional(),
  difficulty: z.nativeEnum(RecipeDifficulty).optional(),
  allergens: z
    .array(z.nativeEnum(Allergen))
    // unique() is not supported by zod
    .refine((array) => {
      return new Set([...array]).size === array.length;
    })
    .optional(),
});
export type ICreateRecipe = z.infer<typeof createRecipeSchema>;
export type IUpdateRecipe = z.infer<typeof updateRecipeSchema>;
export type IFilterRecipe = z.infer<typeof filterRecipeSchema>;
export type IRecipe = z.infer<typeof recipeSchema>;
export type IComment = z.infer<typeof commentSchema>;
