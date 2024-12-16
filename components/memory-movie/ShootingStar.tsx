import { useState, useEffect, useMemo } from "react";
import { motion } from "motion/react";
import Image from "next/image";

import {
  VIEW_WIDTH,
  VIEW_HEIGHT,
  SMALL_GRID_CELL_SIZE,
} from "@/app/(projects)/memory-movie/constants";
import { useImageContext } from "@/providers/image-provider";
import { useMemoryEventContext } from "@/providers/event-provider";
import { getGridSize } from "@/app/(projects)/memory-movie/helper";
import { ShootingStarProperties } from "@/app/(projects)/memory-movie/types";

import {
  MemoryEvents,
  MotionAnimationProps,
} from "@/app/(projects)/memory-movie/types";

const stepConditions = (step: number) => {
  return {
    canChangeMemory() {
      const includedSteps = [11, 13, 14, 15, 16];
      return includedSteps.includes(step);
    },

    canEnergizeMemories() {
      const includedSteps = [13, 14, 15, 16];
      return includedSteps.includes(step);
    },

    isRandomTiming() {
      const includedSteps = [14, 15, 16];
      return includedSteps.includes(step);
    },

    willShowShootingStarMemory() {
      return step > 12;
    },
  };
};

export const ShootingStar = ({
  index,
  isStoryEnding,
  animationProps,
  step,
  target,
  targetSize,
}: {
  index: number;
  isStoryEnding: boolean;
  animationProps: MotionAnimationProps;
  step: number;
  target: number[];
  targetSize: number;
}) => {
  const isMobile = targetSize === SMALL_GRID_CELL_SIZE;
  const PROBABILITY = isMobile ? 0.0048 : 0.0088;

  const RANDOM_PROPERTIES = 30;
  const conditions = stepConditions(step);

  const [targetXTranslate, targetYTranslate] = target;
  const [gridWidth, gridHeight] = getGridSize(targetSize);

  const [shootingStarWillFall, setShootingStarWillFall] = useState(false);
  const [randomIndex, setRandomIndex] = useState(0);
  const [showShootingStarMemory, setShowShootingStarMemory] = useState(
    conditions.willShowShootingStarMemory()
  );
  const [doNotChangeMemoryYet, setDoNotChangeMemoryYet] = useState(false);

  const generateProperties = useMemo(() => {
    return (): ShootingStarProperties => {
      const xDirection = setDirection();
      const yDirection = setDirection();
      const startXTranslate = setStartXTranslate(xDirection);
      const startYTranslate = setStartYTranslate(yDirection);
      const isNearFromCenter = startPositionsAreNearFromCenter(
        startXTranslate,
        startYTranslate
      );
      const trailWidth = setStarWidth(isNearFromCenter);
      const trailHeight = setStarHeight(isNearFromCenter);
      const rotate = setRotate(
        isNearFromCenter,
        xDirection,
        startXTranslate,
        startYTranslate,
        targetXTranslate,
        targetYTranslate
      );
      const scale = setScale();
      const boxPositions = setBoxPosition(xDirection, yDirection);
      const boxColors = setBoxColors();
      const duration = setDuration();

      return {
        xDirection,
        yDirection,
        startXTranslate,
        startYTranslate,
        isNearFromCenter,
        trailWidth,
        trailHeight,
        rotate,
        scale,
        boxPositions,
        boxColors,
        duration,
      };
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetXTranslate, targetYTranslate]);

  const properties = useMemo(() => {
    return Array.from({ length: RANDOM_PROPERTIES }, () =>
      generateProperties()
    );
  }, [generateProperties]);

  const xDirection = properties[randomIndex].xDirection;
  const startXTranslate = properties[randomIndex].startXTranslate;
  const startYTranslate = properties[randomIndex].startYTranslate;
  const isNearFromCenter = properties[randomIndex].isNearFromCenter;
  const trailWidth = properties[randomIndex].trailWidth;
  const trailHeight = properties[randomIndex].trailHeight;
  const rotate = properties[randomIndex].rotate;
  const scale = properties[randomIndex].scale;
  const [boxStartX, boxStartY, boxEndY] = properties[randomIndex].boxPositions;
  const [boxOneStartColor, boxOneEndColor, boxTwoStartColor, boxTwoEndColor] =
    properties[randomIndex].boxColors;
  const duration = properties[randomIndex].duration;

  // Periodic timing
  useEffect(() => {
    if (conditions.isRandomTiming()) return;

    if (!shootingStarWillFall) {
      setRandomIndex(Math.floor(Math.random() * RANDOM_PROPERTIES));
      setShootingStarWillFall(true);
    }
  }, [conditions, shootingStarWillFall]);

  // Random timing
  useEffect(() => {
    if (!conditions.isRandomTiming() || shootingStarWillFall) return;

    const timer = setInterval(() => {
      const probabilityOfFalling = Math.random() < PROBABILITY;

      if (probabilityOfFalling) {
        setRandomIndex(Math.floor(Math.random() * RANDOM_PROPERTIES));
        setShootingStarWillFall(true);
      }
    }, 120);

    return () => clearInterval(timer);
  }, [conditions, shootingStarWillFall, PROBABILITY]);

  useEffect(() => {
    if (isStoryEnding) {
      setDoNotChangeMemoryYet(true);

      setTimeout(() => {
        setDoNotChangeMemoryYet(false);
      }, 6000);
    }
  }, [isStoryEnding]);

  function setDirection() {
    return Math.random() > 0.5 ? 1 : -1;
  }

  function setBoxPosition(xDirection: number, yDirection: number) {
    const boxStartX = Math.floor(Math.random() * 50) * xDirection;
    const boxStartY = (Math.floor(Math.random() * 11) + 20) * yDirection;
    const boxEndY = Math.floor(Math.random() * 10 + 1) - 10;

    return [boxStartX, boxStartY, boxEndY];
  }

  function setBoxColors() {
    const startColors = [
      "hsl(329, 100%, 50%)", //red
      "hsl(260, 100%, 47%)", //purple
      "hsl(246, 100%, 48%)", //violet
      "hsl(12, 96%, 48%)", //orange
      "hsl(231, 100%, 48%)", //blue
      "hsl(175, 100%, 52%)", //cyan
    ];
    const endColors = [
      "hsl(349, 100%, 50%)", //red
      "hsl(280, 100%, 47%)", //purple
      "hsl(266, 100%, 48%)", //violet
      "hsl(27, 96%, 48%)", //orange
      "hsl(251, 100%, 48%)", //blue
      "hsl(195, 100%, 52%)", //cyan
    ];

    const startColor1 =
      startColors[Math.floor(Math.random() * startColors.length)];
    const endColor1 = endColors[Math.floor(Math.random() * endColors.length)];
    const startColor2 =
      startColors[Math.floor(Math.random() * startColors.length)];
    const endColor2 = endColors[Math.floor(Math.random() * endColors.length)];

    return [startColor1, endColor1, startColor2, endColor2];
  }

  function setRotate(
    isNearFromCenter: boolean,
    xDirection: number,
    startXTranslate: number,
    startYTranslate: number,
    targetXTranslate: number,
    targetYTranslate: number
  ) {
    if (isNearFromCenter) {
      return Math.floor(Math.random() * 30) * xDirection;
    }

    return (
      Math.atan2(
        targetYTranslate - startYTranslate,
        targetXTranslate - startXTranslate
      ) *
      (180 / Math.PI)
    );
  }

  function setScale() {
    const scales = [2, 2.5, 3, 3.5];
    const scale = scales[Math.floor(Math.random() * scales.length)];
    return scale;
  }

  function setStartXTranslate(xDirection: number) {
    const minXTranslation = 150;
    const stillNearMaxTranslationX = gridWidth * 0.6;

    const maxXTranslation = VIEW_WIDTH * 1.3;

    // Lesser probability of having a near ShootingStar
    if (Math.random() > 0.6) {
      const translate = Math.random() * stillNearMaxTranslationX;
      const xTranslation =
        translate > minXTranslation ? translate : minXTranslation;
      return targetXTranslate + xTranslation * xDirection;
    } else {
      const xTranslation =
        stillNearMaxTranslationX + Math.random() * maxXTranslation;
      return targetXTranslate + xTranslation * xDirection;
    }
  }

  function setStartYTranslate(yDirection: number) {
    const minYTranslation = 100;
    const stillNearMaxTranslationY = gridHeight * 0.5;
    const maxYTranslation = VIEW_HEIGHT * 0.7;

    // Lesser probability of having a near ShootingStar
    if (Math.random() > 0.6) {
      const translate = Math.random() * stillNearMaxTranslationY;
      const yTranslation =
        translate > minYTranslation ? translate : minYTranslation;
      return targetYTranslate + yTranslation * yDirection;
    } else {
      const yTranslation =
        Math.floor(
          Math.random() * (maxYTranslation - stillNearMaxTranslationY + 1)
        ) + stillNearMaxTranslationY;

      return targetYTranslate + yTranslation * yDirection;
    }
  }

  function startPositionsAreNearFromCenter(
    startXTranslate: number,
    startYTranslate: number
  ) {
    const centerXTranslate = gridWidth / 2 - targetSize / 2;
    const centerYTranslate = gridHeight / 2 - targetSize / 2;

    const distanceFromCenter = Math.sqrt(
      (startXTranslate - centerXTranslate) ** 2 +
        (startYTranslate - centerYTranslate) ** 2
    );

    return distanceFromCenter < 328;
  }

  function setStarWidth(isNearFromCenter: boolean) {
    return isNearFromCenter ? targetSize * 1.7 : targetSize * 1.6;
  }

  function setStarHeight(isNearFromCenter: boolean) {
    return isNearFromCenter ? targetSize * 1.7 : targetSize * 1.4;
  }

  function setDuration() {
    const minFallDuration = 0.6;
    const maxFallDuration = 1.1;
    return (
      Math.random() * (maxFallDuration - minFallDuration) + minFallDuration
    );
  }

  const handleAnimationComplete = () => {
    setTimeout(() => {
      setShootingStarWillFall(false);
      setShowShootingStarMemory(conditions.canChangeMemory());
    }, 1500);
  };

  return shootingStarWillFall ? (
    <motion.div
      initial={{
        x: startXTranslate,
        y: startYTranslate,
        scale: scale,
      }}
      animate={{
        x: targetXTranslate + animationProps.props.translateX,
        y: targetYTranslate + animationProps.props.translateY,
        scale: 1,
      }}
      transition={{
        type: "spring",
        duration: duration,
        bounce: 0,
      }}
      style={{
        width: targetSize,
        height: targetSize,
        top: 0,
        left: 0,
      }}
      onAnimationComplete={handleAnimationComplete}
      className="absolute z-[1000] pointer-events-none"
    >
      {showShootingStarMemory && !doNotChangeMemoryYet && (
        <ShootingStarMemory
          memoryIndex={index}
          duration={duration}
          direction={xDirection}
          canEnergizeMemories={conditions.canEnergizeMemories()}
          targetSize={targetSize}
        />
      )}

      <Impact duration={duration} />

      <div
        style={{
          perspective: 150,
        }}
        className="absolute"
      >
        {!isNearFromCenter && (
          <motion.div
            initial={{
              opacity: 0.6,
              borderRadius: 5,
              backgroundColor: boxOneStartColor,
              rotate: rotate,
              rotateY: 30,
              x: boxStartX,
              y: boxStartY,
            }}
            animate={{
              opacity: 0,
              borderRadius: 45,
              backgroundColor: boxOneEndColor,
              rotate: rotate,
              width: trailWidth * 0.69,
              x: 0,
              y: boxEndY,
            }}
            transition={{
              duration,
              x: { duration: duration * 1.2 },
              y: { duration: duration * 1.2 },
              opacity: {
                delay: conditions.canChangeMemory()
                  ? duration * 0.5
                  : duration * 0.7,
                duration: duration,
                type: "spring",
                bounce: 0,
              },
              width: {
                delay: conditions.canChangeMemory()
                  ? duration * 0.5
                  : duration * 0.7,
                duration: duration,
                type: "spring",
                bounce: 0,
              },
            }}
            style={{
              width: trailWidth,
              height: trailHeight,
              filter: "blur(18px)",
            }}
            className="absolute"
          />
        )}

        <motion.div
          initial={{
            opacity: 0.4,
            borderRadius: isNearFromCenter ? 20 : 5,
            backgroundColor: boxTwoStartColor,
            rotate: rotate,
            rotateY: isNearFromCenter ? 0 : 30,
            x: -15,
            y: -15,
          }}
          animate={{
            opacity: 0,
            borderRadius: isNearFromCenter ? 30 : 45,
            backgroundColor: boxTwoEndColor,
            rotate: isNearFromCenter ? 0 : rotate,
            width: isNearFromCenter ? targetSize * 1.4 : trailWidth * 0.6,
            height: isNearFromCenter ? targetSize * 1.4 : trailHeight,
          }}
          transition={{
            duration,
            opacity: {
              delay: conditions.canChangeMemory()
                ? duration * 0.5
                : duration * 0.7,
              duration: duration,
              type: "spring",
              bounce: 0,
            },
            width: {
              delay: isNearFromCenter
                ? 0
                : conditions.canChangeMemory()
                ? duration * 0.5
                : duration * 0.7,
              duration: duration,
              type: "spring",
              bounce: 0,
            },
          }}
          style={{
            width: trailWidth,
            height: trailHeight,
            filter: isNearFromCenter ? "blur(9px)" : "blur(18px)",
          }}
          className="absolute"
        />
      </div>
    </motion.div>
  ) : null;
};

const ShootingStarMemory = ({
  memoryIndex,
  duration,
  direction,
  canEnergizeMemories,
  targetSize,
}: {
  memoryIndex: number;
  duration: number;
  direction: number;
  canEnergizeMemories: boolean;
  targetSize: number;
}) => {
  const { images, getReplacementImage, replaceImage } = useImageContext();
  const { emitEvent } = useMemoryEventContext();

  const [hideImage, setHideImage] = useState(false);
  const [newImage, setNewImage] = useState("");
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const result = await getReplacementImage();

        if (result) setNewImage(result);
      } catch (error) {
        console.log("Error loading image:", error);

        setNewImage(images[memoryIndex]); // Set error result
      }
    };

    loadImage();
  }, [getReplacementImage, images, memoryIndex]);

  useEffect(() => {
    const randomRotation = 5 + Math.floor(Math.random() * 30);
    setRotation(randomRotation);
  }, [memoryIndex]);

  const onAnimationComplete = () => {
    replaceImage(memoryIndex);
    setHideImage(true);
  };

  const emitStruckEvent = () => {
    if (canEnergizeMemories) {
      emitEvent({
        id: memoryIndex,
        description: MemoryEvents.STRUCK,
      });
    }
  };

  if (newImage === "") return;

  return hideImage ? null : (
    <motion.div
      initial={{
        opacity: 0,
        scale: 2,
        filter: "blur(6px) brightness(3)",
        boxShadow: "0px 0px 20px 10px rgba(250, 250, 255, 0.8)",
        rotate: rotation * direction,
      }}
      animate={{
        opacity: [0, 0, 0.7, 1, 0],
        scale: canEnergizeMemories ? 1 : 1.1,
        filter: "blur(0px) brightness(1.1)",
        boxShadow: "none",
        rotate: 0,
      }}
      transition={{
        delay: duration * 0.45,
        opacity: { duration: duration * 1.6, times: [0, 0.4, 0.5, 0.95, 1] },
        scale: { duration: duration * 0.65 },

        filter: {
          delay: duration * 0.5,
          duration: 0.7,
          type: "spring",
          bounce: 0,
        },
        boxShadow: {
          delay: duration * 0.5,
          duration: duration * 0.5,
          type: "spring",
          bounce: 0,
        },
        rotate: { duration: duration, delay: 0 },
      }}
      className="absolute size-full rounded-xl"
    >
      <div
        style={{ width: targetSize, height: targetSize }}
        className="relative rounded-xl"
      >
        <Image
          src={`/memory-movie/memories/${newImage}`}
          alt={`Memory Image: ${newImage}`}
          fill={true}
          sizes="100px"
          className="object-cover rounded-xl"
        />

        <motion.div
          animate={{
            backgroundColor: [
              "rgba(255, 255, 255, 0.8)",
              "rgba(255, 255, 255, 0)",
            ],
          }}
          transition={{
            delay: duration * 0.5,
            duration: duration * 0.4,
          }}
          onAnimationComplete={onAnimationComplete}
          style={{ mixBlendMode: "screen" }}
          className="absolute size-full rounded-xl"
        />

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: [0.1, 0],
          }}
          transition={{
            duration: duration * 0.6,
          }}
          onAnimationComplete={emitStruckEvent}
        />
      </div>
    </motion.div>
  );
};

const Impact = ({ duration }: { duration: number }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        width: 100,
        height: 100,
      }}
      animate={{
        opacity: [0.08, 0.08, 0.08, 0.08, 0],
        width: 300,
        height: 300,
      }}
      transition={{
        duration: 1,
        delay: duration * 0.6,
        ease: "easeOut",
      }}
      className="absolute rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{
        backgroundColor: "hsl(204, 71%, 70%)",
        filter: "blur(6px) brightness(1)",
      }}
    />
  );
};
