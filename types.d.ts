type FileType = {
  $id?: string;
  name: string;
  date: string;
  user: string;
  finished: boolean;
};

type NoteType = {
  $id?: string;
  file: string;
  value: string;
};

type ApprwriteResponse<T> = {
  total: number;
  res: T[];
};
