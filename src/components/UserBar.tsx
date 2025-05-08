import { useState } from "react";
import sprite from "../assets/images/sprite.svg";
import MobileMenu from "./MobileMenu";

const UserBar = () => {
  const name = "Ivan";
  const [isOpen, setIsOpen] = useState(false);
  const handleLogOut = () => {
    console.log("log out");
  };
  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };
  return (
    <>
      <div className="flex items-center gap-[10px] md:gap-[16px]">
        <div className="lg:flex lg:items-center lg:gap-[8px]">
          <div className="border-grey-20 bg-dark-grey flex h-[35px] w-[35px] items-center justify-center rounded-full border md:h-[40px] md:w-[40px]">
            <span className="font-gilroy-bold leading-none tracking-[-0.32px] md:leading-[1.13]">
              {[...name][0]}
            </span>
          </div>
          <p className="font-gilroy-bold hidden leading-[1.13] tracking-[-0.32px] lg:block">
            {name}
          </p>
        </div>

        <button type="button" className="md:hidden" onClick={toggleMenu}>
          <svg className="stroke-ivory size-7">
            <use href={`${sprite}#icon-open-menu`}></use>
          </svg>
        </button>

        <button type="button" className="" onClick={handleLogOut}>
          Log out
        </button>
      </div>

      <MobileMenu
        isOpen={isOpen}
        toggleMenu={toggleMenu}
        handleLogOut={handleLogOut}
      />
    </>
  );
};

export default UserBar;
