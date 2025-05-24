import { useForm, type SubmitHandler } from "react-hook-form";
import { useYupValidationResolver } from "../lib/utils/validationResolver";
import * as Yup from "yup";

interface FormData {
  title: string;
  author: string;
  pages: number;
}

const AddBook = () => {
  const validationSchema = Yup.object({
    title: Yup.string(),
    author: Yup.string(),
    pages: Yup.number(),
  });
  const resolver = useYupValidationResolver(validationSchema);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver,
  });

  const onSubmit: SubmitHandler<FormData> = async ({
    title,
    author,
    pages,
  }) => {
    console.log(title?.trim(), author?.trim(), pages);
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-1 mb-5">
      <p className="mb-2 ml-3.5 text-[10px] leading-3 tracking-tight md:text-sm md:leading-4.5">
        Create your library:
      </p>
      <div className="mb-5 flex flex-col gap-2">
        <div className="bg-ebony relative flex w-full items-center gap-2.5 rounded-xl px-4.5 py-4">
          <label htmlFor="title" className="text-tarnished text-nowrap">
            Book title:
          </label>
          <input
            id="title"
            placeholder="Enter text"
            {...register("title")}
            className="text-sm leading-4.5 placeholder:text-sm placeholder:leading-4.5 placeholder:text-current focus:outline-none"
          />
          {errors.title && (
            <p className="absolute right-2 bottom-0.5 text-xs text-red-500">
              {errors.title.message}
            </p>
          )}
        </div>
        <div className="bg-ebony relative flex w-full items-center gap-2.5 rounded-xl px-4.5 py-4">
          <label htmlFor="author" className="text-tarnished text-nowrap">
            The author:
          </label>
          <input
            id="author"
            placeholder="Enter text"
            {...register("author")}
            className="text-sm leading-4.5 placeholder:text-sm placeholder:leading-4.5 placeholder:text-current focus:outline-none"
          />
          {errors.author && (
            <p className="absolute right-2 bottom-0.5 text-xs text-red-500">
              {errors.author.message}
            </p>
          )}
        </div>
        <div className="bg-ebony relative flex w-full items-center gap-2.5 rounded-xl px-4.5 py-4">
          <label htmlFor="pages" className="text-tarnished text-nowrap">
            Number of pages:
          </label>
          <input
            id="pages"
            type="number"
            placeholder={"0"}
            {...register("pages")}
            className="text-sm leading-4.5 placeholder:text-sm placeholder:leading-4.5 placeholder:text-current focus:outline-none"
          />
        </div>
      </div>
      <button
        type="submit"
        className="border-ivory/20 rounded-4xl border px-7 py-3">
        Add book
      </button>
    </form>
  );
};

export default AddBook;
