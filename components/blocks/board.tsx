"use client";
import React, { FC, useEffect, useState } from "react";
import {
  DndContext,
  MouseSensor,
  useSensor,
  useSensors,
  PointerActivationConstraint,
  TouchSensor,
} from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { useBoardStore } from "@/store/boardStore";
import NoteCard from "./noteCard";
import TodolistCard from "./todolistCard";
import PomodoroCard from "./pomodoroCard";
import YoutubeCard from "./youtubeCard";
import { Note, Todoitem, Todolist } from "@/lib/db/services";
import { toast } from "sonner";
import { saveBoardToDatabaseHandler } from "@/lib/utils";

type Props = {
  className?: string;
  activationConstraint?: PointerActivationConstraint;
  fileProp: FileType;
  notesProp: NoteType[];
  todolistProp: TodolistType;
  todoitemsProp: TodoitemType[];
  userProp: UserType;
};

const Board: FC<Props> = ({
  activationConstraint,
  className,
  fileProp,
  notesProp,
  todolistProp,
  todoitemsProp,
  userProp,
}) => {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint,
  });
  const touchSensor = useSensor(TouchSensor, { activationConstraint });
  const sensors = useSensors(mouseSensor, touchSensor);
  const [isOpenWarning, setIsOpenWarning] = useState(false);

  const [
    file,
    notes,
    todolist,
    todoitems,
    setFile,
    setNotes,
    setTodolist,
    setTodoitems,
    setUser,
  ] = useBoardStore((state) => [
    state.file,
    state.notes,
    state.todolist,
    state.todoitems,
    state.setFile,
    state.setNotes,
    state.setTodolist,
    state.setTodoitems,
    state.setUser,
  ]);

  useEffect(() => {
    function handleBeforeUnload(event: BeforeUnloadEvent) {
      event.preventDefault();
      return (event.returnValue = "");
    }

    window.addEventListener("beforeunload", handleBeforeUnload, {
      capture: true,
    });
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload, {
        capture: true,
      });
    };
  });

  useEffect(() => {
    try {
      setFile(fileProp);
      setNotes(notesProp);
      setTodolist(todolistProp);
      setTodoitems(todoitemsProp);
      setUser(userProp);
    } catch (err) {
      console.error(err);
    }
  }, [
    setFile,
    setNotes,
    setTodolist,
    setTodoitems,
    setUser,
    fileProp,
    notesProp,
    todolistProp,
    todoitemsProp,
    userProp,
  ]);

  useKeyPress("s", async () => {
    toast("Saving...");
    await saveBoardToDatabaseHandler(notes, todolist, todoitems, file);
    toast("Data saved");
  });

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
        <TodolistCard todoitems={todoitems} todolist={todolist} />
        <PomodoroCard />
        <YoutubeCard />
      </div>
    </DndContext>
  );
};

function useKeyPress(key: string, callback: () => void) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === key && (event.ctrlKey || event.metaKey)) {
        event.preventDefault(); // Prevent the default browser behavior
        callback();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [key, callback]);
}

export default Board;
