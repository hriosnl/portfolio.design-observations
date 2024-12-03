/* eslint-disable @typescript-eslint/no-explicit-any */
export type ShootingStarProperties = {
  xDirection: number;
  yDirection: number;
  startXTranslate: number;
  startYTranslate: number;
  isNearFromCenter: boolean;
  trailWidth: number;
  trailHeight: number;
  rotate: number;
  scale: number;
  boxPositions: number[];
  boxColors: string[];
  duration: number;
};

export type MotionAnimationProps = {
  props: {
    translateX: number;
    translateY: number;
    scale: number;
    // opacity: number;
    translateMoreCompactX?: number;
    translateMoreCompactY?: number;
  };
  transition: {
    duration: any;
    durationMoreCompact?: any;
  };
};
export type RippleDirection =
  | "top"
  | "left"
  | "bottom"
  | "right"
  | "top2nd"
  | "left2nd"
  | "bottom2nd"
  | "right2nd"
  | null;

export enum MemoryPositioning {
  UNDEFINED = "undefined",
  SHRINKED = "shrinked",
  COMPRESSED = "compressed",
  ALIGNED = "aligned",
}

// TODO: Refactor this enum
export enum MemoryEvents {
  INITIAL = "Initial event",
  STRUCK = "Memory has been struck",
  ENERGIZE = "Memory has been energized!",
  ENERGIZE_TOP = "Memory has been energized from top!",
  ENERGIZE_RIGHT = "Memory has been energized from right!",
  ENERGIZE_BOTTOM = "Memory has been energized from bottom!",
  ENERGIZE_LEFT = "Memory has been energized from left!",
  ENERGIZE_TOP_2ND = "Memory has been energized from top, 2nd ripple!",
  ENERGIZE_RIGHT_2ND = "Memory has been energized from right, 2nd ripple!",
  ENERGIZE_BOTTOM_2ND = "Memory has been energized from bottom, 2nd ripple!",
  ENERGIZE_LEFT_2ND = "Memory has been energized from left, 2nd ripple!",
}

export type Event = {
  id: number;
  description: MemoryEvents;
};

export type Observer = {
  id: number;
  fn: (event: MemoryEvents) => void;
};
