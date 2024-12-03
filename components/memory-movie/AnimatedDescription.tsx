import { motion } from "motion/react";
import { DESCRIPTIONS, GRID_CELL_SIZE } from "@/app/memory-movie/constants";

export function AnimatedDescription({ step }: { step: number }) {
  const isFirstStep = step === 1;
  const isPrefinal = step === 15;

  const words = DESCRIPTIONS[(step - 1) % DESCRIPTIONS.length].split(" ");
  const wordAnimation = {
    // hidden: { opacity: 0, scale: 1.6, y: -5 },
    hidden: { opacity: 0, scale: 1.2, y: -5 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 1.6,
        type: "spring",
        bounce: 0,
      },
    }),
  };

  return (
    <div
      className="min-h-[100px] h-[110px] text-white font-light"
      // className="min-h-[100px] h-[110px] text-white font-light outline outline-1 outline-green-600"
      style={{
        width: isPrefinal ? "100%" : `${GRID_CELL_SIZE * 6.5}px`,
        fontSize: isPrefinal ? "1.23rem" : "1.2rem",
        paddingTop: isFirstStep ? "0.5rem" : "0",
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
        // className="flex flex-wrap gap-[0.33rem] justify-center outline outline-1 outline-purple-700"
        className="flex flex-wrap gap-[0.33rem] justify-center"
      >
        {words.map((word, index) =>
          word === "<EOL>" ? (
            <div key={index} className="basis-full h-0" />
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
