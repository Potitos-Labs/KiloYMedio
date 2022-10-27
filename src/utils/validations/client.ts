import * as z from "zod";

export const clientSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  image: z.string().nullish(),
  location: z.string().nullish(),
  CP: z.number(),
  address: z.string().nullish(),
  phoneNumber: z.number(),
  nif: z.string(),
});

export type Client = z.infer<typeof clientSchema>;
