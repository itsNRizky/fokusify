import React, { FC, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { FaTrash } from "react-icons/fa6";
import { useBoardStore } from "@/store/boardStore";
import { Todoitem } from "@/lib/db/services";

type Props = {
  todoitem: TodoitemType;
};

const TodoitemCard: FC<Props> = ({ todoitem }) => {
  const [todoitems, setTodoitems] = useBoardStore((state) => [
    state.todoitems,
    state.setTodoitems,
  ]);
  const [checked, setChecked] = useState<boolean>(false);

  const removeTodoitemHandler = async () => {
    // TODO: Autosave delete todoitem
    // await Todoitem.deleteTodoitem(todoitem.$id!);
    setTodoitems(todoitems.filter((item) => item.$id !== todoitem.$id));
  };

  const setFinishedHandler = async () => {
    setChecked(!checked);
    const finishedTodoitem: TodoitemType = {
      ...todoitem,
      finished: !todoitem.finished,
    };
    setTodoitems(
      todoitems.map((item) => {
        if (item.$id === todoitem.$id) {
          return {
            ...item,
            finished: !item.finished,
          };
        } else {
          return item;
        }
      }),
    );
    // TODO: Autosave set finished
    // await Todoitem.updateTodoitem(finishedTodoitem);
  };
  return (
    <li key={todoitem.$id} className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <Checkbox onClick={setFinishedHandler} checked={todoitem.finished} />
        <span className={`${todoitem.finished ? "line-through" : ""}`}>
          {todoitem.value}
        </span>
      </div>
      <Button onClick={removeTodoitemHandler} variant={"ghost"}>
        <FaTrash />
      </Button>
    </li>
  );
};

export default TodoitemCard;
