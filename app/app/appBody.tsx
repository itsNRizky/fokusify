"use client";

import Board from "@/components/blocks/board";
import CreateFileForm from "@/components/blocks/createFileForm";
import FooterApp from "@/components/blocks/footerApp";
import { Toaster } from "@/components/ui/sonner";
import React, { useEffect } from "react";
import type {
  User as UserType,
  File as FileType,
  Note as NoteType,
  Todolist as TodolistType,
  Todoitem as TodoitemType,
} from "@prisma/client";
import { useBoardStore } from "@/store/boardStore";

type Props = {
  userProp: UserType;
  fileProp: FileType;
  notesProp: NoteType[];
  todolistProp: TodolistType;
  todoitemsProp: TodoitemType[];
};

const AppBody: React.FC<Props> = ({
  userProp,
  fileProp,
  notesProp,
  todolistProp,
  todoitemsProp,
}) => {
  const [file, notes, todolist, todoitems, isHydrated] = useBoardStore(
    (state) => [
      state.file,
      state.notes,
      state.todolist,
      state.todoitems,
      state._isHydrated,
    ],
  );

  if (!isHydrated) {
    return (
      <p className="flex min-h-screen flex-col items-center justify-center">
        Loading...
      </p>
    );
  }

  if (file.id === "" && !fileProp) {
    return (
      <>
        <CreateFileForm
          className="flex min-h-screen flex-col items-center justify-center"
          userId={userProp.id}
        />
      </>
    );
  } else if (file.id !== "") {
    return (
      <>
        <Board
          className="min-h-screen w-screen flex-1"
          fileProp={file}
          notesProp={notes!}
          todolistProp={todolist!}
          todoitemsProp={todoitems!}
          userProp={userProp}
        />
        <Toaster />
        <FooterApp className="fixed bottom-0 w-screen" />
      </>
    );
  } else if (file.id === "" && fileProp) {
    return (
      <>
        <Board
          className="min-h-screen w-screen flex-1"
          fileProp={fileProp}
          notesProp={notesProp}
          todolistProp={todolistProp}
          todoitemsProp={todoitemsProp}
          userProp={userProp}
        />
        <Toaster />
        <FooterApp className="fixed bottom-0 w-screen" />
      </>
    );
  }
  return (
    <h1 className="flex min-h-screen flex-col items-center justify-center">
      Something went wrong...
    </h1>
  );
};

export default AppBody;
