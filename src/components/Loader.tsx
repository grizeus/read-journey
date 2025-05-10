import clsx from "clsx";
import { CircleLoader } from "react-spinners";

interface LoaderProps {
  className: string;
}

const color = "#F9F9F9";

const Loader = ({ className }: LoaderProps) => {
  return (
    <div className={clsx("flex items-center justify-center", className)}>
      <CircleLoader size={80} color={color} />
    </div>
  );
};

export default Loader;
