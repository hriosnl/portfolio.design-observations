"use client";

import { motion } from "motion/react";
import {
  DESCRIPTIONS,
  GRID_CELL_SIZE,
} from "@/app/(projects)/memory-movie/constants";

import useBreakpoint from "@/hooks/useBreakpoint";

export function AnimatedDescription({ step }: { step: number }) {
  const isMobile = useBreakpoint("xs");
  const descriptionWidth = isMobile ? GRID_CELL_SIZE * 5.1 : GRID_CELL_SIZE * 8;
  const wideDescriptionWidth = isMobile ? "90%" : "36rem";

  const isFirstStep = step === 1;
  const isPrefinal = step === 15;

  const words = DESCRIPTIONS[(step - 1) % DESCRIPTIONS.length].split(" ");
  const wordAnimation = {
    hidden: { opacity: 0, scale: 1.2, y: -5 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: i * 0.03,
        duration: 1.6,
        type: "spring",
        bounce: 0,
      },
    }),
  };

  return (
    <div
      className="min-h-[100px] h-[110px] text-white font-light select-none"
      style={{
        width: isPrefinal ? wideDescriptionWidth : `${descriptionWidth}px`,
        fontSize: isPrefinal ? "1.4rem" : isMobile ? "1.3rem" : "1.3rem",
        paddingTop: isFirstStep ? "0.5rem" : "0rem",
      }}
    >
      <motion.div
        key={step}
        initial={{ filter: "blur(10px)" }}
        animate={{
          filter: "blur(0px)",
          color: [
            "hsl(0, 100%, 100%)",
            "hsl(270, 100%, 50%)",
            "hsl(330, 100%, 50%)",
            "hsl(0, 100%, 100%)",
          ],
        }}
        transition={{ duration: 1.8, color: { duration: 1.7 } }}
        className="flex flex-wrap gap-[0.33rem] justify-center"
      >
        {words.map((word, index) =>
          word === "<EOL>" ? (
            <div
              key={index}
              className={`basis-full h-0 border-0 ${
                isMobile ? "hidden" : "block"
              }`}
            />
          ) : (
            <motion.span
              key={index}
              custom={index}
              variants={wordAnimation}
              initial="hidden"
              animate="visible"
            >
              {word}
            </motion.span>
          )
        )}
      </motion.div>
    </div>
  );
}
