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
    })
    .refine(
      (value) => isAlpha(value, "es-ES"),
      "Este campo no puede contener números",
    ),
  email: z
    .string()
    .min(1, "Este campo no puede estar vacío")
    .email({ message: "Introduce un correo válido" }),
  image: z.string().nullish(),
  location: z
    .string()
    .min(3, { message: "Introduce al menos 3 caracteres" })
    .refine(
      (value) => isAlpha(value, "es-ES"),
      "Este campo no puede contener números",
    )
    .nullable(),
  CP: z
    .number({ invalid_type_error: "Introduce un número" })
    .refine((value) => isPostalCode(value.toString(), "ES"), {
      message: "El CP introducido no es correcto",
    })
    .nullable(),
  address: z
    .string()
    .min(3, { message: "La dirección debe contener al menos 3 caracteres" })
    .nullable(),
  phoneNumber: z
    .string()
    .min(1, "Este campo no puede estar vacío")
    .refine((value) => isMobilePhone(value, "es-ES", { strictMode: false }), {
      message: "El formato introducido no es correcto",
    })
    .nullable(),
  nif: z
    .string()
    .min(1, "Este campo no puede estar vacío")
    .refine((value) => isIdentityCard(value, "ES"), {
      message: "El formato introducido no es correcto",
    })
    .nullable(),
});

export type IClient = z.infer<typeof clientSchema>;
