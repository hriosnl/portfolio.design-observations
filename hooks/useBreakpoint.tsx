import { useEffect, useState } from "react";

type ScreenSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
// type ScreenSize = "xs" | "sm" | "md" | "lg";

const getMediaQuery = (screenSize: ScreenSize) => {
  switch (screenSize) {
    case "xs":
      return "(max-width: 640px)";
    case "sm":
      return "(min-width: 640px) and (max-width: 768px)";
    case "md":
      return "(min-width: 768px) and (max-width: 1024px)";
    case "lg":
      // return "(min-width: 1024px)";
      return "(min-width: 1024px) and (max-width: 1280px)";
    case "xl":
      return "(min-width: 1280px) and (max-width: 1536px)";
    case "2xl":
      return "(min-width: 1536px)";
  }
};

const useBreakpoint = (screenSize: ScreenSize) => {
  const [isBreakpoint, setIsBreakpoint] = useState(false);

  useEffect(() => {
    const query = getMediaQuery(screenSize);

    const mediaQuery = window.matchMedia(query);
    const updateMatch = () => setIsBreakpoint(mediaQuery.matches);

    updateMatch();
    mediaQuery.addEventListener("change", updateMatch);

    return () => mediaQuery.removeEventListener("change", updateMatch);
  }, [screenSize]);

  return isBreakpoint;
};

export default useBreakpoint;
