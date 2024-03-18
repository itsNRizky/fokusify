import { db } from "../prisma";
import { type Message as MessageType } from "@prisma/client";

export const Message = {
  create: async ({
    value,
    fileId,
  }: {
    value: string;
    fileId: string;
  }): Promise<MessageType | null> => {
    try {
      const createdMessage = await db.message.create({
        data: {
          value: value,
          fileId: fileId,
        },
      });
      return createdMessage;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  getByFileId: async (fileId: string): Promise<MessageType | null> => {
    try {
      const message = await db.message.findUnique({
        where: {
          fileId,
        },
      });
      return message;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  getOneRandom: async (userId: string) => {
    try {
      const message = await db.message.findMany({
        where: {
          file: {
            user: {
              id: {
                not: userId,
              },
            },
          },
        },
        include: {
          file: {
            include: {
              user: true,
            },
          },
        },
      });
      const randomMessage = message[Math.floor(Math.random() * message.length)];
      return randomMessage;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
};
