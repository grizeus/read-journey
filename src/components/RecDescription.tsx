import { Link } from "react-router";
import sprite from "../assets/sprite.svg";

const RecDescription = () => {
  return (
    <div className="bg-ebony rounded-xl p-5">
      <h3 className="mb-5 text-lg leading-none font-bold tracking-tight md:mb-10 md:text-xl">
        Start your workout
      </h3>

      <div className="mb-5 flex flex-col gap-5">
        <div className="flex gap-3">
          <span className="bg-ivory text-charcoal-black flex size-10 shrink-0 items-center justify-center rounded-full text-lg font-bold">
            1
          </span>
          <p className="max-w-49 text-sm leading-4.5 tracking-tight">
            Create a personal library:{" "}
            <span className="text-tarnished">
              add the books you intend to read to it.
            </span>
          </p>
        </div>

        <div className="flex gap-3">
          <span className="bg-ivory text-charcoal-black flex size-10 shrink-0 items-center justify-center rounded-full text-lg font-bold">
            2
          </span>
          <p className="max-w-49 text-sm leading-4.5 tracking-tight">
            Create your first workout:{" "}
            <span className="text-tarnished">
              define a goal, choose a period, start training.
            </span>
          </p>
        </div>
      </div>
      <Link className="flex items-center justify-between" to="/library">
        <span className="text-tarnished text-sm leading-4.5 tracking-tight underline">
          My library
        </span>
        <div className="size-6 stroke-current">
          <svg className="h-full w-full" aria-label="arrow icon">
            <use href={`${sprite}#icon-arrow-right`} />
          </svg>
        </div>
      </Link>
    </div>
  );
};

export default RecDescription;
