"use client";

import { useMemo } from "react";
import { motion } from "motion/react";

import {
  getCompressedMemoryProps,
  getAlignedMemoryProps,
  getMemoryPosition,
  getShrinkedAnimationProps,
} from "@/app/memory-movie/helper";
import { MemoryPositioning } from "@/app/memory-movie/types";
import { FOCUSED_INDEX } from "@/app/memory-movie/constants";

import { Memory } from "@/components/memory-movie/Memory";
import { PartialShootingStar } from "@/components/memory-movie/PartialShootingStar";
import { ShootingStar } from "@/components/memory-movie/ShootingStar";

export const MemoryWithShootingStar = ({
  index,
  isStoryEnding,
  step,
  memoryPositioning,
  memorySize,
}: {
  index: number;
  isStoryEnding: boolean;
  step: number;
  memoryPositioning: MemoryPositioning;
  memorySize: number;
}) => {
  const initialAnimationProps = useMemo(
    () => getShrinkedAnimationProps(index),
    [index]
  );

  const compressedAnimationProps = useMemo(
    () => getCompressedMemoryProps(index),
    [index]
  );

  const alignedAnimationProps = useMemo(() => getAlignedMemoryProps(), []);

  const memoryAnimationProps = () => {
    if (memoryPositioning === MemoryPositioning.COMPRESSED) {
      return compressedAnimationProps;
    } else if (memoryPositioning === MemoryPositioning.SHRINKED) {
      return initialAnimationProps;
    } else {
      return alignedAnimationProps;
    }
  };

  const shootingStar = shootingStarConditions(step, isStoryEnding);

  return (
    <motion.div layoutId={`memory-${index}`}>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.1,
        }}
      >
        <Memory
          index={index}
          isStoryEnding={isStoryEnding}
          step={step}
          animationProps={memoryAnimationProps()}
          memorySize={memorySize}
        />
      </motion.div>

      {shootingStar.willShow(index) &&
        (shootingStar.isPartialShootingStar() ? (
          <PartialShootingStar
            step={step}
            target={getMemoryPosition(index, memorySize)}
          />
        ) : (
          <ShootingStar
            index={index}
            isStoryEnding={isStoryEnding}
            animationProps={memoryAnimationProps()}
            step={step}
            target={getMemoryPosition(index, memorySize)}
            targetSize={memorySize}
          />
        ))}
    </motion.div>
  );
};

const shootingStarConditions = (step: number, isEnding: boolean) => {
  return {
    willShow(index: number) {
      if (step === 16) return isEnding;

      if (this.willShowToAll()) return true;

      return this.willShowToFocusedIndex(index);
    },

    willShowToFocusedIndex(index: number) {
      if (this.willShowToAll()) return true;

      const includedSteps = [8, 9, 10, 11, 12, 13];
      return includedSteps.includes(step) && index === FOCUSED_INDEX;
    },

    willShowToAll() {
      const includedSteps = [14, 15];

      return includedSteps.includes(step);
    },

    isPartialShootingStar() {
      const includedSteps = [8, 9];
      return includedSteps.includes(step);
    },
  };
};
