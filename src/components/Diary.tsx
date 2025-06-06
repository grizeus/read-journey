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

export default function Diary() {
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
      <ul className="scrollbar-thumb-rounded-2xl scrollbar-w-1 scrollbar scrollbar-track-transparent scrollbar-thumb-charcoal-black relative flex max-h-53 w-[calc(100%+26px)] flex-col-reverse gap-4 overflow-y-auto pr-6 md:max-h-63 md:gap-3.5 xl:max-h-93 xl:w-[calc(100%+30px)] xl:gap-5.5">
        {diaryData.map((entryGroup, index) => (
          <li
            key={entryGroup.date}
            className={`relative w-full before:absolute before:left-0 before:top-0 before:size-4 before:border-4 before:border-ebony before:bg-charcoal-black before:z-1 md:before:size-5 before:rounded-sm ${index === diaryData.length - 1 ? "pt-4 xl:pt-5 before:border-ivory before:top-4 xl:before:top-5" : ""}`}>
            <div className="absolute top-4 w-0.5 left-2 h-[calc(100%+16px)] bg-ebony z-0 md:h-[calc(100%+14px)] md:top-4 md:left-2.5 xl:top-5 xl:h-[calc(100%+22px)]"></div>
            <div className="flex justify-between pl-6 pr-5 mb-4 md:pl-7.5 md:pr-5.5 xl:mb-7">
              <h3 className="text-xs leading-4 tracking-wide md:text-base md:leading-4.5">{entryGroup.date}</h3>
              <p className="text-xs leading-4 text-tarnished md:text-sm md:leading-4.5">{entryGroup.totalPages} pages</p>
            </div>
            <ul className="flex flex-col justify-between ml-6 gap-4 md:ml-7.5 xl:gap-7">
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
