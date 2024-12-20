"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

import { FadeIn } from "@/components/FadeIn";
import Image from "next/image";
import useTimePeriod from "@/hooks/useTimePeriod";

export default function About() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [makeFancy, setMakeFancy] = useState(false);
  const [showHonesty, setShowHonesty] = useState(false);

  const timePeriod = useTimePeriod();

  useEffect(() => {
    const img = new globalThis.Image();
    img.src = "/home/wave.gif";
    img.onload = () => {
      setIsLoaded(true);
    };
    img.onerror = () => {
      console.error("Error loading image: ", img.src);
    };
  }, []);

  return (
    <main>
      <section className="w-full sm:w-[40rem] xl:w-[45%] flex flex-col gap-y-6">
        <div>
          <p>
            I strive to design{" "}
            <button
              onMouseOver={() => setShowHonesty(true)}
              onMouseOut={() => setShowHonesty(false)}
              onClick={() => setShowHonesty((prev) => !prev)}
              className="dashed-link"
            >
              honestly
            </button>
            .
          </p>
          <p>
            I solve design problems intuitively{" "}
            <span className="italic mr-0.5">and</span> logically, believing that
            these kind of problems are too complex to be managed purely by
            reason.
          </p>
        </div>

        <div className="flex text-base">
          <div className="w-1/2">
            <p>
              <Link href="mailto:hriosnl@gmail.com" className="link">
                hriosnl@gmail.com
              </Link>
            </p>
            <p>
              <a href="https://x.com/hriosnl" target="_blank" className="link">
                x.com/@hriosnl
              </a>
            </p>
          </div>
          <div className="w-1/2">
            <p>UTC+8</p>
            <p className="mt-1 font-extralight">{timePeriod}</p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showHonesty ? 1 : 0 }}
          className="sm:mt-4"
        >
          <div className="relative w-[330px] h-[184px] xl:w-[350px] xl:h-[196px] 2xl:w-[400px] 2xl:h-[224px]">
            <Image
              src="/home/honest-design.jpeg"
              alt="Good design is honest"
              fill={true}
              sizes="(max-width: 1280px) 330px, 450px"
            />
          </div>
        </motion.div>
      </section>

      <section className="absolute bottom-0 right-0 pr-2 md:pr-8 text-[5rem] sm:text-[10rem] leading-none flex flex-col items-end font-display">
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
            className="font-bold -mb-2 md:-mb-5"
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
            className="font-extralight"
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
