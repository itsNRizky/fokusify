import React from "react";
import { AiOutlineYoutube } from "react-icons/ai";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Button } from "../ui/button";
import { useBoardStore } from "@/store/boardStore";
import { useThemeStore } from "@/store/themeStore";

type Props = {};

const ToggleYoutubeButton = (props: Props) => {
  const [style] = useThemeStore((state) => [state.style]);
  const [showYoutube, setShowYoutube] = useBoardStore((state) => [
    state.showYoutube,
    state.setShowYoutube,
  ]);
  const visibleHandler = () => {
    const newVisible = showYoutube ? false : true;
    setShowYoutube(newVisible);
  };
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant={style === "LIGHT" ? "secondary" : "default"}
          onClick={visibleHandler}
          size={"icon"}
        >
          <AiOutlineYoutube />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <p className="text-black">Youtube</p>
      </HoverCardContent>
    </HoverCard>
  );
};

export default ToggleYoutubeButton;
