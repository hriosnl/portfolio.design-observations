import { use, useEffect, useState } from "react";

type ScreenSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

const getMediaQuery = (screenSize: ScreenSize) => {
  switch (screenSize) {
    case "xs":
      return "(max-width: 640px)";
    case "sm":
      return "(min-width: 640px) and (max-width: 768px)";
    case "md":
      return "(min-width: 768px) and (max-width: 1024px)";
    case "lg":
      return "(min-width: 1024px)";
    case "xl":
      return "(min-width: 1280px) and (max-width: 1536px)";
    case "2xl":
      return "(min-width: 1536px)";
  }
};

const useBreakpoint = (screenSize: ScreenSize) => {
  const [isBreakpoint, setIsBreakpoint] = useState(false);
  const [currentScreenSize, setCurrentScreenSize] = useState<
    ScreenSize | "undefined"
  >("undefined");

  const checkScreenSize = () => {
    const screenSizes: ScreenSize[] = ["xs", "sm", "md", "lg", "xl", "2xl"];
    for (const size of screenSizes) {
      const query = getMediaQuery(size);
      if (window.matchMedia(query).matches) {
        setCurrentScreenSize(size);
        break;
      }
    }
  };

  useEffect(() => {
    const query = getMediaQuery(screenSize);

    const mediaQuery = window.matchMedia(query);
    const updateMatch = () => {
      setIsBreakpoint(mediaQuery.matches);
      checkScreenSize();
    };

    updateMatch();
    mediaQuery.addEventListener("change", updateMatch);

    return () => mediaQuery.removeEventListener("change", updateMatch);
  }, [screenSize]);

  return isBreakpoint;
};

export const useCurrentScreenSize = () => {
  const xs = useBreakpoint("xs");
  const sm = useBreakpoint("sm");
  const md = useBreakpoint("md");
  const lg = useBreakpoint("lg");
  const xl = useBreakpoint("xl");
  const xxl = useBreakpoint("2xl");

  return `${xs ? "xs, " : ""} ${sm ? "sm, " : ""} ${md ? "md, " : ""} ${
    lg ? "lg, " : ""
  } ${xl ? "xl, " : ""} ${xxl ? "2xl" : ""}`;
};

export default useBreakpoint;
