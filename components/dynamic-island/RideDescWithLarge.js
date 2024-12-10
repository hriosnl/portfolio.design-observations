"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { use, useEffect } from "react";

export function RideDescription() {
  const isLargeScreen = useBreakpoint("lg");

  useEffect(() => {
    console.log("isLargeScreen", isLargeScreen);
  }, [isLargeScreen]);

  return (
    <div className="bg-[#0C0C0C] h-full p-16">
      <h1 className="text-white text-4xl font-light capitalize">Ride</h1>

      <br />

      <div className="w-[23rem] lg:w-full lg:max-w-[44rem]">
        <ZoomedRide />
      </div>

      <p className="text-[#f5f6f4] text-base pt-10">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
        officia sit voluptatem, aliquid laboriosam voluptates totam optio eaque
        tenetur consequatur expedita, laudantium repellendus quae quia nihil
        ratione, provident qui odio.
      </p>
      <p className="text-[#f5f6f4] text-base pt-10 inter">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
        officia sit voluptatem, aliquid laboriosam voluptates totam optio eaque
        tenetur consequatur expedita, laudantium repellendus quae quia nihil
        ratione, provident qui odio.
      </p>
    </div>
  );
}

function ZoomedRide() {
  return (
    <motion.div
      initial={{ filter: "blur(6px)" }}
      animate={{ filter: "blur(0px)" }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-36 lg:h-44 rounded-sm overflow-hidden"
    >
      <Road />
      <PedestrianLane />
      <Path />
      <Car />
    </motion.div>
  );
}

const Road = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full bg-[#1E6063] basis-[14%]" />
      <div className="w-full grow bg-[#262e38]" />
      <div className="w-full bg-[#455C78] basis-[10%]" />
    </div>
  );
};

const Path = () => {
  return (
    <div className="absolute bottom-9 lg:bottom-10 w-full h-7 lg:h-10 bg-[#367bef] outline outline-4 outline-[#62a4f3]" />
  );
};

const PedestrianLane = () => {
  return (
    <div className="absolute bottom-0 right-2 lg:right-10 h-full flex flex-col justify-center">
      <div className="h-fit w-16 lg:w-24 flex flex-col gap-y-2.5 lg:gap-y-3.5">
        <div className="h-3 lg:h-4 w-full bg-[#5b626e]" />
        <div className="h-3 lg:h-4 w-full bg-[#5b626e]" />
        <div className="h-3 lg:h-4 w-full bg-[#5b626e]" />
        <div className="h-3 lg:h-4 w-full bg-[#5b626e]" />
      </div>
    </div>
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

const HeadLight = () => {
  return (
    <div
      style={{
        height: "80%",
        width: "50%",
        position: "absolute",
        top: 6,
        right: -7,
        borderRadius: 100,
        backgroundColor: "#ffffff",
        opacity: 0.9,
        filter: "blur(3px)",
        boxShadow: "3px 0px 10px 1px rgba(255, 255, 255, 0.9)",
      }}
    />
  );
};

const RearBumper = () => {
  const isLargeScreen = useBreakpoint("lg");

  return (
    <div
      style={{
        // zIndex: 100,
        height: "90%",
        width: 30,
        position: "absolute",
        top: !isLargeScreen ? 3 : 6,
        left: !isLargeScreen ? 4 : 5,
        borderRadius: 100,
        backgroundColor: "#696969",
        boxShadow: "-2px 1px 3px 0px rgba(0, 0, 0, 0.95)",
      }}
    />
  );
};

const RearLight = () => {
  const isLargeScreen = useBreakpoint("lg");

  return (
    <>
      <div
        style={{
          // zIndex: 100,
          height: "90%",
          width: "30%",
          position: "absolute",
          top: !isLargeScreen ? 4 : 6,
          left: -1,
          filter: "blur(1px)",
          borderRadius: 999,
          backgroundColor: "rgba(235, 53, 53, 1)",
          boxShadow:
            "0 0 3px 1px rgba(235, 53, 53, 1), -3px 1px 2px 1px rgba(0, 0, 0, 0)",
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 1.7 }}
        style={{
          // visibility: "hidden",
          // zIndex: 100,
          height: "70%",
          width: !isLargeScreen ? "23px" : "35px",
          position: "absolute",
          top: !isLargeScreen ? 10 : 15,
          left: -12,
          filter: "blur(8px)",
          borderRadius: 10,
          backgroundColor: "red",
        }}
      />
    </>
  );
};

const Car = () => {
  const isLargeScreen = useBreakpoint("lg");

  return (
    <motion.div
      animate={{ x: !isLargeScreen ? "13rem" : "33rem" }}
      transition={{ type: "spring", duration: 5, bounce: 0 }}
      className="absolute bottom-6 lg:bottom-7"
    >
      <div className="size-fit">
        <RearBumper />
        <RearLight />
        <HeadLight />
        <FrontBumper />
        <div
          style={{
            width: "fit-content",
            height: "fit-content",
            backgroundColor: "#000000",
            overflow: "hidden",
            filter: "brightness(1.25)",
            borderRadius: 100,
            boxShadow: "0px 3px 4px 1px rgba(0, 0, 0, 0.95)",
          }}
        >
          <Image
            src="/dynamic-island/car_big.png"
            alt="Car"
            width={!isLargeScreen ? 120 : 160}
            height={!isLargeScreen ? 264 : 352}
            priority
          />
        </div>
      </div>
    </motion.div>
  );
};
