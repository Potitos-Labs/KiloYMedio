import { Allergen, ECategory, NECategory, ProductUnit } from "@prisma/client";
import isURL from "validator/lib/isURL";
import isDecimal from "validator/lib/isDecimal";
import * as z from "zod";

export const productCreateSchema = z.object({
  name: z.string().min(1, "El campo no puede estar vacío"),
  description: z.string().min(1, "El campo no puede estar vacío"),
  stock: z
    .number({ invalid_type_error: "Introduce un número" })
    .positive({ message: "Stock debe ser mayor a 0" }),
  imageURL: z
    .string()
    .refine((value) => isURL(value), { message: "Introduce un URL válido" }),
  Edible: z
    .object({
      priceByWeight: z
        .number({ invalid_type_error: "Introduce un número" })
        .positive({ message: "Precio debe ser mayor a 0" })
        .refine(
          (value) => isDecimal(value.toString(), { decimal_digits: "1" }),
          { message: "Introduce como máximo un dígito" },
        ),
      category: z.nativeEnum(ECategory),
      nutritionFacts: z.object({
        ingredients: z.string().min(1, "El campo no puede estar vacío"),
        energy: z.number({ invalid_type_error: "Introduce un número" }),
        fat: z.number({ invalid_type_error: "Introduce un número" }),
        protein: z.number({ invalid_type_error: "Introduce un número" }),
        carbohydrates: z.number({ invalid_type_error: "Introduce un número" }),
      }),
      allergens: z.array(z.object({ allergen: z.nativeEnum(Allergen) })),
      origin: z.string().nullable().optional(),
      conservation: z.string().nullable().optional(),
      Ingredient: z
        .object({
          RecipeIngredient: z.array(
            z.object({
              Recipe: z.object({
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
              }),
            }),
          ),
        })
        .optional(),
    })
    .nullable()
    .optional(),
  NonEdible: z
    .object({
      price: z
        .number({ invalid_type_error: "Introduce un número" })
        .positive({ message: "Precio debe ser mayor a 0" }),
      category: z.nativeEnum(NECategory),
    })
    .nullable()
    .optional(),
  ProductUnit: z.nativeEnum(ProductUnit),
});

export const productSchema = productCreateSchema.extend({
  id: z.string(),
});

export const filterProduct = z.object({
  name: z.string(), //Pasar en plain text
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  eCategories: z.array(z.nativeEnum(ECategory)),
  neCategories: z.array(z.nativeEnum(NECategory)),
  allergens: z.array(z.nativeEnum(Allergen)),
  orderByPrice: z.enum(["asc", "desc"]).optional(),
  orderByName: z.enum(["asc", "desc"]).optional(),
});

export const categorySchema = z.union([
  z.nativeEnum(ECategory),
  z.nativeEnum(NECategory),
  z.enum(["all"]),
]);

export type IProductCreate = z.infer<typeof productCreateSchema>;
export type IProduct = z.infer<typeof productSchema>;
export type IFilterProduct = z.infer<typeof filterProduct>;
