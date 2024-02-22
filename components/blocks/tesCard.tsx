"use client";
import React, { FC } from "react";
import Draggable from "../ui/draggableCard";

type Props = {
  draggableId: string;
  value: string;
};

const TesCard: FC<Props> = ({ draggableId, value }) => {
  return (
    <Draggable className="w-32 bg-yellow-300" draggableId={draggableId}>
      <h1 className="">{value}</h1>
    </Draggable>
  );
};

export default TesCard;
