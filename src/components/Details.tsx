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
      <div className="flex w-full items-center justify-between">
        <h2 className="text-lg leading-none font-bold tracking-tight md:text-xl">
          {activeBtn === "diary" ? "Diary" : "Statistics"}
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onDiaryClick}
            className="flex size-4 transition-colors focus:outline-none md:size-5">
            <svg
              className={clsx(
                "hover:stroke-ivory w-full transition-colors",
                activeBtn === "diary" ? "stroke-ivory" : "stroke-tarnished"
              )}>
              <use href={`${sprite}#icon-hourglass`}></use>
            </svg>
          </button>
          <button
            type="button"
            onClick={onStatisticsClick}
            className="flex size-4 transition-colors focus:outline-none md:size-5">
            <svg
              className={clsx(
                "hover:stroke-ivory size-4 transition-colors md:size-5",
                activeBtn === "statistics" ? "stroke-ivory" : "stroke-tarnished"
              )}>
              <use href={`${sprite}?v=2#icon-pie-chart`}></use>
            </svg>
          </button>
        </div>
      </div>
      {activeBtn === "statistics" && (
        <p className="text-tarnished hidden w-78 text-sm leading-4.5 xl:block">
          Each page, each chapter is a new round of knowledge, a new step
          towards understanding. By rewriting statistics, we create our own
          reading history.
        </p>
      )}
      <div
        className={clsx(
          "bg-ebony w-full rounded-xl",
          activeBtn === "diary"
            ? "px-4 md:px-5"
            : "flex flex-col items-center justify-center gap-5 p-5 md:gap-4 md:p-7 xl:gap-2.5 xl:p-5"
        )}>
        {activeBtn === "diary" ? <Diary /> : <Statistics />}
      </div>
    </div>
  );
}
