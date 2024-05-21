"use client";
import React, { FC, useEffect, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import cuid from "cuid";
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
import { useBoardStore } from "@/store/boardStore";
import { useRouter } from "next/navigation";
import { useThemeStore } from "@/store/themeStore";
import { randomInteger } from "@/lib/utils";
import { type File as FileType } from "@prisma/client";

type Props = {
  className: string;
  userId: string;
};

const CreateFileForm: FC<Props> = ({ className, userId }) => {
  const router = useRouter();
  const [style] = useThemeStore((state) => [state.style]);
  const [setFile, setNotes, setTodolist, setTodoitems] = useBoardStore(
    (state) => [
      state.setFile,
      state.setNotes,
      state.setTodolist,
      state.setTodoitems,
    ],
  );

  // To make sure when creating new Board, the store is cleared
  useEffect(() => {
    setFile({
      id: "",
      name: "",
      date: new Date(),
      active: true,
      userId: "",
    });
    setNotes([]);
    setTodolist({
      id: "",
      visible: false,
      fileId: "",
      xAxis: 0,
      yAxis: 0,
    });
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
      const createdFile: FileType = {
        id: cuid(),
        name: data.name,
        date: new Date(),
        active: true,
        userId: userId,
      };

      const createdTodolist = {
        id: cuid(),
        visible: false,
        fileId: createdFile.id,
        xAxis: randomInteger(0, 50),
        yAxis: randomInteger(0, 50),
      };

      setFile(createdFile);
      setTodolist(createdTodolist);
      // NOTE: create(userId, data); CANCEL SAVING DATA TO POSTGREE, SAVE IN LOCAL STORAGE FIRST INSTEAD
    });
    router.refresh();
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
                  <Input placeholder="Input your board name" {...field} />
                </FormControl>
                <FormDescription>
                  Board would be the the place to store your notes, todolist,
                  etc...
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant={style === "LIGHT" ? "secondary" : "default"}
            disabled={isPending}
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateFileForm;
