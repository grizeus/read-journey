
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
      <div className="rounded-lg overflow-hidden mb-2 cursor-pointer w-34 h-52">
        <img className="w-full h-full" src={img} alt={bookTitle} />
      </div>
      <h3 className="text-sm whitespace-nowrap overflow-hidden overflow-ellipsis w-34 mb-0.5 leading-4.5 tracking-tight">{bookTitle}</h3>
      <span className="text-2xs whitespace-nowrap overflow-hidden overflow-ellipsis w-34 leading-3 text-tarnished tracking-tight">{author}</span>
    </>
  );
}

export default RecommendedItem;
