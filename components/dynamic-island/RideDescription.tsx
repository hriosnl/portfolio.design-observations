"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Image from "next/image";

import useBreakpoint from "@/hooks/useBreakpoint";

export function RideDescription() {
  const [isRearLightsOn, setIsRearLighstOn] = useState(false);
  const [isHeadlightsOn, setIsHeadlightsOn] = useState(true);
  const [showImageName, setShowImageName] = useState(false);

  useEffect(() => {
    console.log("isRearLightsOn", isRearLightsOn);
  }, [isRearLightsOn]);

  return (
    <>
      <div className="w-full flex flex-col lg:flex-row justify-center items-center lg:pr-6 select-none">
        <ZoomedRide
          isRearLightsOn={isRearLightsOn}
          isHeadlightsOn={isHeadlightsOn}
          showImageName={showImageName}
        />
        <LightButtons
          toggleRearLights={(isOn: boolean) => setIsRearLighstOn(isOn)}
          toggleHeadlights={() => setIsHeadlightsOn(!isHeadlightsOn)}
          headlightsIsOn={isHeadlightsOn}
        />
      </div>

      <h1 className="text-[2.5rem] font-light text-white">Ride</h1>

      <main className="text-[#f5f6f4] space-y-7 pt-8 pb-24">
        <p>
          I&apos;m not particularly comfortable working with SVGs, but I decided
          to use it for the map because I&apos;m too lazy to draw it using
          several <span className="font-mono">divs</span>.
        </p>

        <p>
          For hours, I was stuck deciding whether to draw the car with SVG as
          well, since that would mean learning more unknown SVG properties.
          Fortunately, my lazy brain came up with a solution: I simply cropped
          and upscaled an{" "}
          <button
            className="dashed-link"
            onPointerOver={() => setShowImageName(true)}
            onPointerOut={() => setShowImageName(false)}
          >
            image of the car
          </button>{" "}
          instead. I had to accept that I didn&apos;t need to understand every
          detail, and the cropped image worked just fine.
        </p>

        <p>
          The most fun part of creating this was synchronizing the timing of the
          different animation elements—the car entrance, the glowing of the rear
          lights, and the appearance of the &apos;Arrived&apos; label.
        </p>
        <p>
          This is my favorite among the four types of Live Activities I made.
        </p>
      </main>
    </>
  );
}

function ZoomedRide({
  isRearLightsOn,
  isHeadlightsOn,
  showImageName,
}: {
  isRearLightsOn: boolean;
  isHeadlightsOn: boolean;
  showImageName: boolean;
}) {
  return (
    <motion.div
      initial={{ filter: "blur(6px)" }}
      animate={{ filter: "blur(0px)" }}
      transition={{ duration: 0.5 }}
      style={{
        boxShadow: "0 0 15px 2px rgba(69, 68, 69, 0.5)",
      }}
      className="shrink-0 border-2 border-white flex items-center w-96 h-44 lg:w-[29rem] lg:h-72 rounded-md lg:rounded-full overflow-hidden mx-auto"
    >
      <Road>
        <div className="absolute bottom-1 w-full h-16 flex flex-col justify-center">
          <Path />
          <Car
            isRearLightsOn={isRearLightsOn}
            isHeadlightsOn={isHeadlightsOn}
            showImageName={showImageName}
          />
        </div>
      </Road>
    </motion.div>
  );
}

