import type { Book, Progress } from "../../components/BookList";

export const shouldShowHeader = (pathname: string) => {
  const showPaths = ["/recommended", "/library"];
  const dynamicPaths = /^\/reading\/[^/]+$/;

  return showPaths.includes(pathname) || dynamicPaths.test(pathname);
};

export const getFirstLetter = (name: string) => {
  if (!name) return "";
  return name.charAt(0).toUpperCase();
};

export const getBooksPerPage = ({
  isMobile,
  isTablet,
}: {
  isMobile: boolean;
  isTablet: boolean;
}) => {
  if (isMobile) {
    return 2;
  } else if (isTablet) {
    return 8;
  } else {
    return 10;
  }
};

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

export const calculateTotalPagesRead = (entries: Progress[]) => {
  return entries.reduce((sum, entry) => sum + calculatePagesRead(entry), 0);
};
