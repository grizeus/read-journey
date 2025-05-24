import { useEffect, useRef, useState } from "react";
import sprite from "../assets/images/sprite.svg";

const options = ["Unread", "In progress", "Done", "All books"];
const LibFilter = () => {
  const [curFilter, setFilter] = useState("All books");
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: string) => {
    setFilter(option);
    setIsOpen(false);
  };
  return (
    <>
      <div ref={dropDownRef} className="relative w-56.5 cursor-pointer">
        <button
          className="border border-ivory/30 rounded-xl flex w-full items-center justify-between gap-8 py-3.5 pr-3.5 pl-4.5 transition-colors duration-300 ease-in-out focus:outline-none"
          onClick={toggleDropdown}>
          <div className="text-snow text-base leading-5 font-medium">
            {curFilter}
          </div>
          <svg
            className={`size-5 transition-transform duration-300 ease-in-out ${isOpen ? "rotate-180" : ""} stroke- fill-transparent`}>
            <use href={`${sprite}#icon-chevron-down`}></use>
          </svg>
        </button>
        {isOpen && (
          <div className="rounded-xl absolute left-0 z-1 mt-2 flex h-54 w-full flex-col gap-2 bg-ebony px-4.5 py-3.5 shadow-[0_20px_69px_0_rgba(0,0,0,0.07]">
            {Array.isArray(options) &&
              options.map((option, i) => (
                <div
                  key={i}
                  onClick={() => handleOptionClick(option)}
                  className={`text-base leading-5 ${curFilter === option ? "text-ivory" : "text-tarnished"}`}>
                  {option}
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default LibFilter;
