"use server";
import { Todoitem } from "@/lib/db/data/todoitem";

export const create = async (
  value: string,
  todolistId: string,
  userId: string,
) => {
  return await Todoitem.create({ value, todolistId, userId });
};

export const update = async (
  id: string,
  value: string,
  todolistId: string,
  finished: boolean,
  userId: string,
) => {
  return await Todoitem.update({ id, value, todolistId, finished, userId });
};

export const getUnusedByUserId = async (userId: string) => {
  return await Todoitem.getUnusedByUserId(userId);
};
