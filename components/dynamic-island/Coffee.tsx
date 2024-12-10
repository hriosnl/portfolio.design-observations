// TODOs
// time's up design for both compact and expanded ✅ 😆
// orange to gray pill animation ✅
// tabular nums ✅
// animated numbers ✅
// enter animations blur for both compact and expanded ✅
// it is not togglePause, it is stop ✅
// ugly fonts ✅
// stop timer button ✅

import { motion, AnimatePresence } from "motion/react";

export function Coffee({
  isExpanded,
  duration,
  timeInSeconds,
  closeTimer,
}: {
  isExpanded: boolean | undefined;
  duration: number;
  timeInSeconds: number;
  closeTimer: () => void;
}) {
  return (
    <>
      {isExpanded ? (
        <ExpandedCoffee
          duration={duration}
          timeInSeconds={timeInSeconds}
          closeTimer={closeTimer}
        />
      ) : (
        <CompactCoffee timeInSeconds={timeInSeconds} />
      )}
    </>
  );
}

function CompactCoffee({ timeInSeconds }: { timeInSeconds: number }) {
  return (
    <div className="h-[2.5625rem] w-[14.125rem]">
      <motion.div
        initial={{ filter: "blur(10px)", opacity: 0.5 }}
        animate={{ filter: "blur(0px)", opacity: 1 }}
        className="h-full"
      >
        <div className="h-full flex items-center justify-between px-[0.5625rem]">
          <CoffeeIcon />
          <span className="text-[#FD7200] font-semibold">{timeInSeconds}s</span>
        </div>
      </motion.div>
    </div>
  );
}

function ExpandedCoffee({
  duration,
  timeInSeconds,
  closeTimer,
}: {
  duration: number;
  timeInSeconds: number;
  closeTimer: () => void;
}) {
  return (
    <div className="h-[12.5625rem] w-[25.4375rem]">
      <motion.div
        initial={{ filter: "blur(10px)", opacity: 0.5 }}
        animate={{ filter: "blur(0px)", opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col justify-center gap-y-[1.25rem] h-full"
      >
        <div className="mt-3 select-none">
          <Graduations duration={duration} currentTime={timeInSeconds} />
        </div>
        <div className="flex items-center justify-between select-none">
          <span className="flex-auto grow-0 basis-[5.625rem] text-[#fa5902] text-[2.875rem] font-normal tabular-nums ml-9">
            <AnimatedDigits seconds={timeInSeconds} />s
          </span>

          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={closeTimer}
            className="bg-[#642200] rounded-full flex justify-center items-center size-[3.125rem]"
          >
            <span className="bg-[#F56E02] inline-block size-[1.3125rem] rounded-md" />
          </motion.button>

          <span className="text-[#6b6056] text-xl font-medium mr-11">
            Espresso
          </span>
        </div>
      </motion.div>
    </div>
  );
}

function Graduations({
  duration,
  currentTime,
}: {
  duration: number;
  currentTime: number;
}) {
  const itemWithGap = 16;
  const initialXPosition = 200;

  return (
    <div className="flex justify-end relative overflow-hidden">
      <motion.ul
        initial={{
          x: -initialXPosition,
        }}
        animate={{
          x: -(initialXPosition - itemWithGap * (duration - currentTime)),
          transition: { type: "spring", bounce: 0 },
        }}
        className="w-fit flex gap-[0.375rem]"
      >
        <li className="h-[3.75rem] flex flex-col items-center justify-end relative">
          <span
            style={{
              background: "rgb(243, 100, 4)",
            }}
            className="w-[0.625rem] h-[2.1875rem] rounded-full inline-block"
          />
        </li>

        {[...Array(duration)].map((_, index) => {
          const i = index + 1;

          return (
            <li
              key={i}
              className="h-[3.75rem] flex flex-col items-center justify-end relative"
            >
              {i % 10 === 0 || i === 1 ? (
                <motion.span
                  initial={{
                    color: "#F36204",
                  }}
                  animate={{
                    filter:
                      i - currentTime > -7 && i - currentTime < 7
                        ? "none"
                        : "blur(0px)",
                    color: i <= currentTime ? "#F36204" : "#646464",
                  }}
                  className="text-[1.125rem] leading-[1rem] absolute top-0"
                >
                  {i}
                </motion.span>
              ) : null}

              <motion.span
                initial={{
                  backgroundPositionX: "0%",
                }}
                animate={{
                  backgroundPositionX: i <= currentTime ? "0%" : "100%",
                }}
                transition={{
                  duration: 1,
                  delay: -0.3,
                }}
                style={{
                  background:
                    "linear-gradient(to right, rgb(243, 100, 4), rgb(243, 100, 4), rgb(128, 128, 128))",
                  backgroundSize: "800% 100%",
                }}
                className="w-[0.625rem] h-[2.1875rem] rounded-full inline-block"
              />
            </li>
          );
        })}
      </motion.ul>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="h-[120%] w-24 absolute -top-2 right-0">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/50 via-40% to-black rounded-tr-3xl" />
        </div>

        <div className="h-[120%] w-24 absolute -top-2 left-0">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/50 via-40% to-black rounded-tl-3xl" />
        </div>
      </motion.div>
    </div>
  );
}

function CoffeeIcon() {
  return (
    <div className="size-[1.5625rem]">
      <svg
        fill="#FD7200"
        width="1.5625rem"
        height="1.5625rem"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMinYMin"
        transform="matrix(-1, 0, 0, 1, 0, 0)"
        stroke="black"
        strokeWidth="0"
      >
        <g id="coffecup" transform="translate(0, 5)">
          <path d="M0 0h17a3 3 0 0 1 0 6h-1.252A8 8 0 0 1 0 4V0zm16 4h1a1 1 0 0 0 0-2h-1v2z"></path>
        </g>
      </svg>
    </div>
  );
}

function AnimatedDigits({ seconds }: { seconds: number }) {
  const digits = String(seconds).padStart(2, "0").split("");

  return (
    <AnimatePresence initial={false} mode="popLayout">
      <motion.div
        className="inline-block tabular-nums"
        key={`tens-${digits[0]}`}
        initial={{ y: "0.75rem", filter: "blur(2px)", opacity: 0 }}
        animate={{ y: "0", filter: "blur(0px)", opacity: 1 }}
        exit={{ y: "-0.75rem", filter: "blur(2px)", opacity: 0 }}
        transition={{ type: "spring", bounce: 0.35 }}
      >
        {digits[0]}
      </motion.div>
      <motion.div
        className="inline-block tabular-nums"
        key={`ones-${digits[1]}`}
        initial={{ y: "0.75rem", filter: "blur(2px)", opacity: 0 }}
        animate={{ y: "0", filter: "blur(0px)", opacity: 1 }}
        exit={{ y: "-0.75rem", filter: "blur(2px)", opacity: 0 }}
        transition={{ type: "spring", bounce: 0.35 }}
      >
        {digits[1]}
      </motion.div>
    </AnimatePresence>
  );
}
