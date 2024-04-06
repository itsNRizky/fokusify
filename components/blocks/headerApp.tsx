"use client";

import React, { FC } from "react";
import { Button } from "../ui/button";
import { AiOutlineMenu } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { useBoardStore } from "@/store/boardStore";
import { type User as UserType } from "@prisma/client";
import ProfileLogout from "./profileLogout";

type Props = {
  className?: string;
  userProp: UserType;
};

const HeaderApp: FC<Props> = ({ className, userProp }) => {
  const [file] = useBoardStore((state) => [state.file]);

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
            <Button size={"icon"}>
              <IoSettingsOutline />
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
