import css from "./ReadingForm.module.css";
import { useYupValidationResolver } from "../lib/utils/validationResolver";
import { useEffect, useId, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import clsx from "clsx";
import Info from "./Info";
import Modal from "./Modal";
import Button from "./Button";
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
      .integer("Must be an integer").transform((value, originalValue) => {
        if (typeof originalValue === "string" && originalValue.trim() !== "") {
          return Number(originalValue);
        }
        return value;
      })
    ,
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
      // Set to 0 when book is done, we'll handle the display in the UI
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

    if (+page < maxReadPage + 1) {
      toast.error(
        `You cannot start from a page (${page}) earlier than the last read page (${maxReadPage}).`
      );
      reset();
      return;
    }

    if (!isFirstSession && +page > maxReadPage + 1) {
      toast.error(
        `You cannot skip pages. The starting page must not be greater than the last read page (${maxReadPage}).`
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

    try {
      await dispatch(startReading({ page, id: bookId })).unwrap();
      reset();
    } catch (error) {
      toast.error(`Failed to start reading: ${error}.`);
    }
  };

  const onSubmitStop = async (data: FormData) => {
    const page = data.page;
    if (+page < maxReadPage + 1) {
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

    try {
      await dispatch(stopReading({ page, id: bookId })).unwrap();
      reset();
      if (+page === totalPages) {
        reset();
        setShowSuccessModal(true);
      }
    } catch (error) {
      toast.error(`Failed to stop reading: ${error}. Please, try again.`);
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
      <div className={css.addBookForm}>
        <h1 className={css.addBookTitle}>Reading Progress</h1>
        <p>You have finished reading this book!</p>
      </div>
    );
  }

  return (
    <>
      {bookStatus?.status === "active" ? (
        <form className={css.addBookForm} onSubmit={handleSubmit(onSubmitStop)}>
          <h1 className={css.addBookTitle}>Stop page:</h1>

          <div className={css.inputWrapper}>
            <label className={`${css.formLabel} ${css.formLabelAuthorPages}`}>
              Page number:
            </label>
            <input
              {...register("page")}
              className={clsx(css.pagesInput, {
                [css.inputValid]: isValidPage,
                [css.inputInvalid]: errors.page,
              })}
              id={pageId}
              type="number"
              placeholder="0"
              min="1"
              max={totalPages}
            />
            {RenderIcon(isValidPage, !!errors.page)}
          </div>
          {isValidPage && <p className={css.successMessage}>Pages are valid</p>}
          {errors.page && (
            <p className={css.errorMessage}>{errors.page.message}</p>
          )}

          <Button type="submit" variant="start">
            To stop
          </Button>
        </form>
      ) : (
        <form
          className={css.addBookForm}
          onSubmit={handleSubmit(onSubmitStart)}>
          <h1 className={css.addBookTitle}>Start page:</h1>

          <div className={css.inputWrapper}>
            <label className={`${css.formLabel} ${css.formLabelAuthorPages}`}>
              Page number:
            </label>
            <input
              {...register("page")}
              className={clsx(css.pagesInput, {
                [css.inputValid]: isValidPage,
                [css.inputInvalid]: errors.page,
                [css.disabled]: isDisabled,
              })}
              id={pageId}
              type="number"
              placeholder="0"
              min="1"
              max={totalPages}
              disabled={isDisabled}
            />
            {RenderIcon(isValidPage, !!errors.page)}
          </div>
          {isValidPage && <p className={css.successMessage}>Pages are valid</p>}
          {errors.page && (
            <p className={css.errorMessage}>{errors.page.message}</p>
          )}

          <Button
            type="submit"
            variant="start"
            className={clsx(css.startBtn, {
              [css.disabled]: isDisabled,
            })}>
            To start
          </Button>
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
