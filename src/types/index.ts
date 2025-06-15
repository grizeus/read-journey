// Book types
type ProgressStatus = "active" | "inactive";
type BookStatus = "unread" | "in-progress" | "done" | "all";
export interface Progress {
  _id?: string;
  startReading: string;
  finishReading: string;
  startPage: number;
  finishPage: number;
  status: ProgressStatus;
}

export interface Book {
  _id?: string;
  title: string;
  author: string;
  imageUrl?: string;
  totalPages: number;
  recommend?: boolean;
  progress?: Progress[];
  status?: BookStatus;
  owner?: string;
  timeLeftToRead?: TimeLeft;
}

export interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

export const Option = {
  unread: "Unread",
  "in-progress": "In progress",
  done: "Done",
  all: "All books",
} as const;

export type OptionKey = keyof typeof Option;
export type OptionValue = (typeof Option)[OptionKey];