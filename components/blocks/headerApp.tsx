"use client";

import React, { FC } from "react";
import { Button } from "../ui/button";
import { AiOutlineMenu } from "react-icons/ai";
import { FaHeadphonesSimple } from "react-icons/fa6";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { useBoardStore } from "@/store/boardStore";

type Props = {
  className?: string;
};

const HeaderApp: FC<Props> = (props: Props) => {
  const [file] = useBoardStore((state) => [state.file]);
  return (
    <header className={props.className}>
      <nav className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Button size={"icon"}>
            <AiOutlineMenu />
          </Button>
          <h2>{file.name}</h2>
        </div>
        <ul className="flex items-center gap-2">
          <li>
            <Button size={"icon"}>
              <FaHeadphonesSimple />
            </Button>
          </li>
          <li>
            <Button size={"icon"} className="rounded-full">
              <Avatar>
                <AvatarFallback>NR</AvatarFallback>
              </Avatar>
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderApp;