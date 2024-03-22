import React from "react";
import HeaderApp from "@/components/blocks/headerApp";
import FooterApp from "@/components/blocks/footerApp";
import Board from "@/components/blocks/board";
import { File } from "@/lib/db/data/file";
import { type User as UserType } from "@prisma/client";
import { Note } from "@/lib/db/data/note";
import { Todolist } from "@/lib/db/data/todolist";
import { Todoitem } from "@/lib/db/data/todoitem";
import CreateFileForm from "@/components/blocks/createFileForm";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/auth";

type Props = {};

const App = async (props: Props) => {
  const session = await auth();
  const user: UserType = {
    id: session?.user.id!,
    name: session?.user.name!,
    email: session?.user.email!,
    image: session?.user.image!,
    subscription: session?.user.subscription!,
    emailVerified: null,
    password: null,
  };
  const file = await File.getByUserLatestActive(user.id);
  const AppBody = async () => {
    if (file) {
      const notes = await Note.getByFileId(file.id);
      const todolist = await Todolist.getByFileId(file.id);
      const todoitems = await Todoitem.getByTodolistId(todolist?.id!);
      return (
        <>
          <Board
            className="min-h-screen w-screen flex-1"
            fileProp={file}
            notesProp={notes!}
            todolistProp={todolist!}
            todoitemsProp={todoitems!}
            // TODO: Login session for userId
            userProp={user}
          />
          <Toaster />
          <FooterApp className="fixed bottom-0 w-screen" />
        </>
      );
    } else {
      return (
        <CreateFileForm
          // TODO: Login session for userId
          userId={user.id}
          className="flex min-h-screen flex-col items-center justify-center"
        />
      );
    }
  };

  return (
    <main className="flex min-h-screen flex-col justify-between">
      <HeaderApp userProp={user} className="fixed top-0 w-screen" />
      <AppBody />
    </main>
  );
};

export default App;
