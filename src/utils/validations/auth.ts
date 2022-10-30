import isAlpha from "validator/lib/isAlpha";
import isIdentityCard from "validator/lib/isIdentityCard";
import isMobilePhone from "validator/lib/isMobilePhone";
import isPostalCode from "validator/lib/isPostalCode";
import isStrongPassword from "validator/lib/isStrongPassword";
import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Este campo no puede estar vacío")
    .email({ message: "Introduce un correo válido" }),
  password: z.string().refine(
    (value) =>
      isStrongPassword(value, {
        minLength: 6,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 0,
        minUppercase: 0,
      }),
    {
      message:
        "La contraseña debe tener como mínimo una longitud de 6, una minúscula y un número",
    },
  ),
});

export const signUpSchema = loginSchema.extend({
  username: z
    .string()
    .min(3, { message: "El nombre tiene que tener como mínimo 3 carácteres" })
    .max(40, {
      message: "El nombre tiene que tener como máximo 20 carácteres",
    })
    .refine(
      (value) => isAlpha(value, "es-ES"),
      "Este campo no puede contener números",
    ),
});

export const signUpByAdminSchema = signUpSchema.extend({
  nif: z
    .string()
    .min(1, "Este campo no puede estar vacío")
    .refine((value) => isIdentityCard(value, "ES"), {
      message: "El formato introducido no es correcto",
    }),
  address: z
    .string()
    .min(3, { message: "La dirección debe contener almenos 3 carácteres" }),
  location: z
    .string()
    .min(3, { message: "Introduce almenos 3 carácteres" })
    .refine(
      (value) => isAlpha(value, "es-ES"),
      "Este campo no puede contener números",
    ),
  code_postal: z
    .number({ invalid_type_error: "Introduce un número" })
    .refine((value) => isPostalCode(value.toString(), "ES"), {
      message: "El CP introducido no es correcto",
    }),
  phoneNumber: z
    .string()
    .min(1, "Este campo no puede estar vacío")
    .refine((value) => isMobilePhone(value, "es-ES", { strictMode: false }), {
      message: "El formato introducido no es correcto",
    }),
});

export type ILogin = z.infer<typeof loginSchema>;
export type ISignUp = z.infer<typeof signUpSchema>;
export type ISignUpByAdminSchema = z.infer<typeof signUpByAdminSchema>;
