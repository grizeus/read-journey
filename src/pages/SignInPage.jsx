import css from "./SignInPage.module.css";
import { Link } from "react-router-dom";
import SignInForm from "../../components/SignInForm/SignInForm.jsx";
import { useMediaQuery } from "react-responsive";
import DocumentTitle from "../../components/ui/DocumentTitle.jsx";

const SignInPage = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isDesktop = useMediaQuery({ minWidth: 1280 });

  const showBgrWrapper = isMobile || isDesktop;

  return (
    <>
      <DocumentTitle>ReadJourney — SignIn</DocumentTitle>
      <div className={css.signPageWrapper}>
        <div className={css.signWrapper}>
          <header className={css.signHeader}>
            <Link to="/login" className={css.logo}>
              <svg width={42} height={17}>
                <use href="/sprite.svg#icon-logo"></use>
              </svg>
            </Link>
            {isDesktop && (
              <Link to="/login" className={css.logoText}>
                read journey
              </Link>
            )}
          </header>
          <SignInForm />
        </div>

        {showBgrWrapper && (
          <div className={css.bgrWrapper}>
            <picture>
              <source
                srcSet="/images/hero-desk.png 1x, /images/hero-desk@2x.png 2x"
                media="(min-width: 1280px)"
              />
              <source
                srcSet="/images/hero-mob.png 1x, /images/hero-mob@2x.png 2x"
                media="(max-width: 767px)"
              />
              <img src="/images/hero-desk.png" alt="Read journey image" />
            </picture>
          </div>
        )}
      </div>
    </>
  );
};

export default SignInPage;
