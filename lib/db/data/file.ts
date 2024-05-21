import { db } from "../prisma";
import { type File as FileType } from "@prisma/client";

export const File = {
  create: async ({
    name,
    date,
    userId,
    id,
  }: {
    id?: string;
    name: string;
    date: Date;
    userId: string;
  }): Promise<FileType | null> => {
    try {
      const createdFile = await db.file.create({
        data: {
          id: id,
          name: name,
          date: date,
          active: true,
          userId: userId,
        },
      });
      return createdFile;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  getByUser: async (userId: string): Promise<FileType[] | null> => {
    try {
      const file = await db.file.findMany({
        where: {
          userId,
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
          active: true,
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

  update: async (file: FileType): Promise<FileType | null> => {
    try {
      const finishedFile = await db.file.update({
        where: {
          id: file.id,
        },
        data: {
          id: file.id,
          name: file.name,
          date: file.date,
          active: file.active,
          userId: file.userId,
        },
      });
      return finishedFile;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  activate: async (fileId: string): Promise<FileType | null> => {
    try {
      const activatedFile = await db.file.update({
        where: {
          id: fileId,
        },
        data: {
          active: true,
        },
      });
      return activatedFile;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  // finish: async (fileId: string): Promise<FileType | null> => {
  //   try {
  //     const finishedFile = await db.file.update({
  //       where: {
  //         id: fileId,
  //       },
  //       data: {
  //         finished: true,
  //       },
  //     });
  //     return finishedFile;
  //   } catch (err) {
  //     console.log(err);
  //     return null;
  //   }
  // },
};
