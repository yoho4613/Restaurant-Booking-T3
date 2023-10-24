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

      if (!checkTable) {
        throw new TRPCError({
          message: "Table does not exist",
          code: "BAD_REQUEST",
        });
      }

      const tableName = checkTable ? checkTable.name : "Table Unkown";

      const emailSent = await mg.messages.create(process.env.MAILGUN_API!, {
        from: "no-reply <re-reply@fc-restaurant.co.nz>",
        to: ["yoho4613@gmail.com"],
        subject: `Booking for ${name}`,
        html: `
        <html>
          <head>
            <title>Booking Confirmation</title>
            <style>
              img {
                width: 150px;
                height: 150px;
              }
              div {
                width: 100%;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <div>
            <img src="${ctx.req.headers.origin!}/assets/logo.jpg" />
            <h1>Thank you for Booking</h1>
            <h2>Here's your booking detail</h2>
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>table: ${tableName}</p>
            <p>Booking Date & Time: ${dateTime.toLocaleDateString()}</p>
            <p>To cancel the booking click </p>
            <a target="_blank" href="${ctx.req.headers.origin!}/cancelBooking/${
          booking.id
        }">this Link</a>
            </div>
            <div>
              <h4>FC-Restaurant</h4>
              <p>info@fc-restaurant.com</p>
              <p>+64 21 000 0000</p>
            </div>
          </body>
        </html>`,
      });
      if (emailSent.status !== 200) {
        throw new TRPCError({
          message: "Could not sent Email",
          code: "BAD_REQUEST",
        });
      }

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

  findBooking: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const booking = await ctx.prisma.booking.findUnique({
        where: {
          id,
        },
      });

      return booking;
    }),
});
