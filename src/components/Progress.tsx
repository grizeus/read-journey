import { useSelector } from "react-redux";
import { selectReadingBook } from "../redux/books/selectors";
import { getBookStatus } from "../lib/utils";
import Details from "./Details";

import starImage from "../assets/images/star.png";
import starImage2x from "../assets/images/star@2x.png";
import starImageMob from "../assets/images/star-mob.png";
import starImageMob2x from "../assets/images/star-mob@2x.png";

const Progress = () => {
  const book = useSelector(selectReadingBook);
  const bookStatus = getBookStatus(book);

  return (
    <div className="progressContainer w-full">
      {bookStatus.status === null || !bookStatus.isBookStarted ? (
        <>
          <h2 className="self-start mb-3.5 text-lg leading-none md:text-xl">
            Progress
          </h2>
          <p className="mb-5 text-tarnished tracking-tight text-sm leading-4.5">
            Here you will see when and how much you read. To record, click on
            the red button above.
          </p>
          <div className="bg-ebony mx-auto mb-5 flex size-20 items-center justify-center rounded-full md:size-25">
            <picture>
              <source
                srcSet={`${starImage} 1x, ${starImage2x} 2x`}
                media="(min-width: 768px)"
                width="50"
                height="70"
              />

              <source
                srcSet={`${starImageMob} 1x, ${starImageMob2x} 2x`}
                media="(max-width: 767px)"
                width="32"
                height="32"
              />
              <img
                src={starImage}
                alt="golden star image"
                width="32"
                height="32"
              />
            </picture>
          </div>
        </>
      ) : (
        <Details />
      )}
    </div>
  );
};

export default Progress;
