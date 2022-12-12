import isAlpha from "validator/lib/isAlpha";
import isIdentityCard from "validator/lib/isIdentityCard";
import isMobilePhone from "validator/lib/isMobilePhone";
import isPostalCode from "validator/lib/isPostalCode";
import * as z from "zod";

export const clientSchema = z.object({
  name: z
    .string()
    .min(3, { message: "El nombre tiene que tener como mínimo 3 carácteres" })
    .max(40, {
      message: "El nombre tiene que tener como máximo 20 carácteres",
    }),
  email: z
    .string()
    .min(1, "Este campo no puede estar vacío")
    .email({ message: "Introduce un correo válido" }),

  image: z.string().nullish(),
  location: z
    .string()
    .refine(
      (value) => isAlpha(value, "es-ES"),
      "Este campo no puede contener números",
    )
    .nullable()
    .or(z.string().min(0).max(0)),
  CP: z
    .number({ invalid_type_error: "CP solo acepta números" })
    .refine((value) => isPostalCode(value.toString(), "ES"), {
      message: "El CP introducido no es correcto",
    })
    .nullable()
    .or(z.number().min(0).max(0)),

  address: z.string().nullable(),
  phoneNumber: z
    .string()
    .refine((value) => isMobilePhone(value, "es-ES", { strictMode: false }), {
      message: "El formato introducido no es correcto",
    })
    .nullable()
    .or(z.string().min(0).max(0)),
  nif: z
    .string()
    .refine((value) => isIdentityCard(value, "ES"), {
      message: "El formato introducido no es correcto",
    })
    .nullable()
    .or(z.string().min(0).max(0)),
});

export type IClient = z.infer<typeof clientSchema>;
