import img1x from "../assets/images/book_cover.png";
import img2x from "../assets/images/book_cover@2x.png";

interface ImageProps {
  imgUrl: string;
  width?: number;
  altText?: string;
  onClick?: () => void;
}

const Image = ({ imgUrl, width = 72, altText = "", onClick }: ImageProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <div
      className="h-27 w-18 overflow-hidden rounded-lg"
      onClick={handleClick}>
      <img
        loading="lazy"
        srcSet={imgUrl ?? `${img1x} 1x, ${img2x} 2x`}
        className="w-full object-cover"
        src={imgUrl || img1x}
        width={width}
        alt={`Photo of ${altText}`}
      />
    </div>
  );
};

export default Image;
