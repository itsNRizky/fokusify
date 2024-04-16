"use server";
import bcrypt from "bcryptjs";

import { registerFormSchema } from "@/schemas";
import { z } from "zod";
import { User } from "@/lib/db/data/user";
import { Theme } from "@/lib/db/data/theme";

export const register = async (data: z.infer<typeof registerFormSchema>) => {
  const validatedFields = registerFormSchema.safeParse(data);
  if (!validatedFields.success) {
    return {
      error: "Email or password is invalid",
    };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const exisitingUser = await User.getByEmail(email);
  if (exisitingUser) {
    return {
      error: "Email already used",
    };
  }

  // TODO: Error handling if user creation fails (network problem for e.g.)
  const createdUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  await Theme.create(createdUser!.id);

  return {
    success: "Register successful",
  };
};
