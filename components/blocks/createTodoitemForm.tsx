import React, { FC, FormEvent, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { FaPlus } from "react-icons/fa";

import { Todoitem } from "@/lib/db/services";
import { useBoardStore } from "@/store/boardStore";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type Props = {};

const CreateTodoitemForm: FC<Props> = () => {
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
    Todoitem.getUnusedTodoitemsByUserId(user.$id!).then((res) => {
      setUnusedTodoItems(res.res);
    });
  }, [user.$id]);

  const addTodoitemHandler = async () => {
    if (!inputTodoItem) {
      return;
    }

    setIsPending(true);
    const $id = await Todoitem.createTodoitem({
      value: inputTodoItem,
      todolistId: todolist.$id!,
      finished: false,
      userId: user.$id!,
    });

    setTodoitems([
      ...todoitems,
      {
        $id: $id,
        todolistId: todolist.$id!,
        value: inputTodoItem,
        finished: false,
        userId: user.$id!,
      },
    ]);
    setIsPending(false);
  };

  const moveTodoitemHandler = async ($id: string, todoitemValue: string) => {
    await Todoitem.updateTodoitem({
      $id: $id,
      value: todoitemValue,
      todolistId: todolist.$id!,
      finished: false,
      userId: user.$id!,
    });

    setTodoitems([
      ...todoitems,
      {
        $id: $id,
        todolistId: todolist.$id!,
        value: todoitemValue,
        finished: false,
        userId: user.$id!,
      },
    ]);

    setUnusedTodoItems(
      unusedTodoitems.filter((todoitem) => todoitem.$id !== $id),
    );
  };
  return (
    <form className="flex items-center justify-between gap-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button type="button" className="w-full">
            Add task
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Command>
            <div className="flex items-center">
              <CommandInput
                name="todoitem"
                placeholder="Type new task..."
                value={inputTodoItem}
                onInput={(e) => setInputTodoItem(e.currentTarget.value)}
              />
              <Button
                disabled={isPending}
                className=""
                onClick={addTodoitemHandler}
              >
                <FaPlus />
              </Button>
            </div>
            <CommandList>
              <CommandGroup heading="Or choose unfinished Tasks">
                {unusedTodoitems.length === 0 && (
                  <CommandItem>No Task Found</CommandItem>
                )}
                {unusedTodoitems.map((todoitem) => (
                  <CommandItem className="cursor-pointer" key={todoitem.$id}>
                    <div
                      onClick={() =>
                        moveTodoitemHandler(todoitem.$id!, todoitem.value)
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
