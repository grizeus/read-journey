import { useState } from "react";
import css from "./Details.module.css";
import clsx from "clsx";
import Diary from "../Dairy/Dairy";
import Statistics from "../Statistics/Statistics";
import { useDeviceType } from "../../hooks/useDeviceType";

export default function Details() {
  const [activeBtn, setActiveBtn] = useState("diary");

  const onStatisticsClick = () => {
    setActiveBtn("statistics");
  };

  const onDiaryClick = () => {
    setActiveBtn("diary");
  };

  const deviceType = useDeviceType();

  const isDesktop = deviceType === "desktop";

  return (
    <div className={css.detailsContainer}>
      <div className={css.detailsTitleAndBtnWrapper}>
        <h2 className={css.detailsTitle}>
          {activeBtn === "diary" ? "Dairy" : "Statistics"}
        </h2>
        <div className={css.btnWrapper}>
          <Button
            type="button"
            variant="details"
            onClick={onDiaryClick}
            className={css.detailsBtn}>
            <svg
              width={28}
              height={28}
              className={clsx(
                css.detailsIcon,
                activeBtn === "diary" ? css.activeIcon : css.inactiveIcon
              )}>
              <use href="/sprite.svg?v=2#icon-hourglass"></use>
            </svg>
          </Button>
          <Button
            type="button"
            variant="details"
            onClick={onStatisticsClick}
            className={css.detailsBtn}>
            <svg
              width={28}
              height={28}
              className={clsx(
                css.detailsIcon,
                activeBtn === "statistics" ? css.activeIcon : css.inactiveIcon
              )}>
              <use href="/sprite.svg?v=2#icon-pie-chart"></use>
            </svg>
          </Button>
        </div>
      </div>
      {isDesktop && activeBtn === "statistics" && (
        <p className={css.statText}>
          Each page, each chapter is a new round of knowledge, a new step
          towards understanding. By rewriting statistics, we create our own
          reading history.
        </p>
      )}
      <div
        className={clsx(
          css.dairyAndStatContainer,
          activeBtn === "diary" ? css.dairyContainer : css.statContainer
        )}>
        {activeBtn === "diary" ? <Diary /> : <Statistics />}
      </div>
    </div>
  );
}
