"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

import { CheckButton } from "@/components/dynamic-island/Buttons";

export function CoffeeDescription() {
  const [isSlow, setIsSlow] = useState(false);

  return (
    <>
      <div className="w-full flex justify-center lg:pr-6 pb-8 lg:pb-0">
        <ZoomedCoffeee isSlow={isSlow} />
      </div>

      <h1 className="text-[2.5rem] font-light text-white">Coffee</h1>

      <main className="text-[#f5f6f4] space-y-7 pt-8 pb-24">
        <p>
          I tried to fully replicate Apple&apos;s version from their video{" "}
          <a
            className="link"
            href="https://youtu.be/m6WMwSj_EbA?t=559"
            target="_blank"
          >
            Design Dynamic Live Activities
          </a>
          , but I ran into an issue: the{" "}
          <span className="font-mono">backdrop-filter</span> doesn&apos;t
          properly work in Safari, which I had to account for.
        </p>
        <p className="flex flex-col items-center gap-2 py-3">
          <Image
            src="/dynamic-island/backdrop-filter.jpeg"
            alt="backdrop-filter bug in Safari"
            width={468}
            height={90}
            priority
          />
          <div className="text-xs">backdrop-filter bug in Safari</div>
        </p>
        <p>
          As a workaround, I used a{" "}
          <span className="font-mono">linear-gradient</span> instead. While not
          perfect, it delivered almost the same effect and felt like a safer
          choice for most browsers.
        </p>
        <p>
          When finalizing this project after leaving it untouched for a month, I
          realized an important part of the animation design was missing—the
          color transition of the graduation that had just passed.
        </p>
        <p>
          Originally, it simply changed color from orange to gray while
          decreasing opacity. I enhanced it by adding a huge linear-gradient
          background from orange to gray and animating its position from left to
          right.
        </p>
        <p>Try reducing the animation speed to better observe the effect:</p>
        <p>
          <CheckButton
            isActive={isSlow}
            label="Slower tick animation"
            color="#c97034"
            handleClick={() => {
              setIsSlow((prev) => !prev);
              window.scrollBy({
                top: -500,
                behavior: "smooth",
              });
            }}
          />
        </p>
        <p>
          It was a simple change, but it made the entire animation feel more
          polished and left me much more satisfied with the final result.
        </p>
      </main>
    </>
  );
}

function ZoomedCoffeee({ isSlow }: { isSlow: boolean }) {
  const duration = 44;
  const [currentTime, setCurrentTime] = useState(duration);

  useEffect(() => {
    const tickDuration = isSlow ? 2000 : 1000;
    setCurrentTime((prev) => (prev === 1 ? duration : prev - 1));

    const interval = setInterval(() => {
      setCurrentTime((prev) => (prev === 1 ? duration : prev - 1));
    }, tickDuration);

    return () => clearInterval(interval);
  }, [isSlow]);

  return (
    <motion.div
      initial={{ filter: "blur(6px)" }}
      animate={{ filter: "blur(0px)" }}
      transition={{ duration: 1 }}
      style={{
        boxShadow: "0 0 16px 2px rgba(69, 68, 69, 0.26)",
      }}
      className="border-2 border-black size-72 bg-black rounded-full overflow-hidden"
    >
      <Graduations
        duration={duration}
        currentTime={currentTime}
        isSlow={isSlow}
      />
    </motion.div>
  );
}

function Graduations({
  duration,
  currentTime,
  isSlow,
}: {
  duration: number;
  currentTime: number;
  isSlow: boolean;
}) {
  const itemWithGap = 7.5;
  const initialXPosition = -6.5625;

  return (
    <div className="size-full flex justify-end">
      <motion.ul
        initial={{
          x: `${initialXPosition}rem`,
        }}
        animate={{
          x: `${initialXPosition + itemWithGap * (duration - currentTime)}rem`,
        }}
        transition={{
          type: "spring",
          bounce: 0,
          duration: isSlow ? 2 : 1,
        }}
        className="w-fit flex items-center gap-[1.875rem]"
      >
        {[...Array(duration)].map((_, index) => {
          const i = index + 1;

          return (
            <li key={i} className="h-[16.25rem]">
              <motion.span
                initial={{
                  backgroundPositionX: "0%",
                }}
                animate={{
                  backgroundPositionX: i <= currentTime ? "0%" : "100%",
                }}
                transition={{
                  duration: isSlow ? 3 : 1,
                  delay: isSlow ? -1 : -0.3,
                }}
                style={{
                  background:
                    "linear-gradient(to right, rgb(243, 100, 4), rgb(243, 100, 4), rgb(128, 128, 128))",
                  backgroundSize: "800% 100%",
                }}
                className="w-[5.625rem] h-full rounded-full inline-block"
              />
            </li>
          );
        })}
      </motion.ul>
    </div>
  );
}
