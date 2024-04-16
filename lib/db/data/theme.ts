import { db } from "../prisma";
import { type Theme as ThemeType } from "@prisma/client";

export const Theme = {
  create: async (userId: string): Promise<ThemeType | null> => {
    try {
      const createdTheme = await db.theme.create({
        data: {
          userId: userId,
        },
      });
      return createdTheme;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  getThemeByUserId: async (userId: string): Promise<ThemeType | null> => {
    try {
      const theme = await db.theme.findUnique({
        where: {
          userId: userId,
        },
      });
      return theme;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  updateThemeByUserId: async (
    userId: string,
    boardBackground?: string,
    style?: "LIGHT" | "DARK",
  ) => {
    try {
      const updatedTheme = await db.theme.update({
        where: {
          userId: userId,
        },
        data: {
          boardBackground,
          style,
        },
      });
      return updatedTheme;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
};
