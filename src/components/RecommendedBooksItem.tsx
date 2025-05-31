interface ItemProps {
  img: string;
  bookTitle: string;
  author: string;
}

const RecommendedBooksItem = ({ img, bookTitle, author }: ItemProps) => {
  return (
    <>
      <div className="mb-2 h-27 w-18 cursor-pointer overflow-hidden rounded-lg">
        <img className="h-full w-full" src={img} alt={bookTitle} />
      </div>
      <h3 className="mb-0.5 w-18 overflow-hidden text-2xs leading-3 tracking-tight overflow-ellipsis whitespace-nowrap">
        {bookTitle}
      </h3>
      <p className="text-2xs text-tarnished w-18 overflow-hidden leading-3 tracking-tight overflow-ellipsis whitespace-nowrap">
        {author}
      </p>
    </>
  );
};

export default RecommendedBooksItem;
