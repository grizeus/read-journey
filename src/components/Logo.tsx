import { Link } from "react-router";
import sprite from "../assets/sprite.svg";

const Logo = () => {
  return (
    <Link to="/login" className="flex gap-1">
      <svg className="h-[17px] w-10.5">
        <use href={`${sprite}#icon-logo`}></use>
      </svg>
      <span className="text-ivory hidden text-lg leading-none font-bold uppercase md:block">
        read journey
      </span>
    </Link>
  );
};

export default Logo;
