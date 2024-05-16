import { db } from "../prisma";
import { type Todolist as TodolistType } from "@prisma/client";

export const Todolist = {
  create: async ({
    fileId,
    id,
    xAxis,
    yAxis,
  }: {
    id?: string;
    fileId: string;
    xAxis: number;
    yAxis: number;
  }): Promise<TodolistType | null> => {
    try {
      const createdTodolist = await db.todolist.create({
        data: {
          id: id,
          visible: false,
          fileId: fileId,
          xAxis: xAxis,
          yAxis: yAxis,
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

  updateCoordinates: async (id: string, xAxis: number, yAxis: number) => {
    try {
      await db.todolist.update({
        where: {
          id: id,
        },
        data: {
          xAxis: xAxis,
          yAxis: yAxis,
        },
      });
    } catch (err) {
      console.log(err);
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
