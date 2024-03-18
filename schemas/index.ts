import { z } from "zod";

export const fileFormSchema = z.object({
  name: z
    .string({
      required_error: "Name for the file is required",
    })
    .min(1)
    .max(50),
});

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const registerFormSchema = z.object({
  name: z
    .string({
      required_error: "Name for the account is required",
    })
    .min(1)
    .max(50),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z.string().min(1, { message: "Password is required" }),
});
