import { useSelector } from "react-redux";
import { selectReadingBook } from "../redux/books/selectors";
import sprite from "../assets/sprite.svg";
import { getBookStatus } from "../lib/utils";
import defaultBook from "../assets/images/book-cover.png";
const ReadingMain = () => {
  const book = useSelector(selectReadingBook);
  const bookStatus = getBookStatus(book);
  console.log(bookStatus);
  return (
    <div className="bg-charcoal-black w-full min-w-84 rounded-4xl px-5 py-10 md:px-10">
      <h2 className="myReadingTitle mb-10 text-xl leading-none md:mb-8 md:text-[28px] md:leading-8 md:tracking-wide xl:mb-11">
        My Reading
      </h2>
      <div className="myReadingItemContainer flex flex-col items-center justify-center gap-2.5 md:gap-6">
        <div className="bookImgWrapper h-52 w-34 overflow-hidden rounded-lg md:h-64 md:w-42 xl:h-85 xl:w-56">
          <img
            className="bookImg h-full w-full"
            src={book?.imageUrl || defaultBook}
            alt={book?.title || "book image"}
          />
        </div>
        <div className="discriptionAndBtnWrapper flex flex-col items-center justify-center gap-5 md:gap-4 xl:gap-6">
          <div className="titleAndAuthorWrapper w-36.5 md:w-79">
            <h3 className="bookTitle mb-1 w-full text-center text-sm md:mb-1 md:text-xl md:leading-none">
              {book?.title}
            </h3>
            <p className="bookAuthor text-2xs text-tarnished w-full text-center leading-3 md:text-sm md:leading-4.5">
              {book?.author}
            </p>
          </div>
          {bookStatus?.status === "active" ? (
            <svg className="readingIcon size-10 md:size-12.5">
              <use href={`${sprite}#icon-btn-off`}></use>
            </svg>
          ) : (
            <svg className="readingIcon size-10 md:size-12.5">
              <use href={`${sprite}#icon-btn-on`}></use>
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadingMain;
