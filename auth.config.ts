import bcrypt from "bcryptjs";
import credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import { loginFormSchema } from "./schemas";
import { User } from "./lib/db/data/user";

export default {
  secret: process.env.AUTH_SECRET_KEY,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    credentials({
      authorize: async (credentials) => {
        const validatedFields = loginFormSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await User.getByEmail(email);
          if (!user || !user.password) {
            return null;
          }

          const passwordMatched = await bcrypt.compare(password, user.password);
          if (passwordMatched) return user;
          else return null;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
