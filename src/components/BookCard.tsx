import { useLocation } from "react-router";
import Image from "./Image";
import type { Book } from "./BookList";
import ellipsis from "../lib/utils/ellipsis";

interface BookCardProps {
  book: Book;
  size?: string;
}

const BookCard = ({ book, size = "" }: BookCardProps) => {
  const { _id, imageUrl, title, author } = book;
  const location = useLocation();
  const isLibrary = location.pathname === "/library";

  const handleDelete = (id: string) => {
    console.log(id);
  };
  return (
    <div className="flex flex-col gap-2">
      <Image
        imgUrl={imageUrl}
        size={size}
        altText={title}
        onClick={() => {}}
      />
      <div className="">
        <div className="flex flex-col gap-0.5 text-2xs leading-3 tracking-tight">
          <p className="font-bold">{ellipsis(title, 13)}</p>
          <p className="text-tarnished">{ellipsis(author, 13)}</p>
        </div>
        {isLibrary && size !== "small" && (
          <button
            type="button"
            onClick={() => {
              handleDelete(_id);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default BookCard;
