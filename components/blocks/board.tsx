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
import { useBoardStore } from "@/store/boardStore";
import NoteCard from "./noteCard";
import TodolistCard from "./todolistCard";

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
      </div>
    </DndContext>
  );
};

export default Board;
