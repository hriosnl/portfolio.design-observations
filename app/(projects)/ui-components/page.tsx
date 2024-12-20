"use client";

import { FadeIn } from "@/components/FadeIn";
import FluidTabs from "@/components/ui-components/FluidTabs";
import ImageStack from "@/components/ui-components/ImageStack";
import { useCurrentScreenSize } from "@/hooks/useBreakpoint";
export default function Elements() {
  const screenSize = useCurrentScreenSize();

  return (
    <main className="relative size-full">
      <div className="bg-[#0F0F0F] text-white fixed inset-0">
        {/* <div className="relative max-w-[600px] w-full top-[25%] left-[38%] space-y-5"> */}

        <div className="relative max-w-[600px] w-full top-[25%] left-20 space-y-5">
          <h2 className="text-8xl leading-none font-extralight">Components</h2>
          <div className="px-2">
            <p>
              A collection of UI elements that inspired me or were crafted by
              me.
            </p>
            <p>
              All are built with{" "}
              <a href="https://react.dev/" target="_blank" className="link">
                React
              </a>{" "}
              and{" "}
              <a href="https://motion.dev/" target="_blank" className="link">
                Motion
              </a>
              .
            </p>
          </div>
        </div>
      </div>
      <ElementsContainer />

      <div className="absolute top-10 left-[48%] text-orange-500 bg-white">
        size: {screenSize}
      </div>
      <FadeIn />
    </main>
  );
}

const ElementsContainer = () => {
  return (
    <div className="relative bg-[color:hsl(0,0%,98%)] top-[52%] w-full h-fit border border-y-[hsl(0,0%,90%)]">
      <Row1 />
      <Row2 />
      <Row3 />
      <RowGap />
    </div>
  );
};

const RowGap = () => {
  return (
    <div className="w-full flex justify-between h-[1.5vw]">
      <div className="w-[2.1vw] outline outline-1 outline-[hsl(0,0%,90%)]" />
      <div className="w-[1.5vw] outline outline-1 outline-[hsl(0,0%,90%)]" />
      <div className="w-[1.5vw] outline outline-1 outline-[hsl(0,0%,90%)]" />
      <div className="w-[1.5vw] outline outline-1 outline-[hsl(0,0%,90%)]" />
      <div className="w-[2.1vw] outline outline-1 outline-[hsl(0,0%,90%)]" />
    </div>
  );
};

const Box = ({
  children = null,
  square = true,
}: {
  children?: React.ReactNode;
  square?: boolean;
}) => {
  return (
    <div
      className={`
        relative border border-[hsl(0,0%,90%)]
        ${square ? "aspect-square" : ""}
        ${square ? "" : "col-span-2 row-span-1"}
        ${children !== null ? "bg-black" : "bg-[hsl(0,0%,98%)]"}
        `}
    >
      {children !== null && <Pattern />}
      {children}
    </div>
  );
};

const Row1 = () => {
  return (
    <div>
      <RowGap />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1.5vw",
          padding: "0 2.1vw",
        }}
      >
        <Box />
        <Box />
        <Box>
          <ImageStack />
        </Box>
        <Box />
      </div>
    </div>
  );
};

const Row2 = () => {
  return (
    <div>
      <RowGap />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1.5vw",
          padding: "0 2.1vw",
        }}
      >
        <Box square={false}>
          <FluidTabs />
        </Box>
        <Box />
        <Box />
      </div>
    </div>
  );
};

const Row3 = () => {
  return (
    <div>
      <RowGap />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1.5vw",
          padding: "0 2.1vw",
        }}
      >
        <Box />
        <Box />
        <Box />
        <Box />
      </div>
    </div>
  );
};

const Pattern = () => {
  const color = "hsl(0,0%,13%)";

  return (
    <div className="absolute inset-0 z-0">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="diagonal-pattern"
            patternUnits="userSpaceOnUse"
            width="4"
            height="4"
          >
            <g clip-path="url(#clip0)">
              <path d="M1 -1L5 3" stroke={color} stroke-width="0.5"></path>
              <path d="M-1 1L3 5" stroke={color} stroke-width="0.5"></path>
            </g>
          </pattern>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#diagonal-pattern)"
        ></rect>
      </svg>
    </div>
  );
};
