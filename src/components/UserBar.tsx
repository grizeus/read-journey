import { useState } from "react";
import sprite from "../assets/sprite.svg";
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
      <div className="flex items-center gap-2.5 md:gap-4">
        <div className="leading-4.5 font-bold lg:flex lg:items-center lg:gap-2">
          <div className="border-ivory/20 flex size-9 items-center justify-center rounded-full border md:size-10">
            <span>{[...name][0]}</span>
          </div>
          <p className="hidden xl:block">{name}</p>
        </div>

        <button type="button" className="md:hidden" onClick={toggleMenu}>
          <svg className="stroke-ivory size-7">
            <use href={`${sprite}#icon-menu`}></use>
          </svg>
        </button>

        <button
          type="button"
          className="border-ivory/20 hidden rounded-4xl border px-7 py-3 md:block"
          onClick={handleLogOut}>
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
