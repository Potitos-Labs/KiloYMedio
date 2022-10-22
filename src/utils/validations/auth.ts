import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";
import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Email invalido" }),
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
    .min(3, { message: "El nombre tiene que tener como mínimo 3 caracteres" })
    .max(20, {
      message: "El nombre tiene que tener como máximo 20 caracteres",
    }),
});

export const signUpByAdminSchema = signUpSchema.extend({
  nif: z.string().min(9).max(9),
  address: z.string(),
  phoneNumber: z.string().min(9).max(9),
});

export type ILogin = z.infer<typeof loginSchema>;
export type ISignUp = z.infer<typeof signUpSchema>;
export type ISignUpByAdminSchema = z.infer<typeof signUpByAdminSchema>;
