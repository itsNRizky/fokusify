import { db } from "../prisma";
import { type Note as NoteType } from "@prisma/client";

export const Note = {
  create: async ({
    id,
    value,
    fileId,
    xAxis,
    yAxis,
  }: {
    id?: string;
    value: string;
    fileId: string;
    xAxis: number;
    yAxis: number;
  }): Promise<NoteType | null> => {
    try {
      const createdNote = await db.note.create({
        data: {
          id: id,
          value: value,
          fileId: fileId,
          xAxis: xAxis,
          yAxis: yAxis,
        },
      });
      return createdNote;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  createMany: async (notes: NoteType[]): Promise<void> => {
    try {
      await db.note.createMany({
        data: notes,
      });
    } catch (err) {
      console.log(err);
    }
  },

  getByFileId: async (fileId: string): Promise<NoteType[] | null> => {
    try {
      const note = await db.note.findMany({
        where: {
          fileId,
        },
      });
      return note;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  delete: async (noteId: string): Promise<NoteType | null> => {
    try {
      const deletedNote = await db.note.delete({
        where: {
          id: noteId,
        },
      });
      return deletedNote;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  update: async (note: NoteType): Promise<NoteType | null> => {
    try {
      const updatedNote = await db.note.update({
        where: {
          id: note.id,
        },
        data: {
          value: note.value,
        },
      });
      return updatedNote;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
};
