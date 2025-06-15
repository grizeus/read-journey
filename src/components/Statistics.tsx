import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { selectReadingBook } from "../redux/books/selectors";
import type { Progress } from "../types";

export default function Statistics() {
  const book = useSelector(selectReadingBook);
  const progress: Progress[] = book?.progress || [];
  const completedProgress = progress.filter(
    (entry: Progress) =>
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
      <div className="flex size-29 items-center justify-center md:size-34.5 xl:size-47.25">
        <svg className="rounded-xl xl:size-42" viewBox={`0 0 ${radius * 2} ${radius * 2}`}>
          <circle
            stroke="#1f1f1f"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            className="ease transition-[stroke-dashoffset] duration-800"
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
            className="fill-ivory text-lg leading-5 font-bold md:text-xl md:leading-none">
            100%
          </text>
        </svg>
      </div>
      <div className="flex items-start gap-4">
        <div className="bg-neon size-3.5 rounded-sm"></div>
        <div className="flex flex-col gap-1 md:gap-2">
          <p className="text-ivory text-sm leading-4.5 md:text-xl md:leading-none">
            {Math.round(percent * 100).toFixed(2)}%
          </p>
          <p className="text-2xs text-tarnished leading-3 md:text-xs md:leading-3.5">
            {pagesRead} pages read
          </p>
        </div>
      </div>
    </>
  );
}

