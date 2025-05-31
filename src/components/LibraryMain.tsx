import { useSelector } from "react-redux";
import { selectOwnBooks } from "../redux/books/selectors";
import BookCard from "./BookCard";
import BooksList, { type Book } from "./BookList";
import LibFilter from "./LibFilter";
import Modal from "./Modal";
import { useState } from "react";
import { selectIsLoading } from "../redux/auth/selectors";
import { selectStatus } from "../redux/filters/selectors";
import type { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { getBookById } from "../redux/books/operations";
import { useNavigate } from "react-router";

const LibraryMain = () => {
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const books = useSelector(selectOwnBooks);
  const loading = useSelector(selectIsLoading);
  const status = useSelector(selectStatus);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleStartReading = async () => {
    await dispatch(getBookById(selectedBook!._id!)).unwrap();
    setSelectedBook(null);
    navigate(`/reading/${selectedBook!._id!}`);
  };

  return (
    <>
      <div className="bg-charcoal-black w-full min-w-84 rounded-4xl px-5 py-10">
        <div className="mb-5.5 flex items-center justify-between md:mb-5">
          <h1 className="text-xl leading-none font-bold tracking-tight md:text-[28px] md:leading-8 md:tracking-wide">
            My library
          </h1>
          <LibFilter />
        </div>
        {ownBooks?.length === 0 && (
          <div className="mx-auto mb-[60px] max-w-[197px] md:mb-[120px] md:max-w-[274px] lg:mb-0">
            <div className="bg-dark-grey mx-auto mb-[10px] flex h-[100px] w-[100px] items-center justify-center rounded-full md:mb-[20px] md:h-[130px] md:w-[130px]">
              <span className="text-50 md:text-70 leading-none tracking-[-1px] md:tracking-[-1.4px]">
                📚
              </span>
            </div>
            <p className="text-14 text-center leading-[1.29] tracking-[-0.28px]">
              To start training, add{" "}
              <span className="text-grey">some of your books</span> or from the
              recommended ones
            </p>
          </div>
        )}

        {ownBooks && <BooksList books={ownBooks} size="big" maxElem={10} />}
      </div>
      {isBookModalOpen && (
        <Modal onClose={() => setIsBookModalOpen(false)}>
          {selectedBook && <BookCard book={selectedBook} size="big" />}
        </Modal>
      )}

      {isAddModalOpen && (
        <Modal
          onClose={() => setIsAddModalOpen(false)}
          className="px-[46px] py-[60px] md:w-[342px] md:px-[50px]">
          <p className="text-50 md:text-68 mb-[20px] leading-none tracking-[-1px] md:mb-[32px] md:leading-[1.03] md:tracking-[-1.36px]">
            👍
          </p>
          <h2 className="text-18 font-gilroy-bold md:text-20 mb-[10px] leading-none tracking-[-0.36px] md:mb-[14px] md:tracking-[-0.4px]">
            Good job
          </h2>
          <p className="text-grey text-14 text-center leading-[1.29] tracking-[-0.28px]">
            Your book is now in the library! The joy knows no bounds and now you
            can start your training
          </p>
        </Modal>
      )}
    </>
  );
};

export default LibraryMain;
