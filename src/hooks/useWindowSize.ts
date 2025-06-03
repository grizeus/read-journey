import { useState, useEffect } from "react";

type WindowSize = "mobile" | "tablet" | "desktop";

export const useWindowSize = () => {
  const getWindowWidth = (): WindowSize => {
    if (window.innerWidth < 768) {
      return "mobile";
    } else if (window.innerWidth < 1280) {
      return "tablet";
    } else {
      return "desktop";
    }
  };

  const [windowSize, setWindowSize] = useState(getWindowWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getWindowWidth());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
};
