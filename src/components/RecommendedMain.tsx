import { useEffect, useState } from "react";
import sprite from "../assets/sprite.svg";
import BooksList, { type Book } from "./BookList";
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
import { addBookById, getRecommendedBooks } from "../redux/books/operations";
import toast from "react-hot-toast";
import { goToNextPage, goToPrevPage } from "../redux/books/slice";
import { selectIsLoading } from "../redux/auth/selectors";
import Loader from "./Loader";

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
  const [maxElem, setMaxElem] = useState(()=>{
    const curWidth = window.innerWidth;
    if (curWidth >= 1280) {
      return  10;
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
  }, [dispatch, maxElem, curPage, authorFilter, titleFilter]);

  const handleAddBook = async () => {
    const existingBook = ownBooks.some(
      item => item.title === selectedBook?.title
    );
    if (ownBooks.length === 0 || !existingBook) {
      const res = await dispatch(addBookById(selectedBook._id));
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
    <div className="bg-charcoal-black w-full min-w-84 rounded-4xl px-5 py-10 md:px-10">
      <div className="mb-5.5 flex items-center justify-between md:mb-5">
        <h1 className="text-xl leading-none font-bold tracking-tight md:text-[28px] md:leading-8 md:tracking-wide">
          Recommended
        </h1>
        <ul className="flex items-center gap-[8px]">
          <li className="border-tarnished flex size-10 items-center justify-center rounded-full border">
            <button
              type="button"
              disabled={curPage === 1}
              onClick={handlePrevPage}
              className={curPage === 1 ? "fill-tarnished" : "fill-ivory"}>
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
              className={
                curPage === totalPages ? "fill-tarnished" : "fill-ivory"
              }>
              <svg className="size-5">
                <use href={`${sprite}#icon-chevron-right`}></use>
              </svg>
            </button>
          </li>
        </ul>
      </div>
        {loading && <Loader />}
        <ul className={css.booksList}>
          {books.map(book => (
            <li
              className={css.booksItem}
              key={book._id}
              onClick={() => openModal(book)}>
              <RecommendedItem
                bookTitle={book.title}
                img={book.imageUrl}
                author={book.author}
                totalPages={book.totalPages}
                id={book._id}
              />
            </li>
          ))}
        </ul>
    </div>
  );
};

export default RecommededMain;
