import { NavLink } from "react-router";
import clsx from "clsx";

const navList = [
  {
    name: "Home",
    path: "/recommended",
  },
  {
    name: "My library",
    path: "/library",
  },
];

const Navbar = ({ outerClass = "" }) => {
  return (
    <nav className={outerClass}>
      <ul className="flex md:h-6.5 flex-col gap-8 md:flex-row xl:gap-10">
        {navList.map(({ name, path }) => (
          <li key={name} className="mb-5">
            <NavLink
              to={path}
              className={({ isActive }) =>
                clsx(
                  "relative inline-block text-base leading-4.5 font-bold md:text-base",
                  isActive
                    ? "after:bg-royal text-current after:absolute after:-bottom-2 after:left-1/2 after:h-[3px] after:w-full after:-translate-x-1/2 after:rounded-lg after:content-[''] md:after:-bottom-3"
                    : "text-tarnished"
                )
              }>
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
