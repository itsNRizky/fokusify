import React, { useState } from "react";
import { Button } from "../ui/button";
import { AiOutlineMenu } from "react-icons/ai";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { getByUser } from "@/actions/file";
import { type File as FileType } from "@prisma/client";
import { useBoardStore } from "@/store/boardStore";
import MenuBoard from "./menuBoard";

type Props = {
  style: string;
};

const MenuButton: React.FC<Props> = ({ style }) => {
  const [user] = useBoardStore((state) => [state.user]);
  const [files, setFiles] = useState<FileType[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const getAllFiles = async () => {
    const response = await getByUser(user.id);
    setFiles(response!);
  };
  const openHandler = () => {
    if (!isOpen) {
      getAllFiles();
    }
    setIsOpen((prevOpen) => !prevOpen);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={openHandler}>
      <DropdownMenuTrigger asChild>
        <Button
          variant={style === "LIGHT" ? "secondary" : "default"}
          size={"icon"}
        >
          <AiOutlineMenu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <MenuBoard files={files} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuButton;
