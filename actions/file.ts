"use server";

import { z } from "zod";
import { File } from "@/lib/db/data/file";
import { fileFormSchema } from "@/schemas";
import { Todolist } from "@/lib/db/data/todolist";
import { redirect } from "next/navigation";

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
  });
  redirect("/app");
};
