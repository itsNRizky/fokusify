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
    getUnusedByUserId(user.id).then((res) => {
      setUnusedTodoItems(res as TodoitemType[]);
    });
  }, [user.id]);

  const addTodoitemHandler = async () => {
    if (!inputTodoItem) {
      return;
    }

    setIsPending(true);
    const createdTodoitem = await create(inputTodoItem, todolist.id, user.id);

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
              <CommandGroup heading="Or choose unfinished Tasks from previous">
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
