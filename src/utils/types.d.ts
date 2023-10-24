export interface DateType {
  justDate: Date | null;
  dateTime: Date | null;
}

export interface CustomerDetail {
  dateTime: string;
  email: string;
  mobile: string;
  name: string;
  people: string;
  preorder: boolean;
  tableId: string;
}

type Categories = (typeof categories)[number];

export interface Booking {
  id: string;
  email: string;
  createdAt: Date;
  dateTime: Date;
  mobile: string;
  name: string;
  people: string;
  preorder: boolean;
  tableId: string;
}

export interface BookingWithTable {
  id: string;
  email: string;
  createdAt: Date;
  dateTime: Date;
  mobile: string;
  name: string;
  people: string;
  preorder: boolean;
  tableId: string;
  table: string;
}

import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  name: string({ required_error: "Name is required" }),
  email: string({ required_error: "Email is required" }).email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  passwordConfirm: string({ required_error: "Please confirm your password" }),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "Passwords do not match",
});

export const loginUserSchema = object({
  email: string({ required_error: "Email is required" }).email(
    "Invalid email or password"
  ),
  password: string({ required_error: "Password is required" }).min(
    8,
    "Invalid email or password"
  ),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type LoginUserInput = TypeOf<typeof loginUserSchema>;
