import { useForm, type SubmitHandler } from "react-hook-form";
import * as Yup from "yup";
import { useYupValidationResolver } from "../lib/utils/validationResolver";
import type { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { useEffect, useId } from "react";
import { useSelector } from "react-redux";
import { selectAuthorFilter, selectTitleFilter } from "../redux/filters/selectors";
import { setFilters } from "../redux/filters/slice";
import { getRecommendedBooks } from "../redux/books/operations";

interface FormData {
  title: string;
  author: string;
  page: number;
}

const Filters = () => {
  const dispatch = useDispatch<AppDispatch>();

  const bookId = useId();
  const authorId = useId();

  const title = useSelector(selectTitleFilter);
  const author = useSelector(selectAuthorFilter);

  const validationSchema = Yup.object({
    title: Yup.string(),
    author: Yup.string(),
  });
  const resolver = useYupValidationResolver(validationSchema);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver,
    defaultValues: {
      title,
      author,
      page: 1,
    }
  });

  useEffect(() => {
    reset({
      title,
      author,
      page: 1,
    })
  }, [title, author, reset])

  const onSubmit: SubmitHandler<FormData> = async ({ title, author, page }) => {
    dispatch(setFilters({ title, author }));
    dispatch(getRecommendedBooks({ title, author, page }));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-1 mb-5">
      <h3 className="mb-2 ml-3.5 text-2xs leading-3 tracking-tight md:text-sm md:leading-4.5">
        Filters:
      </h3>
      <div className="mb-5 flex flex-col gap-2 ">
        <div className="bg-ebony relative flex w-full items-center gap-2.5 rounded-xl px-4.5 py-4">
          <label htmlFor={bookId} className="text-tarnished text-nowrap">
            Book title:
          </label>
          <input
            id={bookId}
            {...register("title")}
            placeholder="Enter text"
            className="text-sm leading-4.5 placeholder:text-sm placeholder:leading-4.5 placeholder:text-current focus:outline-none"
          />
          {errors.title && (
            <p className="absolute right-2 bottom-0.5 text-xs text-red-500">
              {errors.title.message}
            </p>
          )}
        </div>
        <div className="bg-ebony relative flex w-full items-center gap-2.5 rounded-xl px-4.5 py-4">
          <label htmlFor={authorId} className="text-tarnished text-nowrap">
            The author:
          </label>
          <input
            id={authorId}
            {...register("author")}
            placeholder="Enter text"
            className="text-sm leading-4.5 placeholder:text-sm placeholder:leading-4.5 placeholder:text-current focus:outline-none"
          />
          {errors.author && (
            <p className="absolute right-2 bottom-0.5 text-xs text-red-500">
              {errors.author.message}
            </p>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="border-ivory/20 rounded-4xl border px-7 py-3">
        To apply
      </button>
    </form>
  );
};

export default Filters;
