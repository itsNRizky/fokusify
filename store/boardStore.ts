import { create } from "zustand";
import {
  type File as FileType,
  type Note as NoteType,
  type Todolist as TodolistType,
  type Todoitem as TodoitemType,
  type User as UserType,
} from "@prisma/client";

interface BoardState {
  user: UserType;
  file: FileType;
  notes: NoteType[];
  todolist: TodolistType;
  todoitems: TodoitemType[];
  showPomodoro: boolean;
  showYoutube: boolean;

  setUser: (user: UserType) => void;
  setFile: (file: FileType) => void;
  setNotes: (notes: NoteType[]) => void;
  setTodolist: (todolist: TodolistType) => void;
  setTodoitems: (todoitems: TodoitemType[]) => void;
  setShowPomodoro: (showPomodoro: boolean) => void;
  setShowYoutube: (showYoutube: boolean) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  user: {
    name: "",
    email: "",
    emailVerified: null,
    subscription: "FREE",
    image: "",
    password: null,
    id: "",
  },
  file: { id: "", name: "", date: new Date(), finished: false, userId: "" },
  notes: [],
  todolist: { id: "", visible: false, fileId: "" },
  todoitems: [],
  showPomodoro: false,
  showYoutube: false,

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

  setShowYoutube: (showYoutube: boolean) => {
    set({ showYoutube: showYoutube });
  },
}));
