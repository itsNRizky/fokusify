"use client";

import React from "react";
import { Separator } from "../ui/separator";
import AddNoteButton from "./addNoteButton";
import ToggleTodolistButton from "./toggleTodolistButton";
import TogglePomodoroButton from "./togglePomodoroButton";
import ToggleMessage from "./toggleMessage";
import ToggleYoutubeButton from "./toggleYoutubeButton";
import { useThemeStore } from "@/store/themeStore";

type Props = {};

const Toolbar = (props: Props) => {
  const [style] = useThemeStore((state) => [state.style]);
  return (
    <nav>
      <ul
        style={{
          backgroundColor:
            style === "LIGHT" ? "hsl(var(--secondary))" : "hsl(var(--primary))",
        }}
        className="flex h-10 items-center gap-3 rounded-md p-2 text-primary-foreground"
      >
        <li>
          <AddNoteButton />
        </li>
        <Separator orientation="vertical" />
        <li>
          <TogglePomodoroButton />
        </li>
        <Separator orientation="vertical" />
        <li>
          <ToggleTodolistButton />
        </li>
        <Separator orientation="vertical" />
        <li>
          <ToggleYoutubeButton />
        </li>
        <Separator orientation="vertical" />
        <li>
          <ToggleMessage />
        </li>
      </ul>
    </nav>
  );
};

export default Toolbar;
