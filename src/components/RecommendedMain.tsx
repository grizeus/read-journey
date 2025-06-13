import { useEffect, useState } from "react";
import sprite from "../assets/sprite.svg";
import type { Book } from "./BookList";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import {
  selectBooks,
  selectCurrentPage,
  selectOwnBooks,
  selectTotalPages,
} from "../redux/books/selectors";
import {
  selectAuthorFilter,
  selectTitleFilter,
} from "../redux/filters/selectors";
import {
  addBookById,
  getAllBooks,
  getRecommendedBooks,
} from "../redux/books/operations";
import toast from "react-hot-toast";
import { goToNextPage, goToPrevPage } from "../redux/books/slice";
import { selectIsLoading } from "../redux/auth/selectors";
import Loader from "./Loader";
import RecommendedItem from "./RecommendedItem";
import Modal from "./Modal";
import Info from "./Info";

const RecommededMain = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const openModal = (book: Book) => setSelectedBook(book);
  const closeModal = () => setSelectedBook(null);
  const closeSuccessModal = () => setShowSuccessModal(false);

  const books = useSelector(selectBooks);
  const loading = useSelector(selectIsLoading);
  const curPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const ownBooks = useSelector(selectOwnBooks);
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const [maxElem, setMaxElem] = useState(() => {
    const curWidth = window.innerWidth;
    if (curWidth >= 1280) {
      return 10;
    } else if (curWidth >= 768) {
      return 8;
    } else {
      return 2;
    }
  });

  useEffect(() => {
    const updateMaxElem = () => {
      const curWidth = window.innerWidth;
      if (curWidth >= 1280) {
        setMaxElem(10);
      } else if (curWidth >= 768) {
        setMaxElem(8);
      } else {
        setMaxElem(2);
      }
    };
    window.addEventListener("resize", updateMaxElem);
    return () => window.removeEventListener("resize", updateMaxElem);
  }, [maxElem]);

  useEffect(() => {
    dispatch(
      getRecommendedBooks({
        limit: maxElem,
        page: curPage,
        author: authorFilter,
        title: titleFilter,
      })
    );
    dispatch(getAllBooks());
  }, [dispatch, maxElem, curPage, authorFilter, titleFilter]);

  const handleAddBook = async () => {
    const existingBook = ownBooks.some(
      item => item.title === selectedBook?.title
    );
    if (ownBooks.length === 0 || !existingBook) {
      const res = await dispatch(addBookById(selectedBook!._id!));
      if (res.type.endsWith("/fulfilled")) {
        setShowSuccessModal(true);
      }
      closeModal();
    } else {
      toast.success("This book is already in your library.", {
        style: {
          background: "#4f92f7",
        },
      });
    }
    closeModal();
  };

  const handleNextPage = () => {
    dispatch(goToNextPage());
  };

  const handlePrevPage = () => {
    dispatch(goToPrevPage());
  };

  return (
    <>
      <div className="bg-charcoal-black w-full min-w-84 rounded-4xl px-5 py-10  md:px-10 xl:pb-7">
        <div className="mb-5.5 flex items-center justify-between md:mb-5">
          <h1 className="text-xl leading-none font-bold tracking-tight md:text-[28px] md:leading-8 md:tracking-wide">
            Recommended
          </h1>
          <ul className="flex items-center gap-2">
            <li className="border-tarnished flex size-10 items-center justify-center rounded-full border">
              <button
                type="button"
                disabled={curPage === 1}
                onClick={handlePrevPage}
                className={`${curPage === 1 ? "fill-tarnished" : "fill-ivory"} hover:fill-tarnished transition-colors duration-300 ease-in-out`}>
                <svg className="size-5">
                  <use href={`${sprite}#icon-chevron-left`}></use>
                </svg>
              </button>
            </li>
            <li className="border-tarnished flex size-10 items-center justify-center rounded-full border">
              <button
                type="button"
                disabled={curPage === totalPages}
                onClick={handleNextPage}
                className={`${curPage === totalPages ? "fill-tarnished" : "fill-ivory"} hover:fill-tarnished transition-colors duration-300 ease-in-out`}>
                <svg className="size-5">
                  <use href={`${sprite}#icon-chevron-right`}></use>
                </svg>
              </button>
            </li>
          </ul>
        </div>
        {loading && <Loader />}
        <ul className="flex flex-wrap items-center gap-5 md:gap-6 xl:gap-x-5 xl:gap-y-7">
          {books.map(book => (
            <li key={book._id} onClick={() => openModal(book)}>
              <RecommendedItem
                bookTitle={book.title}
                img={book!.imageUrl!}
                author={book.author}
                totalPages={book.totalPages}
                id={book._id}
              />
            </li>
          ))}
        </ul>
      </div>
      {selectedBook !== null && (
        <Modal onClose={closeModal}>
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
                onClick={handleAddBook}
                className="hover:bg-ivory border-ivory/20 hover:text-tarnished focus:bg-ivory focus:text-tarnished mx-auto mb-6 rounded-4xl border px-6 py-3 transition-colors duration-300 ease-in-out hover:border-none focus:border-none focus:outline-none md:mb-8.5 md:px-7 md:py-3.5 md:text-base md:leading-4.5">
                Add to library
              </button>
            </div>
          )}
        </Modal>
      )}

      {showSuccessModal && (
        <Modal onClose={closeSuccessModal}>
          <Info />
        </Modal>
      )}
    </>
  );
};

export default RecommededMain;
