import React, { FC } from "react";
import DraggableCard from "../ui/draggableCard";
import { Button } from "../ui/button";
import { IoRemoveOutline } from "react-icons/io5";
import TodoitemCard from "./todoitemCard";
import { useBoardStore } from "@/store/boardStore";
import CreateTodoitemForm from "./createTodoitemForm";
import { type Todoitem as TodoitemType } from "@prisma/client";
import { type Todolist as TodolistType } from "@prisma/client";
import { useThemeStore } from "@/store/themeStore";

type Props = {
  todolist: TodolistType;
  todoitems: TodoitemType[];
  className?: string;
};

const TodolistCard: FC<Props> = ({ todolist, todoitems, className }) => {
  const [setTodolist] = useBoardStore((state) => [state.setTodolist]);
  const [style] = useThemeStore((state) => [state.style]);

  const visibleHandler = async () => {
    // TODO: Autosave set visible
    // await Todolist.setVisible({ ...todolist, visible: !todolist.visible });
    setTodolist({ ...todolist, visible: !todolist.visible });
  };

  return (
    <DraggableCard
      className={`${className} w-72 ${todolist.visible ? "" : "hidden"} max-h-[80vh] overflow-y-auto`}
      draggableId={todolist.id}
      initX={todolist.xAxis}
      initY={todolist.yAxis}
      key={todolist.id}
    >
      <div className="flex items-center justify-between">
        <h3
          style={{
            color: style === "LIGHT" ? "black" : "white",
          }}
          className="font-bold"
        >
          Todolist
        </h3>
        <div className="w-3/4"></div>
        <Button onClick={visibleHandler} size={"icon"} variant={"link"}>
          <IoRemoveOutline
            style={{ color: style === "LIGHT" ? "black" : "white" }}
            className="h-6 w-6"
          />
        </Button>
      </div>
      <ul className="mb-3 flex flex-col gap-1">
        {todoitems.map((todoitem) => (
          <TodoitemCard key={todoitem.id} todoitem={todoitem} />
        ))}
      </ul>
      <CreateTodoitemForm />
    </DraggableCard>
  );
};

export default TodolistCard;
