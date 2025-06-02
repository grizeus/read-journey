import { useShouldRender } from "../hooks/useShouldRender";

import like from "../assets/images/like.png";
import like2x from "../assets/images/like@2x.png";
import mobLike from "../assets/images/like-mob.png";
import mobLike2x from "../assets/images/like-mob@2x.png";
import bookPile from "../assets/images/books-pile.png";
import bookPile2x from "../assets/images/books-pile@2x.png";
import mobBookPile from "../assets/images/books-pile-mob.png";
import mobBookPile2x from "../assets/images/books-pile-mob@2x.png";

const Info = () => {
  const isRecommendedPage = useShouldRender(["/recommended"]);
  const isMyLibraryPage = useShouldRender(["/library"]);
  const isMyReadingPage = useShouldRender([/^\/reading\/[^/]+$/]);

  return (
    <div className="mx-auto flex flex-col md:p-8 items-center justify-center gap-5 md:gap-8">
      {(isRecommendedPage || isMyLibraryPage) && (
        <picture>
          <source
            srcSet={`${like} 1x, ${like2x} 2x`}
            media="(min-width: 768px)"
            width="70"
            height="70"
          />
          <source
            srcSet={`${mobLike} 1x, ${mobLike2x} 2x`}
            media="(max-width: 767px)"
            width="50"
            height="50"
          />
          <img src={mobLike} alt="thumb up" width="50" height="50" />
        </picture>
      )}

      {isMyReadingPage && (
        <picture>
          <source
            srcSet={`${bookPile} 1x, ${bookPile2x} 2x`}
            media="(min-width: 768px)"
            width="70"
            height="70"
          />
          <source
            srcSet={`${mobBookPile} 1x, ${mobBookPile2x} 2x`}
            media="(max-width: 767px)"
            width="50"
            height="50"
          />
          <img src={mobBookPile} alt="pile of books" width="50" height="50" />
        </picture>
      )}

      {(isRecommendedPage || isMyLibraryPage) && (
        <div className="text-center">
          <h3 className="mb-2.5 text-lg leading-none md:mb-3.5 md:text-xl">
            Good job!
          </h3>
          <p className="max-w-60.5 text-sm leading-4.5 tracking-tight">
            <span className="text-tarnished">Your book is now in</span> the
            library!{" "}
            <span className="text-tarnished">
              The joy knows no bounds and now you can start your training
            </span>
          </p>
        </div>
      )}

      {isMyReadingPage && (
        <div className="text-center">
          <h3 className="mb-2.5 text-lg leading-none md:mb-3.5 md:text-xl">
            The book is read
          </h3>
          <p className="max-w-60.5 text-sm leading-none">
            <span className="text-tarnished">It was an</span> exciting journey
            <span className="text-tarnished">
              , where each page revealed new horizons, and the characters became
              inseparable friends.
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Info;
