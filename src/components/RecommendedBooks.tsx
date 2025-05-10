import { Link } from "react-router";
import sprite from "../assets/images/sprite.svg";
import Loader from "./Loader";
import BooksList from "./BookList";
import booksData from "../lib/utils/recBooks.json";

interface Book {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
  totalPages: number;
  recommend: boolean;
}

// Type assertion for the imported JSON data
const books: Book[] = booksData as Book[];

const RecommendedBooks = () => {
  const isFetching = false;
  return (
    <div className="bg-ebony rounded-xl p-5 md:w-[313px] md:pr-10">
      <h3 className="mb-5 text-lg leading-none font-bold tracking-tight md:mb-10 md:text-xl">
        Recommended books
      </h3>

      {isFetching ? (
        <Loader className="h-40" />
      ) : (
        <>
          <div className="mb-5 flex flex-col gap-5">
            {books && books.length > 0 ? (
              <BooksList books={books} size="small" maxElem={3} />
            ) : (
              <p className="text-tarnished">Books not found</p>
            )}
          </div>

          <Link className="flex items-center justify-between" to="/">
            <span className="text-tarnished text-sm leading-4.5 tracking-tight underline">
              Home
            </span>
            <div className="size-6 stroke-current">
              <svg className="h-full w-full" aria-label="arrow icon">
                <use href={`${sprite}#icon-arrow-right`} />
              </svg>
            </div>
          </Link>
        </>
      )}
    </div>
  );
};

export default RecommendedBooks;
