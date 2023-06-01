import { z } from "zod";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { isAfter, isBefore } from "date-fns";

const promotionRouter = createTRPCRouter({
  addPromotion: adminProcedure
    .input(
      z.object({
        name: z.string(),
        startDate: z.date(),
        endDate: z.date(),
        description: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { startDate, endDate } = input;

      const available = isBefore(new Date(), endDate) && isAfter(new Date(), startDate)
  
      return await ctx.prisma.promotion.create({
        data: {
          ...input,
          isAvailable: available
        },
      });
    }),

    getPromotions: publicProcedure.query(async ({ctx}) => {
      return await ctx.prisma.promotion.findMany();
    })
});

export default promotionRouter;