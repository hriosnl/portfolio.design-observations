// TODOs
// time's up design for both compact and expanded ✅ 😆
// orange to gray pill animation
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
    <div className="h-[41px] w-[226px]">
      <motion.div
        initial={{ filter: "blur(10px)", opacity: 0.5 }}
        animate={{ filter: "blur(0px)", opacity: 1 }}
        className="h-full"
      >
        <div className="h-full flex items-center justify-between px-[9px]">
          <CoffeeIcon size={25} hexColor="#FD7200" />
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
    <div className="h-[201px] w-[407px]">
      <motion.div
        initial={{ filter: "blur(10px)", opacity: 0.5 }}
        animate={{ filter: "blur(0px)", opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col justify-center gap-y-[20px] h-full"
      >
        <div className="px-[17px] mt-3">
          <Graduations duration={duration} currentTime={timeInSeconds} />
        </div>
        <div className="flex items-center justify-between pl-[35px] pr-[44px]">
          <span className="text-[#FA5902] text-[46px] font-normal tabular-nums">
            <AnimatedDigits seconds={timeInSeconds} />s
          </span>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={closeTimer}
            className="bg-[#642200] rounded-full flex justify-center items-center size-[50px]"
          >
            <span className="bg-[#F56E02] inline-block size-[21px] rounded-md -ml-[1px]" />
          </motion.button>
          <span className="text-[#646464] text-xl font-medium">Espresso</span>
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
  const itemWithGap = 17 - 1.25;
  const initialXPosition = 187;

  return (
    <div className="flex justify-end relative overflow-hidden">
      <motion.ul
        initial={false}
        animate={{
          x: -(initialXPosition - itemWithGap * (duration - currentTime)),
          transition: { type: "spring", bounce: 0 },
        }}
        className="w-fit flex gap-[6px]"
      >
        {[...Array(duration)].map((_, index) => {
          const i = index + 1;

          return (
            <li
              key={i}
              className="h-[60px] flex flex-col items-center justify-end relative"
            >
              {i % 10 === 0 || i === 1 ? (
                <motion.span
                  animate={{
                    filter:
                      i - currentTime > -7 && i - currentTime < 7
                        ? "none"
                        : "blur(0px)",
                  }}
                  style={{
                    color: i <= currentTime ? "#F36204" : "#646464",
                  }}
                  className="text-gray-500 text-[18px] leading-[1rem] absolute top-0"
                >
                  {i}
                </motion.span>
              ) : null}
              <motion.span
                style={{
                  backgroundColor: i <= currentTime ? "#F36204" : "gray",
                }}
                className="w-[10px] h-[35px] rounded-full inline-block"
              />
            </li>
          );
        })}
      </motion.ul>
      <div className="h-[110%] w-[64px] absolute top-0 right-0 rounded-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/90 backdrop-blur-[1px]" />
      </div>
      <div className="h-[110%] w-[60px] absolute top-0 left-0 rounded-lg">
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/90 backdrop-blur-[1px]" />
      </div>
    </div>
  );
}

function CoffeeIcon({ size, hexColor }: { size: number; hexColor: string }) {
  return (
    <div className={`size-[${size}px]`}>
      <svg
        fill={hexColor}
        width={size}
        height={size}
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
        initial={{ y: "12px", filter: "blur(2px)", opacity: 0 }}
        animate={{ y: "0", filter: "blur(0px)", opacity: 1 }}
        exit={{ y: "-12px", filter: "blur(2px)", opacity: 0 }}
        transition={{ type: "spring", bounce: 0.35 }}
      >
        {digits[0]}
      </motion.div>
      <motion.div
        className="inline-block tabular-nums"
        key={`ones-${digits[1]}`}
        initial={{ y: "12px", filter: "blur(2px)", opacity: 0 }}
        animate={{ y: "0", filter: "blur(0px)", opacity: 1 }}
        exit={{ y: "-12px", filter: "blur(2px)", opacity: 0 }}
        transition={{ type: "spring", bounce: 0.35 }}
      >
        {digits[1]}
      </motion.div>
    </AnimatePresence>
  );
}
