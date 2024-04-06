"use client";
import React, { FC, useTransition } from "react";
import { Button } from "../ui/button";
// import BottomSheet from "../ui/bottomSheet";
import Toolbar from "./toolbar";
import { toast } from "sonner";
import { saveBoardToDatabaseHandler } from "@/actions/board";
import { useBoardStore } from "@/store/boardStore";
import { finishedFile } from "@/actions/file";
import { useRouter } from "next/navigation";

type Props = {
  className?: string;
};

const FooterApp: FC<Props> = (props: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [file, notes, todolist, todoitems, clear] = useBoardStore((state) => [
    state.file,
    state.notes,
    state.todolist,
    state.todoitems,
    state.clear,
  ]);
  const finishedHandler = async () => {
    if (confirm("Are you sure you want to finish?")) {
      startTransition(async () => {
        toast("Saving your progress...");
        await saveBoardToDatabaseHandler(notes, todolist, todoitems, file);
        toast("Your progress has been saved");
        toast("Finishing your progress...");
        await finishedFile(file.id);
        clear();
        router.refresh();
      });
    }
  };
  return (
    <footer className={props.className}>
      <nav>
        <ul className="flex items-center justify-between p-4">
          <li className="hidden w-1/3 justify-start sm:flex">
            <h6 className="text-xs">Fokusify ver 0.26</h6>
          </li>
          <li className="flex flex-1 justify-center">
            <Toolbar />
          </li>
          <li className="flex w-1/3 justify-end">
            <Button disabled={isPending} onClick={finishedHandler}>
              Finish
            </Button>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default FooterApp;
