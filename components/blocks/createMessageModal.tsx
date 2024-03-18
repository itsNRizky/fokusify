import React, { FC, useState, useTransition } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Textarea } from "../ui/textarea";
import { useBoardStore } from "@/store/boardStore";
import { toast } from "sonner";
import { create } from "@/actions/message";

type Props = {
  isShown: boolean;
  setIsShown: () => void;
};

const CreateMessageModal: FC<Props> = ({ isShown, setIsShown }) => {
  const [file] = useBoardStore((state) => [state.file]);
  const [isPending, setTransition] = useTransition();
  const [count, setCount] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  const typeMessage = (msg: string) => {
    setCount(msg.length);
    setMessage(msg);
  };

  const submitHandler = async () => {
    if (message.length === 0) {
      return;
    }
    setTransition(async () => {
      await create(file.id, message);
    });
    setIsShown();
    toast("Message Saved!", {
      description:
        "Your message has been saved! Other user will get this message randomly. You can send message once per file",
    });
  };
  return (
    <AlertDialog open={isShown}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Send message to random user</AlertDialogTitle>
          <AlertDialogDescription>
            You can put any message to random user. It can be anything you
            want!. Encourage others, help them, or even look for acquaintances
            lol.
            <Textarea
              maxLength={100}
              className="mt-3"
              placeholder="Your message"
              value={message}
              onChange={(e) => typeMessage(e.target.value)}
            />
            <p className="mt-1 text-right">{count}/100</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-3">
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-700"
            onClick={setIsShown}
          >
            Cancel
          </AlertDialogAction>
          <AlertDialogAction disabled={isPending} onClick={submitHandler}>
            Submit
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateMessageModal;
