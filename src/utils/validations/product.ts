import { Allergen, ECategory, NECategory } from "@prisma/client";
import isURL from "validator/lib/isURL";
import * as z from "zod";

export const productCreateSchema = z.object({
  name: z.string().min(1, "El campo no puede estar vacío"),
  description: z.string().min(1, "El campo no puede estar vacío"),
  stock: z.number({ invalid_type_error: "Introduce un número" }),
  imageURL: z
    .string()
    .refine((value) => isURL(value), { message: "Introduce un URL válido" }),
  Edible: z
    .object({
      priceByWeight: z.number({ invalid_type_error: "Introduce un número" }),
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
    })
    .nullable()
    .optional(),
  NonEdible: z
    .object({
      price: z.number({ invalid_type_error: "Introduce un número" }),
      category: z.nativeEnum(NECategory),
    })
    .nullable()
    .optional(),
});

export const productSchema = productCreateSchema.extend({ id: z.string() });

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
