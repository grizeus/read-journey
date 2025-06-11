import { Link } from "react-router";
import sprite from "../assets/sprite.svg";
import Loader from "./Loader";
import { getRandomBooks } from "../lib/utils";
import { useSelector } from "react-redux";
import { selectAllBooks } from "../redux/books/selectors";
import { selectIsLoading } from "../redux/auth/selectors";
import RecommendedBooksItem from "./RecommendedBooksItem";

const RecommendedBooks = () => {
  const books = useSelector(selectAllBooks);
  const loading = useSelector(selectIsLoading);

  const recommendedBooks = getRandomBooks(books, 3);
  return (
    <div className="bg-ebony rounded-xl p-5 md:w-78 md:pr-10">
      <h3 className="mb-3.5 text-lg leading-none font-bold tracking-tight md:mb-5 md:text-xl">
        Recommended books
      </h3>

      {loading ? (
        <Loader className="h-40" />
      ) : (
        <>
          <ul className="mb-4 flex gap-5 md:mb-5 xl:mb-3.5">
            {recommendedBooks && recommendedBooks.length > 0 ? (
              recommendedBooks.map(book => (
                <li key={book._id}>
                  <RecommendedBooksItem
                    img={book!.imageUrl!}
                    bookTitle={book.title}
                    author={book.author}
                  />
                </li>
              ))
            ) : (
              <p className="text-tarnished">Books not found</p>
            )}
          </ul>

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
