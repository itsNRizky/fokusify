"use client";

import React from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "../ui/hover-card";
import { FaRegNoteSticky, FaRegRectangleList } from "react-icons/fa6";
import { GoStopwatch } from "react-icons/go";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import AddNoteButton from "./addNoteButton";
import ToggleTodolistButton from "./toggleTodolistButton";

type Props = {};

const Toolbar = (props: Props) => {
  return (
    <nav>
      <ul className="flex h-10 items-center gap-3 rounded-md bg-primary p-2 text-primary-foreground">
        <li>
          <AddNoteButton />
        </li>
        <Separator orientation="vertical" />
        <li>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button size={"icon"}>
                <GoStopwatch />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <p className="text-black">Pomodoro/Flowmodoro</p>
            </HoverCardContent>
          </HoverCard>
        </li>
        <Separator orientation="vertical" />
        <li>
          <ToggleTodolistButton />
        </li>
        <Separator orientation="vertical" />
        <li>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button size={"icon"}>
                <HiOutlineChatBubbleBottomCenterText />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <p className="text-black">Message</p>
            </HoverCardContent>
          </HoverCard>
        </li>
      </ul>
    </nav>
  );
};

export default Toolbar;
