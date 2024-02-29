"use client";
import React, { FC } from "react";
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
import { File, Todolist } from "@/lib/db/services";

const fileFormSchema = z.object({
  name: z
    .string({
      required_error: "Name for the file is required",
    })
    .min(1)
    .max(50),
});

export type FileFormType = z.infer<typeof fileFormSchema>;

type Props = {
  className: string;
  userId: string;
};

const CreateFileForm: FC<Props> = ({ className, userId }) => {
  const form = useForm<FileFormType>({
    resolver: zodResolver(fileFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const submitHandlerr = async (data: FileFormType) => {
    const fileId = await File.createFile({
      name: data.name,
      date: new Date().toISOString(),
      userId: userId,
      finished: false,
    });
    const todolistId = await Todolist.createTodolist({
      visible: false,
      fileId: fileId,
    });
    location.reload();
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
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateFileForm;
