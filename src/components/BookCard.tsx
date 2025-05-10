import { useLocation } from "react-router";
import Image from "./Image";
import type { Book } from "./BookList";

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
    <div className="">
      <Image imgUrl={imageUrl} altText={title} onClick={() => {}} />
      <div className="">
        <div className="">
          <p className="">{title}</p>
          <p className="">{author}</p>
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
