"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";

import { ViewName } from "@/app/dynamic-island/types";
import DynamicIsland from "@/app/dynamic-island/DynamicIsland";

export default function Home() {
  const [currentViewName, setCurrentViewName] = useState<ViewName>(
    ViewName.IDLE
  );

  const getBgColor = () => {
    switch (currentViewName) {
      case ViewName.IDLE:
        return "#FFFFFF";
      case ViewName.TIMER:
        return "#FEEFAD";
      case ViewName.COFFEE:
        return "#FFD09B";
      case ViewName.RIDE:
        return "#A1EEBD";
      case ViewName.FLIGHT:
        return "#7BD3EA";
    }
  };

  return (
    <motion.main
      initial={{
        backgroundColor: "white",
      }}
      animate={{
        backgroundColor: getBgColor(),
      }}
      transition={{
        duration: 0.69,
        type: "spring",
        bounce: 0,
      }}
      className="w-screen h-screen flex flex-col lg:flex-row bg-green-200"
    >
      <DynamicIsland updateViewName={setCurrentViewName} />
      <Descriptions view={currentViewName} />
      <CloseButton />
    </motion.main>
  );
}

const Descriptions = ({ view }: { view: ViewName }) => {
  return (
    // <div className="bg-black h-full p-16">
    <div className="bg-[#0C0C0C] h-full p-16">
      <h1 className="text-white text-4xl font-light capitalize">{view}</h1>
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
      <p className="text-[#f5f6f4] text-base pt-10 geist">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
        officia sit voluptatem, aliquid laboriosam voluptates totam optio eaque
        tenetur consequatur expedita, laudantium repellendus quae quia nihil
        ratione, provident qui odio.
      </p>
    </div>
  );
};

const CloseButton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.66, duration: 0.8 }}
    className="absolute top-2 right-2 cursor-pointer z-[1000] text-black lg:text-white"
  >
    <Link href="/">
      <X size={30} strokeWidth={1} />
    </Link>
  </motion.div>
);
