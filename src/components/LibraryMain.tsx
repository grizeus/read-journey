import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useState } from "react";
import { selectOwnBooks } from "../redux/books/selectors";
import { type Book } from "./BookList";
import LibFilter from "./LibFilter";
import Modal from "./Modal";
import { selectIsLoading } from "../redux/auth/selectors";
import type { AppDispatch } from "../redux/store";
import { deleteOwnBook, getBookById } from "../redux/books/operations";

import booksPile from "../assets/images/books-pile.png";
import booksPile2x from "../assets/images/books-pile@2x.png";
import booksPileMob from "../assets/images/books-pile-mob.png";
import booksPileMob2x from "../assets/images/books-pile-mob@2x.png";
import Loader from "./Loader";
import RecommendedItem from "./RecommendedItem";
import sprite from "../assets/sprite.svg";

const LibraryMain = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const books = useSelector(selectOwnBooks);
  const loading = useSelector(selectIsLoading);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleStartReading = async () => {
    if (!selectedBook) {
      return;
    }
    await dispatch(getBookById(selectedBook._id!));
    setSelectedBook(null);
    navigate(`/reading/${selectedBook._id}`);
  };

  const handleDeleteBook = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    dispatch(deleteOwnBook(id));
  };

  return (
    <>
      <div className="bg-charcoal-black w-full min-w-84 rounded-4xl px-5 py-10">
        <div className="mb-3.5 flex items-center justify-between">
          <h1 className="text-xl leading-none font-bold tracking-tight md:text-[28px] md:leading-8 md:tracking-wide">
            My library
          </h1>
          <LibFilter />
        </div>
        {books?.length === 0 && (
          <div className="mx-auto mt-16 mb-15 max-w-49.5 md:mt-21.5 md:mb-30 md:max-w-68.5 lg:mb-0 xl:mt-37">
            <div className="bg-ebony mx-auto mb-2.5 flex size-25 items-center justify-center rounded-full md:mb-5 md:size-32.5">
              <picture>
                <source
                  srcSet={`${booksPile} 1x, ${booksPile2x} 2x`}
                  media="(min-width: 768px)"
                  width="70"
                  height="70"
                />
                <source
                  srcSet={`${booksPileMob} 1x, ${booksPileMob2x} 2x`}
                  media="(max-width: 767px)"
                  width="50"
                  height="50"
                />
                <img
                  src={booksPileMob}
                  alt="No Results Books Img"
                  width="50"
                  height="50"
                />
              </picture>
            </div>
            <p className="text-center text-sm leading-4.5 tracking-tight">
              To start training, add{" "}
              <span className="text-tarnished">some of your books</span> or from
              the recommended ones
            </p>
          </div>
        )}
        {loading && <Loader />}
        <ul className="flex flex-wrap items-center gap-5 md:gap-6 xl:gap-x-5">
          {books.map(book => (
            <li key={book._id} onClick={() => setSelectedBook(book)}>
              <RecommendedItem
                bookTitle={book.title}
                img={book!.imageUrl!}
                author={book.author}
                totalPages={book.totalPages}
                id={book._id}
              />
              <button
                type="button"
                onClick={(e) => handleDeleteBook(e, book._id!)}>
                <svg width={28} height={28}>
                  <use href={`${sprite}#icon-trash-block`}></use>
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>
      {selectedBook && (
        <Modal onClose={() => setSelectedBook(null)}>
          {selectedBook && (
            <div className="flex flex-col items-center">
              <div className="mx-20 mt-6 mb-4 h-53 w-35 overflow-hidden rounded-lg md:mx-37 md:mt-8.5 md:h-58 md:w-38">
                <img
                  className="h-full w-full"
                  src={selectedBook.imageUrl}
                  alt={selectedBook.title}
                />
              </div>
              <h3 className="mb-0.5 w-76 overflow-hidden text-center text-lg leading-none font-bold overflow-ellipsis whitespace-nowrap md:w-117 md:text-xl">
                {selectedBook.title}
              </h3>
              <p className="text-tarnished mb-1 overflow-hidden text-xs leading-3.5 tracking-tight overflow-ellipsis whitespace-nowrap md:text-sm md:leading-4.5">
                {selectedBook.author}
              </p>
              <p className="text-2xs mb-5 leading-3 md:mb-8">
                {selectedBook.totalPages} pages
              </p>
              <button
                type="button"
                onClick={handleStartReading}
                className="hover:bg-ivory border-ivory/20 hover:text-tarnished focus:bg-ivory focus:text-tarnished mx-auto mb-6 rounded-4xl border px-6 py-3 transition-colors duration-300 ease-in-out hover:border-none focus:border-none focus:outline-none md:mb-8.5 md:px-7 md:py-3.5 md:text-base md:leading-4.5">
                Start reading
              </button>
            </div>
          )}
        </Modal>
      )}
    </>
  );
};

export default LibraryMain;
