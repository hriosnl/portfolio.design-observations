import { motion, AnimatePresence } from "motion/react";
import { Clock12, Pause, Play, X } from "lucide-react";

export function Timer({
  isExpanded,
  timeInSeconds,
  isPaused,
  setIsPaused,
  closeTimer,
}: {
  isExpanded: boolean | null;
  timeInSeconds: number;
  isPaused: boolean;
  setIsPaused: (isPaused: boolean) => void;
  closeTimer: () => void;
}) {
  function togglePause() {
    setIsPaused(!isPaused);
  }

  return (
    <>
      {isExpanded ? (
        <ExpandedTimer
          timeInSeconds={timeInSeconds}
          isPaused={isPaused}
          togglePause={togglePause}
          closeTimer={closeTimer}
        />
      ) : (
        <CompactTimer timeInSeconds={timeInSeconds} />
      )}
    </>
  );
}

function CompactTimer({ timeInSeconds }: { timeInSeconds: number }) {
  return (
    <div className="h-[41px] w-[226px]">
      <motion.div
        initial={{ filter: "blur(10px)", opacity: 0.5 }}
        animate={{ filter: "blur(0px)", opacity: 1 }}
        className="h-full"
      >
        <div className="text-[#FDB000] h-full flex items-center justify-between px-[8px]">
          <Clock12 size={25} />
          <span className="font-medium tabular-nums">
            {toClockFormat(timeInSeconds)}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

function ExpandedTimer({
  timeInSeconds,
  isPaused,
  togglePause,
  closeTimer,
}: {
  timeInSeconds: number;
  isPaused: boolean;
  togglePause: () => void;
  closeTimer: () => void;
}) {
  return (
    <div className="h-[92px] w-[407px]">
      <motion.div
        initial={{ filter: "blur(10px)", opacity: 0.5 }}
        animate={{ filter: "blur(0px)", opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex justify-between items-center h-full"
      >
        <div className="flex gap-[12px] ml-[16px]">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={togglePause}
            className="size-[55px] bg-[#5B3C07] rounded-full flex justify-center items-center"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isPaused ? (
                <motion.span
                  key="play-button"
                  initial={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
                  transition={{ duration: 0.1 }}
                >
                  <Play
                    size={29}
                    fill="#FDB000"
                    color="#FDB000"
                    strokeWidth={1}
                    className="ml-[2px]"
                  />
                </motion.span>
              ) : (
                <motion.span
                  key="pause-button"
                  initial={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
                  transition={{ duration: 0.1 }}
                >
                  <Pause
                    size={29}
                    fill="#FDB000"
                    color="#FDB000"
                    strokeWidth={1}
                  />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
          <motion.button
            onClick={closeTimer}
            whileTap={{ scale: 0.96 }}
            className="size-[55px] bg-[#3C3D3C] rounded-full flex justify-center items-center"
          >
            <X size={30} color="white" />
          </motion.button>
        </div>
        <div className="text-[#FDB000] flex gap-x-[10px] items-baseline pr-[34px]">
          <span className="text-lg">Timer</span>
          <span className="text-[3.125rem] font-light">
            {/* {toClockFormat(timeInSeconds)} */}
            <AnimatedDigits seconds={timeInSeconds} />
          </span>
        </div>
      </motion.div>
    </div>
  );
}

function AnimatedDigits({ seconds }: { seconds: number }) {
  const digits = timeToDigits(seconds);

  return (
    <AnimatePresence initial={false} mode="popLayout">
      <motion.div
        className="inline-block tabular-nums"
        key={`tens-minutes-${digits.minuteDigits[0]}`}
        initial={{ y: "12px", filter: "blur(2px)", opacity: 0 }}
        animate={{ y: "0", filter: "blur(0px)", opacity: 1 }}
        exit={{ y: "-12px", filter: "blur(2px)", opacity: 0 }}
        transition={{ type: "spring", bounce: 0.35 }}
      >
        {digits.minuteDigits[0]}
      </motion.div>
      <motion.div
        className="inline-block tabular-nums"
        key={`ones-minutes-${digits.minuteDigits[1]}`}
        initial={{ y: "12px", filter: "blur(2px)", opacity: 0 }}
        animate={{ y: "0", filter: "blur(0px)", opacity: 1 }}
        exit={{ y: "-12px", filter: "blur(2px)", opacity: 0 }}
        transition={{ type: "spring", bounce: 0.35 }}
      >
        {digits.minuteDigits[1]}
      </motion.div>
      <p className="inline-block tabular-nums">:</p>
      <motion.div
        className="inline-block tabular-nums"
        key={`tens-seconds-${digits.secondDigits[0]}`}
        initial={{ y: "12px", filter: "blur(2px)", opacity: 0 }}
        animate={{ y: "0", filter: "blur(0px)", opacity: 1 }}
        exit={{ y: "-12px", filter: "blur(2px)", opacity: 0 }}
        transition={{ type: "spring", bounce: 0.35 }}
      >
        {digits.secondDigits[0]}
      </motion.div>
      <motion.div
        className="inline-block tabular-nums"
        key={`ones-seconds-${digits.secondDigits[1]}`}
        initial={{ y: "12px", filter: "blur(2px)", opacity: 0 }}
        animate={{ y: "0", filter: "blur(0px)", opacity: 1 }}
        exit={{ y: "-12px", filter: "blur(2px)", opacity: 0 }}
        transition={{ type: "spring", bounce: 0.35 }}
      >
        {digits.secondDigits[1]}
      </motion.div>
    </AnimatePresence>
  );
}

export function toClockFormat(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // return { minutes, seconds: remainingSeconds };
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}

export function timeToDigits(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const minuteDigits = String(minutes).padStart(2, "0").split(""); // Ensures 2 digits for minutes
  const secondDigits = String(remainingSeconds).padStart(2, "0").split(""); // Ensures 2 digits for seconds

  return { minuteDigits, secondDigits };
}
