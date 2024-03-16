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
  isOpen: boolean;
  setIsOpen: () => void;
  callback: () => void;
};

const SaveFileWarningModal: FC<Props> = ({ callback, isOpen, setIsOpen }) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Send message to random user</AlertDialogTitle>
          <AlertDialogDescription>
            <p className="mt-1 text-right">
              Your work is not saved yet, are you sure want to close the app?
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-3">
          <AlertDialogAction
            className="bg-slate-500 hover:bg-slate-700"
            onClick={setIsOpen}
          >
            Cancel
          </AlertDialogAction>
          <AlertDialogAction className="bg-red-500 hover:bg-red-700">
            Discard and Close
          </AlertDialogAction>
          <AlertDialogAction onClick={callback}>
            Save and Close
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SaveFileWarningModal;
