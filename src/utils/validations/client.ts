import * as z from "zod";

export const clientSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  image: z.string(),
  location: z.string(),
  CP: z.number(),
  address: z.string(),
  phoneNumber: z.number(),
  nif: z.string(),
});

export type Client = z.infer<typeof clientSchema>;
