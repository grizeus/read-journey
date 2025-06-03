import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import sprite from "../assets/sprite.svg";
import type { AppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import { selectStatus } from "../redux/filters/selectors";
import { setStatusFilter } from "../redux/filters/slice";
import { getOwnBooks } from "../redux/books/operations";

export const Option = {
  unread: "Unread",
  "in-progress": "In progress",
  done: "Done",
  all: "All books",
} as const;

export type OptionKey = keyof typeof Option;
export type OptionValue = (typeof Option)[OptionKey];

const getKeyByValue = (value: string): OptionKey => {
  return (
    (Object.keys(Option) as Array<OptionKey>).find(
      key => Option[key] === value
    ) || "all"
  );
};

const LibFilter = () => {
  const status = useSelector(selectStatus);
  const dispatch = useDispatch<AppDispatch>();
  const [curFilter, setFilter] = useState<OptionKey>(
    status ? getKeyByValue(status) : "all"
  );
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const handleFilterChange = (value: OptionValue) => {
    const key = getKeyByValue(value);
    dispatch(setStatusFilter(Option[key]));
    setFilter(key);
    setIsOpen(false);
  };

  useEffect(() => {
    dispatch(getOwnBooks(curFilter));
  }, [dispatch, curFilter]);

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

  return (
    <>
      <div ref={dropDownRef} className="relative w-30 cursor-pointer md:w-38">
        <button
          className="border-ivory/30 flex w-full items-center justify-between rounded-xl border px-3.5 py-3 transition-colors duration-300 ease-in-out focus:outline-none md:p-3.5"
          onClick={toggleDropdown}>
          <div className="text-base leading-5 font-medium">
            {Option[curFilter]}
          </div>
          <svg
            className={`size-5 transition-transform duration-300 ease-in-out ${isOpen ? "rotate-180" : ""} stroke- fill-transparent`}>
            <use href={`${sprite}#icon-chevron-down`}></use>
          </svg>
        </button>
        {isOpen && (
          <div className="bg-ebony absolute left-0 z-1 mt-2 flex h-54 w-full flex-col gap-2 rounded-xl px-4.5 py-3.5 shadow-[0_20px_69px_0_rgba(0,0,0,0.07]">
            {(Object.entries(Option) as [OptionKey, OptionValue][]).map(
              ([key, value]) => (
                <div
                  key={key}
                  onClick={() => handleFilterChange(value)}
                  className={`text-base leading-5 ${curFilter === key ? "text-ivory" : "text-tarnished"}`}>
                  {value}
                </div>
              )
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default LibFilter;
