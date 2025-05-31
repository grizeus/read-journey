interface ItemProps {
  img: string;
  bookTitle: string;
  author: string;
  totalPages?: number;
  id?: string;
}

const RecommendedItem = ({ img, bookTitle, author }: ItemProps) => {
  return (
    <>
      <div className="mb-2 h-52 w-34 cursor-pointer overflow-hidden rounded-lg">
        <img className="h-full w-full" src={img} alt={bookTitle} />
      </div>
      <h3 className="mb-0.5 w-34 overflow-hidden text-sm leading-4.5 tracking-tight overflow-ellipsis whitespace-nowrap">
        {bookTitle}
      </h3>
      <span className="text-2xs text-tarnished w-34 overflow-hidden leading-3 tracking-tight overflow-ellipsis whitespace-nowrap">
        {author}
      </span>
    </>
  );
};

export default RecommendedItem;
