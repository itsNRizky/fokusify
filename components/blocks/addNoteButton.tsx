import React, { FC, useTransition } from "react";
import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "../ui/hover-card";
import { FaRegNoteSticky } from "react-icons/fa6";
import { useBoardStore } from "@/store/boardStore";
import { type Note as NoteType } from "@prisma/client";
import cuid from "cuid";
import { useThemeStore } from "@/store/themeStore";
import { randomInteger } from "@/lib/utils";

type Props = {};

const AddNoteButton: FC<Props> = (props: Props) => {
  const [isPending, startTransition] = useTransition();
  const [style] = useThemeStore((state) => [state.style]);
  const [file, notes, setNotes] = useBoardStore((state) => [
    state.file,
    state.notes,
    state.setNotes,
  ]);
  const addNoteHandler = () => {
    startTransition(() => {
      // NOTE: const createdNote = await create(file.id, ""); SAVING TO POSTGRES IS CANCELED, SAVE TO LOCAL STORAGE FIRST INSTEAD
      const createdNote: NoteType = {
        id: cuid(),
        value: "",
        fileId: file.id,
        xAxis: randomInteger(0, 50),
        yAxis: randomInteger(0, 50),
      };
      setNotes([...notes, createdNote as NoteType]);
    });
  };
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant={style === "LIGHT" ? "secondary" : "default"}
          disabled={isPending}
          onClick={addNoteHandler}
          size={"icon"}
        >
          <FaRegNoteSticky />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <p>Note</p>
      </HoverCardContent>
    </HoverCard>
  );
};

export default AddNoteButton;
