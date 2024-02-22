"use client";
import { useDndMonitor, useDraggable } from "@dnd-kit/core";
import React, { FC, useState } from "react";
import { Coordinates } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader } from "../ui/card";
import { FaGripLines } from "react-icons/fa";

type Props = {
  children: React.ReactNode;
  draggableId: string;
  className: string;
};

const DraggableCard: FC<Props> = ({ children, draggableId, className }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: draggableId,
  });
  const [{ x, y }, setCoordinates] = useState<Coordinates>({ x: 0, y: 0 });
  useDndMonitor({
    onDragEnd(event) {
      const { delta, active } = event;
      if (draggableId === active.id) {
        setCoordinates(({ x, y }) => {
          return {
            x: x + delta.x,
            y: y + delta.y,
          };
        });
      }
    },
  });

  return (
    <Card
      className={`${className}`}
      style={
        {
          position: "relative",
          zIndex: 10,
          top: y,
          left: x,
          transform: `translate(${transform?.x ?? 0}px, ${transform?.y ?? 0}px)`,
        } as React.CSSProperties
      }
      ref={setNodeRef}
    >
      <div
        className="flex w-full cursor-grab justify-center px-3 active:cursor-grabbing"
        {...listeners}
        {...attributes}
      >
        <FaGripLines className="h-5 w-5" />
      </div>
      <CardContent className="">{children}</CardContent>
    </Card>
  );
};

export default DraggableCard;
