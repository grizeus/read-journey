import clsx from "clsx";
import img1x from "../assets/images/book_cover.png";
import img2x from "../assets/images/book_cover@2x.png";

interface ImageProps {
  imgUrl: string;
  size?: string;
  altText?: string;
  onClick?: () => void;
}

const Image = ({ imgUrl, size = "small", altText = "", onClick }: ImageProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <div
      className={clsx(
        "overflow-hidden rounded-lg",
        size === "small" ? "h-27 w-18" : "h-50 w-34"
      )}
      onClick={handleClick}>
      <img
        loading="lazy"
        srcSet={imgUrl ?? `${img1x} 1x, ${img2x} 2x`}
        className="w-full h-full "
        src={imgUrl || img1x}
        alt={`Photo of ${altText}`}
      />
    </div>
  );
};

export default Image;
