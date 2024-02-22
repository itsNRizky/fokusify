import { File } from "@/lib/db/services";
import { Note } from "@/lib/db/services";
import { create } from "zustand";

interface BoardState {
  file: FileType;
  notes: NoteType[];

  getLatestBoardDataByUserId: (userId: string) => Promise<void>;
  setFile: (file: FileType) => void;
  setNotes: (notes: NoteType[]) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  file: { name: "", date: "", finished: false, user: "" },
  notes: [{ file: "", value: "" }],

  getLatestBoardDataByUserId: async (userId: string): Promise<void> => {
    const file = await File.getLatestFileByUserId(userId);
    const notes = await Note.getNotesByFileId(file.res[0].$id!);
    set({ file: file.res[0], notes: notes.res });
  },

  setFile: (file: FileType) => {
    set({ file: file });
  },

  setNotes: (notes: NoteType[]) => {
    set({ notes: notes });
  },
}));
