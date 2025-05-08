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
      <ul className="flex items-center gap-8 xl:gap-10">
        {navList.map(({ name, path }) => (
          <li key={name} className="mb-5">
            <NavLink
              to={path}
              className={({ isActive }) =>
                clsx(
                  "relative inline-block text-lg leading-none font-bold",
                  isActive
                    ? "after:bg-royal text-current after:absolute after:left-1/2 after:h-[3px] after:w-full after:-translate-x-1/2 after:rounded-lg after:content-[''] md:after:-bottom-[4px]"
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
