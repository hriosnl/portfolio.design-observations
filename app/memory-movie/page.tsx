// TODO: Finally, remove all the unnecessary prints and comments
// TODO: Add Sonner for hints? Probably!

"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

import { VIEW_HEIGHT, VIEW_WIDTH } from "@/app/memory-movie/constants";
import {
  NextButton,
  PrevButton,
  CloseButton,
} from "@/components/memory-movie/Buttons";
import { ImageProvider } from "@/providers/image-provider";
import { MemoryEventProvider } from "@/providers/event-provider";
import { Story } from "@/app/memory-movie/Story";
import useBreakpoint from "@/hooks/useBreakpoint";

export default function MemoryMovie() {
  const isMobile = useBreakpoint("xs");

  const [step, setStep] = useState(0);
  const [prevButtonIsActive, setPrevButtonIsActive] = useState(false);
  const [nextButtonIsActive, setNextButtonIsActive] = useState(false);

  const nextStep = () => {
    setNextButtonIsActive(true);

    setStep((prev) => {
      if (prev === 0) return 0;
      if (prev === 16) return prev;

      return prev + 1;
    });
  };

  const previousStep = () => {
    setPrevButtonIsActive(true);

    setStep((prev) => {
      if (prev <= 1) return prev;

      return prev - 1;
    });
  };

  useEffect(() => {
    const throttleDelay = 1200;
    let lastCall = 0;

    const handleKeyPress = (event: KeyboardEvent) => {
      const now = new Date().getTime();

      if (now - lastCall >= throttleDelay) {
        lastCall = now;

        if (
          event.key === "Enter" ||
          event.key === "ArrowRight" ||
          event.key === " "
        ) {
          nextStep();
        } else if (event.key === "ArrowLeft") {
          previousStep();
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#02080C] overflow-hidden ">
      {step !== 0 && <CloseButton />}

      {step !== 0 && (
        <motion.div
          animate={{
            x: prevButtonIsActive ? [0, -4, 0] : 0,
          }}
          transition={{
            x: { duration: 0.4, ease: "easeInOut" },
          }}
          onAnimationComplete={() => setPrevButtonIsActive(false)}
          // className="absolute bottom-0 left-3 sm:block sm:mr-auto sm:ml-5 sm:mb-20 z-10"
          className="absolute bottom-2 left-3 sm:block sm:left-4 sm:top-[45%] z-10"
        >
          <PrevButton onButtonClick={previousStep} />
        </motion.div>
      )}

      <div
        style={{
          width: isMobile ? "100%" : VIEW_WIDTH,
          height: isMobile ? "100%" : VIEW_HEIGHT,
          minWidth: isMobile ? "100%" : VIEW_WIDTH,
        }}
      >
        <ImageProvider>
          <MemoryEventProvider>
            <Story currentStep={step} startTheStory={() => setStep(1)} />
          </MemoryEventProvider>
        </ImageProvider>
      </div>

      {step !== 0 && (
        <motion.div
          animate={{
            x: nextButtonIsActive ? [0, 4, 0] : 0,
          }}
          transition={{
            x: { duration: 0.4, ease: "easeInOut" },
          }}
          onAnimationComplete={() => setNextButtonIsActive(false)}
          className="absolute bottom-2 right-3 sm:block sm:right-4 sm:top-[45%] z-10"
          style={{
            visibility: step === 16 ? "hidden" : "visible",
          }}
        >
          <NextButton onButtonClick={nextStep} />
        </motion.div>
      )}
    </div>
  );
}
