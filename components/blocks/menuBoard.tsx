import React, { useTransition } from "react";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "../ui/dropdown-menu";
import { Plus } from "lucide-react";
import { HiOutlineViewBoards } from "react-icons/hi";
import { type File as FileType } from "@prisma/client";
import { toast } from "sonner";
import { saveBoardToDatabaseHandler } from "@/actions/board";
import { useBoardStore } from "@/store/boardStore";
import { activateFile } from "@/actions/file";

type Props = {
  files: FileType[];
};

const MenuBoard: React.FC<Props> = ({ files }) => {
  const [isPending, startTransition] = useTransition();
  const [notes, todolist, todoitems, file] = useBoardStore((state) => [
    state.notes,
    state.todolist,
    state.todoitems,
    state.file,
  ]);

  const saveAndClearBoardHandler = () => {
    startTransition(async () => {
      toast("Saving your progress first...");
      const oldFile: FileType = {
        ...file,
        active: false,
      };
      await saveBoardToDatabaseHandler(notes, todolist, todoitems, oldFile);
      toast("Your progress has been saved");
    });
    useBoardStore.persist.clearStorage();
  };

  const newBoardHandler = () => {
    saveAndClearBoardHandler();
    toast("Creating new board...");
    window.location.reload();
  };

  const changeBoardHandler = async (fileId: string) => {
    saveAndClearBoardHandler();
    toast("Changing board...");
    await activateFile(fileId);
    window.location.reload();
  };

  const fileList = (files: FileType[]) => {
    if (files.length === 0) {
      return <p>No files found</p>;
    }
    return files.map((file) => (
      <DropdownMenuItem
        className="cursor-pointer"
        onClick={() => changeBoardHandler(file.id)}
        key={file.id}
      >
        <span>{file.name}</span>
      </DropdownMenuItem>
    ));
  };

  return (
    <>
      <DropdownMenuLabel>Board</DropdownMenuLabel>
      <DropdownMenuGroup>
        <DropdownMenuItem onClick={newBoardHandler}>
          <Plus className="mr-2 h-4 w-4" />
          <span>New Board</span>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <HiOutlineViewBoards className="mr-2 h-4 w-4" />
            <span>Board List</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>{fileList(files)}</DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
    </>
  );
};

export default MenuBoard;
