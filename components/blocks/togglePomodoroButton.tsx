import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Button } from "../ui/button";
import { GoStopwatch } from "react-icons/go";
import { useBoardStore } from "@/store/boardStore";

type Props = {};

const TogglePomodoroButton = (props: Props) => {
  const [showPomodoro, setShowPomodoro] = useBoardStore((state) => [
    state.showPomodoro,
    state.setShowPomodoro,
  ]);

  const toggleHandler = async () => {
    const newVisible = showPomodoro ? false : true;
    setShowPomodoro(newVisible);
  };
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button onClick={toggleHandler} size={"icon"}>
          <GoStopwatch />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <p className="text-black">Pomodoro/Flowmodoro</p>
      </HoverCardContent>
    </HoverCard>
  );
};

export default TogglePomodoroButton;
