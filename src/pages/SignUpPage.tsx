import SignUpForm from "../components/SignUpForm";
import DocumentTitle from "../components/DocumentTitle";
import Logo from "../components/Logo";
import heroDesk from "../assets/images/hero-desktop.png";
import heroDesk2x from "../assets/images/hero-desktop@2x.png";
import heroMob from "../assets/images/hero-mob.png";
import heroMob2x from "../assets/images/hero-mob@2x.png";

const SignUpPage = () => {
  return (
    <>
      <DocumentTitle>ReadJourney — SignUp</DocumentTitle>
      <div className="grid grid-cols-1 gap-2.5 p-5 md:p-8 lg:gap-4 xl:grid-cols-2">
        <div className="bg-charcoal-black rounded-4xl p-5 pb-10 md:px-16 md:pt-10 md:pb-53.5 xl:pb-10">
          <nav className="">
            <Logo />
          </nav>
          <SignUpForm />
        </div>

        <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-4xl md:hidden xl:flex">
          <picture className="h-full w-full object-cover">
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
              className="h-full w-full object-cover"
            />
          </picture>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
