import clsx from "clsx";
import BookCard from "./BookCard";

export interface Book {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
  totalPages: number;
  recommend: boolean;
}

interface BooksListProps {
  books: Book[];
  size?: string;
  maxElem?: number;
}

const BooksList = ({ books, size = "", maxElem = 0 }: BooksListProps) => {
  const displayedBooks = maxElem > 0 ? books.slice(0, maxElem) : books;
  return (
    <ul className={clsx(size === "big" && "flex-wrap md:gap-6 lg:gap-5", "flex gap-5")}>
      {displayedBooks.map(book => (
        <li key={book._id}>
          <BookCard book={book} size={size} />
        </li>
      ))}
    </ul>
  );
};

export default BooksList;
