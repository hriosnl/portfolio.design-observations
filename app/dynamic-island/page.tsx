"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";

import DynamicIsland from "@/app/dynamic-island/DynamicIsland";

import { ViewName } from "@/app/dynamic-island/types";
import { IdleDescription } from "@/components/dynamic-island/IdleDescription";
import { TimerDescription } from "@/components/dynamic-island/TimerDescription";
import { CoffeeDescription } from "@/components/dynamic-island/CoffeeDescription";
import { RideDescription } from "@/components/dynamic-island/RideDescription";
import { FlightDescription } from "@/components/dynamic-island/FlightDescription";

import useBreakpoint from "@/hooks/useBreakpoint";

export default function Home() {
  const oxs = useBreakpoint("xs");
  const osm = useBreakpoint("sm");
  const omd = useBreakpoint("md");
  const olg = useBreakpoint("lg");
  const oxl = useBreakpoint("xl");
  const o2xl = useBreakpoint("2xl");

  useEffect(() => {
    console.log("=================");
    console.log("xs", oxs);
    console.log("sm", osm);
    console.log("md", omd);
    console.log("lg", olg);
    console.log("xl", oxl);
    console.log("2xl", o2xl);
  }, [oxs, osm, omd, olg, oxl, o2xl]);

  const [currentViewName, setCurrentViewName] = useState<ViewName>(
    ViewName.IDLE
  );

  const description = useMemo(() => {
    switch (currentViewName) {
      case ViewName.IDLE: {
        return <IdleDescription />;
      }

      case ViewName.TIMER: {
        return <TimerDescription />;
      }

      case ViewName.COFFEE: {
        return <CoffeeDescription />;
      }

      case ViewName.RIDE: {
        return <RideDescription />;
      }

      case ViewName.FLIGHT: {
        return <FlightDescription />;
      }
    }
  }, [currentViewName]);

  const getBackgroundColor = useMemo(() => {
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
  }, [currentViewName]);

  return (
    <motion.main
      initial={{
        backgroundColor: "#FFFFFF",
      }}
      animate={{
        backgroundColor: getBackgroundColor,
      }}
      transition={{
        duration: 0.69,
        type: "spring",
        bounce: 0,
      }}
      className="w-screen h-screen flex flex-col lg:flex-row"
    >
      <CloseButton />
      <DynamicIsland updateViewName={setCurrentViewName} />
      <div className="relative bg-[#0C0C0C] w-full flex justify-center">
        <div className="w-full overflow-y-auto flex justify-center">
          {/* <div className="h-fit max-w-[46rem] pt-10 border border-red-400"> */}
          <div className="h-fit max-w-[57rem] pt-10 px-14">{description}</div>
          <div className="hidden md:block absolute bottom-0 h-24 w-full bg-gradient-to-t from-black via-black/80 via-30% to-transparent pointer-events-none" />
        </div>
      </div>
    </motion.main>
  );
}

const CloseButton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5, duration: 0.8 }}
    className="absolute top-3 right-4 cursor-pointer z-[1000] text-black lg:text-white"
  >
    <Link href="/">
      <X size={35} strokeWidth={1.6} />
    </Link>
  </motion.div>
);
