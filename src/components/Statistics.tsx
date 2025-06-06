import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { selectReadingBook } from "../redux/books/selectors";

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
          className="size-29 md:size-34.5 xl:size-42 rounded-xl"
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
            className="transition-[stroke-dashoffset] duration-800 ease"
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
            className="font-bold md:text-xl md:leading-none text-lg leading-5 fill-ivory">
            100%
          </text>
        </svg>
      </div>
      <div className="flex gap-4">
        <div className="size-3.5 bg-neon rounded-sm"></div>
        <div className="md:gap-2 flex flex-col gap-1">
          <p className="text-sm text-ivory">
            {Math.round(percent * 100).toFixed(2)}%
          </p>
          <p className="text-2xs leading-3 text-tarnished md:text-xs md:leading-3.5">{pagesRead} pages read</p>
        </div>
      </div>
    </>
  );
}

