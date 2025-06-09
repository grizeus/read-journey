import { useSelector } from "react-redux";
import { selectReadingBook } from "../redux/books/selectors";
import DiaryEntry from "./DiaryEntry";
import type { Progress } from "./BookList";

interface DiaryGroup {
  [date: string]: {
    date: string;
    totalPages: number;
    entries: Progress[];
  };
}

const Diary = () => {
  const book = useSelector(selectReadingBook);
  const progress = book?.progress?.filter(
    entry =>
      entry.startReading &&
      entry.finishReading &&
      entry.startPage != null &&
      entry.finishPage != null
  );

  const groupedByDate =
    progress?.reduce<DiaryGroup>((acc, entry) => {
      const date = new Date(entry.finishReading).toLocaleDateString("uk-UA");
      const pagesRead = entry.finishPage - entry.startPage + 1;
      if (!acc[date]) {
        acc[date] = {
          date,
          totalPages: 0,
          entries: [],
        };
      }
      acc[date].totalPages += pagesRead;
      acc[date].entries.push(entry);
      return acc;
    }, {} as DiaryGroup) || {};

  const diaryData = Object.values(groupedByDate).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="relative overflow-visible">
      <ul className="diary-list-scroll relative flex h-53 min-w-74 flex-col-reverse gap-4 overflow-y-scroll pr-6 md:h-63 md:w-[calc(100%+30px)] md:gap-3.5 xl:h-93 xl:w-[calc(100%+30px)] xl:gap-5.5">
        {diaryData.map((entryGroup, index) => (
          <li
            key={entryGroup.date}
            className={`before:border-tarnished before:bg-charcoal-black relative w-full before:absolute before:top-0 before:left-0 before:z-1 before:size-4 before:rounded-sm before:border-4 md:before:size-5 ${index === diaryData.length - 1 ? "before:border-ivory pt-4 before:top-4 xl:pt-5 xl:before:top-5" : ""}`}>
            <div className="bg-charcoal-black absolute top-4 left-2 z-0 h-[calc(100%+16px)] w-0.5 md:top-4 md:left-2.5 md:h-[calc(100%+14px)] xl:top-5 xl:h-[calc(100%+22px)]"></div>
            <div className="mb-4 flex justify-between pr-5 pl-6 md:pr-5.5 md:pl-7.5 xl:mb-7">
              <h3 className="text-xs leading-4 tracking-wide md:text-base md:leading-4.5">
                {entryGroup.date}
              </h3>
              <p className="text-tarnished text-xs leading-4 md:text-sm md:leading-4.5">
                {entryGroup.totalPages} pages
              </p>
            </div>
            <ul className="ml-6 flex flex-col justify-between gap-4 md:ml-7.5 xl:gap-7">
              {entryGroup.entries
                .sort(
                  (a, b) =>
                    new Date(b.finishReading).getTime() -
                    new Date(a.finishReading).getTime()
                )
                .map(entry => (
                  <DiaryEntry key={entry._id} entry={entry} book={book!} />
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Diary;
