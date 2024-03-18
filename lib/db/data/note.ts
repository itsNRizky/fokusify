import { db } from "../prisma";
import { type Note as NoteType } from "@prisma/client";

export const Note = {
  create: async (note: NoteType): Promise<NoteType | null> => {
    try {
      const createdNote = await db.note.create({
        data: {
          value: note.value,
          fileId: note.fileId,
        },
      });
      return createdNote;
    } catch (err) {
      console.log(err);
      return null;
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
