"use server";

import { Note } from "@/lib/db/data/note";

export const deleteNote = async (noteId: string) => {
  return Note.delete(noteId);
};
