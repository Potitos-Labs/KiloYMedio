import * as z from "zod";

export const clientSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  image: z.string().nullish(),
  location: z.string().nullish(),
  CP: z.number().nullish(),
  address: z.string().nullish(),
  phoneNumber: z.string().nullish(),
  nif: z.string().nullish(),
});

export type IClient = z.infer<typeof clientSchema>;
