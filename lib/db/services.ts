import { Models, Query } from "appwrite";
import { ID, databases } from "./appwrite";

export const Profile = {
  getUserById: async ($id: string): Promise<ApprwriteResponse<UserType>> => {
    const response = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
      $id,
    );

    return {
      total: 1,
      res: [
        {
          $id: response.$id,
          name: response.name,
          image: response.image,
          accountId: response.accountId,
        },
      ],
    };
  },
};

export const File = {
  getLatestFileByUserId: async (
    $userId: string,
  ): Promise<ApprwriteResponse<FileType>> => {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_FILES_COLLECTION_ID!,
      [
        Query.equal("userId", $userId),
        Query.orderDesc("date"),
        Query.equal("finished", false),
        Query.limit(1),
      ],
    );
    return {
      total: response.total,
      res: response.documents.map((file) => ({
        $id: file.$id,
        name: file.name,
        date: file.date,
        userId: file.userId,
        finished: file.finished,
      })),
    };
  },

  createFile: async (file: FileType): Promise<string> => {
    const response = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_FILES_COLLECTION_ID!,
      ID.unique(),
      file,
    );
    return response.$id;
  },
};

export const Note = {
  getNotesByFileId: async (
    $fileId: string,
  ): Promise<ApprwriteResponse<NoteType>> => {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_NOTES_COLLECTION_ID!,
      [Query.equal("fileId", $fileId)],
    );
    return {
      total: response.total,
      res: response.documents.map((note) => ({
        $id: note.$id,
        fileId: note.fileId,
        value: note.value,
      })),
    };
  },

  createNote: async (note: NoteType): Promise<string> => {
    const response = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_NOTES_COLLECTION_ID!,
      ID.unique(),
      note,
    );
    return response.$id;
  },

  updateNote: async (note: NoteType): Promise<string> => {
    const response = await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_NOTES_COLLECTION_ID!,
      note.$id!,
      {
        value: note.value,
      },
    );
    return response.$id;
  },

  deleteNote: async ($id: string): Promise<void> => {
    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_NOTES_COLLECTION_ID!,
      $id,
    );
  },
};

export const Todolist = {
  getTodolistByFileId: async (
    $fileId: string,
  ): Promise<ApprwriteResponse<TodolistType>> => {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_TODOLISTS_COLLECTION_ID!,
      [Query.equal("fileId", $fileId)],
    );
    return {
      total: response.total,
      res: response.documents.map((todolist) => ({
        $id: todolist.$id,
        fileId: todolist.fileId,
        visible: todolist.visible,
      })),
    };
  },

  createTodolist: async (todolist: TodolistType): Promise<string> => {
    const response = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_TODOLISTS_COLLECTION_ID!,
      ID.unique(),
      todolist,
    );
    return response.$id;
  },

  updateTodolist: async (todolist: TodolistType): Promise<string> => {
    const response = await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_TODOLISTS_COLLECTION_ID!,
      todolist.$id!,
    );
    return response.$id;
  },

  setVisible: async (todolist: TodolistType): Promise<string> => {
    const response = await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_TODOLISTS_COLLECTION_ID!,
      todolist.$id!,
      {
        visible: todolist.visible,
      },
    );
    return response.$id;
  },
};

export const Todoitem = {
  getUnusedTodoitemsByUserId: async (
    userId: string,
  ): Promise<ApprwriteResponse<TodoitemType>> => {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_TODOITEMS_COLLECTION_ID!,
      [Query.equal("userId", userId), Query.isNull("todolistId")],
    );

    return {
      total: response.total,
      res: response.documents.map((todoitem) => ({
        $id: todoitem.$id,
        todolistId: todoitem.todolistId,
        value: todoitem.value,
        finished: todoitem.finished,
        userId: todoitem.userId,
      })),
    };
  },

  getTodoitemsByTodolistId: async (
    $todolistId: string,
  ): Promise<ApprwriteResponse<TodoitemType>> => {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_TODOITEMS_COLLECTION_ID!,
      [Query.equal("todolistId", $todolistId)],
    );
    return {
      total: response.total,
      res: response.documents.map((todoitem) => ({
        $id: todoitem.$id,
        todolistId: todoitem.todolistId,
        value: todoitem.value,
        finished: todoitem.finished,
        userId: todoitem.userId,
      })),
    };
  },

  createTodoitem: async (todoitem: TodoitemType): Promise<string> => {
    const response = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_TODOITEMS_COLLECTION_ID!,
      ID.unique(),
      todoitem,
    );
    return response.$id;
  },

  updateTodoitem: async (todoitem: TodoitemType): Promise<string> => {
    const response = await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_TODOITEMS_COLLECTION_ID!,
      todoitem.$id!,
      todoitem,
    );
    return response.$id;
  },

  deleteTodoitem: async ($id: string): Promise<void> => {
    const response = await databases.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_TODOITEMS_COLLECTION_ID!,
      $id,
    );
  },
};
