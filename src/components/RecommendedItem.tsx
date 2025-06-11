import defaultBook from "../assets/images/book-cover.png";

interface ItemProps {
  img: string | undefined;
  bookTitle: string;
  author: string;
  totalPages?: number;
  id?: string;
}

const RecommendedItem = ({ img, bookTitle, author }: ItemProps) => {
  return (
    <>
      <div className="mb-2 h-52 w-34 cursor-pointer overflow-hidden rounded-lg">
        <img
          className="h-full w-full"
          src={img || defaultBook}
          alt={bookTitle}
        />
      </div>
      <div className="flex flex-col gap-0.5">
        
      <h3 className="w-34 overflow-hidden text-sm leading-4.5 tracking-tight overflow-ellipsis whitespace-nowrap">
        {bookTitle}
      </h3>
      <span className="text-2xs text-tarnished w-34 overflow-hidden leading-3 tracking-tight overflow-ellipsis whitespace-nowrap">
        {author}
      </span>
      </div>
    </>
  );
};

export default RecommendedItem;
