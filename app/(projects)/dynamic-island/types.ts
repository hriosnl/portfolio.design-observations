export enum ViewState {
  COMPACT = "compact",
  EXPANDED = "expanded",
}

export enum ViewName {
  IDLE = "idle",
  TIMER = "timer",
  COFFEE = "coffee",
  RIDE = "ride",
  FLIGHT = "flight",
}

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
