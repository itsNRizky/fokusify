import React, { useState, useTransition } from "react";
import { Button } from "../ui/button";
import { IoMailOutline } from "react-icons/io5";
import { useThemeStore } from "@/store/themeStore";
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
import { sendMessage } from "@/actions/inbox";
import { toast } from "sonner";
import { useBoardStore } from "@/store/boardStore";

type Props = {};

const InboxForm = (props: Props) => {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [isShown, setIsShown] = useState(false);
  const [style] = useThemeStore((state) => [state.style]);
  const [user] = useBoardStore((state) => [state.user]);

  const submitHandler = async () => {
    if (message.length === 0) {
      return;
    }
    toast("Sending feedbacks...");
    startTransition(async () => {
      await sendMessage(user.email!, message);
    });
    setMessage("");
    setIsShown(false);
    toast("Feedback saved, thank you!");
  };
  return (
    <>
      <Button
        disabled={isPending}
        variant={style === "LIGHT" ? "secondary" : "default"}
        size={"icon"}
        onClick={() => setIsShown(!isShown)}
      >
        <IoMailOutline />
      </Button>
      <AlertDialog open={isShown}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Feedback for Fokusify</AlertDialogTitle>
            <AlertDialogDescription>
              If you have suggestions or any feedbacks, please let us know here.
              Thank you!
              <Textarea
                maxLength={100}
                className="mt-3"
                placeholder="Your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3">
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-700"
              onClick={() => setIsShown(false)}
            >
              Cancel
            </AlertDialogAction>
            <AlertDialogAction disabled={isPending} onClick={submitHandler}>
              Submit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default InboxForm;
