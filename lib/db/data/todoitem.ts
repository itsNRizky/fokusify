import { db } from "../prisma";
import { type Todoitem as TodoitemType } from "@prisma/client";

export const Todoitem = {
  create: async (todoitem: TodoitemType): Promise<TodoitemType | null> => {
    try {
      const createdTodoitem = await db.todoitem.create({
        data: {
          value: todoitem.value,
          finished: false,
          todolistId: todoitem.todolistId,
        },
      });
      return createdTodoitem;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  getByTodolistId: async (
    todolistId: string,
  ): Promise<TodoitemType[] | null> => {
    try {
      const todoitem = await db.todoitem.findMany({
        where: {
          todolistId,
        },
      });
      return todoitem;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  delete: async (todoitemId: string): Promise<TodoitemType | null> => {
    try {
      const deletedTodoitem = await db.todoitem.delete({
        where: {
          id: todoitemId,
        },
      });
      return deletedTodoitem;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  setFinished: async (
    todoitemId: string,
    finished: boolean,
  ): Promise<TodoitemType | null> => {
    try {
      const updatedTodoitem = await db.todoitem.update({
        where: {
          id: todoitemId,
        },
        data: {
          finished,
        },
      });
      return updatedTodoitem;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
};
