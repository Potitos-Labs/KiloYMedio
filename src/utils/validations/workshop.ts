import isURL from "validator/lib/isURL";
import * as z from "zod";

export const workshopCreateSchema = z.object({
  name: z.string().min(1, "El campo no puede estar vacío"),
  description: z.string().min(1, "El campo no puede estar vacío"),
  imageURL: z
    .string()
    .refine((value) => isURL(value), { message: "Introduce un URL válido" }),
  Onsite: z
    .object({
      date: z.date(),
      places: z
        .number()
        .min(5, "El curso como mínimo tiene que tener 5 plazas "),
    })
    .nullable()
    .optional(),
  Online: z
    .object({
      videoURL: z.string().refine((value) => isURL(value), {
        message: "Introduce un URL válido",
      }),
    })
    .nullable()
    .optional(),
});

export type IWorkshopCreate = z.infer<typeof workshopCreateSchema>;
