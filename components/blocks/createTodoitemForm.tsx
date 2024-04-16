import React, { FC, useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { FaPlus } from "react-icons/fa";

import { type Todoitem as TodoitemType } from "@prisma/client";
import { useBoardStore } from "@/store/boardStore";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { create, getUnusedByUserId, update } from "@/actions/todoitem";
import cuid from "cuid";
import { useThemeStore } from "@/store/themeStore";

type Props = {};

const CreateTodoitemForm: FC<Props> = () => {
  const [style] = useThemeStore((state) => [state.style]);
  const [user, todoitems, todolist, setTodoitems] = useBoardStore((state) => [
    state.user,
    state.todoitems,
    state.todolist,
    state.setTodoitems,
  ]);
  const [unusedTodoitems, setUnusedTodoItems] = useState<TodoitemType[]>([]);
  const [inputTodoItem, setInputTodoItem] = useState<string>("");
  const [isPending, setIsPending] = useState<boolean>(false);

  useEffect(() => {
    getUnusedByUserId(user.id).then((res) => {
      setUnusedTodoItems(res as TodoitemType[]);
    });
  }, [user.id]);

  const addTodoitemHandler = async () => {
    if (!inputTodoItem) {
      return;
    }

    setIsPending(true);
    // NOTE: const createdTodoitem = await create(inputTodoItem, todolist.id, user.id); NO SAVING TO POSTGRES, SAVE TO LOCAL STORAGE FIRST INSTEAD
    const createdTodoitem = {
      id: cuid(),
      todolistId: todolist.id,
      value: inputTodoItem,
      finished: false,
      userId: user.id,
    };
    setTodoitems([...todoitems, createdTodoitem as TodoitemType]);
    setIsPending(false);
  };

  const moveTodoitemHandler = async (id: string, todoitemValue: string) => {
    // TODO: Autosave moving todoitem to todolist
    // await update(id, todoitemValue, todolist.id, false, user.id);

    setTodoitems([
      ...todoitems,
      {
        id: id,
        todolistId: todolist.id,
        value: todoitemValue,
        finished: false,
        userId: user.id,
      },
    ]);

    setUnusedTodoItems(
      unusedTodoitems.filter((todoitem) => todoitem.id !== id),
    );
  };
  return (
    <form className="flex items-center justify-between gap-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="default" type="button" className="w-full">
            Add task
          </Button>
        </PopoverTrigger>
        <PopoverContent
          style={{
            backgroundColor:
              style === "LIGHT" ? "white" : "hsl(var(--primary))",
            color: style === "LIGHT" ? "black" : "white",
            borderColor: style === "LIGHT" ? "#E5E5E8" : "hsl(var(--primary))",
          }}
        >
          <Command>
            <div
              style={{
                backgroundColor: style === "LIGHT" ? "" : "hsl(var(--primary))",
              }}
              className="flex items-center"
            >
              <CommandInput
                style={{
                  color: style === "LIGHT" ? "black" : "white",
                }}
                name="todoitem"
                placeholder="Type new task..."
                value={inputTodoItem}
                onInput={(e) => setInputTodoItem(e.currentTarget.value)}
              />
              <Button
                variant="default"
                disabled={isPending}
                className=""
                onClick={addTodoitemHandler}
              >
                <FaPlus />
              </Button>
            </div>
            <CommandList>
              <CommandGroup
                style={{
                  backgroundColor:
                    style === "LIGHT" ? "" : "hsl(var(--primary))",
                }}
                heading="Or choose unfinished Tasks from previous"
              >
                {!unusedTodoitems && <CommandItem>No Task Found</CommandItem>}
                {unusedTodoitems &&
                  unusedTodoitems.map((todoitem) => (
                    <CommandItem className="cursor-pointer" key={todoitem.id}>
                      <div
                        onClick={() =>
                          moveTodoitemHandler(todoitem.id, todoitem.value)
                        }
                      >
                        {todoitem.value}
                      </div>
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </form>
  );
};

export default CreateTodoitemForm;
