import React, { FC } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

type Props = {
  isShown: boolean;
  status: string;
  handler: (value: boolean) => void;
  stopSound: () => void;
};

const FinishedPomodoroModal: FC<Props> = ({
  isShown,
  status,
  handler,
  stopSound,
}) => {
  const stopHandler = () => {
    handler(false);
    stopSound();
  };
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
            `Good luck kalian semuaa!! Pasti bisa lebih GEGE`
            <p>-Nama User </p>
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
