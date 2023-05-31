import { z } from "zod";
import { adminProcedure, createTRPCRouter } from "../trpc";

const promotionRouter = createTRPCRouter({
  addPromotion: adminProcedure.input(z.object({
    name: z.string(),
    isAvailable: z.boolean(),
  })).mutation(async ({ctx, input}) => {
    const {name, isAvailable} = input;


  })
})