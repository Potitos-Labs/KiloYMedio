import { Allergen } from "@prisma/client";
import * as trpc from "@trpc/server";
import { z } from "zod";

import {
  adminProcedure,
  clientProcedure,
  publicProcedure,
  router,
} from "@server/trpc/trpc";
import { clientSchema } from "@utils/validations/client";
import { signUpByAdminSchema, signUpSchema } from "@utils/validations/auth";
import { hash } from "argon2";
import { commentSchema } from "@utils/validations/recipe";

export const clientRouter = router({
  update: clientProcedure
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

  getById: publicProcedure
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

  addFavoriteRecipe: clientProcedure
    .input(z.object({ recipeId: z.string() }))
    .mutation(async ({ ctx, input: { recipeId } }) => {
      const userId = ctx.session.user.id;
      await ctx.prisma.recipeUser.upsert({
        where: {
          recipeId_userId: { recipeId, userId },
        },
        create: { recipeId, userId },
        update: {},
      });

      return { status: 201 };
    }),

  deleteFavouriteRecipe: clientProcedure
    .input(z.object({ recipeId: z.string() }))
    .mutation(async ({ ctx, input: { recipeId } }) => {
      await ctx.prisma.recipeUser.delete({
        where: { recipeId_userId: { recipeId, userId: ctx.session.user.id } },
      });

      return { status: 201 };
    }),

  getFavoriteRecipes: clientProcedure.query(async ({ ctx }) => {
    const recipes = await ctx.prisma.recipeUser.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      select: {
        Recipe: { select: { name: true, imageURL: true, id: true } },
      },
    });

    return recipes;
  }),

  getOwnRecipes: clientProcedure.query(async ({ ctx }) => {
    const recipes = await ctx.prisma.recipe.findMany({
      where: { userId: ctx.session.user.id },
    });

    return recipes;
  }),
  newRecipeComment: clientProcedure
    .input(commentSchema)
    .mutation(async ({ ctx, input }) => {
      const { recipeId, description, rating } = input;
      await ctx.prisma.comment.create({
        data: {
          recipeId,
          description,
          rating,
          userId: ctx.session.user.id,
        },
      });
      return {
        status: 201,
        message: "Account updated successfully",
      };
    }),

  getRecipeComments: clientProcedure
    .input(z.object({ recipeId: z.string() }))
    .query(async ({ ctx, input: { recipeId } }) => {
      const comments = await ctx.prisma.comment.findMany({
        where: {
          recipeId,
        },
        select: {
          description: true,
          rating: true,
          createdAt: true,
          User: {
            select: {
              name: true,
            },
          },
        },
      });
      return comments;
    }),
  getRecipeStatistics: clientProcedure
    .input(z.object({ recipeId: z.string() }))
    .query(async ({ ctx, input: { recipeId } }) => {
      const ratings = await ctx.prisma.comment.findMany({
        where: {
          recipeId,
        },
        select: {
          rating: true,
        },
      });

      const average =
        ratings.reduce(
          (acumulator, current) => acumulator + current.rating,
          0,
        ) / ratings.length;

      //Obtener repetidos
      let ranges: any = {};
      ratings.forEach((e: { rating: number }) => {
        const rangeStar = Math.ceil(e.rating);
        ranges[rangeStar] = (ranges[rangeStar] || 0) + 1;
      });
      //Obtener porcentages
      ranges = ranges.values().map((e: number) => (e * 100) / ratings.length);

      return { count: ratings.length, average, ranges };
    }),
  updateAllergen: clientProcedure
    .input(
      z.object({
        allergen: z.array(z.nativeEnum(Allergen)),
      }),
    )
    .mutation(async ({ ctx, input: { allergen: newAllergens } }) => {
      const clientAllergen = await ctx.prisma.allergenClient.findMany({
        select: {
          clientId: true,
          allergen: true,
        },
        where: { Client: { userId: ctx.session.user.id } },
      });
      const oldAllergens = clientAllergen.map((a) => a.allergen);

      const allergensToDelete = oldAllergens.filter(
        (a) => !newAllergens.includes(a),
      );

      const allergensToCreate = newAllergens.filter(
        (a) => !oldAllergens.includes(a),
      );

      await ctx.prisma.allergenClient.deleteMany({
        where: { allergen: { in: allergensToDelete } },
      });

      await ctx.prisma.allergenClient.createMany({
        data: allergensToCreate.map((a) => {
          return { allergen: a, clientId: ctx.session.user.id };
        }),
      });

      return { status: 201 };
    }),

  createNew: publicProcedure
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
  createNewByAdmin: adminProcedure
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
});
