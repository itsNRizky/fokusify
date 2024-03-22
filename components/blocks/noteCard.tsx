"use client";

import React, { FC, useState } from "react";
import { Textarea } from "../ui/textarea";
import DraggableCard from "../ui/draggableCard";
import DeleteNoteButton from "./deleteNoteButton";
import { useBoardStore } from "@/store/boardStore";
import { type Note as NoteType } from "@prisma/client";

type Props = {
  className?: string;
  draggableId: string;
  note: NoteType;
};

const NoteCard: FC<Props> = ({ draggableId, note, className }) => {
  const [notes, setNotes] = useBoardStore((state) => [
    state.notes,
    state.setNotes,
  ]);
  const [value, setValue] = useState<string>(note.value!);
  const updateNoteHandler = async () => {
    if (value !== note.value) {
      // TODO: For autosave note
      // await Note.updateNote({ ...note, value: value });
      setNotes(
        notes.map((n: NoteType) => {
          if (n.id === note.id) {
            return { ...n, value: value };
          }
          return n;
        }),
      );
    }
  };
  return (
    <DraggableCard
      className={`${className} w-60`}
      key={note.id}
      draggableId={draggableId}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-bold">Note</h3>
        <div className="w-3/4"></div>
        <DeleteNoteButton noteId={note.id!} />
      </div>
      <Textarea
        value={value}
        onBlur={updateNoteHandler}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type your note here."
      />
    </DraggableCard>
  );
};

export default NoteCard;
