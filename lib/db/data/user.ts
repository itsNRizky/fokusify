import { db } from "../prisma";
import { type User as UserType } from "@prisma/client";

export const User = {
  create: async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }): Promise<UserType | null> => {
    try {
      const createdUser = await db.user.create({
        data: {
          name: name,
          email: email,
          password: password,
          subscription: "FREE",
        },
      });
      return createdUser;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  getByEmail: async (email: string): Promise<UserType | null> => {
    try {
      const user = await db.user.findUnique({
        where: {
          email,
        },
      });
      return user;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  getById: async (id: string): Promise<UserType | null> => {
    try {
      const user = await db.user.findUnique({
        where: {
          id,
        },
      });
      return user;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
};
