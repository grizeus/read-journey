import clsx from "clsx";
import sprite from "../assets/sprite.svg";
import Navbar from "./NavBar";
interface MobileMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
  handleLogOut: () => void;
}

const MobileMenu = ({ isOpen, toggleMenu, handleLogOut }: MobileMenuProps) => {
  return (
    <div
      onClick={toggleMenu}
      className={clsx(
        "bg-midnight-black/60 fixed top-0 right-0 z-10 h-screen w-screen transition-all duration-350 md:hidden",
        isOpen ? "opacity-100" : "invisible opacity-0"
      )}>
      <div
        onClick={e => e.stopPropagation()}
        className={clsx(
          "bg-charcoal-black fixed top-0 right-0 z-20 flex h-screen w-1/2 flex-col items-center justify-between py-10 transition-all duration-350",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}>
        <button
          type="button"
          className="absolute top-[34px] right-10"
          onClick={toggleMenu}>
          <svg className="size-7 stroke-current">
            <use href={`${sprite}#icon-close`}></use>
          </svg>
        </button>

        <div className="flex flex-grow items-center">
          <Navbar />
        </div>

        <button
          type="button"
          className="border-ivory/20 rounded-4xl border px-7 py-3"
          onClick={handleLogOut}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default MobileMenu;
