import { db } from "../prisma";

export const Inbox = {
  create: async (email: string, message: string) => {
    try {
      await db.inbox.create({
        data: {
          email: email,
          message: message,
        },
      });
    } catch (err) {
      console.log(err);
    }
  },
};
