"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { loginFormSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";

export const login = async (data: z.infer<typeof loginFormSchema>) => {
  const validatedFields = loginFormSchema.safeParse(data);
  if (!validatedFields.success) {
    return {
      error: "Email or password is invalid",
    };
  }

  const { email, password } = validatedFields.data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return {
      success: "Login successful",
    };
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return { error: "Email or password is invalid" };
        default:
          return { error: "Something went wrong, please try again" };
      }
    }
    throw err;
  }
};
