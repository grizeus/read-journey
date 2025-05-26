import { useId, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { register } from "../redux/auth/operations";
import { Link } from "react-router";
import { useYupValidationResolver } from "../lib/utils/validationResolver";
import type { AppDispatch } from "../redux/store";
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
        "Email must match pattern: Your@email.com",
        value => !value || /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value)
      ),
    password: yup
      .string()
      .required("Password is required")
      .min(7, "Password must be at least 7 characters long"),
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
    await dispatch(register(data));
    reset();
  };

  const togglePasswordVisibility = () => setIsEyeOff(prev => !prev);

  const renderIcon = (isValid: boolean, hasError: boolean) => {
    if (isValid) {
      return (
        <div className="absolute top-1/2 right-3 -translate-y-1/2 transform text-green-500">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      );
    }
    if (hasError) {
      return (
        <div className="absolute top-1/2 right-3 -translate-y-1/2 transform text-red-500">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      );
    }
    return null;
  };

  const isValidName = name?.trim().length > 0 && !errors.name;
  const isValidEmail =
    /^[\w]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email) && !errors.email;
  const isValidPassword = password?.length >= 7 && !errors.password;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-8 text-center text-2xl font-bold text-gray-800">
          Expand your mind, reading{" "}
          <span className="text-blue-600">a book</span>
        </h1>

        <div className="relative mb-4">
          <label
            className="mb-2 block text-sm font-medium text-gray-700"
            htmlFor={nameId}>
            Name:
          </label>
          <input
            className={`w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none ${
              errors.name
                ? "border-red-500 focus:ring-red-200"
                : isValidName
                  ? "border-green-500 focus:ring-green-200"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
            }`}
            id={nameId}
            type="text"
            placeholder="Your name"
            {...formRegister("name")}
          />
          {renderIcon(isValidName, !!errors.name)}
        </div>
        {isValidName && (
          <p className="mb-4 text-sm text-green-600">Name is secure</p>
        )}
        {errors.name && (
          <p className="mb-4 text-sm text-red-500">{errors.name.message}</p>
        )}

        <div className="relative mb-4">
          <label
            className="mb-2 block text-sm font-medium text-gray-700"
            htmlFor={emailId}>
            Mail:
          </label>
          <input
            className={`w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none ${
              errors.email
                ? "border-red-500 focus:ring-red-200"
                : isValidEmail
                  ? "border-green-500 focus:ring-green-200"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
            }`}
            id={emailId}
            type="email"
            placeholder="Your@email.com"
            {...formRegister("email")}
          />
          {renderIcon(isValidEmail, !!errors.email)}
        </div>
        {isValidEmail && (
          <p className="mb-4 text-sm text-green-600">Mail is secure</p>
        )}
        {errors.email && (
          <p className="mb-4 text-sm text-red-500">{errors.email.message}</p>
        )}

        <div className="relative mb-6">
          <label
            className="mb-2 block text-sm font-medium text-gray-700"
            htmlFor={pwdId}>
            Password:
          </label>
          <div className="relative">
            <input
              className={`w-full rounded-lg border px-4 py-2 pr-10 focus:ring-2 focus:outline-none ${
                errors.password
                  ? "border-red-500 focus:ring-red-200"
                  : isValidPassword
                    ? "border-green-500 focus:ring-green-200"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
              }`}
              id={pwdId}
              type={isEyeOff ? "password" : "text"}
              placeholder="Yourpasswordhere"
              {...formRegister("password")}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="h-5 w-5 text-gray-500">
                <use
                  href={
                    isEyeOff
                      ? `${sprite}#icon-eye-off`
                      : `${sprite}#icon-eye-on`
                  }></use>
              </svg>
            </button>
            {renderIcon(isValidPassword, !!errors.password)}
          </div>
        </div>
        {isValidPassword && (
          <p className="mb-4 text-sm text-green-600">Password is secure</p>
        )}
        {errors.password && (
          <p className="mb-6 text-sm text-red-500">{errors.password.message}</p>
        )}
        <div className="mt-8 flex flex-col items-center space-y-4">
          <button
            type="submit"
            className="w-full rounded-full bg-blue-600 px-4 py-2 font-medium text-white transition duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none">
            Registration
          </button>
          <Link
            to="/login"
            className="text-sm font-medium text-blue-600 transition duration-200 hover:text-blue-800">
            Already have an account?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
