"use server";

import { Message } from "@/lib/db/data/message";

export const create = async (fileId: string, value: string) => {
  return await Message.create({
    fileId: fileId,
    value: value,
  });
};

export const getByFileId = async (fileId: string) => {
  return await Message.getByFileId(fileId);
};

export const getOneRandom = async (userId: string) => {
  return Message.getOneRandom(userId);
};
