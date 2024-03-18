import { db } from "../prisma";

export const User = {
  create: async (
    name: string,
    email: string,
    emailVerified: Date,
    subscription: "FREE" | "PRO",
    image?: string,
    password?: string,
  ) => {
    try {
      const user = await db.user.create({
        data: {
          name,
          email,
          emailVerified,
          image,
          subscription,
          password: password ? password : undefined,
        },
      });
      return user;
    } catch (err) {
      console.log(err);
    }
  },

  getByEmail: async (email: string) => {
    try {
      const user = await db.user.findUnique({
        where: {
          email,
        },
      });
      return user;
    } catch (err) {
      console.log(err);
    }
  },

  getById: async (id: string) => {
    try {
      const user = await db.user.findUnique({
        where: {
          id,
        },
      });
      return user;
    } catch (err) {
      console.log(err);
    }
  },
};
