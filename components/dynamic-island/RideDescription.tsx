"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";

import useBreakpoint from "@/hooks/useBreakpoint";

export function RideDescription() {
  const [showImageName, setShowImageName] = useState(false);

  return (
    <>
      <div className="w-full flex justify-center lg:pr-4 select-none">
        <ZoomedRide showImageName={showImageName} />
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

function ZoomedRide({ showImageName }: { showImageName: boolean }) {
  const [isRearLightsOn, setIsRearLighstOn] = useState(false);
  const [isHeadlightsOn, setIsHeadlightsOn] = useState(true);

  return (
    <motion.div
      initial={{ filter: "blur(6px)" }}
      animate={{ filter: "blur(0px)" }}
      transition={{ duration: 1 }}
      style={{
        boxShadow: "0 0 15px 2px rgba(69, 68, 69, 0.5)",
      }}
      className="relative shrink-0 border-2 border-white flex items-center w-96 h-60 lg:w-[29rem] lg:h-72 rounded-md lg:rounded-full overflow-hidden mx-auto"
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
      <div className="absolute bottom-2 left-4 lg:left-0 lg:bottom-2 flex lg:justify-center w-full">
        <LightButtons
          toggleRearLights={(isOn: boolean) => setIsRearLighstOn(isOn)}
          toggleHeadlights={() => setIsHeadlightsOn(!isHeadlightsOn)}
          headlightsIsOn={isHeadlightsOn}
        />
      </div>
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
    <div className="w-fit flex items-center gap-3">
      <div className="size-12 lg:size-11 relative mt-[1px]">
        <div
          style={{
            backgroundColor: headlightsIsOn ? "#552811" : "#3e3e37",
          }}
          className="absolute bottom-0 size-full rounded-xl"
        />
        <motion.button
          onClick={toggleHeadlights}
          animate={{
            borderTop: headlightsIsOn
              ? "1px solid hsl(30, 66%, 16%)"
              : "1px solid hsl(60, 6%, 18%)",
            borderRight: headlightsIsOn
              ? "1px solid hsl(30, 66%, 18%)"
              : "1px solid hsl(60, 6%, 25%)",
          }}
          whileHover={{ translateY: -0.5 }}
          whileTap={{ translateY: 1.5, transition: { duration: 0.01 } }}
          className="absolute bottom-[3px] size-full rounded-xl bg-[#1e252c]"
        >
          <div
            style={{
              filter: "blur(3px)",

              background: headlightsIsOn
                ? "radial-gradient(circle at 50% 50%, #b94a1a, #b04419, #7b2314, #601611, #060505, transparent)"
                : "transparent",
            }}
            className="absolute inset-1 opacity-80"
          />
          <div
            style={{
              opacity: headlightsIsOn ? 0.8 : 1,
              color: headlightsIsOn ? "#ffffff" : "#aebaca",
            }}
            className="absolute bottom-0 size-full flex justify-center items-center mt-[1px]"
          >
            <svg
              width="1.3rem"
              height="1.3rem"
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
          </div>
        </motion.button>
      </div>

      <div className="size-[3.2rem] lg:size-12 relative">
        <motion.button
          style={{ backgroundColor: "#3e3e37" }}
          whileTap={{ backgroundColor: "yellow" }}
          className="absolute bottom-0 size-full rounded-[30px]"
        />

        <motion.button
          onPointerDown={() => toggleRearLights(true)}
          onPointerUp={() => toggleRearLights(false)}
          style={{
            borderTop: "1px solid hsl(60, 6%, 18%)",
            borderRight: "1px solid hsl(60, 6%, 25%)",
            color: "#aebaca",
          }}
          whileHover={{ translateY: -0.5 }}
          whileTap={{
            translateY: 1,
            transition: { duration: 0.01 },
            color: "#f93a3c",
          }}
          className="absolute bottom-[3px] size-full rounded-full bg-[#1e252c]"
        >
          <div className="size-full flex justify-center items-center">
            <svg
              height="1.48rem"
              width="1.48rem"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 262.636 262.636"
              enable-background="new 0 0 262.636 262.636"
              fill="currentColor"
              stroke="currentColor"
            >
              <g>
                <path d="m262.636,89.777l-54.376-54.376-54.688,54.688c-14.21-0.298-33.658-4.365-47.609-15.065-7.164-5.494-14.247-8.279-21.052-8.279-10.218,0-16.294,6.32-17.594,7.822l-9.841,9.841 53.659,53.659 2.749-2.749c0.497,0.343 1.02,0.705 1.55,1.073 3.512,2.438 6.803,4.684 9.758,6.446l-4.644,4.644 39.324,39.323 6.798-6.797c0.591,0.118 1.198,0.179 1.812,0.179h0.001c2.378,0 4.662-0.919 6.265-2.522l13.794-13.794 74.094-74.093z" />
                <polygon points="6.192,132.196 48.518,174.797 0,227.234 61.755,227.234 100.576,163.971 37.635,100.87 " />{" "}
              </g>
            </svg>
          </div>
        </motion.button>
      </div>
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
            src="/dynamic-island/car.png"
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
        <span className="absolute -bottom-4 text-white text-xs font-medium font-mono">
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
