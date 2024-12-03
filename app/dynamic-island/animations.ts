const easeInCubic = [0.55, 0.055, 0.675, 0.19];

type TransitionType = "spring" | "ease";

export type TransitionOptions = {
  type?: TransitionType;
  ease?: number[];
  bounce?: number;
  duration?: number;
};

export type Transition = {
  [key: string]: TransitionOptions;
};

export const transitions: {
  [key: string]: TransitionOptions;
} = {
  toIdle: {
    type: "spring",
    bounce: 0.2,
    duration: 0.7,
  },
  compactToExpanded: {
    ease: easeInCubic,
    duration: 0.3,
    // duration: 2,
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
};

export const exitVariants = {
  "timer-expanded": (transition: Transition) => {
    return {
      scale: 0.4,
      y: -28,
      opacity: [1, 0],
      filter: "blur(5px)",
      // transition: { duration: 2 },
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
};
