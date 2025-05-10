import { useForm, type SubmitHandler } from "react-hook-form";
import * as Yup from "yup";
import { useYupValidationResolver } from "../lib/utils/validationResolver";

interface FormData {
  title: string;
  author: string;
}

const Filters = () => {
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
  });

  const onSubmit: SubmitHandler<FormData> = async ({ title, author }) => {
    console.log(title?.trim(), author?.trim());
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-1">
      <p className="mb-2 ml-3.5 text-[10px] leading-3 tracking-tight md:text-sm md:leading-4.5">
        Filters:
      </p>
      <div className="mb-5 flex flex-col gap-2">
        <div className="bg-ebony relative flex w-full items-center gap-2.5 rounded-xl px-4.5 py-4">
          <label htmlFor="title" className="text-tarnished text-nowrap">
            Book title:
          </label>
          <input
            id="title"
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
          <label htmlFor="author" className="text-tarnished text-nowrap">
            The author:
          </label>
          <input
            id="author"
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
