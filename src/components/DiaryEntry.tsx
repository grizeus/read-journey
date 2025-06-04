import { useDispatch } from "react-redux";
import { deleteReading } from "../redux/books/operations";
import toast from "react-hot-toast";
import css from "../DairyEntry/DairyEntry.module.css";
import Button from "../ui/Button/Button";
import {
  calculatePagesRead,
  calculatePercentage,
  calculateSpeed,
  calculateTotalMinutes,
} from "../lib/utils";
import clsx from "clsx";
import type { Book, Progress } from "./BookList";
import type { AppDispatch } from "../redux/store";

export default function DairyEntry({ entry, book }: { entry: Progress; book: Book }) {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = (readingId: string) => {
    dispatch(deleteReading({ bookId: book._id!, readingId }))
      .unwrap()
      .then(() => {
        toast.success("Entry was deleted from your dairy.");
      })
      .catch(() => {
        toast.error("Something went wrong. Please try again.");
      });
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
    <li className={css.diaryEntry}>
      <div className={css.percentageAndMinutesContainer}>
        <p className={css.percentage}>{percentage}%</p>
        <p className={css.minutes}>{totalMinutes} minutes</p>
      </div>
      <div className={css.statsAndBtnContainer}>
        <div className={css.stats}>
          <svg className={css.statsIcon}>
            <use href="/sprite.svg?v=3#icon-dairy-graph"></use>
          </svg>
          <p className={css.speed}>{speed} pages per hour</p>
        </div>
        <Button
          className={clsx(css.deleteDairyItemBtn, {
            [css.disabled]: isDisabled,
          })}
          type="button"
          variant="deleteDairyItem"
          onClick={() => handleDelete(entry._id)}>
          <svg width={14} height={14}>
            <use href="/sprite.svg?v=4#icon-trash"></use>
          </svg>
        </Button>
      </div>
    </li>
  );
}
