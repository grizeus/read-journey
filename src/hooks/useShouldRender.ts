import { useLocation } from "react-router";

export const useShouldRender = (allowedPaths: (string | RegExp)[]) => {
  const location = useLocation();
  return allowedPaths.some(path =>
    typeof path === "string"
      ? location.pathname === path
      : path.test(location.pathname)
  );
};
