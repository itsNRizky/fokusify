import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Note, Todoitem, Todolist } from "./db/services";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const saveBoardToDatabaseHandler = async (
  notes: NoteType[],
  todolist: TodolistType,
  todoitems: TodoitemType[],
  file: FileType,
) => {
  if (notes) {
    const dbNotes = await Note.getNotesByFileId(file.$id!);
    dbNotes.res.forEach(async (dbNote) => {
      const storeNote = notes.find((n) => n.$id === dbNote.$id);
      if (!storeNote) {
        // if the note is not in the store, delete it from the database
        await Note.deleteNote(dbNote.$id!);
      } else if (storeNote.value !== dbNote.value) {
        // if the note is in the store but the value is different, update it
        await Note.updateNote({ ...dbNote, value: storeNote.value });
      }
    });
  }

  if (todolist) {
    const dbTodolist = await Todolist.getTodolistByFileId(file.$id!);
    if (dbTodolist.res[0] && dbTodolist.res[0].visible !== todolist.visible) {
      // if the visibility is different, update it
      await Todolist.setVisible({
        ...dbTodolist.res[0],
        visible: todolist.visible,
      });
    }
  }

  if (todoitems) {
    const dbTodoItems = await Todoitem.getTodoitemsByTodolistId(todolist.$id!);
    dbTodoItems.res.forEach(async (todoitem) => {
      const storeTodoItem = todoitems.find((t) => t.$id === todoitem.$id);
      if (!storeTodoItem) {
        // if the todoitem is not in the store, delete it from the database
        await Todoitem.deleteTodoitem(todoitem.$id!);
      } else if (storeTodoItem.finished !== todoitem.finished) {
        // if the todoitem is in the store but the value is different, update it
        await Todoitem.updateTodoitem({
          ...todoitem,
          finished: storeTodoItem.finished,
        });
      }
    });
  }
};
