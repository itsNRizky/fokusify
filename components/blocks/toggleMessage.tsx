import React, { useEffect } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Button } from "../ui/button";
import CreateMessageModal from "./createMessageModal";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import { useBoardStore } from "@/store/boardStore";
import { getByFileId } from "@/actions/message";
import { useThemeStore } from "@/store/themeStore";

type Props = {};

const ToggleMessage = (props: Props) => {
  const [file] = useBoardStore((state) => [state.file]);
  const [isShown, setIsShown] = React.useState<boolean>(false);
  const [isDisabled, setIsDisabled] = React.useState<boolean>(true);
  const [style] = useThemeStore((state) => [state.style]);

  const modalHandler = () => {
    setIsShown(!isShown);
  };

  useEffect(() => {
    const getMessages = async () => {
      const response = await getByFileId(file.id);
      return response;
    };
    getMessages().then((res) => {
      if (res) {
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }
    });
  }, [isShown, file.id]);
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant={style === "LIGHT" ? "secondary" : "default"}
          disabled={isDisabled}
          onClick={modalHandler}
          size={"icon"}
        >
          <HiOutlineChatBubbleBottomCenterText />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <p className="text-black">Message Other</p>
      </HoverCardContent>
      <CreateMessageModal setIsShown={modalHandler} isShown={isShown} />
    </HoverCard>
  );
};

export default ToggleMessage;
