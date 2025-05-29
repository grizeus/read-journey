import bookPile from "../assets/images/books-quote.png";
import bookPile2x from "../assets/images/books-quote@2x.png";

const Quote = () => {
  return (
    <div className="bg-ebony hidden items-center gap-[14px] rounded-xl px-5 pt-4 pb-3.5 tracking-tight xl:flex">
      <picture>
        <source
          srcSet={`${bookPile} 1x, ${bookPile2x} 2x`}
          media="(min-width: 1280px)"
        />
        <img
          src={bookPile}
          width={40}
          height={40}
          alt="pile of books"
        />
      </picture>
      <p className="text-tarnished w-55 text-sm leading-4.5">
        "Books are <span className="text-ivory">windows</span> to the world, and
        reading is a journey into the unknown."
      </p>
    </div>
  );
};

export default Quote;
