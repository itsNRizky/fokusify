"use client";

import React, { useState, useTransition } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { sendMessage } from "@/actions/inbox";

type Props = {};

const ContactMe = (props: Props) => {
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const submitHandler = async () => {
    startTransition(async () => {
      await sendMessage(email, message);
    });
    setEmail("");
    setMessage("");
  };
  return (
    <section className="mx-auto flex w-4/5 flex-col items-center space-y-5 md:px-6">
      <h2 className="text-center md:text-xl md:font-semibold">
        If you have suggestion about the app, or anything actually. You can say
        it here
      </h2>
      <form className="flex w-full flex-col items-end space-y-3 sm:w-4/5 lg:w-1/2">
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          required
          type="email"
          placeholder="Your email"
        />
        <Textarea
          name="message"
          required
          placeholder="Anything in your mind :)"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        ></Textarea>
        <Button
          disabled={isPending}
          onClick={submitHandler}
          type="submit"
          size={"lg"}
        >
          {isPending ? "Sending..." : "Send"}
        </Button>
      </form>
    </section>
  );
};

export default ContactMe;
