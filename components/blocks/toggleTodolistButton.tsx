import React from "react";
import { Button } from "../ui/button";
import { useBoardStore } from "@/store/boardStore";
import { Todolist } from "@/lib/db/services";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { FaRegRectangleList } from "react-icons/fa6";

type Props = {};

const ToggleTodolistButton = (props: Props) => {
  const [todolist, setTodolist] = useBoardStore((state) => [
    state.todolist,
    state.setTodolist,
  ]);

  const toggleHandler = async () => {
    const newVisible = todolist.visible ? false : true;
    // TODO: Autosave set visible
    // await Todolist.setVisible({ ...todolist, visible: newVisible });
    setTodolist({ ...todolist, visible: newVisible });
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button onClick={toggleHandler} size={"icon"}>
          <FaRegRectangleList />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <p className="text-black">Todolist</p>
      </HoverCardContent>
    </HoverCard>
  );
};

export default ToggleTodolistButton;
