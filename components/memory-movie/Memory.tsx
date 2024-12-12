import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useState, useMemo, useCallback } from "react";

import {
  FOCUSED_INDEX,
  SMALL_GRID_CELL_SIZE,
} from "@/app/memory-movie/constants";
import {
  MemoryEvents,
  RippleDirection,
  MotionAnimationProps,
} from "@/app/memory-movie/types";
import { getNeighbors } from "@/app/memory-movie/helper";
import { useImageContext } from "@/providers/image-provider";
import { useMemoryEventContext } from "@/providers/event-provider";

const stepConditions = (step: number, isEnding: boolean) => {
  return {
    isFocused(index: number) {
      return this.hasFocusedIndex() && index === FOCUSED_INDEX;
    },

    hasFocusedIndex() {
      const stepsWithFocusedIndex = [3, 4, 5, 7, 8, 9, 10, 11];
      return (
        stepsWithFocusedIndex.includes(step) || this.hasCrossedFocusedIndex()
      );
    },

    isInCrossedFocus(index: number) {
      const crossedFocusedIndeces = [2, 7, 10, 11, 12, 13, 14, 17, 22];
      return (
        this.hasCrossedFocusedIndex() && crossedFocusedIndeces.includes(index)
      );
    },

    hasCrossedFocusedIndex() {
      const stepsWithCrossedFocusedIndex = [12, 13];
      return stepsWithCrossedFocusedIndex.includes(step);
    },

    shouldIlluminate(index: number) {
      if (step === 16) return isEnding;

      const stepsWithFocusedIllumination = [4, 5];
      const stepsWithAllIllumination = [6, 15];

      if (stepsWithFocusedIllumination.includes(step) && this.isFocused(index))
        return true;

      if (stepsWithAllIllumination.includes(step)) {
        return true;
      }

      return false;
    },

    shouldReplaceMemoryImage() {
      const stepsWithReplaceMemory = [5, 6, 15, 16];

      return stepsWithReplaceMemory.includes(step);
    },

    isPeriodicIllumination() {
      const stepsWithPeriodicIllumination = [4, 5];

      return stepsWithPeriodicIllumination.includes(step);
    },

    shouldRipple() {
      if (step === 13) return true;

      return Math.random() > 0.369;
    },
  };
};

