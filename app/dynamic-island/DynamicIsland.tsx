"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

import { transitions, exitVariants } from "@/app/dynamic-island/animations";
import {
  ViewState,
  ViewName,
  TransitionOptions,
} from "@/app/dynamic-island/types";

import { ActionButtons } from "@/components/dynamic-island/Buttons";
import { Timer } from "@/components/dynamic-island/Timer";
import { Coffee } from "@/components/dynamic-island/Coffee";
import { Ride } from "@/components/dynamic-island/Ride";
import { Flight } from "@/components/dynamic-island/Flight";

const TIMER_DURATION = 42;

export default function DynamicIsland({
  updateViewName,
}: {
  updateViewName: (name: ViewName) => void;
}) {
  const [view, setView] = useState<ViewName>(ViewName.IDLE);
  const [viewState, setViewState] = useState<ViewState | null>(null);
  const previousViewStateRef = useRef<ViewState | null>(null);

  const [transitionType, setTransitionType] = useState<TransitionOptions>(
    transitions.idleToNewView
  );

  const [timeInSeconds, setTimeInSeconds] = useState(TIMER_DURATION);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    if (isPaused) return;

    const id = setInterval(() => {
      setTimeInSeconds((t) => {
        if (t === 0) {
          return TIMER_DURATION;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [isPaused]);

  useEffect(() => {
    if (view === ViewName.TIMER || view === ViewName.COFFEE) {
      setIsPaused(false);
    }
  }, [view]);

  const resetToIdle = () => {
    setIsPaused(true);
    setTimeInSeconds(TIMER_DURATION);
    setTransitionType(transitions.toIdle);
    setViewState(null);
    previousViewStateRef.current = null;
    setView(ViewName.IDLE);
    updateViewName(ViewName.IDLE);
  };

  const content = useMemo(() => {
    switch (view) {
      case ViewName.IDLE: {
        return <IdleView />;
      }
      case ViewName.TIMER: {
        updateViewName(ViewName.TIMER);
        return (
          <Timer
            isExpanded={viewState === ViewState.EXPANDED}
            timeInSeconds={timeInSeconds}
            isPaused={isPaused}
            setIsPaused={setIsPaused}
            closeTimer={resetToIdle}
          />
        );
      }
      case ViewName.COFFEE: {
        updateViewName(ViewName.COFFEE);
        return (
          <Coffee
            isExpanded={viewState === ViewState.EXPANDED}
            duration={TIMER_DURATION}
            timeInSeconds={timeInSeconds}
            closeTimer={resetToIdle}
          />
        );
      }
      case ViewName.RIDE: {
        updateViewName(ViewName.RIDE);
        return (
          <Ride
            isExpanded={viewState === ViewState.EXPANDED}
            driverId={Math.floor(Math.random() * 2)}
          />
        );
      }
      case ViewName.FLIGHT: {
        updateViewName(ViewName.FLIGHT);
        return <Flight isExpanded={viewState === ViewState.EXPANDED} />;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, viewState, timeInSeconds, isPaused]);

  const transitionFromIdle = (newView: ViewName) => {
    setView(ViewName.IDLE);
    setTimeout(() => {
      setView(newView);
    }, 400);
  };

  const handleClick = (name: ViewName) => {
    const defaultViewState = ViewState.EXPANDED;

    // no transition if from 'idle' state
    if (view === "idle") {
      setViewState((prev) => {
        previousViewStateRef.current = prev;
        return defaultViewState;
      });
      setTransitionType(transitions.idleToNewView);
      setView(name);
      return;
    }

    // always transition if the 'view' changes
    if (view !== name) {
      setIsPaused(true);
      setTimeInSeconds(TIMER_DURATION);

      setViewState((prev) => {
        previousViewStateRef.current = prev;
        return defaultViewState;
      });
      setTransitionType(transitions.viewToNewView);
      transitionFromIdle(name);
      return;
    }

    // no transition if same view and from compact viewState
    if (viewState === ViewState.COMPACT) {
      setViewState((prev) => {
        previousViewStateRef.current = prev;
        return ViewState.EXPANDED;
      });
      setTransitionType(transitions.compactToExpanded);
    } else {
      setViewState((prev) => {
        previousViewStateRef.current = prev;
        return ViewState.COMPACT;
      });
      setTransitionType(transitions.expandedToCompact);
      transitionFromIdle(name);
    }
  };

  return (
    <div className="relative lg:basis-[580px] shrink-0 w-full min-h-[69vh] flex flex-col items-center overflow-hidden mt-3 lg:mt-0">
      <section className="relative mt-14">
        {/* iPhone frame */}
        <div className="bg-white h-[62vh] w-[27rem] lg:w-[26.6875rem] lg:h-[95vh] outline outline-[0.75rem] outline-black rounded-[55px]" />
        {/* Horizon: */}
        <div className="absolute w-[28rem] h-[70px] bg-white bottom-0 left-1/2 -translate-x-1/2 lg:hidden" />

        <div className="absolute top-[0.75rem] left-1/2 -translate-x-1/2">
          <motion.div
            layout
            transition={transitionType}
            style={{
              backgroundColor:
                view === "flight" && viewState === ViewState.EXPANDED
                  ? "#027DDA"
                  : "black",
              borderRadius: 40,
            }}
          >
            {content}
          </motion.div>

          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 flex justify-center h-[12.5rem] w-[18.75rem]">
            <AnimatePresence mode="popLayout" custom={transitionType}>
              <motion.div
                variants={exitVariants}
                initial={{ opacity: 0 }}
                exit={`${view}-${viewState}`}
                key={`exit-${view}-${viewState}`}
                className="size-fit"
              >
                {content}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="absolute bottom-0 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/95 via-70% to-[#0C0C0C]/90 w-full h-fit z-50 flex flex-col justify-center items-center gap-y-10 pb-14 pt-16">
        <div className="w-fit h-fit grid grid-cols-4 justify-items-center gap-7">
          {ActionButtons.map((button) => (
            <div key={button.name} className="flex flex-col items-center">
              <motion.button
                onClick={() => handleClick(button.name)}
                whileTap={{ scale: 0.96 }}
                className="size-16 bg-white rounded-2xl"
              >
                {view === button.name ? (
                  viewState === ViewState.EXPANDED ? (
                    <div className="flex flex-col">
                      <span className="text-[0.6875rem] font-medium">
                        Toggle Compact
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      <span className="text-[0.6875rem] font-medium">
                        Toggle Expanded
                      </span>
                    </div>
                  )
                ) : (
                  <div className="flex justify-center">{button.icon}</div>
                )}
              </motion.button>

              <span className="text-white text-sm capitalize mt-1.5">
                {button.name}
              </span>
            </div>
          ))}
        </div>

        <motion.button
          onClick={resetToIdle}
          whileTap={{ scale: 0.96 }}
          className="text-xs font-mono uppercase border border-gray-300 text-gray-100 rounded-sm px-6 py-1.5"
          animate={{ opacity: viewState === null ? 0.42 : 1 }}
        >
          Reset to Idle
        </motion.button>
      </section>
    </div>
  );
}

function IdleView() {
  return <motion.div className="w-[8.5rem] h-[2.5625rem]" />;
}
