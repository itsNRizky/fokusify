"use client";
import React, { FC, useEffect, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { fileFormSchema } from "@/schemas";
import { create } from "@/actions/file";
import { useBoardStore } from "@/store/boardStore";

type Props = {
  className: string;
  userId: string;
};

const CreateFileForm: FC<Props> = ({ className, userId }) => {
  const [setFile, setNotes, setTodolist, setTodoitems] = useBoardStore(
    (state) => [
      state.setFile,
      state.setNotes,
      state.setTodolist,
      state.setTodoitems,
    ],
  );
  useEffect(() => {
    setFile({
      id: "",
      name: "",
      date: new Date(),
      finished: false,
      userId: "",
    });
    setNotes([]);
    setTodolist({ id: "", visible: false, fileId: "" });
    setTodoitems([]);
  }, [setFile, setNotes, setTodolist, setTodoitems]);

  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof fileFormSchema>>({
    resolver: zodResolver(fileFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const submitHandlerr = async (data: z.infer<typeof fileFormSchema>) => {
    startTransition(() => {
      create(userId, data);
    });
  };

  // TODO: Create a button to add date inside the name input

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => submitHandlerr(data))}
        className={className}
      >
        <div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Input your file name" {...field} />
                </FormControl>
                <FormDescription>
                  File would be the the place to store your productivity items
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateFileForm;
