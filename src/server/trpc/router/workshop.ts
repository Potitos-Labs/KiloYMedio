import * as trpc from "@trpc/server";
import { workshopCreateSchema } from "@utils/validations/workshop";
import { z } from "zod";

import {
  adminProcedure,
  clientProcedure,
  publicProcedure,
  router,
} from "../trpc";

export const workshopRouter = router({
  getAllOnlineWorkshops: publicProcedure.query(async ({ ctx }) => {
    const workshops = await ctx.prisma.workshop.findMany({
      select: {
        name: true,
        description: true,
        imageURL: true,
        OnlineWorkshop: {
          select: {
            videoURL: true,
          },
        },
      },
      where: {
        NOT: {
          OnlineWorkshop: null,
        },
      },
    });
    return workshops;
  }),

  getAllOnsiteWorkshops: publicProcedure.query(async ({ ctx }) => {
    const workshops = await ctx.prisma.workshop.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        imageURL: true,
        OnSiteWorkshop: {
          select: {
            places: true,
            date: true,
          },
        },
      },
      where: {
        NOT: {
          OnSiteWorkshop: null,
        },
      },
    });
    return workshops;
  }),

  createNewWorkshop: adminProcedure
    .input(workshopCreateSchema)
    .mutation(async ({ input, ctx }) => {
      const { name, description, imageURL, OnlineWorkshop, OnSiteWorkshop } =
        input;

      if (OnSiteWorkshop) {
        await ctx.prisma.workshop.create({
          data: {
            name,
            description,
            imageURL,
            OnSiteWorkshop: {
              create: {
                date: OnSiteWorkshop.date,
                places: OnSiteWorkshop.places,
              },
            },
          },
        });
        return {
          status: 201,
        };
      }

      if (OnlineWorkshop) {
        await ctx.prisma.workshop.create({
          data: {
            name,
            description,
            imageURL,
            OnlineWorkshop: {
              create: {
                videoURL: OnlineWorkshop.videoURL,
              },
            },
          },
        });
        return {
          status: 201,
        };
      }

      throw new trpc.TRPCError({
        code: "BAD_REQUEST",
        message: "Error not controlled",
      });
    }),

  getWorkshopsParticipants: clientProcedure
    .input(z.object({ onSiteWorkshopId: z.string() }))
    .query(async ({ ctx, input: { onSiteWorkshopId } }) => {
      const participants = await ctx.prisma.onSiteWorkshopAttendance.findMany({
        where: {
          onSiteWorkshopId: onSiteWorkshopId,
        },
        select: {
          clientId: true,
        },
      });
      const numberParticipants = participants.length;
      return numberParticipants;
    }),

  isEnroll: clientProcedure
    .input(z.object({ onSiteWorkshopId: z.string() }))
    .query(async ({ ctx, input: { onSiteWorkshopId } }) => {
      const clientId = ctx.session.user.id;
      const isFav = (await ctx.prisma.onSiteWorkshopAttendance.findFirst({
        where: { clientId: clientId, onSiteWorkshopId: onSiteWorkshopId },
      }))
        ? true
        : false;
      return isFav;
    }),

  delete: adminProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { name } = input;

      const workshop = await ctx.prisma.workshop.findFirst({
        where: { name: name },
      });

      if (!workshop) {
        return;
      }

      await ctx.prisma.workshop.delete({
        where: {
          id: workshop.id,
        },
      });
    }),
});
