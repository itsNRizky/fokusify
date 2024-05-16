import React, { useEffect, useState } from "react";
import DraggableCard from "../ui/draggableCard";
import { Button } from "../ui/button";

import {
  IoRemoveOutline,
  IoPlayOutline,
  IoPauseOutline,
} from "react-icons/io5";
import { LuTimerReset } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "../ui/select";
import { useBoardStore } from "@/store/boardStore";
import FinishedPomodoroModal from "./finishedPomodoroModal";
import useSound from "use-sound";
import SetPomodoroTImerForm from "./setPomodoroTImerForm";
import { update } from "@/actions/todoitem";
import { useThemeStore } from "@/store/themeStore";

type Props = {};

const PomodoroCard = (props: Props) => {
  const [style] = useThemeStore((state) => [state.style]);
  const [todoitems, showPomodoro, setTodoitems, setShowPomodoro] =
    useBoardStore((state) => [
      state.todoitems,
      state.showPomodoro,
      state.setTodoitems,
      state.setShowPomodoro,
    ]);

  const [selectedItem, setSelectedItem] = React.useState<string>();
  const [isRunning, setIsRunning] = React.useState<boolean>(false);
  const [isPaused, setIsPaused] = React.useState<boolean>(false);
  const [workTime, setWorkTime] = React.useState<number>(25);
  const [breakTime, setBreakTime] = React.useState<number>(5);
  const [timeLeft, setTimeLeft] = React.useState<number>(workTime * 60);
  const [status, setStatus] = React.useState<string>("Work");
  const [isFinishedSession, setIsFinishedSession] = useState<boolean>(false);
  const [play, { stop }] = useSound("/sounds/kriing.mp3", {
    volume: 2,
    loop: true,
    playbackRate: 1.5,
  });
  const [playClick] = useSound("/sounds/clockOff.mp3");

  const startTimer = () => {
    playClick();
    setIsRunning(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    playClick();
    setIsPaused(true);
    setIsRunning(false);
  };

  const resetTimer = () => {
    playClick();
    setIsRunning(false);
    setIsPaused(false);
    setStatus("Work");
    setTimeLeft(workTime * 60);
  };

  const finishTask = async () => {
    playClick();
    if (!selectedItem) {
      return;
    }

    const theItem = todoitems.find((item) => item.id === selectedItem);
    // TODO: Autosave set finished todoitem
    await update(
      theItem?.id!,
      theItem?.value!,
      theItem?.todolistId!,
      true,
      theItem?.userId!,
    );
    // await Todoitem.updateTodoitem({
    //   ...theItem!,
    //   finished: true,
    // });
    setTodoitems(
      todoitems.map((todoitem) => {
        if (todoitem.id === selectedItem) {
          return {
            ...todoitem,
            finished: true,
          };
        } else {
          return todoitem;
        }
      }),
    );
    setIsRunning(false);
    setIsPaused(false);
  };

  const updateTime = (interval: NodeJS.Timeout) => {
    setTimeLeft((prevTimeLeft) => {
      if (prevTimeLeft === 0) {
        clearInterval(interval);
        setIsRunning(false);
        play();
        if (status === "Work") {
          setStatus("Break");
          setIsFinishedSession(true);
          return breakTime * 60;
        } else {
          setStatus("Work");
          setIsFinishedSession(true);
          return workTime * 60;
        }
      }
      return prevTimeLeft - 1;
    });
  };

  const visibleHandler = () => {
    setShowPomodoro(!showPomodoro);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        updateTime(interval);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  return (
    <DraggableCard
      initX={0}
      initY={0}
      className={`w-72 px-4 ${showPomodoro ? "" : "hidden"}`}
      draggableId="timer"
      key={"timer"}
    >
      <div className="-mb-3 flex items-center justify-between">
        <p
          style={{ color: style === "LIGHT" ? "black" : "white" }}
          className="text-sm"
        >
          Current Task
        </p>
        <div className="flex items-center gap-2">
          <SetPomodoroTImerForm
            breakTimer={breakTime}
            workTimer={workTime}
            setWorkTImer={setWorkTime}
            setBreakTimer={setBreakTime}
          />
          <Button onClick={visibleHandler} size={"icon"} variant={"link"}>
            <IoRemoveOutline
              style={{ color: style === "LIGHT" ? "" : "white" }}
              className="h-6 w-6"
            />
          </Button>
        </div>
      </div>
      <div>
        <Select
          disabled={isRunning || isPaused}
          value={selectedItem}
          onValueChange={setSelectedItem}
        >
          <SelectTrigger
            style={{
              backgroundColor: style === "LIGHT" ? "" : "hsl(var(--primary))",
              color: style === "LIGHT" ? "black" : "white",
            }}
          >
            <SelectValue className="font-bold" placeholder="Select a task" />
          </SelectTrigger>
          <SelectContent
            style={{
              backgroundColor: style === "LIGHT" ? "" : "hsl(var(--primary))",
              color: style === "LIGHT" ? "black" : "white",
              borderColor:
                style === "LIGHT" ? "#E5E5E8" : "hsl(var(--primary))",
            }}
          >
            {todoitems.map((todoitem) => {
              if (!todoitem.finished) {
                return (
                  <SelectItem key={todoitem.id} value={todoitem.id}>
                    {todoitem.value}
                  </SelectItem>
                );
              }
            })}
            <SelectItem disabled value={"s"}>
              No tasks, Create at Todolist
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="mb-4 flex h-40 w-40 items-center justify-center rounded-full border-8 border-gray-300">
          <div className="text-center">
            <p
              style={{ color: style === "LIGHT" ? "black" : "white" }}
              className="text-4xl font-semibold"
            >
              {minutes}:{seconds < 10 ? "0" : ""}
              {seconds}
            </p>
            <p className="text-sm text-gray-500">{status}</p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3">
          <Button
            onClick={resetTimer}
            variant={style === "LIGHT" ? "secondary" : "default"}
            size={"icon"}
          >
            <LuTimerReset />
          </Button>
          {isRunning ? (
            <Button
              variant={style === "LIGHT" ? "default" : "secondary"}
              onClick={pauseTimer}
              size={"icon"}
            >
              <IoPauseOutline />
            </Button>
          ) : (
            <Button
              variant={style === "LIGHT" ? "default" : "secondary"}
              onClick={startTimer}
              size={"icon"}
            >
              <IoPlayOutline />
            </Button>
          )}
          <Button
            onClick={finishTask}
            variant={style === "LIGHT" ? "secondary" : "default"}
            size={"icon"}
          >
            <FaCheck />
          </Button>
        </div>
      </div>
      <FinishedPomodoroModal
        status={status}
        isShown={isFinishedSession}
        handler={setIsFinishedSession}
        stopSound={stop}
      />
    </DraggableCard>
  );
};

export default PomodoroCard;
