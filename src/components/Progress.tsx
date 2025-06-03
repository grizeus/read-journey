import { useSelector } from "react-redux";
import css from "./Progress.module.css";
import { selectReadingBook } from "../redux/books/selectors";
import { getBookStatus } from "../lib/utils";
import Details from "../Details/Details";

export default function Progress() {
  const book = useSelector(selectReadingBook);
  const bookStatus = getBookStatus(book);

  return (
    <div className={css.progressContainer}>
      {bookStatus.status === null || !bookStatus.isBookStarted ? (
        <>
          <h2 className={css.progressTitle}>Progress</h2>
          <>
            <p>
              Here you will see when and how much you read. To record, click on
              the red button above.
            </p>
            <div>
              <picture>
                <source
                  srcSet="/images/star.png 1x, /images/star@2x.png 2x"
                  media="(min-width: 768px)"
                  width="50"
                  height="70"
                />

                <source
                  srcSet="/images/star-mob.png 1x, /images/star-mob@2x.png 2x"
                  media="(max-width: 767px)"
                  width="32"
                  height="32"
                />
                <img
                  src="/images/star-mob.png"
                  alt="golden star image"
                  width="32"
                  height="32"
                />
              </picture>
            </div>
          </>
        </>
      ) : (
        <Details />
      )}
    </div>
  );
}
