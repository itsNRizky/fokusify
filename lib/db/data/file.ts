import { db } from "../prisma";
import { type File as FileType } from "@prisma/client";

export const File = {
  create: async ({
    name,
    date,
    userId,
  }: {
    name: string;
    date: Date;
    userId: string;
  }): Promise<FileType | null> => {
    try {
      const createdFile = await db.file.create({
        data: {
          name: name,
          date: date,
          finished: false,
          userId: userId,
        },
      });
      return createdFile;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  getById: async (id: string): Promise<FileType | null> => {
    try {
      const file = await db.file.findUnique({
        where: {
          id,
        },
      });
      return file;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  getByUserLatestActive: async (userId: string): Promise<FileType | null> => {
    try {
      const file = await db.file.findFirst({
        where: {
          userId,
          finished: false,
        },
        orderBy: {
          date: "desc",
        },
      });
      return file;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  finish: async (id: string): Promise<FileType | null> => {
    try {
      const finishedFile = await db.file.update({
        where: {
          id,
        },
        data: {
          finished: true,
        },
      });
      return finishedFile;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
};
