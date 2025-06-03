import clsx from "clsx";
import { CircleLoader } from "react-spinners";

const defaultColor = "#F9F9F9";

interface LoaderProps {
  color?: string;
  className?: string;
}

const Loader = ({ color = defaultColor, className = "" }: LoaderProps) => {
  return (
    <div className={clsx("flex items-center justify-center", className)}>
      <CircleLoader size={80} color={color} />
    </div>
  );
};

export default Loader;
