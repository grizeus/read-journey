import clsx from "clsx";
import sprite from "../assets/images/sprite.svg";
import Navbar from "./NavBar";
interface MobileMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
  handleLogOut: () => void;
}

const MobileMenu = ({ isOpen, toggleMenu, handleLogOut }: MobileMenuProps) => {
  return (
    <div
      className={clsx(
        "bg-overlay fixed top-0 right-0 z-40 h-screen w-screen transition-all duration-350 md:hidden",
        isOpen ? "opacity-100" : "invisible opacity-0"
      )}>
      <div
        className={clsx(
          "bg-dark-grey fixed top-0 right-0 z-50 flex h-screen w-1/2 flex-col items-center justify-between py-[40px] transition-all duration-350",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}>
        <button
          type="button"
          className="absolute top-[34px] right-[40px]"
          onClick={toggleMenu}>
          <svg className="size-7">
            <use href={`${sprite}#icon-close-menu`}></use>
          </svg>
        </button>

        <div className="flex flex-grow items-center">
          <Navbar />
        </div>

        <button type="button" className="" onClick={handleLogOut}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default MobileMenu;
