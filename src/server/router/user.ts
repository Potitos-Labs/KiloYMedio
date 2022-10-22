import { createRouter } from "./context";
import { z } from "zod";
import { hash } from "argon2";
import * as trpc from "@trpc/server";
import {
  signUpByAdminSchema,
  signUpSchema,
} from "../../utils/validations/auth";

export const userRouter = createRouter()
  // Método hello(){}
  .query("hello", {
    input: z.object({
      text: z.string(),
      description: z.string().min(10),
    }),
    resolve({ input }) {
      return {
        greeting: `Hello ${input.text} \n ${input.description}`,
      };
    },
  })
  // Método
  .query("getAllUsers", {
    async resolve({ ctx }) {
      return await ctx.prisma.user.findMany();
    },
  })
  .mutation("createNewClient", {
    input: signUpSchema,
    resolve: async ({ input, ctx }) => {
      const { username, email, password } = input;

      const exists = await ctx.prisma.user.findFirst({
        where: { email },
      });

      if (exists) {
        throw new trpc.TRPCError({
          code: "CONFLICT",
          message: "User already exists.",
        });
      }

      const hashedPassword = await hash(password);

      const result = await ctx.prisma.user.create({
        data: {
          name: username,
          email,
          passwordHash: hashedPassword,
          Client: { create: { cart: { create: {} } } },
        },
      });

      return {
        status: 201,
        message: "Account created successfully",
        result: result.email,
      };
    },
  })
  .mutation("createNewClientByAdmin", {
    input: signUpByAdminSchema,
    resolve: async ({ input, ctx }) => {
      const { username, email, password, nif, address, phoneNumber } = input;

      const hashedPassword = await hash(password);

      const result = await ctx.prisma.user.create({
        data: {
          name: username,
          email,
          passwordHash: hashedPassword,
          nif,
          Client: { create: { address, phoneNumber, cart: { create: {} } } },
        },
      });

      return {
        status: 201,
        message: "Account created successfully",
        result: result.email,
      };
    },
  });
