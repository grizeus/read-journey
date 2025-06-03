import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import * as Yup from "yup";
import { useYupValidationResolver } from "../lib/utils/validationResolver";
import RenderIcon from "./RenderIcon";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { useId, useState } from "react";
import { addBook } from "../redux/books/operations";
import type { Book } from "./BookList";
import Info from "./Info";
import Modal from "./Modal";

interface FormData {
  title: string;
  author: string;
  pages: number;
}

const AddBook = () => {
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
    pages: Yup.number()
      .positive("Number of pages must be positive")
      .integer("Number of pages must be an integer")
      .required("Number of pages is required"),
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const closeSuccessModal = () => setShowSuccessModal(false);

  const dispatch = useDispatch<AppDispatch>();
  const resolver = useYupValidationResolver(validationSchema);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver,
    mode: "onChange",
    defaultValues: {
      title: "",
      author: "",
      pages: 0,
    },
  });

  const bookId = useId();
  const authorId = useId();
  const pagesId = useId();

  const title = useWatch({ control, name: "title" });
  const author = useWatch({ control, name: "author" });
  const pages = useWatch({ control, name: "pages" });

  const onSubmit: SubmitHandler<FormData> = async ({
    title,
    author,
    pages,
  }) => {
    const newEntry: Book = {
      title,
      author,
      totalPages: pages,
    };
    const res = await dispatch(addBook(newEntry));
    if (addBook.fulfilled.match(res)) {
      setShowSuccessModal(true);
      reset();
    }
  };

  const isValidTitle = title?.trim().length > 0 && !errors.title;
  const isValidAuthor = author?.trim().length > 0 && !errors.author;
  const isValidPages =
    typeof pages === "string" &&
    pages !== "" &&
    !isNaN(pages) &&
    Number(pages) > 0 &&
    Number.isInteger(Number(pages)) &&
    !errors.pages;
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-5 flex-1">
        <h3 className="text-2xs mb-2 ml-3.5 leading-3 tracking-tight md:text-sm md:leading-4.5">
          Create your library:
        </h3>
        <div className="mb-5 flex flex-col gap-2">
          <div className="bg-ebony relative flex w-full items-center gap-2.5 rounded-xl px-4.5 py-4">
            <label htmlFor={bookId} className="text-tarnished text-nowrap">
              Book title:
            </label>
            <input
              id={bookId}
              placeholder="Enter text"
              {...register("title")}
              className="text-sm leading-4.5 placeholder:text-sm placeholder:leading-4.5 placeholder:text-current focus:outline-none"
            />
            {RenderIcon(isValidTitle, !!errors.title)}
          </div>
          {isValidTitle && (
            <p className="text-2xs text-neon pt-1 pl-3.5 leading-3 md:text-xs">
              Title is secure
            </p>
          )}
          {errors.title && (
            <p className="absolute right-2 bottom-0.5 text-xs text-red-500">
              {errors.title.message}
            </p>
          )}
          <div className="bg-ebony relative flex w-full items-center gap-2.5 rounded-xl px-4.5 py-4">
            <label htmlFor={authorId} className="text-tarnished text-nowrap">
              The author:
            </label>
            <input
              id={authorId}
              placeholder="Enter text"
              {...register("author")}
              className="text-sm leading-4.5 placeholder:text-sm placeholder:leading-4.5 placeholder:text-current focus:outline-none"
            />
            {RenderIcon(isValidAuthor, !!errors.author)}
          </div>
          {isValidAuthor && (
            <p className="text-2xs text-neon pt-1 pl-3.5 leading-3 md:text-xs">
              Author is secure
            </p>
          )}
          {errors.author && (
            <p className="absolute right-2 bottom-0.5 text-xs text-red-500">
              {errors.author.message}
            </p>
          )}
          <div className="bg-ebony relative flex w-full items-center gap-2.5 rounded-xl px-4.5 py-4">
            <label htmlFor={pagesId} className="text-tarnished text-nowrap">
              Number of pages:
            </label>
            <input
              id={pagesId}
              type="number"
              placeholder={"0"}
              {...register("pages")}
              className="text-sm leading-4.5 placeholder:text-sm placeholder:leading-4.5 placeholder:text-current focus:outline-none"
            />
            {RenderIcon(isValidPages, !!errors.pages)}
          </div>
          {isValidPages && (
            <p className="text-2xs text-neon pt-1 pl-3.5 leading-3 md:text-xs">
              Pages is secure
            </p>
          )}
          {errors.pages && (
            <p className="absolute right-2 bottom-0.5 text-xs text-red-500">
              {errors.pages.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="border-ivory/20 rounded-4xl border px-7 py-3">
          Add book
        </button>
      </form>
      {showSuccessModal && (
        <Modal onClose={closeSuccessModal}>
          <Info />
        </Modal>
      )}
    </>
  );
};

export default AddBook;
