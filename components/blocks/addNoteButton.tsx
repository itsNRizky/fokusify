import React, { FC } from "react";
import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "../ui/hover-card";
import { FaRegNoteSticky } from "react-icons/fa6";
import { useBoardStore } from "@/store/boardStore";
import { Note } from "@/lib/db/services";

type Props = {};

const AddNoteButton: FC<Props> = (props: Props) => {
  const [file, notes, setNotes] = useBoardStore((state) => [
    state.file,
    state.notes,
    state.setNotes,
  ]);
  const addNoteHandler = async () => {
    const newNote: NoteType = {
      file: file.$id!,
      value: "",
    };
    const id = await Note.createNote(newNote);
    setNotes([...notes, { $id: id, file: file.$id!, value: "" }]);
  };
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button onClick={addNoteHandler} size={"icon"}>
          <FaRegNoteSticky />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <p className="text-black">Note</p>
      </HoverCardContent>
    </HoverCard>
  );
};

export default AddNoteButton;
