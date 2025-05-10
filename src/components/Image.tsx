import img1x from "../assets/images/book_cover.png";
import img2x from "../assets/images/book_cover@2x.png";

interface ImageProps {
  imgUrl: string;
  altText?: string;
  onClick?: () => void;
}
const Image = ({ imgUrl, altText = "", onClick }: ImageProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <div className="" onClick={handleClick}>
      <picture>
        <source srcSet={imgUrl ?? `${img1x} 1x, ${img2x} 2x`} />
        <img
          loading="lazy"
          className=""
          src={imgUrl || img1x}
          width={72}
          alt={`Photo of ${altText}`}
        />
      </picture>
      <div className=""></div>
    </div>
  );
};
export default Image;
