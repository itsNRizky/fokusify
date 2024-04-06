import { db } from "../prisma";
import { type Todolist as TodolistType } from "@prisma/client";

export const Todolist = {
  create: async ({
    fileId,
    id,
  }: {
    id?: string;
    fileId: string;
  }): Promise<TodolistType | null> => {
    try {
      const createdTodolist = await db.todolist.create({
        data: {
          id: id,
          visible: false,
          fileId: fileId,
        },
      });
      return createdTodolist;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  getByFileId: async (fileId: string): Promise<TodolistType | null> => {
    try {
      const todolist = await db.todolist.findUnique({
        where: {
          fileId,
        },
      });
      return todolist;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  setVisibility: async (
    todolistId: string,
    visible: boolean,
  ): Promise<TodolistType | null> => {
    try {
      const todolist = await db.todolist.update({
        where: {
          id: todolistId,
        },
        data: {
          visible,
        },
      });
      return todolist;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
};
