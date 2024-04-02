"use client";

import React, { FC, useState, useTransition } from "react";
import { Button } from "../ui/button";
import { AiOutlineMenu } from "react-icons/ai";
import { FiSave } from "react-icons/fi";
import { FaHeadphonesSimple } from "react-icons/fa6";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { useBoardStore } from "@/store/boardStore";
import { saveBoardToDatabaseHandler } from "@/actions/board";
import { toast } from "sonner";
import { type User as UserType } from "@prisma/client";
import { AvatarImage } from "../ui/avatar";
import ProfileLogout from "./profileLogout";

type Props = {
  className?: string;
  userProp: UserType;
};

const HeaderApp: FC<Props> = ({ className, userProp }) => {
  const [isPending, startTransition] = useTransition();
  const [file, notes, todolist, todoitems] = useBoardStore((state) => [
    state.file,
    state.notes,
    state.todolist,
    state.todoitems,
  ]);

  const saveHandler = async () => {
    startTransition(async () => {
      toast("Saving your progress...");
      await saveBoardToDatabaseHandler(notes, todolist, todoitems, file);
      toast("Your progress has been saved");
    });
  };

  return (
    <header className={className}>
      <nav className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Button size={"icon"}>
            <AiOutlineMenu />
          </Button>
          <h2>{file.name}</h2>
        </div>
        <ul className="flex items-center gap-2">
          <li>
            <Button onClick={saveHandler} size={"icon"}>
              <FiSave />
            </Button>
          </li>
          <li>
            <Button size={"icon"}>
              <FaHeadphonesSimple />
            </Button>
          </li>
          <li>
            <ProfileLogout userProp={userProp} />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderApp;
