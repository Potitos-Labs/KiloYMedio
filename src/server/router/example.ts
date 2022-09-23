import { createRouter } from "./context";
import { z } from "zod";
import { hash } from "argon2";
import * as trpc from "@trpc/server";
import { signUpSchema } from "../../utils/validations/auth";

export const exampleRouter = createRouter()
  .query("hello", {
    input: z
      .object({
        text: z.string(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    },
  })
  .query("getAllUsers", {
    async resolve({ ctx }) {
      return await ctx.prisma.user.findMany();
    },
  })
  .mutation("signup", {
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
        data: { name: username, email, passwordHash: hashedPassword },
      });

      await ctx.prisma.client.create({
        data: {
          userId: result.id,
        },
      });

      return {
        status: 201,
        message: "Account created successfully",
        result: result.email,
      };
    },
  });
