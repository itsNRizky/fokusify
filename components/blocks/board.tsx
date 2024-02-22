"use client";
import React, { FC, useEffect } from "react";
import {
  DndContext,
  MouseSensor,
  useSensor,
  useSensors,
  PointerActivationConstraint,
  TouchSensor,
} from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import TesCard from "./tesCard";
import { useBoardStore } from "@/store/boardStore";
import NoteCard from "./noteCard";

type Props = {
  className?: string;
  activationConstraint?: PointerActivationConstraint;
  fileProp: FileType;
  notesProp: NoteType[];
};

const Board: FC<Props> = ({
  activationConstraint,
  className,
  fileProp,
  notesProp,
}) => {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint,
  });
  const touchSensor = useSensor(TouchSensor, { activationConstraint });
  const sensors = useSensors(mouseSensor, touchSensor);

  const [file, notes, getLatestBoardDataByUserId, setFile, setNotes] =
    useBoardStore((state) => [
      state.file,
      state.notes,
      state.getLatestBoardDataByUserId,
      state.setFile,
      state.setNotes,
    ]);

  useEffect(() => {
    try {
      setFile(fileProp);
      setNotes(notesProp);
    } catch (err) {
      console.error(err);
    }
  }, [setFile, setNotes, fileProp, notesProp]);

  return (
    <DndContext sensors={sensors} modifiers={[restrictToParentElement]}>
      <div className={`${className}`}>
        {notes.length > 0 &&
          notes.map((note) => (
            <NoteCard
              key={note.$id}
              className="w-1/5"
              draggableId={note.$id!}
              note={note}
            />
          ))}
      </div>
    </DndContext>
  );
};

export default Board;
