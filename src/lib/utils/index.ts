import type { Book, Progress, TimeLeft } from "../../types";



export const getRandomBooks = (books: Book[], count: number) => {
  const shuffled = [...books].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getBookStatus = (book: Book | null) => {
  const progress = book?.progress;
  let status;
  let isBookStarted;
  if (progress) {
    const lastItem = progress.length > 0 && progress[progress.length - 1];
    status = lastItem ? lastItem.status : null;
    isBookStarted =
      progress.length > 0 && progress[0].finishPage !== undefined
        ? progress[0].finishPage
        : false;
  }
  return { status, isBookStarted };
};

export const calculatePagesRead = (entry: Progress) => {
  const startPage = Number(entry.startPage);
  const finishPage = Number(entry.finishPage);
  return !isNaN(startPage) && !isNaN(finishPage)
    ? finishPage - startPage + 1
    : 0;
};

export const calculateTotalMinutes = (
  startReading: string,
  finishReading: string
) => {
  const start = new Date(startReading);
  const end = new Date(finishReading);
  const isValidTime = !isNaN(start.getTime()) && !isNaN(end.getTime());
  const totalSeconds = isValidTime
    ? Math.floor((end.getTime() - start.getTime()) / 1000)
    : 0;
  return Math.round(totalSeconds / 60);
};

export const calculateSpeed = (
  pagesRead: number,
  startReading: string,
  finishReading: string
) => {
  const start = new Date(startReading);
  const end = new Date(finishReading);
  const isValidTime = !isNaN(start.getTime()) && !isNaN(end.getTime());
  const totalSeconds = isValidTime
    ? Math.floor((end.getTime() - start.getTime()) / 1000)
    : 0;
  return totalSeconds > 0 ? Math.round((pagesRead / totalSeconds) * 3600) : 0;
};

export const calculatePercentage = (
  startPage: number,
  finishPage: number,
  totalPages: number
) => {
  const start = Number(startPage);
  const finish = Number(finishPage);
  const total = Number(totalPages);

  const isValid =
    !isNaN(start) &&
    !isNaN(finish) &&
    !isNaN(total) &&
    finish >= start &&
    total > 0;

  return isValid ? (((finish - start + 1) / total) * 100).toFixed(1) : "0.0";
};

export const getTimeLeft = (timeLeft: TimeLeft) => {
  const { hours, minutes } = timeLeft;
  let res: string = "";
  if (hours && hours > 0) {
    res += `${hours} ${hours === 1 ? "hour" : "hours"}`;
  }
  if (minutes && minutes > 0) {
    res += `${hours > 0 ? " and " : ""}${minutes} ${minutes === 1 ? "minute" : "minutes"} left`;
  } else if (res) {
    res += "left";
  }
  return res;
};
