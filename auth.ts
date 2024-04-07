import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db/prisma";
import authConfig from "./auth.config";
import { User } from "./lib/db/data/user";
import { UserSubscription } from "@prisma/client";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    jwt: async ({ token }) => {
      if (!token.sub) return token;
      const existingUser = await User.getById(token.sub);
      if (existingUser) {
        token.subscription = existingUser.subscription;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.subscription && session.user) {
        session.user.subscription = token.subscription as UserSubscription;
      }
      return session;
    },
  },
});
