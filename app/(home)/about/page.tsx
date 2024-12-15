"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FadeIn } from "@/components/FadeIn";

export default function About() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [makeFancy, setMakeFancy] = useState(false);

  useEffect(() => {
    console.log("loading...");

    const img = new Image();
    img.src = "/home/wave.gif";
    img.onload = () => {
      setIsLoaded(true);
      console.log("Image loaded");
    };
    img.onerror = () => {
      console.log("Error loading image");
    };
  }, []);

  return (
    <main className="mt-6 md:mt-0">
      <section className="w-full flex justify-start">
        <p className="sm:w-[40rem] xl:w-[40%] text-lg 2xl:text-xl">
          I specialize in crafting innovative, user-centered solutions that
          bridge functionality and aesthetics. With a keen eye for detail and a
          deep understanding of design principles, I thrive on solving complex
          problems creatively. I excel in conceptualizing and implementing
          designs that enhance user experiences while aligning with project
          goals, delivering exceptional results every time.
        </p>
      </section>

      <section className="absolute bottom-0 right-0 pr-2 md:pr-8 text-[5rem] sm:text-[10rem] leading-none oxanium flex flex-col items-end">
        <div className="overflow-hidden relative">
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              bounce: 0,
              duration: 0.8,
              delay: 0.5,
            }}
            className="-mb-2"
          >
            <AnimatePresence mode="popLayout">
              {isLoaded && makeFancy ? (
                <motion.span
                  key="fancy-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.6 }}
                  className="super-fancy-text"
                >
                  DESIGN
                </motion.span>
              ) : (
                <motion.span
                  key="fallback-text"
                  exit={{ opacity: 0, transition: { duration: 1.5 } }}
                  className="super-fancy-text-fallback"
                >
                  DESIGN
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
        <div className="overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              bounce: 0,
              duration: 0.5,
              delay: 1.2,
            }}
            className="font-thin"
            onAnimationComplete={() => setMakeFancy(true)}
          >
            ENGINEER
          </motion.div>
        </div>
      </section>

      <FadeIn />
    </main>
  );
}
