import { COLUMNS, ROWS } from "./constants";
import { MotionAnimationProps } from "./types";

type RowPosition = "CENTER" | "ABOVE" | "BELOW";
type ColumnPosition = "MIDDLE" | "LEFT" | "RIGHT";

function getRelativePosition(index: number) {
  const centerIndex = (COLUMNS * ROWS - 1) / 2;
  const centerRow = Math.floor(centerIndex / COLUMNS) + 1;
  const middleCol = (centerIndex % COLUMNS) + 1;

  const row = Math.floor(index / COLUMNS) + 1;
  const col = (index % COLUMNS) + 1;

  let rowPosition: RowPosition = "CENTER";
  let columnPosition: ColumnPosition = "MIDDLE";

  if (row > centerRow) {
    rowPosition = "ABOVE";
  } else if (row < centerRow) {
    rowPosition = "BELOW";
  }

  if (col > middleCol) {
    columnPosition = "RIGHT";
  } else if (col < middleCol) {
    columnPosition = "LEFT";
  }

  return { columnPosition, rowPosition };
}

export function getShrinkedAnimationProps(index: number): MotionAnimationProps {
  let [x, y] = [0, 0];

  const [min, max] = [30, 50];
  const relativePosition = getRelativePosition(index);
  const yOffset = Math.floor(Math.random() * (max - min + 1)) + min;
  const xOffset = Math.floor(Math.random() * (max - min + 1)) + min;

  const scale = (() => {
    const rand = Math.random();
    if (rand < 0.67) {
      // 67% chance for values between [1.1, 1.3)
      return 1.1 + Math.random() * 0.2;
    } else if (rand < 0.96 && rand > 0.67) {
      // 29% chance for values between [1.2, 1.5)
      return 1.3 + Math.random() * 0.3;
    } else {
      // 4% chance for values between [1.5, 1.65)
      return 1.6 + Math.random() * 0.3;
    }
  })();

  if (relativePosition.rowPosition === "BELOW") {
    y = yOffset;
  } else if (relativePosition.rowPosition === "ABOVE") {
    y = -yOffset;
  }

  if (relativePosition.columnPosition === "LEFT") {
    x = xOffset;
  } else if (relativePosition.columnPosition === "RIGHT") {
    x = -xOffset;
  }

  return {
    props: {
      translateX: x,
      translateY: y,
      scale: scale,
    },
    transition: {
      duration: { duration: 0.42, type: "spring", bounce: 0 },
    },
  };
}

export function getCompressedMemoryProps(index: number): MotionAnimationProps {
  let [x, y] = [0, 0];
  const [min, max] = [5, 15];
  const relativePosition = getRelativePosition(index);
  const yOffset = Math.floor(Math.random() * (max - min + 1)) + min;
  const xOffset = Math.floor(Math.random() * (max - min + 1)) + min;

  if (relativePosition.rowPosition === "BELOW") {
    y = yOffset;
  } else if (relativePosition.rowPosition === "ABOVE") {
    y = -yOffset;
  } else if (relativePosition.rowPosition === "CENTER") {
    y = 10;
  }

  if (relativePosition.columnPosition === "LEFT") {
    x = xOffset;
  } else if (relativePosition.columnPosition === "RIGHT") {
    x = -xOffset;
  } else if (relativePosition.columnPosition === "MIDDLE") {
    x = 5;
  }

  const moreCompactX = x * 2.2;
  const moreCompactY = y * 2.2;

  return {
    props: {
      translateX: x,
      translateY: y,
      scale: 1,
      translateMoreCompactX: moreCompactX,
      translateMoreCompactY: moreCompactY,
    },
    transition: {
      duration: { duration: 0.8, type: "spring", bounce: 0 },
      durationMoreCompact: { duration: 6, ease: "linear" },
    },
  };
}

export function getAlignedMemoryProps(): MotionAnimationProps {
  return {
    props: {
      translateX: 0,
      translateY: 0,
      scale: 1,
    },
    transition: {
      duration: { duration: 0.8, type: "spring" },
    },
  };
}

export function getMemoryPosition(index: number, memoryCellSize: number) {
  const gap = 1;
  const row = Math.floor(index / COLUMNS);
  const col = index % COLUMNS;

  const x = (memoryCellSize + gap) * col;
  const y = (memoryCellSize + gap) * row;

  return [x, y];
}

export function getNeighbors(index: number) {
  if (index < 0 || index >= 35) {
    console.error("Invalid is out of bounds!");
  }

  const top = index >= COLUMNS ? index - COLUMNS : -1;
  const bottom = index < (ROWS - 1) * COLUMNS ? index + COLUMNS : -1;
  const left = index % COLUMNS !== 0 ? index - 1 : -1;
  const right = index % COLUMNS !== COLUMNS - 1 ? index + 1 : -1;

  return { top, right, bottom, left };
}

export function getGridSize(targetSize: number) {
  const width = COLUMNS * (targetSize + 1);
  const height = ROWS * (targetSize + 1);

  return [width, height];
}