const LightButtons = ({
  toggleRearLights,
  toggleHeadlights,
  headlightsIsOn,
}: {
  toggleRearLights: (isOn: boolean) => void;
  toggleHeadlights: () => void;
  headlightsIsOn: boolean;
}) => {
  return (
    <div className="w-full lg:w-fit flex items-end justify-center gap-5 py-6 lg:py-0">
      <motion.button
        onClick={toggleHeadlights}
        initial={{
          color: "#47473f",
          boxShadow: "0 0 3px 1px rgba(255, 255, 176, 0.5)",
        }}
        animate={{
          color: headlightsIsOn ? "#ffffb0" : "#47473f",
          boxShadow: headlightsIsOn
            ? "0 0 5px 1px rgba(255, 255, 176, 0.7)"
            : "0 0 2px 1px rgba(255, 255, 176, 0.3)",
        }}
        whileHover={{ color: headlightsIsOn ? "#ffffb0" : "#9c9c78" }}
        whileTap={{ scale: 0.97 }}
        className="size-[3.7rem] lg:size-12 bg-black  rounded-2xl flex justify-center items-center"
      >
        <svg
          width="1.4375rem"
          height="1.4375rem"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Light_Icon">
            <path
              d="M6 14C2.68629 14 0 11.3137 0 8C0 4.68629 2.68629 2 6 2H9V14H6Z"
              fill="currentColor"
            />
            <path d="M11 4H16V2H11V4Z" fill="currentColor" />
            <path d="M11 9H16V7H11V9Z" fill="currentColor" />
            <path d="M11 14H16V12H11V14Z" fill="currentColor" />
          </g>
        </svg>
      </motion.button>

      <motion.button
        onPointerDown={() => toggleRearLights(true)}
        onPointerUp={() => toggleRearLights(false)}
        style={{
          boxShadow: "0 0 4px 2px rgba(255, 177, 177, 0.5)",
        }}
        whileHover={{
          scale: 0.98,
        }}
        whileTap={{
          scale: 0.95,
          boxShadow: "0 0 3px 1px rgba(255, 177, 177, 0.1)",
        }}
        className="size-16 lg:size-12 rounded-2xl bg-black flex justify-center items-center"
      >
        <span className="text-sm lg:text-xs text-red-600 font-medium">
          Brake
        </span>
        {/* <div className="size-6 border border-[#ff2929] rounded-md flex flex-col justify-center items-center gap-y-1">
          <div className="w-full h-fit flex justify-between px-[5px]">
            <span className="size-[2px] bg-[#ff2929] rounded-full" />
            <span className="size-[2px] bg-[#ff2929] rounded-full" />
          </div>
          <div className="w-[56%] h-[2px] bg-[#ff2929] rounded-full" />
          <div className="w-[68%] h-[2px] bg-[#ff2929] rounded-full" />
        </div> */}
      </motion.button>
    </div>
  );
};

const PedestrianLane = () => {
  return (
    <div className="w-full h-full flex flex-col justify-evenly items-end py-1 pr-6">
      <div className="h-3 w-16 bg-[#5b626e]" />
      <div className="h-3 w-16 bg-[#5b626e]" />
      <div className="h-3 w-16 bg-[#5b626e]" />
      <div className="h-3 w-16 bg-[#5b626e]" />
    </div>
  );
};

const Road = ({ children }: { children?: React.ReactNode }) => {
  return (
    // <div className="h-64 flex flex-col justify-center">
    <div className="w-full h-72 flex flex-col justify-center">
      <div className="w-full grow flex relative bg-[#1E6063]">
        <div className="w-[80%] bg-[#226982] rounded-br-md" />
      </div>

      <div className="h-[12rem] w-full flex flex-col">
        <div className="w-full bg-[#1E6063] basis-[21%]" />

        <div className="w-full grow bg-[#262e38] relative">
          <PedestrianLane />
          {children}
        </div>

        <div className="w-full bg-[#455C78] basis-[14%]" />
      </div>

      <div className="w-full grow bg-[#455C78] flex justify-between pr-4 pt-2">
        <div className="w-[63%] bg-[#597799] rounded-t-md" />
        <div className="w-[30%] bg-[#597799] rounded-t-md flex justify-center relative">
          <div className="absolute -top-3 w-10 h-6 bg-[#597799] rounded-sm" />
        </div>
      </div>
    </div>
  );
};

