"use client";

import React, { FC, useEffect } from "react";
import { Button } from "../ui/button";
import { AiOutlineMenu } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { useBoardStore } from "@/store/boardStore";
import { type User as UserType } from "@prisma/client";
import { type Theme as ThemeType } from "@prisma/client";
import ProfileLogout from "./profileLogout";
import { useThemeStore } from "@/store/themeStore";
import { Popover, PopoverTrigger } from "../ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import ThemeSetting from "./themeSetting";

type Props = {
  className?: string;
  userProp: UserType;
  themeProp: ThemeType;
};

const HeaderApp: FC<Props> = ({ className, userProp, themeProp }) => {
  const [file] = useBoardStore((state) => [state.file]);
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
  return (
    <header className={className}>
      <nav className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Button
            variant={style === "LIGHT" ? "secondary" : "default"}
            size={"icon"}
          >
            <AiOutlineMenu />
          </Button>
          <h2 style={{ color: style === "LIGHT" ? "black" : "white" }}>
            {file.name}
          </h2>
        </div>
        <ul className="flex items-center gap-2">
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
