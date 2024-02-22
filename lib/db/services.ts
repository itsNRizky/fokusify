import { Models, Query } from "appwrite";
import { ID, databases } from "./appwrite";

export const File = {
  getFiles: async (): Promise<Models.Document[]> => {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_FILES_COLLECTION_ID!,
    );
    return response.documents;
  },

  getFileById: async ($id: string): Promise<Models.Document> => {
    const response = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_FILES_COLLECTION_ID!,
      $id,
    );
    return response;
  },

  getFilesByUserId: async ($userId: string): Promise<Models.Document[]> => {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_FILES_COLLECTION_ID!,
      [Query.equal("user", $userId)],
    );
    return response.documents;
  },

  getLatestFileByUserId: async (
    $userId: string,
  ): Promise<ApprwriteResponse<FileType>> => {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_FILES_COLLECTION_ID!,
      [
        Query.equal("user", $userId),
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
        user: file.user,
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
  getNotes: async (): Promise<Models.Document[]> => {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_NOTES_COLLECTION_ID!,
    );
    return response.documents;
  },

  getNotesByFileId: async (
    $fileId: string,
  ): Promise<ApprwriteResponse<NoteType>> => {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_NOTES_COLLECTION_ID!,
      [Query.equal("file", $fileId)],
    );
    return {
      total: response.total,
      res: response.documents.map((note) => ({
        $id: note.$id,
        file: note.file,
        value: note.value,
      })),
    };
  },

  getNoteById: async ($id: string): Promise<Models.Document> => {
    const response = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_NOTES_COLLECTION_ID!,
      $id,
    );
    return response;
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
