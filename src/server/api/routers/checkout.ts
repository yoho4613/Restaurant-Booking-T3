import _stripe from "stripe";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

const stripe = new _stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export const checkoutRouter = createTRPCRouter({
  checkoutSession: publicProcedure
    .input(
      z.object({
        products: z.array(
          z.object({
            id: z.string(),
            quantity: z.number().min(1, "Quantity must be at least 1"),
          })
        ),
        customerDetail: z.object({
          name: z.string(),
          mobile: z.string(),
          email: z.string(),
          people: z.string(),
          dateTime: z.date(),
          preorder: z.boolean(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const productsInCart = (
          await ctx.prisma.menuItem.findMany({
            where: {
              id: {
                in: input.products.map((product) => product.id),
              },
            },
          })
        ).map((p) => ({
          ...p,
          quantity:
            input.products.find((product) => product.id === p.id)?.quantity ||
            0,
        }));

        if (productsInCart.length !== input.products.length) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Some products are not available",
          });
        }

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",
          line_items: productsInCart.map((product) => ({
            price_data: {
              currency: "nzd",
              product_data: {
                name: product.name,
              },
              unit_amount: product.price * 100,
            },
            quantity: product.quantity,
          })),
          shipping_options: [
            {
              shipping_rate_data: {
                type: "fixed_amount",
                fixed_amount: {
                  amount: 0,
                  currency: "nzd",
                },
                display_name: "Pickup in store",
              },
            },
          ],
          customer_email: input.customerDetail.email,
          client_reference_id: input.customerDetail.mobile,
          metadata: {
            name: input.customerDetail.name,
            bookingTime: input.customerDetail.dateTime.toISOString(),
          },
          success_url: "http://localhost:3000/success",
          cancel_url: "https://localhost:3000/menu",
        });
        return {
          url: session.url || "",
        };
      } catch (error) {
        let msg = "";
        if (error instanceof Error) {
          msg = error.message;
        }
        throw new TRPCError({
          message: msg || "Payment failed",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
});