export function Memory({
  index,
  isStoryEnding,
  step = -1,
  animationProps,
  memorySize,
}: {
  index: number;
  isStoryEnding: boolean;
  step: number;
  animationProps: MotionAnimationProps;
  memorySize: number;
}) {
  const { images, replaceImage } = useImageContext();
  const { subscribe, emitEvent } = useMemoryEventContext();

  // Unwanted hack but I need to prevent zIndex from changing between different 'states'
  const zIndex = useMemo(() => Math.floor(1 + Math.random() * 10), []);

  const conditions = stepConditions(step, isStoryEnding);

  const [ripple, setRipple] = useState<{
    show: boolean;
    direction: RippleDirection;
  }>({ show: false, direction: null });

  const [shouldSlowlyTranslate, setShouldSlowlyTranslate] = useState(false);

  const handleIlluminateComplete = () => {
    if (conditions.shouldReplaceMemoryImage()) {
      replaceImage(index);
    }
  };

  const handleEvents = useCallback(
    (event: MemoryEvents) => {
      switch (event) {
        case MemoryEvents.STRUCK: {
          if (conditions.shouldRipple()) {
            const neighbors = getNeighbors(index);

            emitEvent({
              id: neighbors.top,
              description: MemoryEvents.ENERGIZE_TOP,
            });
            emitEvent({
              id: neighbors.right,
              description: MemoryEvents.ENERGIZE_RIGHT,
            });
            emitEvent({
              id: neighbors.bottom,
              description: MemoryEvents.ENERGIZE_BOTTOM,
            });
            emitEvent({
              id: neighbors.left,
              description: MemoryEvents.ENERGIZE_LEFT,
            });
          }

          return;
        }

        case MemoryEvents.ENERGIZE_TOP: {
          setRipple({
            show: true,
            direction: "top",
          });

          const topNeighbor = getNeighbors(index).top;
          emitEvent({
            id: topNeighbor,
            description: MemoryEvents.ENERGIZE_TOP_2ND,
          });
          return;
        }

        case MemoryEvents.ENERGIZE_RIGHT: {
          setRipple({
            show: true,
            direction: "right",
          });

          const rightNeighbor = getNeighbors(index).right;
          emitEvent({
            id: rightNeighbor,
            description: MemoryEvents.ENERGIZE_RIGHT_2ND,
          });
          return;
        }

        case MemoryEvents.ENERGIZE_BOTTOM: {
          setRipple({
            show: true,
            direction: "bottom",
          });

          const bottomNeighbor = getNeighbors(index).bottom;
          emitEvent({
            id: bottomNeighbor,
            description: MemoryEvents.ENERGIZE_BOTTOM_2ND,
          });
          return;
        }

        case MemoryEvents.ENERGIZE_LEFT: {
          setRipple({
            show: true,
            direction: "left",
          });

          const leftNeighbor = getNeighbors(index).left;
          emitEvent({
            id: leftNeighbor,
            description: MemoryEvents.ENERGIZE_LEFT_2ND,
          });
          return;
        }

        case MemoryEvents.ENERGIZE_TOP_2ND: {
          setRipple({
            show: true,
            direction: "top2nd",
          });
          return;
        }

        case MemoryEvents.ENERGIZE_RIGHT_2ND: {
          setRipple({
            show: true,
            direction: "right2nd",
          });
          return;
        }

        case MemoryEvents.ENERGIZE_BOTTOM_2ND: {
          setRipple({
            show: true,
            direction: "bottom2nd",
          });
          return;
        }

        case MemoryEvents.ENERGIZE_LEFT_2ND: {
          setRipple({
            show: true,
            direction: "left2nd",
          });
          return;
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [emitEvent, index, step]
  );

  useEffect(() => {
    const observerFn = (event: MemoryEvents) => handleEvents(event);

    const unsubscribe = subscribe({
      id: index,
      fn: observerFn,
    });

    return () => {
      unsubscribe();
    };
  }, [subscribe, index, handleEvents]);

  const isMobile = memorySize === SMALL_GRID_CELL_SIZE;

  return (
    <motion.div
      animate={{
        scale:
          conditions.isFocused(index) && !conditions.isInCrossedFocus(index)
            ? 1.1
            : animationProps.props.scale,
        translateX:
          isStoryEnding && !shouldSlowlyTranslate
            ? animationProps.props.translateMoreCompactX
            : animationProps.props.translateX,
        translateY:
          isStoryEnding && !shouldSlowlyTranslate
            ? animationProps.props.translateMoreCompactY
            : animationProps.props.translateY,
        zIndex: conditions.isFocused(index) ? 100 : zIndex,
        filter: conditions.hasFocusedIndex()
          ? conditions.isFocused(index) || conditions.isInCrossedFocus(index)
            ? "blur(0px) brightness(1.1)"
            : "blur(3px) brightness(0.8)"
          : "blur(0px) brightness(1.1)",
      }}
      transition={{
        duration: 1,
        type: "spring",
        bounce: 0,
        translateX: !shouldSlowlyTranslate
          ? animationProps.transition.duration
          : animationProps.transition.durationMoreCompact,
        translateY: !shouldSlowlyTranslate
          ? animationProps.transition.duration
          : animationProps.transition.durationMoreCompact,
      }}
      onAnimationComplete={() => {
        if (isStoryEnding) setShouldSlowlyTranslate(true);
      }}
      style={{
        width: memorySize,
        height: memorySize,
      }}
      className="relative rounded-xl"
    >
      <Image
        src={`/memory-movie/memories/${images[index]}`}
        alt={`Memory Image: ${images[index]}`}
        fill={true}
        sizes="100px"
        priority
        className="object-cover rounded-xl"
      />

      {conditions.shouldIlluminate(index) ? (
        <Illuminator
          onIlluminationComplete={handleIlluminateComplete}
          isPeriodic={conditions.isPeriodicIllumination()}
          isMobile={isMobile}
        />
      ) : null}

      {ripple.show && (
        <Ripple
          direction={ripple.direction}
          onRippleComplete={() => setRipple({ show: false, direction: null })}
        />
      )}
    </motion.div>
  );
}

function Illuminator({
  onIlluminationComplete,
  isPeriodic,
  isMobile,
}: {
  onIlluminationComplete: () => void;
  isPeriodic: boolean;
  isMobile: boolean;
}) {
  const [illuminate, setIlluminate] = useState(false);
  const brightenDuration = 0.5;
  const fadeDuration = 0.28;

  const PROBABILITY = isMobile ? 0.007 : 0.01;

  useEffect(() => {
    let timer;

    if (isPeriodic) {
      timer = setInterval(() => {
        setIlluminate(true);
      }, 2000);
    } else {
      timer = setInterval(() => {
        const illuminationWillHappen = Math.random() < PROBABILITY;

        if (illuminationWillHappen) {
          setIlluminate(true);
        }
      }, 100);
    }

    return () => clearInterval(timer);
  }, [isPeriodic, PROBABILITY]);

  const handleIlluminateComplete = () => {
    setIlluminate(false);
  };

  return (
    <>
      <motion.div
        initial={{ boxShadow: "0px 0px 14px 8px rgba(255, 255, 255, 0)" }}
        animate={{
          boxShadow: illuminate
            ? "0px 0px 8px 12px rgba(255, 255, 255, 0.8)"
            : "0px 0px 14px 8px rgba(255, 255, 255, 0)",
          backgroundColor: illuminate
            ? "rgba(255, 255, 255, 0.5)"
            : "rgba(255, 255, 255, 0)",
          transition: {
            duration: illuminate ? brightenDuration : fadeDuration,
          },
        }}
        onAnimationComplete={() => {
          if (illuminate) {
            handleIlluminateComplete();
          }
        }}
        className="absolute size-full rounded-xl"
      />

      <motion.div
        initial={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
        animate={{
          backgroundColor: illuminate
            ? "rgba(255, 255, 255, 0.62)"
            : "rgba(255, 255, 255, 0)",
        }}
        transition={{
          duration: brightenDuration * 0.9,
        }}
        onAnimationComplete={() => {
          if (illuminate) {
            onIlluminationComplete();
          }
        }}
        style={{
          mixBlendMode: "overlay",
        }}
        className="absolute size-full rounded-xl"
      />
    </>
  );
}

function Ripple({
  direction,
  onRippleComplete,
}: {
  direction: RippleDirection;
  onRippleComplete: () => void;
}) {
  const duration = 0.93;
  const [pathColors, setPathColors] = useState<string[] | null>(null);

  useEffect(() => {
    const colors = {
      red: "hsl(20, 100%, 50%)",
      green: "hsl(108, 100%, 25%)",
      blue: "hsl(220, 100%, 50%)",
      violet: "hsl(250, 60%, 86%)",
    };

    const colorCombinations = [
      [colors.blue, colors.green, colors.red],
      [colors.blue, colors.blue, colors.green],
      [colors.blue, colors.green, colors.violet],
      [colors.red, colors.green, colors.blue],
      [colors.green, colors.blue, colors.violet],
      [colors.red, colors.blue, colors.violet],
    ];

    const colorCombinationIndex = Math.floor(
      Math.random() * colorCombinations.length
    );
    setPathColors(colorCombinations[colorCombinationIndex]);
  }, [direction]);

  let scaleX = 1;
  let rotation = 0;
  let opacity = 0.77;
  let delay = 0;

  switch (direction) {
    case "top":
      scaleX = -1;
      rotation = 270;
      break;

    case "bottom":
      scaleX = -1;
      rotation = 90;
      break;

    case "left":
      scaleX = -1;
      break;

    case "top2nd":
      scaleX = -1;
      rotation = 270;
      delay = duration * 0.33;
      opacity = 0.4;
      break;

    case "right2nd":
      delay = duration * 0.33;
      opacity = 0.4;
      break;

    case "bottom2nd":
      scaleX = -1;
      rotation = 90;
      delay = duration * 0.33;
      opacity = 0.4;
      break;

    case "left2nd":
      scaleX = -1;
      delay = duration * 0.33;
      opacity = 0.4;
      break;
  }

  const pathVariants = {
    initialLongPath: {
      opacity: 0,
      strokeDashoffset: 0.2,
    },
    animateLongPath: {
      opacity: [0, 1, 0.9, 0.8, 0.7, 0],
      strokeDashoffset: -0.9,
      transition: {
        duration,
        delay,
        ease: "easeInOut",
      },
    },
    initialShortPath: {
      opacity: 0,
      strokeDashoffset: 0.4,
    },
    animateShortPath: {
      opacity: [0, 1, 0.9, 0.8, 0.7, 0],
      strokeDashoffset: -0.9,
      transition: {
        duration,
        delay,
        ease: "easeInOut",
      },
    },
  };

  if (pathColors === null) return;

  return (
    <div
      style={{
        filter: "blur(1.6px) brightness(1.3)",
        mixBlendMode: "hard-light",
        opacity: opacity,
        borderRadius: "0.75rem",
      }}
    >
      <svg
        className="absolute overflow-visible z-20"
        width="70"
        height="70"
        viewBox="0 0 70 70"
        style={{ transform: `scaleX(${scaleX}) rotate(${rotation}deg)` }}
      >
        {/* 1st Ripple */}
        <motion.path
          d="M 2,10 A 21,21 0 0 1 10,2 H 73 A 21,21 0 0 1 81,10 V 73 A 21,21 0 0 1 73,81 H 71"
          fill="none"
          stroke={pathColors[0]}
          strokeWidth="1.6"
          pathLength="1"
          transform="translate(-6.3,-7)"
          strokeDasharray="0.4, 1"
          variants={pathVariants}
          initial="initialLongPath"
          animate="animateLongPath"
          onAnimationComplete={onRippleComplete}
        />
        <motion.path
          d="M 2,10 V 73 A 21,21 0 0 0 10,81 H 73 A 21,21 0 0 0 81,73 V 71"
          fill="none"
          stroke={pathColors[0]}
          strokeWidth="1.6"
          pathLength="1"
          transform="translate(-6.3,-7)"
          strokeDasharray="0.7, 1"
          variants={pathVariants}
          initial="initialShortPath"
          animate="animateShortPath"
        />

        {/* 2nd Ripple */}
        <motion.path
          d="M 2,10 A 16,16 0 0 1 10,2 H 68 A 16,16 0 0 1 76,10 V 68 A 16,16 0 0 1 68,76 H 66"
          fill="none"
          stroke={pathColors[1]}
          strokeWidth="1.6"
          pathLength="1"
          transform="translate(-4,-4.5)"
          strokeDasharray="0.4, 1"
          variants={pathVariants}
          initial="initialLongPath"
          animate="animateLongPath"
        />
        <motion.path
          d="M 2,10 V 68 A 16,16 0 0 0 10,76 H 68 A 16,16 0 0 0 76,68 V 66"
          fill="none"
          stroke={pathColors[1]}
          strokeWidth="1.6"
          pathLength="1"
          transform="translate(-4,-4.5)"
          strokeDasharray="0.7, 1"
          variants={pathVariants}
          initial="initialShortPath"
          animate="animateShortPath"
        />

        {/* 3rd Ripple */}
        <motion.path
          d="M 2,10 A 11,11 0 0 1 10,2 H 63 A 11,11 0 0 1 71,10 V 63 A 11,11 0 0 1 63,71 H 61"
          fill="none"
          stroke={pathColors[2]}
          strokeWidth="1.6"
          pathLength="1"
          transform="translate(-1, -2)"
          strokeDasharray="0.4, 1"
          variants={pathVariants}
          initial="initialLongPath"
          animate="animateLongPath"
        />
        <motion.path
          d="M 2,10 V 63 A 11,11 0 0 0 10,71 H 63 A 11,11 0 0 0 71,63 V 61"
          fill="none"
          stroke={pathColors[2]}
          strokeWidth="1.6"
          pathLength="1"
          transform="translate(-1, -2)"
          strokeDasharray="0.7, 1"
          variants={pathVariants}
          initial="initialShortPath"
          animate="animateShortPath"
        />
      </svg>
    </div>
  );
}
