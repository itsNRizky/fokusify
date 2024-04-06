import React from "react";
import HeaderApp from "@/components/blocks/headerApp";
import { File } from "@/lib/db/data/file";
import { type User as UserType } from "@prisma/client";
import { Note } from "@/lib/db/data/note";
import { Todolist } from "@/lib/db/data/todolist";
import { Todoitem } from "@/lib/db/data/todoitem";
import { auth } from "@/auth";
import AppBody from "./appBody";

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
  let notes, todolist, todoitems;
  if (file) {
    notes = await Note.getByFileId(file?.id!);
    todolist = await Todolist.getByFileId(file?.id!);
    todoitems = await Todoitem.getByTodolistId(todolist?.id!);
  }

  return (
    <main className="flex min-h-screen flex-col justify-between">
      <HeaderApp userProp={user} className="fixed top-0 w-screen" />
      <AppBody
        userProp={user}
        fileProp={file!}
        notesProp={notes!}
        todolistProp={todolist!}
        todoitemsProp={todoitems!}
      />
    </main>
  );
};

export default App;
