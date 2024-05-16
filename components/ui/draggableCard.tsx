"use client";
import { useDndMonitor, useDraggable } from "@dnd-kit/core";
import React, { FC, useState } from "react";
import { Coordinates } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader } from "../ui/card";
import { useThemeStore } from "@/store/themeStore";
import { useBoardStore } from "@/store/boardStore";
import { type Note as NoteType } from "@prisma/client";

type Props = {
  children: React.ReactNode;
  draggableId: string;
  className: string;
  initX: number;
  initY: number;
};

const DraggableCard: FC<Props> = ({
  children,
  draggableId,
  className,
  initX,
  initY,
}) => {
  const [style] = useThemeStore((state) => [state.style]);
  const [notes, setNotes, todolist, setTodolist] = useBoardStore((state) => [
    state.notes,
    state.setNotes,
    state.todolist,
    state.setTodolist,
  ]);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: draggableId,
  });

  const [{ x, y }, setCoordinates] = useState<Coordinates>({
    x: initX,
    y: initY,
  });
  const setAndSaveCoordinates = (delta: Coordinates) => {
    const onDragTodolist = todolist.id === draggableId;
    if (onDragTodolist) {
      setTodolist({
        ...todolist,
        xAxis: todolist.xAxis + delta.x,
        yAxis: todolist.yAxis + delta.y,
      });
    } else {
      setNotes(
        notes.map((note: NoteType) => {
          if (note.id === draggableId) {
            return {
              ...note,
              xAxis: note.xAxis + delta.x,
              yAxis: note.yAxis + delta.y,
            };
          }
          return note;
        }),
      );
    }
    setCoordinates(({ x, y }) => {
      return {
        x: x + delta.x,
        y: y + delta.y,
      };
    });
  };

  useDndMonitor({
    onDragEnd(event) {
      const { delta, active } = event;
      if (draggableId === active.id) {
        setAndSaveCoordinates(delta);
      }
    },
  });

  return (
    <Card
      className={`${className}`}
      style={
        {
          position: "absolute",
          zIndex: 10,
          top: y,
          left: x,
          transform: `translate(${transform?.x ?? 0}px, ${transform?.y ?? 0}px)`,
          backgroundColor: style === "LIGHT" ? "white" : "hsl(var(--primary))",
          borderColor: style === "LIGHT" ? "#E5E5E8" : "hsl(var(--primary))",
          opacity: 0.95,
        } as React.CSSProperties
      }
      ref={setNodeRef}
    >
      <CardContent className="">
        <div
          className="absolute flex h-8 w-3/4 cursor-grab justify-center px-3 active:cursor-grabbing"
          {...listeners}
          {...attributes}
        ></div>
        {children}
      </CardContent>
    </Card>
  );
};

export default DraggableCard;
