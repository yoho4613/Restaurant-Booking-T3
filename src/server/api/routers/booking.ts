import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { mg } from "~/lib/mailgun";
import { TRPCError } from "@trpc/server";

export const bookingRouter = createTRPCRouter({
  addBooking: publicProcedure
    .input(
      z.object({
        name: z.string(),
        people: z.string(),
        mobile: z.string(),
        email: z.string(),
        preorder: z.boolean(),
        dateTime: z.date(),
        tableId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { name, people, mobile, email, preorder, dateTime, tableId } =
        input;

      const checkTable = await ctx.prisma.tables.findUnique({
        where: {
          id: tableId,
        },
      });

      if (!checkTable) {
        throw new TRPCError({
          message: "Table does not exist",
          code: "BAD_REQUEST",
        });
      }
      const booking = await ctx.prisma.booking.create({
        data: {
          name,
          people,
          mobile,
          email,
          preorder,
          dateTime,
          tableId,
        },
      });

      await mg.messages.create(
        "sandboxdf2a9aed137e4576b6dbf5fb4f22c946.mailgun.org",
        {
          from: "no-reply <re-reply@fc-restaurant.co.nz>",
          to: ["yoho4613@gmail.com"],
          subject: "Hello",
          text: "Testing some Mailgun awesomness!",
          html: `<h1>Click the button to cancel booking</h1><a href=""></a>`
        }
      );

      return booking;
    }),

  cancelBooking: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      await ctx.prisma.booking.update({
        where: {
          id,
        },
        data: {
          canceled: true,
        },
      });
      return await ctx.prisma.booking.findMany();
    }),

  addPreorder: publicProcedure
    .input(
      z.object({
        bookingId: z.string(),
        item: z.string(),
        quantity: z.number(),
        price: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { bookingId, item, quantity, price } = input;
      const preorder = await ctx.prisma.preorder.create({
        data: {
          bookingId,
          item,
          quantity,
          price,
        },
      });

      return preorder;
    }),
});
