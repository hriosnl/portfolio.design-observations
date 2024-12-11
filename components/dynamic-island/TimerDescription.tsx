"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

import { transitions, exitVariants } from "@/app/dynamic-island/animations";
import { CheckButton } from "@/components/dynamic-island/Buttons";

export function TimerDescription() {
  const [slowedAnimation, setIsSlowAnimation] = useState(false);
  const [showHackSolution, setShowHackSolution] = useState(false);
  const [slowedHackAnimation, setIsSlowHackAnimation] = useState(false);

  return (
    <>
      <div className="w-full flex flex-col md:flex-row justify-center items-center gap-x-8 lg:pr-6 mb-10">
        <div className="grow flex justify-center">
          <ZoomedTimer
            slowedAnimation={slowedAnimation}
            showHack={showHackSolution}
            slowedHackAnimation={slowedHackAnimation}
          />
        </div>
        <div className="flex flex-col items-start gap-y-1 w-fit mt-10">
          <CheckButton
            isActive={slowedAnimation}
            label="Slow transition"
            color="#FDB000"
            handleClick={() => {
              setIsSlowHackAnimation(false);
              setIsSlowAnimation((prev) => !prev);
            }}
          />
          <CheckButton
            isActive={showHackSolution}
            label="Show hacky solution"
            color="#FDB000"
            handleClick={() => setShowHackSolution((prev) => !prev)}
          />
          <CheckButton
            isActive={slowedHackAnimation}
            label="Slow hacky solution exit"
            color="#FDB000"
            handleClick={() => {
              setIsSlowAnimation(false);
              setShowHackSolution(true);
              setIsSlowHackAnimation((prev) => !prev);
            }}
          />
        </div>
      </div>

      <h1 className="text-[2.5rem] font-light text-white">Timer</h1>

      <main className="text-[#f5f6f4] space-y-7 pt-8 pb-24">
        <p>
          This is the first of the four Live Activities I created, where I ran
          into the toughest challenge of the entire project.
        </p>

        <p>
          If you{" "}
          <button
            onClick={() => {
              window.scrollTo({
                top: 540,
                behavior: "smooth",
              });
              setIsSlowHackAnimation(false);
              setIsSlowAnimation((prev) => !prev);
            }}
            style={{
              border: "1px solid",
              borderColor: slowedAnimation
                ? "rgba(253, 177, 0, 0.6)"
                : "rgba(253, 177, 0, 0.3)",
            }}
            className="rounded-md px-1 text-[0.9rem]"
            // className="link"
          >
            slow down the animation
          </button>
          , you&apos;ll notice the time turns black instantly before it
          minimizes. This happens because of how Framer Motion handles layout
          animations. It uses the{" "}
          <a
            className="link"
            href="https://www.nan.fyi/magic-motion"
            target="_blank"
          >
            FLIP
          </a>{" "}
          technique, which essentially copies the properties of the
          animation&apos;s destination then transforms the original properties
          to match the destination&apos;s properties.
        </p>

        <p>
          I knew{" "}
          <a className="link" href="https://animations.dev/" target="_blank">
            Emil
          </a>{" "}
          came up with a workaround for this issue, but I wanted to create a{" "}
          <span className="italic">cleaner</span> solution. I tried several
          approaches, but unfortunately, I ended up stuck for over a week
          without making any progress.
        </p>

        <p>
          In the end, I had to use his{" "}
          <button
            onClick={() => {
              window.scrollTo({
                top: 540,
                behavior: "smooth",
              });
              setShowHackSolution((prev) => !prev);
            }}
            style={{
              border: "1px solid",
              borderColor: showHackSolution
                ? "rgba(253, 177, 0, 0.6)"
                : "rgba(253, 177, 0, 0.3)",
            }}
            className="rounded-md px-1 text-[0.9rem]"
          >
            hacky solution
          </button>
          , which involved creating a copy of the element to minimize, placing
          it outside the area where the automatic{" "}
          <span className="font-mono code">layout</span> transition happens, and
          giving it its own exit animation.
        </p>
        <p>It might not be the perfect solution, but it works!</p>
        <p>ありがとう、せんぱい! 🙂</p>
      </main>
    </>
  );
}

function ZoomedTimer({
  slowedAnimation,
  showHack,
  slowedHackAnimation,
}: {
  slowedAnimation: boolean;
  showHack: boolean;
  slowedHackAnimation: boolean;
}) {
  const [currentView, setCurrentView] = useState<"idle" | "timer">("timer");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentView((prev) => (prev === "idle" ? "timer" : "idle"));
    }, 3000);

    return () => clearTimeout(interval);
  }, []);

  const getTransition =
    currentView === "timer"
      ? transitions.idleToNewView
      : !slowedAnimation
      ? transitions.toIdle
      : transitions.idleToExpandedSlow;

  return (
    <motion.div
      initial={{ filter: "blur(6px)" }}
      animate={{ filter: "blur(0px)" }}
      transition={{ duration: 0.5 }}
      style={{
        boxShadow: "0 0 10px 2px rgba(69, 68, 69, 0.8)",
      }}
      className="border-2 border-white shrink-0 relative flex justify-end bg-white w-96 h-60 lg:w-[29rem] lg:h-72 rounded-md lg:rounded-full overflow-hidden"
    >
      <div className="absolute right-10 lg:right-14 top-11 w-[42.9375rem] h-96 outline outline-[1.75rem] outline-black rounded-[4.375rem]" />

      <div className="relative w-[42.9375rem] h-full shrink-0 mt-16 mr-11 lg:mr-16 flex justify-center outline outline-0 outline-cyan-400">
        <motion.div
          layout
          style={{ borderRadius: 70 }}
          className="size-fit bg-black"
          transition={getTransition}
        >
          {currentView === "idle" ? <Idle /> : <ExpandedTimer />}
        </motion.div>

        <div
          style={{
            visibility: showHack ? "visible" : "hidden",
          }}
          className="size-20 absolute top-0 flex justify-center"
        >
          <AnimatePresence mode="popLayout" custom={getTransition}>
            <motion.div
              variants={exitVariants}
              initial={{ opacity: 0 }}
              exit={`${currentView}Zoomed-expanded${
                slowedHackAnimation ? "-slow" : ""
              }`}
              key={`exit-${currentView}`}
              className="size-fit"
            >
              {currentView === "idle" ? <Idle /> : <ExpandedTimer />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

const Idle = () => {
  return <div className="w-[13.6875rem] h-[4.125rem]" />;
};

const ExpandedTimer = () => {
  return (
    <div className="w-[41.5rem] h-[9.375rem]">
      <motion.div
        initial={{ filter: "blur(10px)", opacity: 0.5 }}
        animate={{ filter: "blur(0px)", opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex justify-end items-center h-full"
      >
        <div className="text-[#FDB000] flex gap-x-[0.625rem] items-baseline pr-[3.375rem]">
          <span className="text-3xl font-light">Timer</span>
          <span className="text-[5rem] font-light ml-1">00:42</span>
        </div>
      </motion.div>
    </div>
  );
};
