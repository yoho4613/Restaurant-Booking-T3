import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const tableRouter = createTRPCRouter({
  getTables: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.tables.findMany();
  }),
  findTable: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;

      return await ctx.prisma.tables.findMany({
        where: {
          id,
        },
      });
    }),
  findAvilableTable: publicProcedure
    .input(
      z.object({
        dateTime: z.date(),
        people: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { dateTime, people } = input;

      const tables = await ctx.prisma.tables.findMany({
        where: {
          capacity: {
            gte: people,
          },
        },
      });
      const bookings = await ctx.prisma.booking.findMany({
        where: {
          dateTime,
        },
      });

      const availableTables = tables.filter(
        (table) => !bookings.some((booking) => booking.tableId === table.id)
      );

      if (!availableTables.length) {
        throw Error("There is no table available at this time");
      }

      return availableTables;
    }),
});
