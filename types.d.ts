type AccountType = {
  $id?: string;
  email: string;
  password: string;
};

type UserType = {
  $id?: string;
  name: string;
  image?: string;
  accountId: string;
};

type FileType = {
  $id?: string;
  name: string;
  date: string;
  finished: boolean;
  userId: string;
};

type NoteType = {
  $id?: string;
  value: string;
  fileId: string;
};

type TodolistType = {
  $id?: string;
  visible: boolean;
  fileId: string;
};

type TodoitemType = {
  $id?: string;
  value: string;
  finished: boolean;
  todolistId: string;
  userId: string;
};

type ApprwriteResponse<T> = {
  total: number;
  res: T[];
};
