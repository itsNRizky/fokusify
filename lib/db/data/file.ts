import { db } from "../prisma";
import { type File as FileType } from "@prisma/client";

export const File = {
  create: async (file: FileType): Promise<FileType | null> => {
    try {
      const createdFile = await db.file.create({
        data: {
          name: file.name,
          date: file.date,
          finished: false,
          userId: file.userId,
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
};
