import { useDispatch } from "react-redux";
import { deleteReading } from "../redux/books/operations";
import {
  calculatePagesRead,
  calculatePercentage,
  calculateSpeed,
  calculateTotalMinutes,
} from "../lib/utils";
import type { Book, Progress } from "./BookList";
import type { AppDispatch } from "../redux/store";
import sprite from "../assets/sprite.svg";

export default function DairyEntry({ entry, book }: { entry: Progress; book: Book }) {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = (readingId: string) => {
    dispatch(deleteReading({ bookId: book._id!, readingId }));
  };

  const pagesRead = calculatePagesRead(entry);
  const totalMinutes = calculateTotalMinutes(
    entry.startReading,
    entry.finishReading
  );
  const speed = calculateSpeed(
    pagesRead,
    entry.startReading,
    entry.finishReading
  );
  const percentage = calculatePercentage(
    entry.startPage,
    entry.finishPage,
    book.totalPages
  );

  const isDisabled = book.status === "done";

  return (
    <li className="flex justify-between last-of-type:pb-4">
      <div className="flex flex-col gap-1 md:gap-2">
        <p className="text-sm leading-none md:text-xl">{percentage}%</p>
        <p className="text-2xs leading-3 text-tarnished md:text-xs md:leading-3.5">{totalMinutes} minutes</p>
      </div>
      <div className="flex gap-1.5 md:gap-2">
        <div className="flex flex-col gap-2 items-end">
          <svg className="w-10.5 h-4.5 md:w-15 md:h-6">
            <use href={`${sprite}?v=3#icon-dairy-graph`}></use>
          </svg>
          <p className="text-2xs leading-3 max-w-16 text-end text-tarnished md:text-xs md:leading-3.5 md:max-w-18.5">{speed} pages per hour</p>
        </div>
        <button
          disabled={isDisabled}
          className="disabled:opacity-40 disabled:pointer-events-none outline-transparent bg-transparent pt-0.5 stroke-ebony transition-colors duration-300 ease-in-out hover:stroke-red-500 focus:stroke-red-500 md:pt-1.5"
          type="button"
          onClick={() => handleDelete(entry._id!)}>
          <svg width={14} height={14}>
            <use href={`${sprite}#icon-trash`}></use>
          </svg>
        </button>
      </div>
    </li>
  );
}
