import { TRPCError } from "@trpc/server";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import { getJwtSecretKey } from "~/lib/auth";
import cookie from "cookie";

export const userRouter = createTRPCRouter({
  getAllUsers: adminProcedure.query(async ({ ctx, input }) => {
    return await ctx.prisma.user.findMany();
  }),
  signupUser: adminProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
        name: z.string(),
        verified: z.boolean(),
        role: z.enum(["staff", "manager", "admin", "superadmin"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { email, password, name, verified, role } = input;
        const hasedPassword = await bcrypt.hash(password, 10);

        const user_exist = await ctx.prisma.user.findUnique({
          where: { email },
        });

        if (user_exist) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "User already exists",
          });
        }

        const user = await ctx.prisma.user.create({
          data: {
            email,
            password: hasedPassword,
            name,
            verified,
            role,
          },
        });
        return { success: true };
      } catch (error: any) {
        throw new TRPCError(error);
      }
    }),

  loginUser: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { res } = ctx;
        const { email, password } = input;

        const user = await ctx.prisma.user.findUnique({
          where: { email: email },
        });

        const passwordMatch = await bcrypt.compare(
          password,
          (user as Record<string, any>).password
        );

        const adminAccess =
          email === process.env.ADMIN_EMAIL &&
          password === process.env.ADMIN_PASSWORD;

        if (!adminAccess) {
          if (!user || !passwordMatch || !email || !password) {
            throw new TRPCError({
              code: "UNAUTHORIZED",
              message: "Invalid email or password",
            });
          }
        }
        const lastLogin = new Date(Date.now());

        const token = await new SignJWT({})
          .setProtectedHeader({ alg: "HS256" })
          .setJti(nanoid())
          .setIssuedAt()
          .setExpirationTime("24h")
          .sign(new TextEncoder().encode(getJwtSecretKey()));

        res.setHeader(
          "Set-Cookie",
          cookie.serialize("user-token", token, {
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV === "production",
          })
        );
      } catch (error: any) {
        throw new TRPCError(error);
      }
    }),
});
