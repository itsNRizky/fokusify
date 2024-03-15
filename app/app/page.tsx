import React from "react";
import HeaderApp from "@/components/blocks/headerApp";
import FooterApp from "@/components/blocks/footerApp";
import Board from "@/components/blocks/board";
import { File, Note, Todoitem, Todolist } from "@/lib/db/services";
import CreateFileForm from "@/components/blocks/createFileForm";
import { Toaster } from "@/components/ui/sonner";

type Props = {};

const App = async (props: Props) => {
  // TODO: Login session for userId
  const user: UserType = {
    accountId: "testing",
    name: "Novian Rizky",
    $id: "65e0479349d3585f9cfd",
  };
  const file = await File.getLatestFileByUserId(user.$id!);
  const AppBody = async () => {
    if (file.total > 0) {
      const notes = await Note.getNotesByFileId(file.res[0].$id!);
      const todolist = await Todolist.getTodolistByFileId(file.res[0].$id!);
      const todoitems = await Todoitem.getTodoitemsByTodolistId(
        todolist.res[0].$id!,
      );
      return (
        <>
          <Board
            className="flex-1 overflow-hidden"
            fileProp={file.res[0]}
            notesProp={notes.res}
            todolistProp={todolist.res[0]}
            todoitemsProp={todoitems.res}
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
          userId={"65e0479349d3585f9cfd"}
          className="flex min-h-screen flex-col items-center justify-center"
        />
      );
    }
  };

  return (
    <main className="flex min-h-screen flex-col justify-between">
      <HeaderApp className="fixed top-0 w-screen" />
      <AppBody />
    </main>
  );
};

export default App;
