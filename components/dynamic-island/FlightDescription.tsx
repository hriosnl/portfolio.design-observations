import { motion } from "motion/react";
import styles from "./Flight.module.css";

export function FlightDescription() {
  return (
    <>
      <div className="w-full flex justify-center lg:pr-6 mb-6 md:mb-0">
        <ZoomedFlight />
      </div>

      <h1 className="text-[2.5rem] font-light text-white">Flight</h1>

      <main className="text-[#f5f6f4] space-y-7 pt-8 pb-20">
        <p>
          The slightly challenging part of this Live Activity was synchronizing
          the animations of the plane along a curved path with the completion of
          the flight trail.
        </p>

        <p>
          I was already familiar with the technique of creating an{" "}
          <a
            className="link"
            href="https://jakearchibald.com/2013/animated-line-drawing-svg/"
            target="_blank"
          >
            SVG line animation
          </a>
          , but it really clicked for me when I implemented it here.
        </p>

        <p>
          The plane&apos;s and path&apos;s shadow, though nearly identical to
          the previous code, with added{" "}
          <span className="font-mono">filter</span> and some{" "}
          <span className="font-mono">translation</span>s, were simple additions
          that made the animation much more interesting.
        </p>
      </main>
    </>
  );
}

const ZoomedFlight = () => {
  return (
    <motion.div
      initial={{ filter: "blur(6px)" }}
      animate={{ filter: "blur(0px)" }}
      transition={{ duration: 0.5 }}
      className="w-full flex justify-center"
    >
      {/* <div className="absolute h-full w-1 bg-red-500" /> */}

      <div
        style={{
          boxShadow: "0 0 18px 5px rgba(69, 69, 69, 0.4)",
        }}
        className="border-2 border-white relative flex items-center justify-center size-72 pb-3 bg-[#027DDA] rounded-full overflow-hidden"
      >
        <Path />
        <Plane />
      </div>
    </motion.div>
  );
};

const Path = () => {
  return (
    <div className="absolute left-0 w-[110%] h-full flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 20"
        className="overflow-visible"
      >
        <g id="FlightPath">
          <path
            d="M 45 10.1 H 0"
            fill="none"
            stroke="#82b0e6"
            strokeWidth="6"
          />
          <path
            d="M 100 10.1 H 45"
            fill="none"
            stroke="#4A90E2"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="10 12"
            className={styles.zoomedPathAnimation}
          />
        </g>
        <g id="FlightPathShadow" transform="scale(0.97) translate(-4, 16.8)">
          <path
            d="M 45 10 H 0"
            fill="none"
            stroke="#0f67ab"
            strokeWidth="6"
            className="blur-[1px]"
          />
          <path
            d="M 100 10 H 45"
            fill="none"
            stroke="#0f67ab"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="10 12"
            className={`blur-[1.5px] ${styles.zoomedPathAnimation}`}
          />
        </g>
      </svg>
    </div>
  );
};

const Plane = () => {
  return (
    <motion.div
      initial={{ x: 0 }}
      animate={{
        x: [0, -30, 0],
      }}
      transition={{
        delay: 4,
        duration: 20,
        repeat: Infinity,
        repeatDelay: 6,
        repeatType: "reverse",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-12.29 -12.29 147.46 147.46"
        transform="rotate(45)"
        height="160"
        width="160"
        className="overflow-visible"
      >
        <g id="PlaneShadow">
          <path
            d="M16.63,105.75c0.01-4.03,2.3-7.97,6.03-12.38L1.09,79.73c-1.36-0.59-1.33-1.42-0.54-2.4l4.57-3.9 c0.83-0.51,1.71-0.73,2.66-0.47l26.62,4.5l22.18-24.02L4.8,18.41c-1.31-0.77-1.42-1.64-0.07-2.65l7.47-5.96l67.5,18.97L99.64,7.45 c6.69-5.79,13.19-8.38,18.18-7.15c2.75,0.68,3.72,1.5,4.57,4.08c1.65,5.06-0.91,11.86-6.96,18.86L94.11,43.18l18.97,67.5 l-5.96,7.47c-1.01,1.34-1.88,1.23-2.65-0.07L69.43,66.31L45.41,88.48l4.5,26.62c0.26,0.94,0.05,1.82-0.47,2.66l-3.9,4.57 c-0.97,0.79-1.81,0.82-2.4-0.54l-13.64-21.57c-4.43,3.74-8.37,6.03-12.42,6.03C16.71,106.24,16.63,106.11,16.63,105.75 L16.63,105.75z"
            fill="#0f67ab"
            filter="url(#planeBlurFilter)"
            transform="scale(0.98) translate(22, 47)"
            className="blur-sm"
          />
        </g>
        <g id="Plane">
          <path
            d="M16.63,105.75c0.01-4.03,2.3-7.97,6.03-12.38L1.09,79.73c-1.36-0.59-1.33-1.42-0.54-2.4l4.57-3.9 c0.83-0.51,1.71-0.73,2.66-0.47l26.62,4.5l22.18-24.02L4.8,18.41c-1.31-0.77-1.42-1.64-0.07-2.65l7.47-5.96l67.5,18.97L99.64,7.45 c6.69-5.79,13.19-8.38,18.18-7.15c2.75,0.68,3.72,1.5,4.57,4.08c1.65,5.06-0.91,11.86-6.96,18.86L94.11,43.18l18.97,67.5 l-5.96,7.47c-1.01,1.34-1.88,1.23-2.65-0.07L69.43,66.31L45.41,88.48l4.5,26.62c0.26,0.94,0.05,1.82-0.47,2.66l-3.9,4.57 c-0.97,0.79-1.81,0.82-2.4-0.54l-13.64-21.57c-4.43,3.74-8.37,6.03-12.42,6.03C16.71,106.24,16.63,106.11,16.63,105.75 L16.63,105.75z"
            fill="#ffffff"
          />
        </g>
      </svg>
    </motion.div>
  );
};
