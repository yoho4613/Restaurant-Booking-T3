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
      console.log(tables);

      const availableTables = tables.filter(
        async (table) =>
          await ctx.prisma.booking.findFirst({
            where: {
              tableId: table.id,
              NOT: {
                dateTime: dateTime,
              },
            },
          })
      );

      let selectedTable = "";
      console.log(availableTables);

      return availableTables;
    }),
});
