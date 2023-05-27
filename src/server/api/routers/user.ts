import { TRPCError } from "@trpc/server";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { Prisma, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { RoleEnumType } from "@prisma/client";
import { signJwt } from "~/utils/jwt";

export const userRouter = createTRPCRouter({
  getAllUsers: adminProcedure.query(async ({ctx, input}) => {
    return await ctx.prisma.user.findMany()
  }),
  
  createUser: adminProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
        passwordConfirm: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return (await ctx.prisma.user.create({
        data: input,
      })) as User;
    }),

  findUser: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {}),
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

        const accessToken = signJwt(
          { id: user.id, email: user.email },
          "accessTokenPrivateKey",
          {
            expiresIn: "24h",
          }
        );

        const refreshToken = signJwt(
          { id: user.id, email: user.email },
          "refreshTokenPrivateKey",
          {
            expiresIn: "24h",
          }
        );

        return {
          message: "Signup Successful, please proceed to login",
          status: "success",
          user,
          accessToken,
          refreshToken,
        };
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
        const { email, password } = input;

        const user = await ctx.prisma.user.findUnique({
          where: { email: email },
        });

        const passwordMatch = await bcrypt.compare(
          password,
          (user as Record<string, any>).password
        );

        if (!user || !passwordMatch) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Invalid email or password",
          });
        }

        const lastLogin = new Date(Date.now());

        // const updatedUser = await ctx.prisma.user.update({
        //   where: { id: user.id },
        //   data: { lastLogin },
        // });

        const accessToken = signJwt({ id: user.id, email: user.email }, "accessTokenPrivateKey", {
          expiresIn: "24h",
        });
  
        const refreshToken = signJwt({ id: user.id, email: user.email }, "refreshTokenPrivateKey", {
          expiresIn: "24h",
        });

        return {
          accessToken,
          refreshToken,
          message: 'Login successful',
          status: 'success'
        }
      } catch (error:any) {
        throw new TRPCError(error)
      }
    }),
});
