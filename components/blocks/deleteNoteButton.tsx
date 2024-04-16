import React, { FC } from "react";
import { Button } from "../ui/button";
import { IoCloseOutline } from "react-icons/io5";
import { useBoardStore } from "@/store/boardStore";

type Props = {
  noteId: string;
  style: "LIGHT" | "DARK";
};

const DeleteNoteButton: FC<Props> = ({ noteId, style }) => {
  const [notes, setNotes] = useBoardStore((state) => [
    state.notes,
    state.setNotes,
  ]);
  const deleteNoteHandler = async () => {
    if (confirm("Are you sure you want to delete this note?")) {
      // TODO: For autosave delete note
      // await Note.deleteNote(noteId);
      setNotes(notes.filter((note) => note.id !== noteId));
    }
  };
  return (
    <Button onClick={deleteNoteHandler} size={"icon"} variant={"link"}>
      <IoCloseOutline
        style={{ color: style === "LIGHT" ? "black" : "white" }}
        className="h-6 w-6"
      />
    </Button>
  );
};

export default DeleteNoteButton;
