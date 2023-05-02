import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";


export const bookingRouter = createTRPCRouter({
  addBooking: publicProcedure
    .input(
      z.object({
        name: z.string(),
        people: z.string(),
        mobile: z.string(),
        email: z.string(),
        preorder: z.boolean(),
        dateTime: z.date()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { name, people, mobile, email, preorder, dateTime } = input;
      const booking = await ctx.prisma.booking.create({
        data: {
          name,
          people,
          mobile,
          email,
          preorder,
          dateTime,
        },
      });
      return booking;
    }),
})