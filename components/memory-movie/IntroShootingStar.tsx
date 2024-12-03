import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Image from "next/image";

import {
  VIEW_WIDTH,
  VIEW_HEIGHT,
  GRID_CELL_SIZE,
} from "@/app/memory-movie/constants";
import { useImageContext } from "@/providers/image-provider";

export function IntroShootingStar({
  targetX,
  targetY,
}: {
  targetX: number;
  targetY: number;
}) {
  const { images } = useImageContext();

  // const maxFallDuration = 1.8;
  const minFallDuration = 0.88;
  const maxFallDuration = 1.4;

  const [shootingStarWillFall, setShootingStarWillFall] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const xDirection = getDirection();
  const yDirection = getDirection();
  const duration = getDuration();
  const initialX = getInitialX();
  const initialY = getInitialY();
  const rotate = getRotate();
  const scale = getScale();
  const [boxStartX, boxStartY, boxEndY] = getPositions();
  const [boxOneStartHue, boxOneEndHue, boxTwoStartHue, boxTwoEndHue] =
    getHues();

  useEffect(() => {
    if (!shootingStarWillFall) {
      setImageIndex(Math.floor(Math.random() * images.length));
      setTimeout(() => {
        setShootingStarWillFall(true);
      }, 1600);
    }
  }, [shootingStarWillFall, images.length]);

  function getDirection() {
    return Math.random() > 0.5 ? 1 : -1;
  }

  function getPositions() {
    const startX = Math.floor(Math.random() * 50) * xDirection;
    const startY = (Math.floor(Math.random() * 30 + 1) - 40) * yDirection;
    const endY = Math.floor(Math.random() * 10 + 1) - 10;

    return [startX, startY, endY];
  }

  function getHues() {
    const hues = [30, 210, 270, 330, 210, 270, 330];
    const startHue1 = hues[Math.floor(Math.random() * hues.length)];
    const endHue1 = hues[Math.floor(Math.random() * hues.length)];
    const startHue2 = hues[Math.floor(Math.random() * hues.length)];
    const endHue2 = hues[Math.floor(Math.random() * hues.length)];
    return [startHue1, endHue1, startHue2, endHue2];
  }

  function getRotate() {
    return Math.floor(Math.random() * 30) * xDirection;
  }

  function getScale() {
    const scales = [2, 2.5, 3, 3.5];
    const scale = scales[Math.floor(Math.random() * scales.length)];
    return scale;
  }

  function getInitialX() {
    const WIDE_SCREEN_FACTOR = 2;

    const maxXTranslation = (VIEW_WIDTH / 2 + 100) * WIDE_SCREEN_FACTOR;
    const centerX = VIEW_WIDTH / 2 - GRID_CELL_SIZE / 2;

    return (centerX + Math.random() * maxXTranslation) * xDirection;
  }

  function getInitialY() {
    const maxYTranslation = VIEW_HEIGHT / 2;
    const centerY = VIEW_HEIGHT / 2 - GRID_CELL_SIZE / 2;

    if (Math.random() > 0.8) {
      return centerY - (100 + Math.random() * maxYTranslation);
    } else {
      return centerY - (maxYTranslation + Math.random() * 60);
    }
  }

  function getDuration() {
    return (
      Math.random() * (maxFallDuration - minFallDuration) + minFallDuration
    );
  }

  // Prevent rendering when initial values are not yet computed
  if (initialX === 0 && initialY === 0) {
    return null;
  }

  return shootingStarWillFall ? (
    <motion.div
      initial={{
        left: initialX,
        top: initialY - 150,
        rotate: rotate,
        scale: scale,
      }}
      animate={{
        left: targetX,
        top: targetY - GRID_CELL_SIZE / 2,
        rotate: 0,
        scale: 1,
      }}
      transition={{
        delay: 0.01,
        type: "spring",
        duration: duration,
        bounce: 0,
        rotate: { duration: duration * 1.2 },
      }}
      onAnimationComplete={() => {
        setShootingStarWillFall(false);
      }}
      style={{
        width: GRID_CELL_SIZE,
        height: GRID_CELL_SIZE,
      }}
      className="absolute z-[100] pointer-events-none"
    >
      <ShootingStarMemory image={images[imageIndex]} duration={duration} />

      <motion.div
        initial={{
          opacity: 0.4,
          scaleY: 1.5,
          scaleX: 0.8,
          backgroundColor: `hsl(${boxOneStartHue}, 100%, 50%)`,
          y: boxStartY,
          x: boxStartX,
        }}
        animate={{
          opacity: 0,
          scaleY: 1,
          scaleX: 1,
          borderRadius: 35,
          backgroundColor: `hsl(${boxOneEndHue}, 100%, 50%)`,
          y: boxEndY,
          x: 0,
        }}
        transition={{
          duration,
          opacity: { delay: duration * 0.8 },

          x: { duration: duration * 1.3 },
          y: { duration: duration * 1.3 },
        }}
        className="absolute size-full blur-lg"
      />
      <motion.div
        initial={{
          opacity: 0.3,
          scaleY: 1.5,
          scaleX: 0.8,
          backgroundColor: `hsl(${boxTwoStartHue}, 100%, 50%)`,
        }}
        animate={{
          opacity: 0,
          scaleY: 1,
          scaleX: 1,
          borderRadius: 35,
          backgroundColor: `hsl(${boxTwoEndHue}, 100%, 50%)`,
        }}
        transition={{ duration, opacity: { delay: duration * 0.8 } }}
        className="absolute size-full blur-lg"
      />
    </motion.div>
  ) : null;
}

export const ShootingStarMemory = ({
  image,
  duration,
}: {
  image: string;
  duration: number;
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 1.3,
        filter: "blur(1px) brightness(4)",
      }}
      animate={{
        opacity: 1,
        scale: 0.5,
        filter: "blur(0px) brightness(1)",
      }}
      transition={{
        duration: duration,
        opacity: { delay: duration * 0.3 },
        filter: { duration: duration * 0.8 },
      }}
      className="absolute size-full -bottom-[33px] right-2"
    >
      <div className="size-full relative rounded-xl">
        <Image
          src={`/memory-movie/memories/${image}`}
          alt={`Memory Image: ${image}`}
          fill={true}
          sizes="20vw"
          className="object-cover rounded-xl"
        />
      </div>
    </motion.div>
  );
};
