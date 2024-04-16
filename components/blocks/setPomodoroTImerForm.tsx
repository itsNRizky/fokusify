import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { IoSettingsOutline } from "react-icons/io5";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { LuTimerReset } from "react-icons/lu";
import { useThemeStore } from "@/store/themeStore";

type Props = {
  workTimer: number;
  breakTimer: number;
  setWorkTImer: React.Dispatch<React.SetStateAction<number>>;
  setBreakTimer: React.Dispatch<React.SetStateAction<number>>;
};

const SetPomodoroTImerForm: React.FC<Props> = ({
  workTimer,
  breakTimer,
  setBreakTimer,
  setWorkTImer,
}) => {
  const [style] = useThemeStore((state) => [state.style]);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={"icon"} variant={"link"}>
          <IoSettingsOutline
            style={{ color: style === "LIGHT" ? "black" : "white" }}
            className="h-4 w-4"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-4">
        <div className="grid grid-cols-1 items-center gap-2">
          <Label htmlFor="work">Work TImer (Minutes)</Label>
          <Input
            value={workTimer}
            onChange={(e) => setWorkTImer(Number(e.target.value))}
            id="work"
            type="number"
            defaultValue="100%"
            className="col-span-2 h-8"
          />
        </div>
        <div className="grid grid-cols-1 items-center gap-2">
          <Label htmlFor="break">Break TImer (Minutes)</Label>
          <Input
            id="work"
            defaultValue="300px"
            className="col-span-2 h-8"
            value={breakTimer}
            onChange={(e) => setBreakTimer(Number(e.target.value))}
          />
        </div>
        <p className="flex items-center gap-2">
          Click{" "}
          <i>
            <LuTimerReset />
          </i>{" "}
          to save update
        </p>
      </PopoverContent>
    </Popover>
  );
};

export default SetPomodoroTImerForm;
