import { createTRPCRouter } from "~/server/api/trpc";
import { adminRouter } from "./routers/admin";
import { menuRouter } from "./routers/menu";
import { openingRouter } from "./routers/opening";
import { checkoutRouter } from "./routers/checkout";
import { bookingRouter } from "./routers/booking";
import { tableRouter } from "./routers/table";
import { userRouter } from "./routers/user";
import promotionRouter from "./routers/promotion";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  admin: adminRouter,
  menu: menuRouter,
  opening: openingRouter,
  checkout: checkoutRouter,
  booking: bookingRouter,
  table: tableRouter,
  user: userRouter,
  promotion: promotionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
