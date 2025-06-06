import { useState } from "react";
import Diary from "./Diary";
import Statistics from "./Statistics";
import clsx from "clsx";

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
    <div className="flex flex-col gap-6 p-5 md:p-6 lg:gap-8 lg:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold leading-8 text-white md:text-3xl">
          {activeBtn === "diary" ? "Dairy" : "Statistics"}
        </h2>
        <div className="flex gap-2">
          {/* variant details */}
          <button
            type="button"
            onClick={onDiaryClick}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-700 p-2 transition-colors hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800">
            <svg
              width={28}
              height={28}
              className={clsx(
                "h-6 w-6 transition-colors",
                activeBtn === "diary" ? "text-blue-400" : "text-gray-400"
              )}>
              <use href="/sprite.svg?v=2#icon-hourglass"></use>
            </svg>
          </button>
          <button
            type="button"
            onClick={onStatisticsClick}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-700 p-2 transition-colors hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800">
            <svg
              width={28}
              height={28}
              className={clsx(
                "h-6 w-6 transition-colors",
                activeBtn === "statistics" ? "text-blue-400" : "text-gray-400"
              )}>
              <use href="/sprite.svg?v=2#icon-pie-chart"></use>
            </svg>
          </button>
        </div>
      </div>
      {activeBtn === "statistics" && (
        <p className="hidden lg:block text-gray-300">
          Each page, each chapter is a new round of knowledge, a new step
          towards understanding. By rewriting statistics, we create our own
          reading history.
        </p>
      )}
      <div
        className={clsx(
          "rounded-2xl bg-gray-800 p-4 transition-all duration-300 md:p-6",
          activeBtn === "diary" ? "min-h-[400px]" : "min-h-[300px]"
        )}>
        {activeBtn === "diary" ? <Diary /> : <Statistics />}
      </div>
    </div>
  );
}
