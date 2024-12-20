"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpToLine, MoveUpLeft } from "lucide-react";

import DynamicIsland from "@/app/(projects)/dynamic-island/DynamicIsland";

import { ViewName } from "@/app/(projects)/dynamic-island/types";
import { IdleDescription } from "@/components/dynamic-island/IdleDescription";
import { TimerDescription } from "@/components/dynamic-island/TimerDescription";
import { CoffeeDescription } from "@/components/dynamic-island/CoffeeDescription";
import { RideDescription } from "@/components/dynamic-island/RideDescription";
import { FlightDescription } from "@/components/dynamic-island/FlightDescription";
import { CloseButton } from "@/components/dynamic-island/Buttons";
import { FadeIn } from "@/components/FadeIn";

export default function Home() {
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
    <div className="max-w-[96rem] max-h-[54rem] size-full">
      <motion.div
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
        className="size-full flex flex-col lg:flex-row"
      >
        <CloseButton />
        <DynamicIsland updateViewName={setCurrentViewName} />
        <div className="relative bg-[#0C0C0C] w-full flex justify-center">
          <div className="w-full overflow-y-auto flex justify-center">
            {/* <div className="h-fit max-w-screen-sm md:max-w-full pt-3 lg:pt-14 px-8 md:px-142"> */}
            <div className="h-fit pt-3 lg:pt-14 px-8 md:px-14">
              {description}

              <div className="lg:hidden absolute bottom-5 right-5 left-3 flex justify-between items-center px-5">
                <Link
                  href="/works"
                  className="flex justify-center items-center gap-x-1 text-white"
                >
                  <MoveUpLeft size={18} strokeWidth={1.6} />
                  Works
                </Link>
                <button
                  onClick={() => {
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  className="size-7 flex justify-center items-center bg-white text-black rounded-md"
                >
                  <ArrowUpToLine size={18} strokeWidth={2} />
                </button>
              </div>
            </div>
            <div className="hidden lg:block absolute bottom-0 h-24 w-full bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/80 via-30% to-transparent pointer-events-none" />
          </div>
        </div>
      </motion.div>

      <FadeIn />
    </div>
  );
}
