import * as trpc from "@trpc/server";
import { workshopCreateSchema } from "@utils/validations/workshop";
import { adminProcedure, router } from "../trpc";

export const workshopRouter = router({
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
