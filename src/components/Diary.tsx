import { useSelector } from "react-redux";
import css from "./Dairy.module.css";
import { selectReadingBook } from "../../redux/books/selectors";
import DairyEntry from "../DairyEntry/DairyEntry";

export default function Dairy() {
  const book = useSelector(selectReadingBook);
  const progress = book.progress?.filter(
    entry =>
      entry.startReading &&
      entry.finishReading &&
      entry.startPage != null &&
      entry.finishPage != null
  );

  const groupedByDate = progress.reduce((acc, entry) => {
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
  }, {});

  const diaryData = Object.values(groupedByDate).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className={css.scrollWrapper}>
      <ul className={css.dairyList}>
        {diaryData.map((entryGroup, index) => (
          <li
            key={entryGroup.date}
            className={`${css.dairyItem} ${
              index === diaryData.length - 1 ? css.firstDairyItem : ""
            }`}>
            <div className={css.line}></div>
            <div className={css.dateAndPagesContainer}>
              <h3 className={css.date}>{entryGroup.date}</h3>
              <p className={css.pages}>{entryGroup.totalPages} pages</p>
            </div>
            <ul className={css.dairyEntriesList}>
              {entryGroup.entries
                .sort(
                  (a, b) =>
                    new Date(b.finishReading).getTime() -
                    new Date(a.finishReading).getTime()
                )
                .map(entry => (
                  <DairyEntry key={entry._id} entry={entry} book={book} />
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
