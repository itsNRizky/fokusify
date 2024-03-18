"use server";

import { Note } from "@/lib/db/data/note";

export const create = async (fileId: string, value: string) => {
  return Note.create({ fileId, value });
};

export const deleteNote = async (noteId: string) => {
  return Note.delete(noteId);
};
