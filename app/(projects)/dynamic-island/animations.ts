import type { Variants } from "motion/react";
import type { Transition } from "./types";

export const transitions: Transition = {
  toIdle: {
    type: "spring",
    bounce: 0.2,
    duration: 0.7,
  },
  compactToExpanded: {
    ease: [0.55, 0.055, 0.675, 0.19],
    duration: 0.3,
  },
  expandedToCompact: {
    type: "spring",
    bounce: 0.25,
    duration: 0.7,
  },
  idleToNewView: {
    type: "spring",
    bounce: 0.25,
    duration: 0.7,
  },
  viewToNewView: {
    type: "spring",
    bounce: 0.2,
    duration: 0.7,
  },
  idleToExpandedSlow: {
    type: "spring",
    bounce: 0.15,
    duration: 3,
  },
};

export const exitVariants: Variants = {
  "timer-expanded": (transition: Transition) => {
    return {
      scale: 0.4,
      y: -28,
      opacity: [1, 0],
      filter: "blur(5px)",
      transition,
    };
  },
  "coffee-expanded": (transition: Transition) => {
    return {
      scale: 0.25,
      y: -83,
      opacity: [1, 0],
      filter: "blur(5px)",
      transition,
    };
  },
  "ride-expanded": (transition: Transition) => {
    return {
      scale: 0.4,
      y: -49,
      opacity: [1, 0],
      filter: "blur(5px)",
      transition,
    };
  },
  "flight-expanded": (transition: Transition) => {
    return {
      scale: 0.4,
      y: -37,
      opacity: [1, 0],
      filter: "blur(5px)",
      transition,
    };
  },

  "timerZoomed-expanded": (transition: Transition) => {
    return {
      scale: 0.35,
      y: -40,
      opacity: [1, 0],
      filter: "blur(5px)",
      transition,
    };
  },
  "timerZoomed-expanded-slow": () => {
    return {
      scale: 0.35,
      y: -40,
      opacity: [1, 0],
      filter: "blur(5px)",
      transition: { duration: 2 },
    };
  },
};
