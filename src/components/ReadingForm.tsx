import { useYupValidationResolver } from "../lib/utils/validationResolver";
import { useEffect, useId, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import Info from "./Info";
import Modal from "./Modal";
import { selectReadingBook } from "../redux/books/selectors";
import { getBookStatus } from "../lib/utils";
import toast from "react-hot-toast";
import { startReading, stopReading } from "../redux/books/operations";
import { useParams } from "react-router";
import type { Book } from "./BookList";
import type { AppDispatch } from "../redux/store";
import RenderIcon from "./RenderIcon";

interface FormData {
  page: number;
}

export default function ReadingForm() {
  const validationSchema = yup.object().shape({
    page: yup
      .number()
      .typeError("Pages must be a number")
      .required("Pages are required")
      .positive("Must be positive")
      .integer("Must be an integer")
      .transform((value, originalValue) => {
        if (typeof originalValue === "string" && originalValue.trim() !== "") {
          return Number(originalValue);
        }
        return value;
      }),
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const closeSuccessModal = () => setShowSuccessModal(false);
  const pageId = useId();
  const { totalPages } = useSelector(selectReadingBook) as Book;
  const { bookId } = useParams();
  const resolver = useYupValidationResolver(validationSchema);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver,
    defaultValues: {
      page: 0,
    },
  });

  const page = useWatch({ control, name: "page" });
  const book = useSelector(selectReadingBook);

  const maxReadPage =
    book?.progress?.reduce((max, session) => {
      if (session.finishPage && session.finishPage > max) {
        return session.finishPage;
      }
      return max;
    }, 0) || 0;

  useEffect(() => {
    if (!book) return;

    if (book.status === "done") {
      reset({ page: 0 });
      return;
    }

    const isFirstSession = !book?.progress || book.progress.length === 0;

    reset({
      page: isFirstSession ? 1 : maxReadPage + 1,
    });
  }, [book, reset, maxReadPage]);

  const dispatch = useDispatch<AppDispatch>();

  const onSubmitStart = async (data: FormData) => {
    const page = data.page;
    const isFirstSession = !book?.progress || book.progress.length === 0;

    if (book?.status === "done") {
      toast.error(
        "This book is already read. To reread it, please delete it from your library and add it again."
      );
      reset();
      return;
    }

    if (isFirstSession && +page !== 1) {
      toast.error("The first reading session must start from page 1.");
      reset();
      return;
    }

    if (page < maxReadPage + 1) {
      toast.error(
        `You cannot start from a page (${page}) earlier than the last read page (${maxReadPage}).`
      );
      reset();
      return;
    }

    if (!isFirstSession && page > maxReadPage + 1) {
      toast.error(
        `You cannot skip pages. The starting page must not be greater than the last read page (${maxReadPage}).`
      );
      reset();
      return;
    }

    if (page > totalPages) {
      toast.error(
        `Page number cannot exceed the total pages (${totalPages}) of the book.`
      );
      reset();
      return;
    }

    await dispatch(startReading({ id: bookId!, page }));
    reset();
  };

  const onSubmitStop = async (data: FormData) => {
    const page = data.page;
    if (page < maxReadPage + 1) {
      toast.error(
        `You cannot stop reading on page (${page}) earlier than the start read page (${
          maxReadPage + 1
        }).`
      );
      reset();
      return;
    }

    if (+page > totalPages) {
      toast.error(
        `Page number cannot exceed the total pages (${totalPages}) of the book.`
      );
      reset();
      return;
    }

    await dispatch(stopReading({ page, id: bookId! }));
    reset();
    if (page === totalPages) {
      reset();
      setShowSuccessModal(true);
    }
  };

  const isValidPage =
    page !== null &&
    !isNaN(page) &&
    Number(page) > 0 &&
    Number.isInteger(Number(page)) &&
    !errors.page;

  const bookStatus = getBookStatus(book);
  const isDisabled = book?.status === "done";

  if (book?.status === "done") {
    return (
      <div className="w-full p-0 md:w-1/2">
        <h3 className="text-2xs mb-2 pl-3.5 leading-3 md:text-sm md:leading-none">
          Reading Progress
        </h3>
        <p>You have finished reading this book!</p>
      </div>
    );
  }

  return (
    <>
      {bookStatus?.status === "active" ? (
        <form className="mb-10" onSubmit={handleSubmit(onSubmitStop)}>
          <h3 className="text-2xs mb-2 ml-3.5 leading-3 tracking-tight md:text-sm md:leading-4.5">
            Stop page:
          </h3>

          <div className="bg-ebony relative flex items-center gap-2.5 rounded-xl px-4.5 py-4">
            <label className="text-tarnished text-nowrap">Page number:</label>
            <input
              {...register("page")}
              className="text-sm leading-4.5 placeholder:text-sm placeholder:leading-4.5 placeholder:text-current focus:outline-none"
              id={pageId}
              type="number"
              placeholder="0"
              min="1"
              max={totalPages}
            />
            {RenderIcon(isValidPage, !!errors.page)}
          </div>
          {isValidPage && (
            <p className="text-2xs text-neon pt-1 pl-3.5 leading-3 md:text-xs">
              Pages are valid
            </p>
          )}
          {errors.page && (
            <p className="absolute right-2 bottom-0.5 text-xs text-red-500">
              {errors.page.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isDisabled}
            className="hover:text-charcoal-black hover:bg-ivory focus:bg-ivory focus:text-charcoal-black md:tracking-4.5 text-ivory border-ivory/20 mt-5 rounded-4xl border bg-transparent px-5 py-2.5 text-sm leading-4.5 font-bold tracking-wide transition-colors duration-300 ease-in-out hover:border-transparent hover:outline-none focus:border-transparent focus:outline-none disabled:pointer-events-none disabled:opacity-40 md:px-7 md:py-3 md:text-base">
            To stop
          </button>
        </form>
      ) : (
        <form className="mb-10" onSubmit={handleSubmit(onSubmitStart)}>
          <h3 className="text-2xs mb-2 ml-3.5 leading-3 tracking-tight md:text-sm md:leading-4.5">
            Start page:
          </h3>

          <div className="bg-ebony relative flex items-center gap-2.5 rounded-xl px-4.5 py-4">
            <label className="text-tarnished text-nowrap">Page number:</label>
            <input
              {...register("page")}
              className="text-sm leading-4.5 placeholder:text-sm placeholder:leading-4.5 placeholder:text-current focus:outline-none"
              id={pageId}
              type="number"
              placeholder="0"
              min="1"
              max={totalPages}
              disabled={isDisabled}
            />
            {RenderIcon(isValidPage, !!errors.page)}
          </div>
          {isValidPage && (
            <p className="text-2xs text-neon pt-1 pl-3.5 leading-3 md:text-xs">
              Pages are valid
            </p>
          )}
          {errors.page && (
            <p className="absolute right-2 bottom-0.5 text-xs text-red-500">
              {errors.page.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isDisabled}
            className="hover:text-charcoal-black hover:bg-ivory focus:bg-ivory focus:text-charcoal-black md:tracking-4.5 text-ivory border-ivory/20 mt-5 rounded-4xl border bg-transparent px-5 py-2.5 text-sm leading-4.5 font-bold tracking-wide transition-colors duration-300 ease-in-out hover:border-transparent hover:outline-none focus:border-transparent focus:outline-none disabled:pointer-events-none disabled:opacity-40 md:px-7 md:py-3 md:text-base">
            To start
          </button>
        </form>
      )}

      {showSuccessModal && (
        <Modal onClose={closeSuccessModal}>
          <Info />
        </Modal>
      )}
    </>
  );
}
