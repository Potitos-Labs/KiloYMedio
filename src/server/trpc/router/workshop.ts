import * as trpc from "@trpc/server";
import { workshopCreateSchema } from "@utils/validations/workshop";

import { adminProcedure, publicProcedure, router } from "../trpc";

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
      const { name, description, imageURL, Online, Onsite } = input;

      if (Onsite) {
        await ctx.prisma.workshop.create({
          data: {
            name,
            description,
            imageURL,
            OnSiteWorkshop: {
              create: {
                date: Onsite.date,
                places: Onsite.places,
              },
            },
          },
        });
        return {
          status: 201,
        };
      }

      if (Online) {
        await ctx.prisma.workshop.create({
          data: {
            name,
            description,
            imageURL,
            OnlineWorkshop: {
              create: {
                videoURL: Online.videoURL,
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
});
