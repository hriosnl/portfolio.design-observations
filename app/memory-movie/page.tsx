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

export default function MemoryMovie() {
  const [step, setStep] = useState(0);
  const [prevButtonActive, setPrevButtonActive] = useState(false);
  const [nextButtonActive, setNextButtonActive] = useState(false);

  const nextStep = () => {
    setNextButtonActive(true);

    setStep((prev) => {
      if (prev === 0) return 0;
      if (prev === 16) return prev;

      return prev + 1;
    });
  };

  const previousStep = () => {
    setPrevButtonActive(true);

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
    <div className="w-screen h-screen flex justify-center items-center px-8 bg-[#02080C] overflow-hidden">
      {step !== 0 && <CloseButton />}

      {step !== 0 && (
        <motion.div
          animate={{
            x: prevButtonActive ? [0, -4, 0] : 0,
          }}
          transition={{
            x: { duration: 0.4, ease: "easeInOut" },
          }}
          onAnimationComplete={() => setPrevButtonActive(false)}
          className="hidden sm:block mr-auto z-10 mb-20"
        >
          <PrevButton onButtonClick={previousStep} />
        </motion.div>
      )}

      <div
        style={{ width: VIEW_WIDTH, height: VIEW_HEIGHT, minWidth: VIEW_WIDTH }}
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
            x: nextButtonActive ? [0, 4, 0] : 0,
          }}
          transition={{
            x: { duration: 0.4, ease: "easeInOut" },
          }}
          onAnimationComplete={() => setNextButtonActive(false)}
          className="hidden sm:block ml-auto z-10 mb-20"
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
