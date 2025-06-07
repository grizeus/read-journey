import { useState } from "react";
import Diary from "./Diary";
import Statistics from "./Statistics";
import clsx from "clsx";
import sprite from "../assets/sprite.svg";

type BtnType = "diary" | "statistics";

export default function Details() {
  const [activeBtn, setActiveBtn] = useState<BtnType>("diary");

  const onStatisticsClick = () => {
    setActiveBtn("statistics");
  };

  const onDiaryClick = () => {
    setActiveBtn("diary");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 md:items-center md:gap-5 lg:items-start lg:gap-4">
      <div className="flex justify-between items-center w-full">
        <h2 className="text-lg tracking-tight font-bold leading-none md:text-xl">
          {activeBtn === "diary" ? "Diary" : "Statistics"}
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onDiaryClick}
            className="flex h-10 w-10 items-center justify-center p-2 transition-colors focus:outline-none">
            <svg
              className={clsx(
                "hover:stroke-ivory size-6 transition-colors",
                activeBtn === "diary" ? "stroke-ivory" : "stroke-tarnished"
              )}>
              <use href={`${sprite}#icon-hourglass`}></use>
            </svg>
          </button>
          <button
            type="button"
            onClick={onStatisticsClick}
            className="flex h-10 w-10 items-center justify-center p-2 transition-colors focus:outline-none">
            <svg
              className={clsx(
                "hover:stroke-ivory size-6 transition-colors",
                activeBtn === "statistics" ? "stroke-ivory" : "stroke-tarnished"
              )}>
              <use href={`${sprite}?v=2#icon-pie-chart`}></use>
            </svg>
          </button>
        </div>
      </div>
      {activeBtn === "statistics" && (
        <p className="hidden text-tarnished text-sm lg:block">
          Each page, each chapter is a new round of knowledge, a new step
          towards understanding. By rewriting statistics, we create our own
          reading history.
        </p>
      )}
      <div
        className={clsx(
          "w-full rounded-xl bg-ebony",
          activeBtn === "diary" ? "px-4 md:px-5" : "p-5 flex flex-col justify-center items-center gap-5 md:p-7 xl:p-5 xl:gap-5 md:gap-4"
        )}>
        {activeBtn === "diary" ? <Diary /> : <Statistics />}
      </div>
    </div>
  );
}
