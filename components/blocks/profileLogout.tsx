import React, { FC, useTransition } from "react";
import { Button } from "../ui/button";
import { AvatarImage } from "../ui/avatar";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { toast } from "sonner";
import { saveBoardToDatabaseHandler } from "@/actions/board";
import { type User as UserType } from "@prisma/client";
import { useBoardStore } from "@/store/boardStore";
import { signOut } from "next-auth/react";

type Props = {
  userProp: UserType;
};

const ProfileLogout: FC<Props> = ({ userProp }) => {
  const [isPending, startTransition] = useTransition();
  const [file, notes, todolist, todoitems] = useBoardStore((state) => [
    state.file,
    state.notes,
    state.todolist,
    state.todoitems,
  ]);
  const logoutHandler = () => {
    startTransition(async () => {
      toast("Saving your progress...");
      await saveBoardToDatabaseHandler(notes, todolist, todoitems, file);
      toast("Your progress has been saved, logging out...");
      signOut({ callbackUrl: "/login" });
    });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={"icon"} className="rounded-full">
          <Avatar>
            <AvatarImage src={userProp.image!} alt={userProp.name!} />
            <AvatarFallback>{getInitials(userProp.name!)}</AvatarFallback>
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

export default ProfileLogout;
