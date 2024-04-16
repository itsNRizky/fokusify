import { create } from "zustand";

interface ThemeState {
  boardBackground: string;
  style: "LIGHT" | "DARK";

  setBoardBackground: (background: string) => void;
  setStyle: (style: "LIGHT" | "DARK") => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  boardBackground: "default",
  style: "LIGHT",

  setBoardBackground: (boardBackground: string) => set({ boardBackground }),
  setStyle: (style: "LIGHT" | "DARK") => set({ style }),
}));
