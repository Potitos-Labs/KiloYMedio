import { Allergen } from "@prisma/client";
import * as trpc from "@trpc/server";
import { hash } from "argon2";
import { z } from "zod";

import {
  signUpByAdminSchema,
  signUpSchema,
} from "../../../utils/validations/auth";
import { clientSchema } from "../../../utils/validations/client";
import {
  adminProcedure,
  clientProcedure,
  publicProcedure,
  router,
} from "../trpc";
import { clientRouter } from "./user/client";

export const userRouter = router({
  getClientById: publicProcedure
    .input(z.object({ id: z.string() }))
    .output(clientSchema)
    .query(async ({ ctx, input: { id } }) => {
      const client = await ctx.prisma.user.findFirst({
        where: { id },
        select: {
          name: true,
          email: true,
          nif: true,
          image: true,
          Client: {
            select: {
              address: true,
              phoneNumber: true,
              CP: true,
              location: true,
            },
          },
        },
      });

      if (!client || !client.Client) {
        throw new trpc.TRPCError({ code: "BAD_REQUEST" });
      }
      const { Client: clientAttr, ...userAttr } = client;
      return { ...userAttr, ...clientAttr };
    }),
  getAllUsers: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findMany();
  }),
  updateClient: clientProcedure
    .input(clientSchema)
    .mutation(async ({ ctx, input }) => {
      const { email, name, CP, address, location, image, nif, phoneNumber } =
        input;
      await ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: {
          name,
          email,
          image,
          nif,
          Client: { update: { CP, address, location, phoneNumber } },
        },
      });

      return {
        status: 201,
        message: "Account updated successfully",
      };
    }),
  createNewClient: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ input, ctx }) => {
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
    }),
  createNewClientByAdmin: adminProcedure
    .input(signUpByAdminSchema)
    .mutation(async ({ input, ctx }) => {
      const {
        username,
        email,
        password,
        nif,
        location,
        code_postal,
        address,
        phoneNumber,
      } = input;

      const nifExists = await ctx.prisma.user.findUnique({ where: { nif } });
      const emailExists = await ctx.prisma.user.findUnique({
        where: { email },
      });

      if (nifExists || emailExists) {
        throw new trpc.TRPCError({
          code: "CONFLICT",
          message: "" + (nifExists && "nif") + (emailExists && "email"),
        });
      }

      const hashedPassword = await hash(password);

      const result = await ctx.prisma.user.create({
        data: {
          name: username,
          email,
          passwordHash: hashedPassword,
          nif,
          Client: {
            create: {
              address,
              location,
              CP: code_postal,
              phoneNumber,
              cart: { create: {} },
            },
          },
        },
      });

      return {
        status: 201,
        message: "Account created successfully",
        result: result.email,
      };
    }),

  getAllClientAllergen: clientProcedure.query(async ({ ctx }) => {
    const clientAllergen = await ctx.prisma.allergenClient.findMany({
      select: {
        clientId: true,
        allergen: true,
      },
      where: { Client: { userId: ctx.session.user.id } },
    });
    return clientAllergen;
  }),

  addAllergen: clientProcedure
    .input(
      z.object({
        allergen: z.nativeEnum(Allergen),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { allergen } = input;

      const { clientId } = await ctx.prisma.allergenClient.findFirstOrThrow({
        select: { clientId: true },
        where: { clientId: ctx.session.user.id },
      });

      await ctx.prisma.allergenClient.create({
        data: { clientId: clientId, allergen: allergen },
      });

      return {
        status: 201,
      };
    }),

  deleteAllergen: clientProcedure
    .input(
      z.object({
        allergen: z.nativeEnum(Allergen),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { allergen } = input;

      const { clientId } = await ctx.prisma.allergenClient.findFirstOrThrow({
        select: { clientId: true },
        where: { clientId: ctx.session.user.id },
      });

      await ctx.prisma.allergenClient.delete({
        where: {
          clientId_allergen: {
            clientId,
            allergen,
          },
        },
      });

      return {
        status: 201,
      };
    }),
  client: clientRouter,
});
