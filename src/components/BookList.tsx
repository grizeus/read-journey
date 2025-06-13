//NOTE: need only interfaces, not component yet
type ProgressStatus = "active" | "inactive";
type BookStatus = "unread" | "in-progress" | "done" | "all";

export interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

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