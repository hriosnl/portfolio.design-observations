import Image from "next/image";
import useMeasure from "react-use-measure";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

import { useImageContext } from "@/providers/image-provider";
import { MemoryPositioning } from "@/app/memory-movie/types";

import { AnimatedDescription } from "@/components/memory-movie/AnimatedDescription";
import { IntroMemory } from "@/components/memory-movie/IntroMemory";
import { IntroShootingStar } from "@/components/memory-movie/IntroShootingStar";

import {
  Spotlight,
  FinalStepSpotlight,
} from "@/components/memory-movie/Spotlight";
import { MemoryWithShootingStar } from "@/components/memory-movie/MemoryWithShootingStar";

export const Story = ({
  currentStep,
  startTheStory,
}: {
  currentStep: number;
  startTheStory: () => void;
}) => {
  const { images } = useImageContext();

  const [containerRef, containerBounds] = useMeasure();
  const [folderRef, folderBounds] = useMeasure();

  const [memoryPositioning, setMemoryPositioning] = useState(
    MemoryPositioning.UNDEFINED
  );
  const [showDescription, setShowDescription] = useState(false);
  const [showIntroShootingStars, setShowIntroShootingStars] = useState(true);

  const [visibilities, setVisibilities] = useState(
    Array(images.length).fill(false)
  );

  const isPrefinalStep = currentStep === 15;
  const isFinalStep = currentStep === 16;
  const finalStepDelay = 0.88;

  const [storyIsComplete, setStoryIsComplete] = useState(false);
  const [showEndingDescription, setShowEndingDescription] = useState(false);

  const imagesInFolderProperties = [
    { x: -15, y: 0, rotate: -20, zIndex: 50 },
    { x: 0, y: -10, rotate: 0, zIndex: 10 },
    { x: 15, y: 0, rotate: 20, zIndex: 50 },
  ];

  useEffect(() => {
    setStoryIsComplete(false);

    if (currentStep > 0) noIntroTEMPORARYNOTNECESSARY();

    switch (currentStep) {
      case 1: {
        setMemoryPositioning(MemoryPositioning.ALIGNED);
        return;
      }
      case 2: {
        setMemoryPositioning(MemoryPositioning.COMPRESSED);
        return;
      }
      case 3: {
        setMemoryPositioning(MemoryPositioning.COMPRESSED);
        return;
      }
      case 4: {
        setMemoryPositioning(MemoryPositioning.COMPRESSED);
        return;
      }
      case 5: {
        setMemoryPositioning(MemoryPositioning.COMPRESSED);
        return;
      }
      case 6: {
        setMemoryPositioning(MemoryPositioning.ALIGNED);
        return;
      }
      case 7: {
        setMemoryPositioning(MemoryPositioning.ALIGNED);
        return;
      }
      case 8: {
        setMemoryPositioning(MemoryPositioning.ALIGNED);
        return;
      }
      case 9: {
        setMemoryPositioning(MemoryPositioning.ALIGNED);
        return;
      }
      case 10: {
        setMemoryPositioning(MemoryPositioning.ALIGNED);
        return;
      }
      case 11: {
        setMemoryPositioning(MemoryPositioning.ALIGNED);
        return;
      }
      case 12: {
        setMemoryPositioning(MemoryPositioning.ALIGNED);
        return;
      }
      case 13: {
        setMemoryPositioning(MemoryPositioning.ALIGNED);
        return;
      }
      case 14: {
        setMemoryPositioning(MemoryPositioning.ALIGNED);
        return;
      }
      case 15: {
        setMemoryPositioning(MemoryPositioning.SHRINKED);
        return;
      }
      case 16: {
        setMemoryPositioning(MemoryPositioning.SHRINKED);
        return;
      }
    }
  }, [currentStep]);

  // TODO: Remove this after testing
  function noIntroTEMPORARYNOTNECESSARY() {
    setShowIntroShootingStars(false);

    for (let i = 0; i < visibilities.length; i++) {
      setVisibilities((prev) => {
        const newvisibilities = [...prev];
        newvisibilities[i] = true;
        return newvisibilities;
      });
    }
  }

  useEffect(() => {
    setShowDescription(false);

    const duration = currentStep === 15 ? 1600 : 600;

    setTimeout(() => {
      setShowDescription(true);
    }, duration);
  }, [currentStep]);

  const finishIntro = () => {
    setTimeout(() => {
      startTheStory();
    }, 1000);
  };

  const unfoldMemories = () => {
    setShowIntroShootingStars(false);

    for (let i = 0; i < visibilities.length; i++) {
      setTimeout(() => {
        setVisibilities((prev) => {
          const newvisibilities = [...prev];
          newvisibilities[i] = true;
          return newvisibilities;
        });

        if (i === visibilities.length - 1) {
          finishIntro();
        }
      }, 90 * i);
    }
  };

  const endTheStory = () => {
    setTimeout(() => {
      setMemoryPositioning(MemoryPositioning.COMPRESSED);
      setStoryIsComplete(true);
    }, 420);
  };

  useEffect(() => {
    setShowEndingDescription(false);

    const timeoutId = setTimeout(() => {
      if (storyIsComplete) setShowEndingDescription(true);
    }, 11069);

    return () => {
      clearTimeout(timeoutId);
      setShowEndingDescription(false);
    };
  }, [storyIsComplete, currentStep]);

  return (
    <div
      ref={containerRef}
      className="relative size-full flex flex-col items-center"
      style={{
        justifyContent: isFinalStep ? "center" : "flex-start",
        paddingTop: isFinalStep ? "0" : "3.5rem",
        paddingBottom: isFinalStep ? "1rem" : "0",
      }}
    >
      {showIntroShootingStars && (
        <IntroShootingStar
          targetX={folderBounds.x - containerBounds.x}
          targetY={folderBounds.y - containerBounds.y}
        />
      )}

      <AnimatePresence mode="wait">
        {currentStep === 0 ? (
          <motion.div
            key="intro-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute bottom-16 flex justify-center"
          >
            <motion.button onClick={() => unfoldMemories()} className="z-[100]">
              <Image
                src="/memory-movie/macos-folder-front.png"
                alt="MacOS Folder"
                width={60}
                height={60}
                priority
              />
            </motion.button>
            <div className="absolute z-0">
              <Image
                ref={folderRef}
                src="/memory-movie/macos-folder-back.png"
                alt="MacOS Folder Back"
                width={60}
                height={60}
                priority
              />
            </div>
            <div
              style={{ boxShadow: "0 0 100px 30px rgba(14, 88, 128, 0.5)" }}
              className="absolute top-4 size-8"
            />
            {/* The Memories inside the folder */}
            {visibilities.map((visible, i) =>
              !visible ? (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 1,
                    scale: 0.5,
                    ...imagesInFolderProperties[i % 3],
                    zIndex: imagesInFolderProperties[i % 3].zIndex - i,
                  }}
                  // transition={{ duration: 0.1 }}
                  layoutId={`memory-${i}`}
                  className="absolute -bottom-[5px]"
                >
                  <IntroMemory index={i} />
                </motion.div>
              ) : null
            )}
          </motion.div>
        ) : (
          showDescription &&
          !isFinalStep && (
            <motion.div
              exit={{ opacity: 0 }}
              className="w-full absolute flex flex-col items-center gap-y-5 justify-between"
              // className="w-full absolute flex flex-col items-center gap-y-5 justify-between outline outline-1 outline-yellow-200"
              style={{
                bottom: isPrefinalStep ? "23rem" : "4rem",
              }}
            >
              <AnimatedDescription step={currentStep} />
              {/* <span className="text-white">{currentStep}</span> */}
            </motion.div>
          )
        )}
      </AnimatePresence>

      {memoryPositioning !== MemoryPositioning.UNDEFINED && <Spotlight />}

      <AnimatePresence>
        {!isPrefinalStep && (
          <motion.div
            animate={{ scale: storyIsComplete ? 1.169 : 1 }}
            exit={{
              opacity: 0,
              filter: "blur(6px) brightness(2.5)",
              scale: 0.88,
              transition: { duration: isFinalStep ? 0.25 : 1.2 },
            }}
            transition={{ duration: 8 }}
          >
            <motion.div
              initial={{
                opacity: isFinalStep ? 0 : 1,
                filter: isFinalStep
                  ? "blur(3px) brightness(1.5)"
                  : "blur(0px) brightness(1)",
              }}
              animate={{
                opacity: 1,
                filter:
                  isFinalStep && !storyIsComplete
                    ? "blur(4px) brightness(1.5)"
                    : "blur(0px)",
              }}
              transition={{
                duration: isFinalStep && !storyIsComplete ? 1.2 : 0.8,
                opacity: {
                  delay: isFinalStep && !storyIsComplete ? finalStepDelay : 0,
                },
                filter: {
                  delay: isFinalStep && !storyIsComplete ? finalStepDelay : 0,
                },
              }}
              onAnimationComplete={() => {
                if (isFinalStep) endTheStory();
              }}
              className="size-fit grid grid-cols-5 grid-rows-7 gap-[1px] relative"
            >
              {visibilities.map((visible, i) =>
                visible ? (
                  <MemoryWithShootingStar
                    key={i}
                    index={i}
                    isStoryEnding={storyIsComplete}
                    step={currentStep}
                    memoryPositioning={memoryPositioning}
                  />
                ) : null
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {isFinalStep && !storyIsComplete && (
        <FinalStepSpotlight delay={finalStepDelay} />
      )}

      {isFinalStep && showEndingDescription && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 5, ease: "linear" }}
          className="absolute size-[500px] flex justify-center items-center font-light cursive text-5xl text-[#203A48] rounded-xl"
          style={{
            background:
              "radial-gradient(circle, rgba(254, 255, 255, 1), transparent 60%)",
          }}
        >
          The End
        </motion.div>
      )}
    </div>
  );
};