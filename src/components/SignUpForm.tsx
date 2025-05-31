import { useId, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { Link } from "react-router";

import { register } from "../redux/auth/operations";
import { useYupValidationResolver } from "../lib/utils/validationResolver";
import type { AppDispatch } from "../redux/store";
import { emailRegex } from "../lib/constants";
import RenderIcon from "./RenderIcon";
import sprite from "../assets/sprite.svg";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const SignUpForm = () => {
  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .trim()
      .required("Email is required")
      .test(
        "is-valid-email",
        "Email must match pattern: name@domain.ext",
        value => !value || emailRegex.test(value.toLowerCase())
      ),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
  });

  const resolver = useYupValidationResolver(validationSchema);
  const [isEyeOff, setIsEyeOff] = useState(true);

  const {
    register: formRegister,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver,
    mode: "onChange",
  });

  const nameId = useId();
  const emailId = useId();
  const pwdId = useId();

  const name = useWatch({ control, name: "name" });
  const email = useWatch({ control, name: "email" });
  const password = useWatch({ control, name: "password" });

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<FormData> = async data => {
    const res = await dispatch(register(data));
    if (register.fulfilled.match(res)) {
      reset();
    }
  };

  const togglePasswordVisibility = () => setIsEyeOff(prev => !prev);

  const isValidName = name?.trim().length > 0 && !errors.name;
  const isValidEmail = emailRegex.test(email) && !errors.email;
  const isValidPassword = password?.length >= 8 && !errors.password;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="mt-10 mb-5 text-[32px] leading-none font-bold tracking-wide md:mt-39 md:mb-10 md:w-111 md:text-[64px] md:leading-15 xl:mt-27">
        Expand your mind, reading{" "}
        <span className="text-gainsboro/50">a book</span>
      </h1>

      <div className="mb-5 flex flex-col gap-2 md:mb-20.5 md:w-118">
        <div className="bg-ebony relative flex items-center gap-2.5 rounded-xl px-4.5 py-4">
          <label className="text-tarnished text-nowrap" htmlFor={nameId}>
            Name:
          </label>
          <input
            className="text-sm leading-4.5 placeholder:text-sm placeholder:leading-4.5 placeholder:text-current focus:outline-none"
            id={nameId}
            type="text"
            placeholder="Ilona Ratushniak"
            {...formRegister("name")}
          />
          {RenderIcon(isValidName, !!errors.name)}
        </div>
        {isValidName && (
          <p className="text-2xs text-neon pt-1 pl-3.5 leading-3 md:text-xs">
            Name is secure
          </p>
        )}
        {errors.name && (
          <p className="absolute right-2 bottom-0.5 text-xs text-red-500">
            {errors.name.message}
          </p>
        )}

        <div className="bg-ebony relative flex items-center gap-2.5 rounded-xl px-4.5 py-4">
          <label className="text-tarnished text-nowrap" htmlFor={emailId}>
            Mail:
          </label>
          <input
            className="w-full bg-transparent text-sm leading-4.5 placeholder:text-sm placeholder:leading-4.5 placeholder:text-current focus:outline-none"
            id={emailId}
            autoComplete="mail"
            type="email"
            placeholder="example@email.com"
            {...formRegister("email")}
          />
          {RenderIcon(isValidEmail, !!errors.email)}
        </div>
        {isValidEmail && (
          <p className="text-2xs text-neon pt-1 pl-3.5 leading-3 md:text-xs">
            Mail is secure
          </p>
        )}
        {errors.email && (
          <p className="text-2xs pt-1 pl-3.5 leading-3 text-red-500 md:text-xs">
            {errors.email.message}
          </p>
        )}

        <div className="bg-ebony relative flex items-center gap-2.5 rounded-xl px-4.5 py-4">
          <label className="text-tarnished text-nowrap" htmlFor={pwdId}>
            Password:
          </label>
          <input
            className="w-full text-sm leading-4.5 placeholder:text-sm placeholder:leading-4.5 placeholder:text-current focus:outline-none"
            id={pwdId}
            type={isEyeOff ? "password" : "text"}
            placeholder="Yourpasswordhere"
            {...formRegister("password")}
          />
          <button type="button" onClick={togglePasswordVisibility} className="">
            <svg className="absolute top-1/2 right-10 size-4.5 -translate-y-1/2 transform cursor-pointer">
              <use
                href={`${sprite} ${isEyeOff ? "#icon-eye-off" : "#icon-eye"}`}></use>
            </svg>
          </button>
          {RenderIcon(isValidPassword, !!errors.password)}
        </div>
        {isValidPassword && (
          <p className="text-2xs text-neon pt-1 pl-3.5 leading-3 md:text-xs">
            Password is secure
          </p>
        )}
        {errors.password && (
          <p className="text-2xs pt-1 pl-3.5 leading-3 text-red-500 md:text-xs">
            {errors.password.message}
          </p>
        )}
      </div>
      <div className="flex items-center gap-3.5 md:gap-5">
        <button
          type="submit"
          className="bg-ivory text-charcoal-black focus:border-ivory/20 hover:border-ivory/20 hover:text-ivory rounded-4xl border border-transparent px-7 py-3 text-sm leading-4.5 font-bold tracking-wide transition-colors duration-300 ease-in-out hover:bg-transparent focus:outline-none md:px-13.5 md:py-4 md:text-xl md:leading-none">
          Registration
        </button>
        <Link
          to="/login"
          className="text-tarnished focus:text-ivory hover:text-ivory text-xs leading-3.5 !underline transition-colors duration-300 ease-in-out md:text-sm md:leading-4.5">
          Already have an account?
        </Link>
      </div>
    </form>
  );
};

export default SignUpForm;
