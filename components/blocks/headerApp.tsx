"use client";

import React, { FC, useTransition } from "react";
import { Button } from "../ui/button";
import { AiOutlineMenu } from "react-icons/ai";
import { FiSave } from "react-icons/fi";
import { FaHeadphonesSimple } from "react-icons/fa6";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { useBoardStore } from "@/store/boardStore";
import { saveBoardToDatabaseHandler } from "@/actions/board";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { signOut } from "next-auth/react";
import { type User as UserType } from "@prisma/client";
import { AvatarImage } from "../ui/avatar";

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

  const logoutHandler = () => {
    startTransition(async () => {
      toast("Saving your progress...");
      await saveBoardToDatabaseHandler(notes, todolist, todoitems, file);
      toast("Your progress has been saved, logging out...");
      signOut({ callbackUrl: "/login" });
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
            <Popover>
              <PopoverTrigger asChild>
                <Button size={"icon"} className="rounded-full">
                  <Avatar>
                    <AvatarImage src={userProp.image!} alt={userProp.name!} />
                    <AvatarFallback>
                      {getInitials(userProp.name!)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="mr-5 flex w-52 flex-col items-end gap-3">
                <p className="font-bold">{userProp.name}</p>
                <Button
                  disabled={isPending}
                  variant={"destructive"}
                  className="w-full"
                  onClick={logoutHandler}
                >
                  Logout
                </Button>
              </PopoverContent>
            </Popover>
          </li>
        </ul>
      </nav>
    </header>
  );
};

function getInitials(name: string) {
  const nameArray = name.split(" ");
  let initials = "";

  if (nameArray.length === 1) {
    return nameArray[0].charAt(0).toUpperCase();
  } else {
    initials =
      nameArray[0].charAt(0) + nameArray[nameArray.length - 1].charAt(0);
  }

  return initials.toUpperCase();
}

export default HeaderApp;
