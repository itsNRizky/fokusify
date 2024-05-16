"use server";

import { z } from "zod";
import { File } from "@/lib/db/data/file";
import { fileFormSchema } from "@/schemas";
import { Todolist } from "@/lib/db/data/todolist";
import { redirect } from "next/navigation";
import { Todoitem } from "@/lib/db/data/todoitem";

export const create = async (
  userId: string,
  data: z.infer<typeof fileFormSchema>,
) => {
  const createdFile = await File.create({
    name: data.name,
    date: new Date(),
    userId: userId,
  });
  const todolistId = await Todolist.create({
    fileId: createdFile?.id!,
    xAxis: 0,
    yAxis: 0,
  });
  redirect("/app");
};

export const finishedFile = async (fileId: string) => {
  const todolist = await Todolist.getByFileId(fileId);
  const todoitems = await Todoitem.getByTodolistId(todolist?.id!);
  const notFinishedTodoitems = todoitems?.filter(
    (todoitem) => todoitem.finished === false,
  );
  notFinishedTodoitems?.forEach(async (todoitem) => {
    await Todoitem.update({
      ...todoitem,
      todolistId: null,
    });
  });
  await File.finish(fileId);
  redirect("/app");
};
