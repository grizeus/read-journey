import { useEffect, useState } from "react";
import sprite from "../assets/images/sprite.svg";
import recBooks from "../lib/utils/recBooks.json";
import type { Book } from "./RecommendedBooks";
import BooksList from "./BookList";

const books: Book[] = recBooks as Book[];

const RecommededMain = () => {
  const [page, setPage] = useState(1);
  const totalPages = 10;
  const [maxElem, setMaxElem] = useState(2);

  const handleClick = (curPage: number) => {
    if (curPage < 1) {
      curPage = 1;
    }
    setPage(curPage);
  };
  useEffect(() => {
    const updateMaxElem = () => {
      const curWidth = window.innerWidth;
      if (curWidth >= 1280) {
        setMaxElem(10);
      } else if (curWidth >= 768) {
        setMaxElem(8);
      } else {
        setMaxElem(2);
      }
    };
    updateMaxElem();
    window.addEventListener('resize', updateMaxElem);
    return () => window.removeEventListener('resize', updateMaxElem);
  }, []);
  return (
    <div className="bg-charcoal-black w-full min-w-84 rounded-4xl px-5 py-10 md:px-10">
      <div className="mb-5.5 flex items-center justify-between md:mb-5">
        <h1 className="text-xl leading-none font-bold tracking-tight md:text-[28px] md:leading-8 md:tracking-wide">
          Recommended
        </h1>
        <ul className="flex items-center gap-[8px]">
          <li className="border-tarnished flex size-10 items-center justify-center rounded-full border">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => handleClick(page - 1)}
              className={page === 1 ? "fill-tarnished" : "fill-ivory"}>
              <svg className="size-5">
                <use href={`${sprite}#icon-chevron-left`}></use>
              </svg>
            </button>
          </li>
          <li className="border-tarnished flex size-10 items-center justify-center rounded-full border">
            <button
              type="button"
              disabled={page === totalPages}
              onClick={() => handleClick(page + 1)}
              className={page === totalPages ? "fill-tarnished" : "fill-ivory"}>
              <svg className="size-5">
                <use href={`${sprite}#icon-chevron-right`}></use>
              </svg>
            </button>
          </li>
        </ul>
      </div>
      <BooksList books={books} size="big" maxElem={maxElem} />
    </div>
  );
};

export default RecommededMain;
