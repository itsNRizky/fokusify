import React, { FC, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { FaTrash } from "react-icons/fa6";
import { useBoardStore } from "@/store/boardStore";
import { type Todoitem as TodoitemType } from "@prisma/client";

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
    setTodoitems(todoitems.filter((item) => item.id !== todoitem.id));
  };

  const setFinishedHandler = async () => {
    setChecked(!checked);
    setTodoitems(
      todoitems.map((item) => {
        if (item.id === todoitem.id) {
          return {
            ...item,
            finished: !item.finished,
          };
        } else {
          return item;
        }
      }),
    );

    // const finishedTodoitem: TodoitemType = {
    //   ...todoitem,
    //   finished: !todoitem.finished,
    // };

    // NOTE: NO SAVING TO POSTGRES, SAVE TO LOCAL STORAGE FIRST INSTEAD
    // await update(
    //   finishedTodoitem.id,
    //   finishedTodoitem.value,
    //   finishedTodoitem.todolistId!,
    //   finishedTodoitem.finished,
    //   finishedTodoitem.userId,
    // );
  };
  return (
    <li key={todoitem.id} className="flex items-center justify-between gap-3">
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
