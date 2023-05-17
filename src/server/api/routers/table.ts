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
});
