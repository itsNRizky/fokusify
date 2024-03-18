import React, { FC, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useBoardStore } from "@/store/boardStore";
import { getOneRandom } from "@/actions/message";

type Props = {
  isShown: boolean;
  status: string;
  handler: (value: boolean) => void;
  stopSound: () => void;
};

type MessageOwnerType = {
  value: string;
  user: string;
};

const FinishedPomodoroModal: FC<Props> = ({
  isShown,
  status,
  handler,
  stopSound,
}) => {
  const [user] = useBoardStore((state) => [state.user]);
  const [message, setMessage] = useState<MessageOwnerType>({
    user: "",
    value: "",
  });
  const stopHandler = () => {
    handler(false);
    stopSound();
  };

  useEffect(() => {
    getOneRandom(user.id).then((res) => {
      setMessage({
        user: res == null ? "" : res.file.user.name!,
        value: res == null ? "" : res.value,
      });
    });
  }, [status, user.id]);
  return (
    <AlertDialog open={isShown}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            You Have Done Your {status === "Work" ? "Break" : "Work"} Session!
          </AlertDialogTitle>
          <AlertDialogDescription>
            You did a good job on your session! Keep it up and you will achieve
            what you put on your mind! Here is a note from another user:
          </AlertDialogDescription>
          <AlertDialogDescription>
            {`"${message.value}"`}
            <p>-{message.user}</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={stopHandler}>
            Next to {status} Session
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FinishedPomodoroModal;
