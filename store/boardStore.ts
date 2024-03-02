import { create } from "zustand";

interface BoardState {
  user: UserType;
  file: FileType;
  notes: NoteType[];
  todolist: TodolistType;
  todoitems: TodoitemType[];
  showPomodoro: boolean;

  setUser: (user: UserType) => void;
  setFile: (file: FileType) => void;
  setNotes: (notes: NoteType[]) => void;
  setTodolist: (todolist: TodolistType) => void;
  setTodoitems: (todoitems: TodoitemType[]) => void;
  setShowPomodoro: (showPomodoro: boolean) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  user: { name: "", image: "", accountId: "" },
  file: { name: "", date: "", finished: false, userId: "" },
  notes: [],
  todolist: { fileId: "", visible: false },
  todoitems: [],
  showPomodoro: false,

  setUser: (user: UserType) => {
    set({ user: user });
  },

  setFile: (file: FileType) => {
    set({ file: file });
  },

  setNotes: (notes: NoteType[]) => {
    set({ notes: notes });
  },

  setTodolist: (todolist: TodolistType) => {
    set({ todolist: todolist });
  },

  setTodoitems: (todoitems: TodoitemType[]) => {
    set({ todoitems: todoitems });
  },

  setShowPomodoro: (showPomodoro: boolean) => {
    set({ showPomodoro: showPomodoro });
  },
}));
