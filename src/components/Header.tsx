import sprite from "../assets/images/sprite.svg";
import Navbar from "./NavBar";
import UserBar from "./UserBar";

const Header = () => {
  console.log(sprite);
  return (
    <header>
      <div className="bg-charcoal-black flex items-center justify-between rounded-2xl px-4 py-7">
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
