import { create } from "zustand";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";
import { get, set, del } from "idb-keyval";
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
  _isHydrated: boolean;

  setUser: (user: UserType) => void;
  setFile: (file: FileType) => void;
  setNotes: (notes: NoteType[]) => void;
  setTodolist: (todolist: TodolistType) => void;
  setTodoitems: (todoitems: TodoitemType[]) => void;
  setShowPomodoro: (showPomodoro: boolean) => void;
  setShowYoutube: (showYoutube: boolean) => void;
  clear: () => void;
  setIsHydrated: (state: boolean) => void;
}

const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await get(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await del(name);
  },
};

export const useBoardStore = create<BoardState>()(
  persist(
    (set) => ({
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
      _isHydrated: false,

      setUser: (user: UserType) => set({ user }),
      setFile: (file: FileType) => set({ file }),
      setNotes: (notes: NoteType[]) => set({ notes }),
      setTodolist: (todolist: TodolistType) => set({ todolist }),
      setTodoitems: (todoitems: TodoitemType[]) => set({ todoitems }),
      setShowPomodoro: (showPomodoro: boolean) => set({ showPomodoro }),
      setShowYoutube: (showYoutube: boolean) => set({ showYoutube }),
      setIsHydrated: (state: boolean) => set({ _isHydrated: state }),
      clear: () =>
        set({
          user: {
            name: "",
            email: "",
            emailVerified: null,
            subscription: "FREE",
            image: "",
            password: null,
            id: "",
          },
          file: {
            id: "",
            name: "",
            date: new Date(),
            finished: false,
            userId: "",
          },
          notes: [],
          todolist: { id: "", visible: false, fileId: "" },
          todoitems: [],
          showPomodoro: false,
          showYoutube: false,
        }),
    }),
    {
      name: "fokusify-storage",
      storage: createJSONStorage(() => storage),
      onRehydrateStorage: () => (state) => {
        state?.setIsHydrated(true);
      },
    },
  ),
);
