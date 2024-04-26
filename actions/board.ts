"use server";
import {
  type Note as NoteType,
  type Todolist as TodolistType,
  type Todoitem as TodoitemType,
  type File as FileType,
} from "@prisma/client";

import { Todolist } from "@/lib/db/data/todolist";
import { Todoitem } from "@/lib/db/data/todoitem";
import { Note } from "@/lib/db/data/note";
import { File } from "@/lib/db/data/file";

// NOTE: There is something wrong I think with this save handling
// There are some notes when I logout, it didn't saved to the database

export const saveBoardToDatabaseHandler = async (
  notes: NoteType[],
  todolist: TodolistType,
  todoitems: TodoitemType[],
  file: FileType,
) => {
  const dbFile = await File.getById(file.id);
  if (!dbFile) {
    await File.create(file);
    await Todolist.create(todolist);
    await Note.createMany(notes);
    await Todoitem.createMany(todoitems);
  } else {
    if (notes) {
      const dbNotes = await Note.getByFileId(file.id);
      const dbNoteIds = dbNotes ? dbNotes.map((note) => note.id) : [];

      // If notes are not in the database, create them
      notes.forEach(async (note) => {
        if (!dbNoteIds.includes(note.id)) {
          // if the note is not in the database, create it
          await Note.create({
            id: note.id,
            value: note.value || "",
            fileId: file.id,
          });
        }
      });

      // If notes are in the database, update them
      if (dbNotes) {
        dbNotes.forEach(async (dbNote) => {
          const storeNote = notes.find((n) => n.id === dbNote.id);
          if (!storeNote) {
            // if the note is not in the store, delete it from the database
            await Note.delete(dbNote.id);
          } else if (storeNote.value !== dbNote.value) {
            // if the note is in the store but the value is different, update it
            await Note.update({ ...dbNote, value: storeNote.value });
          }
        });
      }
    }

    if (todolist) {
      const dbTodolist = await Todolist.getByFileId(file.id);
      if (dbTodolist && dbTodolist.visible !== todolist.visible) {
        // if the visibility is different, update it
        try {
          await Todolist.setVisibility(todolist.id, todolist.visible);
        } catch (err) {
          console.error(err);
        }
      }
    }

    if (todoitems) {
      const dbTodoItems = await Todoitem.getByTodolistId(todolist.id);
      const dbTodoItemIds = dbTodoItems
        ? dbTodoItems.map((todoitem) => todoitem.id)
        : [];

      // If todoitems are not in the database, create them
      todoitems.forEach(async (todoitem) => {
        if (!dbTodoItemIds.includes(todoitem.id)) {
          // if the todoitem is not in the database, create it
          await Todoitem.create({
            id: todoitem.id,
            value: todoitem.value || "",
            finished: todoitem.finished,
            userId: todoitem.userId,
            todolistId: todolist.id,
          });
        }
      });

      // If todoitems are in the database, update them
      if (dbTodoItems) {
        dbTodoItems.forEach(async (todoitem) => {
          const storeTodoItem = todoitems.find((t) => t.id === todoitem.id);
          if (!storeTodoItem) {
            // if the todoitem is not in the store, delete it from the database
            await Todoitem.delete(todoitem.id);
          } else if (storeTodoItem.finished !== todoitem.finished) {
            // if the todoitem is in the store but the value is different, update it
            await Todoitem.update({
              ...todoitem,
              finished: storeTodoItem.finished,
            });
          }
        });
      }
    }
  }
};
