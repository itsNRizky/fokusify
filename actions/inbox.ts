"use server";

import { Inbox } from "@/lib/db/data/inbox";

export const sendMessage = async (email: string, message: string) => {
  await Inbox.create(email, message);
};
