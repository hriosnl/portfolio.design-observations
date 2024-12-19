"use client";

import Image from "next/image";
import { Toaster, toast } from "sonner";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TriangleAlert } from "lucide-react";

import {
  VIEW_HEIGHT,
  VIEW_WIDTH,
} from "@/app/(projects)/memory-movie/constants";
import {
  NextButton,
  PrevButton,
  CloseButton,
  BackToHomeButton,
} from "@/components/memory-movie/Buttons";
import { ImageProvider } from "@/providers/image-provider";
import { MemoryEventProvider } from "@/providers/event-provider";
import { Story } from "@/app/(projects)/memory-movie/Story";
import { FadeIn } from "@/components/FadeIn";

import useBreakpoint from "@/hooks/useBreakpoint";

export default function MemoryMovie() {
  const isMobile = useBreakpoint("xs");
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  const [showStep0Hint, setShowStep0Hint] = useState(false);
  const [showStep1Hint, setShowStep1Hint] = useState(false);
  const [temporaryHideNavigationButtons, setTemporaryHideNavigationButtons] =
    useState(false);

  const [showBackToHomeButton, setShowBackToHomeButton] = useState(false);
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

  useEffect(() => {
    if (showDisclaimer) return;

    if (step === 2) {
      toast.dismiss();
    }
    if (step === 16) {
      setTimeout(() => {
        setShowBackToHomeButton(true);
      }, 12000);
    }
    if (step > 2) return;

    if (showStep1Hint) return;
    const timeoutId1 = setTimeout(() => {
      if (step === 1 && !isMobile) {
        setShowStep1Hint(true);
      }
    }, 10000);

    if (showStep0Hint) return;
    const timeoutId0 = setTimeout(() => {
      if (step === 0) {
        setShowStep0Hint(true);
      }
    }, 17000);

    return () => {
      clearTimeout(timeoutId0);
      clearTimeout(timeoutId1);
    };
  }, [step, isMobile, showStep0Hint, showStep1Hint, showDisclaimer]);

  useEffect(() => {
    if (showStep0Hint) {
      toast("Need help?", {
        description: <ToastContent />,
      });
    }
  }, [showStep0Hint]);

  useEffect(() => {
    if (showStep1Hint) {
      toast("Stuck?", {
        description: "Use the arrow buttons to navigate",
      });

      setTemporaryHideNavigationButtons(true);
      setTimeout(() => {
        setTemporaryHideNavigationButtons(false);
      }, 1200);

      setTimeout(() => {
        toast(
          <p>
            Alternatively, you can press the{" "}
            <span className="font-medium">Arrow Keys</span> or{" "}
            <span className="font-medium">Enter</span>
          </p>
        );
      }, 3000);
    }
  }, [showStep1Hint]);

  return showDisclaimer && isMobile ? (
    <Disclaimer onClick={() => setShowDisclaimer(false)} />
  ) : (
    <div className="max-w-[96rem] max-h-[54rem] size-full flex justify-center items-center bg-[#02080C] overflow-hidden">
      <AnimatePresence mode="wait">
        {!showBackToHomeButton ? (
          step !== 0 && <CloseButton key="close-button" />
        ) : (
          <BackToHomeButton key="back-to-home-button" />
        )}
      </AnimatePresence>

      {step !== 0 && !temporaryHideNavigationButtons && (
        <motion.div
          animate={{
            x: prevButtonIsActive ? [0, -4, 0] : 0,
          }}
          transition={{
            x: { duration: 0.4, ease: "easeInOut" },
          }}
          onAnimationComplete={() => setPrevButtonIsActive(false)}
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
            <Story
              currentStep={step}
              startTheStory={() => {
                setStep(1);
                toast.dismiss();
              }}
            />
          </MemoryEventProvider>
        </ImageProvider>
      </div>

      {step !== 0 && !temporaryHideNavigationButtons && (
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

      <Toaster
        position={isMobile ? "top-center" : "bottom-right"}
        expand={true}
        gap={8}
        toastOptions={{
          unstyled: false,
          duration: Infinity,
        }}
      />

      <FadeIn />
    </div>
  );
}

const Disclaimer = ({ onClick }: { onClick: () => void }) => (
  <div className="otlg size-full text-left flex flex-col justify-center items-center space-y-16">
    <TriangleAlert size={44} strokeWidth={1.5} color="hsl(42,100%,70%)" />

    <div className="px-8 text-base space-y-8">
      <h2 className="text-[hsl(0,0%,100%)] text-lg">
        Please view this on a desktop browser.
      </h2>
      <div className="text-[hsl(0,0%,80%)] space-y-4">
        <p>
          Memory Movie is made for desktop browsers (Chrome, Firefox, Safari).
        </p>
        <p>
          Some features{" "}
          <span className="font-semibold text-[hsl(42,40%,70%)]">
            do not work as intended on mobile browsers.
          </span>
        </p>
      </div>
    </div>

    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className="bg-white rounded-xl px-20 py-5 text-lg font-mono font-semibold"
    >
      OK
    </motion.button>
  </div>
);

const ToastContent = () => (
  <div className="flex justify-center items-center gap-1">
    Click the folder{" "}
    <Image
      priority
      src="/memory-movie/macos-folder.png"
      alt="MacOS Folder"
      width={20}
      height={20}
      className="inline"
    />{" "}
    to start
  </div>
);
