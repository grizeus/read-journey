import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useYupValidationResolver } from "../lib/utils/validationResolver";

const Filters = () => {
  const validationSchema = Yup.object({
    title: Yup.string(),
    author: Yup.string(),
  });
  const resolver = useYupValidationResolver(validationSchema);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="mb-2 ml-3.5 text-[10px] leading-3 tracking-tight md:text-sm md:leading-4.5">
        Filters:
      </p>
      <div className="relative flex">
        <label htmlFor="title" className="">
          Book title
        </label>
        <input
          id="title"
          {...register("title")}
          placeholder="Enter text"
          className="bg-ebony w-full rounded-xl px-4.5 py-4 text-base placeholder:text-current focus:outline-none"
        />
        {errors.title && (
          <p className="absolute right-2 bottom-0.5 text-xs text-red-500">
            {errors.title.message}
          </p>
        )}
      </div>
      <div className="relative flex">
        <label htmlFor="author" className="">
          Book title
        </label>
        <input
          id="author"
          {...register("author")}
          placeholder="Enter text"
          className="border-waterloo/10 placeholder:text-waterloo w-full rounded-xl border px-4.5 py-4 text-base focus:outline-none"
        />
        {errors.author && (
          <p className="absolute right-2 bottom-0.5 text-xs text-red-500">
            {errors.author.message}
          </p>
        )}
      </div>
    </form>
  );
};

export default Filters;
