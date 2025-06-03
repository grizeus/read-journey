import { useSelector } from "react-redux";
import css from "./Statistics.module.css";
import { selectReadingBook } from "../../redux/books/selectors";
import { useEffect, useState } from "react";

export default function Statistics() {
  const book = useSelector(selectReadingBook);
  const progress = book?.progress || [];
  const completedProgress = progress.filter(
    entry =>
      entry.startReading &&
      entry.finishReading &&
      entry.startPage != null &&
      entry.finishPage != null
  );
  const totalPages = book?.totalPages || 1;

  const pagesRead = completedProgress.reduce((total, session) => {
    return total + Math.max(session.finishPage - session.startPage + 1, 0);
  }, 0);

  const percent = Math.min(pagesRead / totalPages, 1);

  const radius = 80;
  const strokeWidth = 20;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference * (1 - percent);

  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    setOffset(strokeDashoffset);
  }, [strokeDashoffset]);

  return (
    <>
      <div>
        <svg
          className={css.statChart}
          viewBox={`0 0 ${radius * 2} ${radius * 2}`}>
          <circle
            stroke="#1f1f1f"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            className={css.statProgressCircle}
            stroke="#30b94d"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            transform={`rotate(-90 ${radius} ${radius})`}
          />
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            className={css.statTotalPercent}>
            100%
          </text>
        </svg>
      </div>
      <div className={css.statInfoContainer}>
        <div className={css.statProgressMark}></div>
        <div className={css.statProgressContainer}>
          <p className={css.statProgressPercent}>
            {Math.round(percent * 100).toFixed(2)}%
          </p>
          <p className={css.statProgressPages}>{pagesRead} pages read</p>
        </div>
      </div>
    </>
  );
}
