"use client";

import React, { FC, useEffect, useTransition } from "react";
import { Button } from "../ui/button";
import { AiOutlineMenu } from "react-icons/ai";
import { IoSaveOutline } from "react-icons/io5";
import { useBoardStore } from "@/store/boardStore";
import { type User as UserType } from "@prisma/client";
import { type Theme as ThemeType } from "@prisma/client";
import ProfileLogout from "./profileLogout";
import { useThemeStore } from "@/store/themeStore";
import ThemeSetting from "./themeSetting";
import { saveBoardToDatabaseHandler } from "@/actions/board";
import { toast } from "sonner";
import InboxForm from "./inboxForm";
import MenuButton from "./menuButton";

type Props = {
  className?: string;
  userProp: UserType;
  themeProp: ThemeType;
};

const HeaderApp: FC<Props> = ({ className, userProp, themeProp }) => {
  const [isPending, startTransition] = useTransition();
  const [file, notes, todolist, todoitems] = useBoardStore((state) => [
    state.file,
    state.notes,
    state.todolist,
    state.todoitems,
  ]);

  const [style, boardBackground, setStyle, setBoardBackground] = useThemeStore(
    (state) => [
      state.style,
      state.boardBackground,
      state.setStyle,
      state.setBoardBackground,
    ],
  );

  useEffect(() => {
    setStyle(themeProp.style);
    setBoardBackground(themeProp.boardBackground);
  }, [
    themeProp.style,
    setStyle,
    setBoardBackground,
    themeProp.boardBackground,
  ]);

  const saveHandler = () => {
    startTransition(async () => {
      toast("Saving your progress");
      await saveBoardToDatabaseHandler(notes, todolist, todoitems, file);
      toast("Your progress has been saved");
    });
  };
  return (
    <header className={className}>
      <nav className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <MenuButton style={style} />
          <h2>{file.name}</h2>
        </div>
        <ul className="flex items-center gap-2">
          <li>
            <InboxForm />
          </li>
          <li>
            <Button
              disabled={isPending}
              onClick={saveHandler}
              variant={style === "LIGHT" ? "secondary" : "default"}
              size={"icon"}
            >
              <IoSaveOutline />
            </Button>
          </li>
          <li>
            <ThemeSetting />
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
