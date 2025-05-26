import { Link } from "react-router";
import clsx from "clsx";

import SignUpForm from "../components/SignUpForm";
import DocumentTitle from "../components/DocumentTitle";
import { useWindowSize } from "../hooks/useWindowSize";
import sprite from "../assets/sprite.svg";
import heroDesk from "../assets/images/hero-desktop.png";
import heroDesk2x from "../assets/images/hero-desktop@2x.png";
import heroMob from "../assets/images/hero-mob.png";
import heroMob2x from "../assets/images/hero-mob@2x.png";

const SignUpPage = () => {
  const isMobile = useWindowSize() === "mobile";
  const isDesktop = useWindowSize() === "desktop";
  const isTablet = useWindowSize() === "tablet";

  const showBgrWrapper = isMobile || isDesktop;

  return (
    <>
      <DocumentTitle>ReadJourney — SignUp</DocumentTitle>
      <div
        className={clsx("grid justify-center gap-4", {
          "grid-cols-1 gap-2.5": isMobile,
          "grid-cols-1": isTablet && !isMobile,
          "min-h-screen grid-cols-2 items-stretch": isDesktop,
        })}>
        <div
          className={clsx(
            "mx-auto rounded-[30px] bg-charcoal-black p-5 pb-10",
            {
              "px-42 pb-53.5 pl-16": isTablet,
              "h-full w-full p-10": isDesktop,
            }
          )}>
          <header
            className={clsx("mb-10", {
              "mb-[157px]": isTablet,
              "mb-[107px] flex items-center gap-1": isDesktop,
            })}>
            <Link to="/login" className="flex items-center">
              <svg width={42} height={17} className="text-ebony">
                <use href={`${sprite}#icon-logo`}></use>
              </svg>
              {isDesktop && (
                <span className="ml-1 text-lg leading-none font-bold tracking-wide uppercase">
                  read journey
                </span>
              )}
            </Link>
          </header>
          <SignUpForm />
        </div>

        {showBgrWrapper && (
          <div
            className={clsx({
              "flex h-full w-full items-center justify-center overflow-hidden rounded-4xl":
                isDesktop,
            })}>
            <picture>
              <source
                srcSet={`${heroDesk} 1x, ${heroDesk2x} 2x`}
                media="(min-width: 1280px)"
              />
              <source
                srcSet={`${heroMob} 1x, ${heroMob2x} 2x`}
                media="(max-width: 767px)"
              />
              <img
                src={heroDesk}
                alt="Read journey image"
                className={clsx({ "h-full w-full object-cover": isDesktop })}
              />
            </picture>
          </div>
        )}
      </div>
    </>
  );
};

export default SignUpPage;
