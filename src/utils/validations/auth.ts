import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(25),
});

export const signUpSchema = loginSchema.extend({
  username: z.string(),
});

export const signUpByAdminSchema = signUpSchema.extend({
  nif: z.string().min(9).max(9),
  address: z.string(),
  phoneNumber: z.string().min(9).max(9),
});

export type ILogin = z.infer<typeof loginSchema>;
export type ISignUp = z.infer<typeof signUpSchema>;
export type ISignUpByAdminSchema = z.infer<typeof signUpByAdminSchema>;
