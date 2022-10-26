import isStrongPassword from "validator/lib/isStrongPassword";
import * as z from "zod";
import isIdentityCard from "validator/lib/isIdentityCard";
import isMobilePhone from "validator/lib/isMobilePhone";

export const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
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
        "La contraseña debe tener como mínimo una la longitud de 6, una minúscula y un número",
    },
  ),
});

export const signUpSchema = loginSchema.extend({
  username: z
    .string()
    .min(3, { message: "El nombre tiene que tener como mínimo 3 carácteres" })
    .max(20, {
      message: "El nombre tiene que tener como máximo 20 carácteres",
    }),
});

export const signUpByAdminSchema = signUpSchema.extend({
  nif: z.string().refine((value) => isIdentityCard(value, "ES"), {
    message: "El formato introducido no es correcto",
  }),
  address: z
    .string()
    .min(3, { message: "La dirección debe contener almenos 3 carácteres" }),
  phoneNumber: z
    .string()
    .refine((value) => isMobilePhone(value, "es-ES", { strictMode: false }), {
      message: "El formato introducido no es correcto",
    }),
});

export type ILogin = z.infer<typeof loginSchema>;
export type ISignUp = z.infer<typeof signUpSchema>;
export type ISignUpByAdminSchema = z.infer<typeof signUpByAdminSchema>;
