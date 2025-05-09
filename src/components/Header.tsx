import sprite from "../assets/images/sprite.svg";
import Navbar from "./NavBar";
import UserBar from "./UserBar";

const Header = () => {
  console.log(sprite);
  return (
    <header className="px-5 lg:px-8 pt-5 pb-2.5 md:pb-4 lg:pt-8">
      <div className="bg-charcoal-black py-3 md:py-4 px-5 md:px-4 flex items-center justify-between rounded-2xl">
        <div className="flex gap-1">
          <svg className="h-[17px] w-[42px]">
            <use href={`${sprite}#icon-logo`}></use>
          </svg>
          <span className="text-ivory text-lg leading-none font-bold uppercase">
            read journey
          </span>
        </div>
        <Navbar outerClass="hidden md:block" />
        <UserBar />
      </div>
    </header>
  );
};

export default Header;