const Path = () => {
  return (
    <div className="absolute w-full h-7 bg-[#367bef] outline outline-4 outline-[#62a4f3]" />
  );
};

const Car = ({
  isRearLightsOn,
  isHeadlightsOn,
  showImageName,
}: {
  isRearLightsOn: boolean;
  isHeadlightsOn: boolean;
  showImageName: boolean;
}) => {
  const isLargeScreen = useBreakpoint("lg");

  return (
    <motion.div
      animate={{ x: isLargeScreen ? "18rem" : "12rem" }}
      transition={{ type: "spring", duration: 5, bounce: 0 }}
      className="absolute pb-1"
    >
      <div className="size-fit relative">
        <RearBumper />
        <RearLight isOn={isRearLightsOn} />
        <HeadLight isOn={isHeadlightsOn} />
        <FrontBumper />
        <div
          style={{
            boxShadow: "0px 3px 4px 1px rgba(0, 0, 0, 0.95)",
          }}
          className="relative bg-black rounded-full overflow-hidden brightness-125"
        >
          <Image
            src="/dynamic-island/car_big.png"
            alt="Car"
            width={120}
            height={264}
            priority
          />
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          outline: "1px dashed white",
          visibility: showImageName ? "visible" : "hidden",
        }}
        className="absolute -top-[2px] left-0 size-full flex justify-center"
      >
        <span className="absolute -bottom-5 text-white text-sm font-medium">
          car.png
        </span>
      </div>
    </motion.div>
  );
};

const FrontBumper = () => {
  return (
    <div
      style={{
        height: "90%",
        width: "50%",
        position: "absolute",
        top: 2,
        right: -2,
        borderRadius: 100,
        backgroundColor: "#ffffff",
        opacity: 0.8,
        boxShadow: "-3px 1px 3px 0px rgba(0, 0, 0, 0.95)",
      }}
    />
  );
};

const HeadLight = ({ isOn }: { isOn: boolean }) => {
  return (
    <div
      style={{
        visibility: isOn ? "visible" : "hidden",
        position: "absolute",
        height: "80%",
        width: "50%",
        top: 6,
        right: -7,
        borderRadius: 100,
        backgroundColor: "rgb(255, 255, 255)",
        filter: "blur(3px)",
        boxShadow: "8px 0px 12px 2px rgba(255, 255, 255, 0.9)",
      }}
    />
  );
};

const RearBumper = () => {
  return (
    <div
      style={{
        // zIndex: 100,
        height: "90%",
        width: 30,
        position: "absolute",
        top: 3,
        left: 4,
        borderRadius: 100,
        backgroundColor: "#696969",
        boxShadow: "-2px 1px 3px 0px rgba(0, 0, 0, 0.95)",
      }}
    />
  );
};

const RearLight = ({ isOn }: { isOn: boolean }) => {
  const [turnOffLights, setTurnOffLights] = useState(false);

  return (
    <>
      <div
        style={{
          // zIndex: 100,
          height: "78%",
          width: "10%",
          position: "absolute",
          top: 8,
          left: 4,
          borderRadius: 999,
          backgroundColor: "rgba(235, 53, 53, 1)",
          boxShadow: "0 0 5px 1px rgba(235, 53, 53, 1)",
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: turnOffLights && !isOn ? 0 : 1 }}
        transition={{ duration: 0.1, delay: turnOffLights ? 0 : 1.7 }}
        onAnimationComplete={() => {
          if (!turnOffLights) {
            setTimeout(() => {
              setTurnOffLights(true);
            }, 3000);
          }
        }}
        style={{
          // visibility: "hidden",
          // zIndex: 100,
          height: "70%",
          width: "2rem",
          position: "absolute",
          top: 10,
          left: -2,
          borderRadius: 80,
          backgroundColor: "rgba(245, 0, 0, 1)",
          boxShadow: "-12px 0 38px 1px rgba(235, 53, 53, 0.8)",
        }}
      />
    </>
  );
};
