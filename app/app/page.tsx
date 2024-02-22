import React from "react";
import HeaderApp from "@/components/blocks/headerApp";
import FooterApp from "@/components/blocks/footerApp";
import Board from "@/components/blocks/board";
import { File, Note } from "@/lib/db/services";
import CreateFileForm from "@/components/blocks/createFileForm";

type Props = {};

const App = async (props: Props) => {
  const file = await File.getLatestFileByUserId("iniUserBaru");
  const AppBody = async () => {
    if (file.total > 0) {
      const notes = await Note.getNotesByFileId(file.res[0].$id!);
      return (
        <>
          <Board
            className="flex-1 overflow-hidden"
            fileProp={file.res[0]}
            notesProp={notes.res}
          />
          <FooterApp className="fixed bottom-0 w-screen" />
        </>
      );
    } else {
      return (
        <CreateFileForm className="flex min-h-screen flex-col items-center justify-center" />
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
