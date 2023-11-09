import { z } from "zod";
import { adminProcedure, createTRPCRouter } from "../trpc";
import { isAfter, isBefore } from "date-fns";
import { publicProcedure } from "../trpc";


const promotionRouter = createTRPCRouter({
  addPromotion: adminProcedure.input(z.object({
    name: z.string(),
    description: z.string(),
    startDate: z.date(),
    endDate: z.date(),
  })).mutation(async ({ctx, input}) => {
    const {startDate, endDate} = input;
    const available = isBefore(new Date(), endDate) && isAfter(new Date(), startDate)


    return await ctx.prisma.promotion.create({
      data: {
        ...input,
        endDate: new Date(endDate.getTime() + 1000 * 60 * 60 * 24 - 1),
        isAvailable: available
      }
    })
  }),

  getPromotions: publicProcedure.query(async ({ctx}) => {
    return await ctx.prisma.promotion.findMany();
  })
})

export default promotionRouter