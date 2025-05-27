import css from './SignInForm.module.css';
import { useId, useState } from 'react';
import Button from '../ui/Button/Button';
import { useDispatch } from 'react-redux';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { logIn } from '../../redux/auth/operations';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('Email is required')
    .test(
      'is-valid-email',
      'Email must match pattern: Your@email.com',
      value =>
        !value || /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value.toLowerCase())
    ),
  password: yup
    .string()
    .required('Password is required')
    .min(7, 'Password must be at least 7 characters long'),
});

export default function SignInForm() {
  const [isEyeOff, setIsEyeOff] = useState(true);

  const {
    register: formRegister,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const emailId = useId();
  const pwdId = useId();

  const email = useWatch({ control, name: 'email' });
  const password = useWatch({ control, name: 'password' });

  const dispatch = useDispatch();

  const onSubmit = async data => {
    try {
      const normalizedData = {
        ...data,
        email: data.email.toLowerCase(),
      };
      await dispatch(logIn(normalizedData)).unwrap();
      reset();
      toast.success('User was successfully logged in!');
    } catch (error) {
      reset();
    }
  };

  const togglePasswordVisibility = () => setIsEyeOff(prev => !prev);

  const renderIcon = (isValid, hasError) => {
    if (isValid) {
      return (
        <svg className={css.iconValidation}>
          <use href="/sprite.svg#icon-check" />
        </svg>
      );
    }
    if (hasError) {
      return (
        <svg className={css.iconValidation}>
          <use href="/sprite.svg#icon-error" />
        </svg>
      );
    }
    return null;
  };

  const isValidEmail =
    /^[\w]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email) && !errors.email;
  const isValidPassword = password?.length >= 7 && !errors.password;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className={css.signTitle}>
        Expand your mind, reading{' '}
        <span className={css.signTitleAccentWord}>a book</span>
      </h1>

      <div className={css.inputWrapper}>
        <label className={css.formLabel} htmlFor={emailId}>
          Mail:
        </label>
        <input
          className={clsx(css.inputEmail, {
            [css.inputValid]: isValidEmail,
            [css.inputInvalid]: errors.email,
          })}
          id={emailId}
          type="email"
          placeholder="Your@email.com"
          {...formRegister('email')}
        />
        {renderIcon(isValidEmail, errors.email)}
      </div>
      {isValidEmail && <p className={css.successMessage}>Mail is secure</p>}
      {errors.email && (
        <p className={css.errorMessage}>{errors.email.message}</p>
      )}

      <div className={css.inputWrapper}>
        <label className={css.formLabel} htmlFor={pwdId}>
          Password:
        </label>
        <input
          className={clsx(css.inputPwd, {
            [css.inputValid]: isValidPassword,
            [css.inputInvalid]: errors.password,
          })}
          id={pwdId}
          type={isEyeOff ? 'password' : 'text'}
          placeholder="Yourpasswordhere"
          {...formRegister('password')}
        />
        <svg className={css.formIcon} onClick={togglePasswordVisibility}>
          <use href={`/sprite.svg#icon-${isEyeOff ? 'eye-off' : 'eye'}`} />
        </svg>
        {renderIcon(isValidPassword, errors.password)}
      </div>
      {isValidPassword && (
        <p className={css.successMessage}>Password is secure</p>
      )}
      {errors.password && (
        <p className={css.errorMessage}>{errors.password.message}</p>
      )}
      <div className={css.btnAndLinkWrapper}>
        <Button type="submit" variant="logIn">
          Log in
        </Button>
        <Link to="/register" className={css.linkText}>
          Don’t have an account?
        </Link>
      </div>
    </form>
  );
}
