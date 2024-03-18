import React, { FC, useState, useTransition } from "react";
import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "../ui/hover-card";
import { FaRegNoteSticky } from "react-icons/fa6";
import { useBoardStore } from "@/store/boardStore";
import { Note } from "@/lib/db/data/note";
import { type Note as NoteType } from "@prisma/client";
import { create } from "@/actions/note";

type Props = {};

const AddNoteButton: FC<Props> = (props: Props) => {
  const [isPending, startTransition] = useTransition();
  const [file, notes, setNotes] = useBoardStore((state) => [
    state.file,
    state.notes,
    state.setNotes,
  ]);
  const addNoteHandler = async () => {
    startTransition(async () => {
      const createdNote = await create(file.id, "");
      setNotes([...notes, createdNote as NoteType]);
    });
  };
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button disabled={isPending} onClick={addNoteHandler} size={"icon"}>
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
