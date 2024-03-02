import React, { FC, useState } from "react";
import DraggableCard from "../ui/draggableCard";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import TodoitemCard from "./todoitemCard";
import { useBoardStore } from "@/store/boardStore";
import CreateTodoitemForm from "./createTodoitemForm";
import { Todolist } from "@/lib/db/services";

type Props = {
  todolist: TodolistType;
  todoitems: TodoitemType[];
  className?: string;
};

const TodolistCard: FC<Props> = ({ todolist, todoitems, className }) => {
  const [setTodolist] = useBoardStore((state) => [state.setTodolist]);

  const visibleHandler = async () => {
    await Todolist.setVisible({ ...todolist, visible: !todolist.visible });
    setTodolist({ ...todolist, visible: !todolist.visible });
  };

  return (
    <DraggableCard
      className={`${className} w-72 ${todolist.visible ? "" : "hidden"}`}
      draggableId={todolist.$id!}
      key={todolist.$id}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-bold">Todolist</h3>
        <div className="w-3/4"></div>
        <Button onClick={visibleHandler} size={"icon"} variant={"link"}>
          <IoCloseOutline className="h-6 w-6" />
        </Button>
      </div>
      <ul className="mb-3 flex flex-col gap-1">
        {todoitems.map((todoitem) => (
          <TodoitemCard key={todoitem.$id} todoitem={todoitem} />
        ))}
      </ul>
      <CreateTodoitemForm />
    </DraggableCard>
  );
};

export default TodolistCard;
