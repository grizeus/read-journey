import { useState } from "react";
import sprite from "../assets/images/sprite.svg";

const RecommededMain = () => {
  const [page, setPage] = useState(1);
  const totalPages = 10;

  const handleClick = (curPage: number) => {
    if (curPage < 1) {
      curPage = 1;
    }
    setPage(curPage);
  };
  return (
    <div className="min-w-84 bg-charcoal-black w-full rounded-4xl px-5 py-10">
      <div className="flex items-center justify-between mb-5.5 md:mb-5">
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
      <div>books</div>
    </div>
  );
};

export default RecommededMain;
