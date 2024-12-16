"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import { useEffect } from "react";
import Link from "next/link";

import {
  Timer as TimerIcon,
  CarFront as Car,
  PlaneTakeoff as Plane,
  Icon,
  X,
} from "lucide-react";
import { mug } from "@lucide/lab";

import { ViewName } from "@/app/(projects)/dynamic-island/types";

export const ActionButtons = [
  {
    name: ViewName.TIMER,
    icon: <TimerIcon size={28} strokeWidth={1.3} />,
    color: "#FDB000",
  },
  {
    name: ViewName.COFFEE,
    icon: <Icon iconNode={mug} size={28} strokeWidth={1.3} />,
    color: "#FD7200",
  },
  {
    name: ViewName.RIDE,
    icon: <Car size={28} strokeWidth={1.3} />,
    color: "#5B3C07",
  },
  {
    name: ViewName.FLIGHT,
    icon: <Plane size={28} strokeWidth={1.3} />,
    color: "#5B3C07",
  },
];

export const CheckButton = ({
  isActive,
  label,
  color,
  handleClick,
}: {
  isActive: boolean;
  label: string;
  color: string;
  handleClick: () => void;
}) => {
  const controls = useAnimation();

  const pathVariants: Variants = {
    normal: {
      opacity: 0.3,
      pathLength: 1,
      transition: {
        duration: 0.3,
        opacity: { duration: 0.1 },
      },
    },
    animate: {
      opacity: [0.1, 0.8],
      pathLength: [0, 1],
      transition: {
        duration: 0.4,
        opacity: { duration: 0.1 },
      },
    },
    animateReversed: {
      opacity: [0.8, 0.1],
      pathLength: [1, 0],
      transition: {
        duration: 0.4,
      },
    },
    active: {
      opacity: 1,
      pathLength: [0, 1],
    },
  };

  useEffect(() => {
    if (isActive) {
      controls.start("active");
    }
  }, [isActive, controls]);

  return (
    <motion.div
      onMouseEnter={
        !isActive
          ? () => controls.start("animate")
          : () => controls.start("animateReversed")
      }
      onMouseLeave={
        !isActive
          ? () => controls.start("normal")
          : () => controls.start("active")
      }
      onClick={handleClick}
      style={{
        color: color,
        opacity: isActive ? 1 : 0.5,
      }}
      className="cursor-pointer select-none py-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
    >
      <div
        style={{
          border: `1px solid ${color}`,
        }}
        className="size-fit rounded-md p-0.5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            variants={pathVariants}
            initial="normal"
            animate={controls}
            d="M4 12 9 17L20 6"
          />
        </svg>
      </div>
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: isActive ? 1 : 0.5,
        }}
        style={{ color: color }}
        className="ml-2 mono"
      >
        {label}
      </motion.span>
    </motion.div>
  );
};

export const CloseButton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5, duration: 0.8 }}
    className="absolute top-2 right-2 md:top-3 md:right-4 cursor-pointer z-[1000] text-black lg:text-white"
  >
    <Link href="/works">
      <X size={35} strokeWidth={1.6} />
    </Link>
  </motion.div>
);
