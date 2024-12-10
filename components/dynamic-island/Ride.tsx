import { useState, useEffect } from "react";
import { motion, AnimatePresence, MotionConfig } from "motion/react";
import { Navigation, Utensils, Car as CarIcon } from "lucide-react";
import Image from "next/image";

const drivers = [
  { name: "Woofson", image: "/dynamic-island/dog-driver1.jpeg" },
  { name: "Barkwell", image: "/dynamic-island/dog-driver2.jpeg" },
];
export function Ride({
  isExpanded,
  driverId,
}: {
  isExpanded: boolean | undefined;
  driverId: number;
}) {
  return (
    <>{isExpanded ? <ExpandedRide driverId={driverId} /> : <CompactRide />}</>
  );
}

function CompactRide() {
  return (
    <div className="h-[2.5625rem] w-[14.125rem]">
      <motion.div
        initial={{ filter: "blur(10px)", opacity: 0.5 }}
        animate={{ filter: "blur(0px)", opacity: 1 }}
        className="h-full"
      >
        <div className="h-full flex items-center justify-between px-[0.5625rem]">
          <CarIcon size={25} fill="#038BEC" stroke="#038BEC" />
          <div className="bg-[#038BEC]/90 text-white font-semibold text-sm rounded-full px-2 py-0.5">
            Arrived
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ExpandedRide({ driverId }: { driverId: number }) {
  const [hasArrived, setHasArrived] = useState(false);
  const driver = drivers[driverId];

  useEffect(() => {
    setTimeout(() => {
      setHasArrived(true);
    }, 2500);
  }, []);

  // const index = 1;

  return (
    <div
      className="h-[11.6rem] md:h-[11.25rem] w-[25.375rem] py-4 px-4"
      style={{ borderRadius: 20 }}
    >
      <motion.div
        initial={{ filter: "blur(10px)", opacity: 0.5 }}
        animate={{ filter: "blur(0px)", opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex justify-between"
      >
        <div className="flex flex-col w-fit gap-y-4">
          <div className="flex h-fit items-center gap-x-[0.625rem]">
            <div className="size-[3.125rem] rounded-full overflow-hidden shrink-0 relative">
              <Image
                src={driver.image}
                alt={driver.name}
                fill={true}
                sizes="50px"
                className="object-cover"
                priority
              />
            </div>

            <div className="flex flex-col">
              <span className="text-white text-base font-medium">
                {driver.name}
              </span>
              <span className="text-gray-400 font-medium text-xs">
                Tesla Model 3
              </span>
            </div>
            <div className="bg-gray-700/75 rounded-full px-2 py-1 text-white text-xs font-semibold">
              6ZXSFCZ
            </div>
          </div>
          <div className="flex gap-x-2">
            <div className="flex flex-col items-center">
              <span className="bg-blue-600 p-1.5 rounded-full">
                <Navigation
                  size={14}
                  color="white"
                  fill="white"
                  transform="translate(0, 1)"
                />
              </span>
              <div className="space-y-2 my-[0.4375rem]">
                <div className="bg-gray-700 size-1 rounded-full" />
                <div className="bg-gray-700 size-1 rounded-full" />
              </div>
              <span className="bg-orange-400 p-1.5 rounded-full">
                <Utensils size={14} color="white" strokeWidth={3} />
              </span>
            </div>
            <div className="grow flex flex-col justify-between text-sm">
              <div className="flex justify-between py-1">
                <span className="text-white font-medium">
                  Pickup 27 3rd St.
                </span>
                <span className="text-gray-500 font-medium">6:43</span>
              </div>
              <div className="h-[1px] border border-gray-500/50" />
              <div className="flex justify-between py-1">
                <span className="text-white font-medium">Dumpling Time</span>
                <span className="text-gray-500 font-medium">7:05</span>
              </div>
            </div>
          </div>
        </div>

        <div className="size-[9.25rem] bg-[#303B49] rounded-[1.25rem] relative overflow-hidden">
          <Car />
          <RoadMap />
          <div className="absolute top-0 right-0 pt-2 pr-2">
            <div className="text-base font-semibold text-white bg-[#038BEC] rounded-md px-1.5 py-0.5">
              <AnimatePresence mode="wait">
                <MotionConfig transition={{ type: "easeOut", duration: 0.5 }}>
                  <motion.div
                    initial={false}
                    animate={{ width: hasArrived ? 60 : 44 }}
                    className="flex justify-center select-none"
                  >
                    {hasArrived ? (
                      <motion.div
                        key="arrived"
                        initial={{ opacity: 0, filter: "blur(6px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, filter: "blur(10px)" }}
                        // transition={{ duration: 0.6 }}
                      >
                        Arrived
                      </motion.div>
                    ) : (
                      <motion.div
                        key="waiting"
                        initial={{ opacity: 0, filter: "blur(6px)" }}
                        animate={{
                          opacity: 1,
                          filter: "blur(0px)",
                          // transition: { duration: 0.2 },
                        }}
                      >
                        1 min
                      </motion.div>
                    )}
                  </motion.div>
                </MotionConfig>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const FrontBumper = () => {
  return (
    <div
      style={{
        height: "90%",
        width: "50%",
        position: "absolute",
        top: 2,
        right: -2,
        borderRadius: 100,
        backgroundColor: "#ffffff",
        opacity: 0.8,
        boxShadow: "-3px 1px 3px 0px rgba(0, 0, 0, 0.95)",
      }}
    />
  );
};

const HeadLight = () => {
  return (
    <div
      style={{
        height: "90%",
        width: "50%",
        position: "absolute",
        top: 3,
        right: -5,
        borderRadius: 100,
        backgroundColor: "#ffffff",
        opacity: 0.9,
        filter: "blur(3px)",
        boxShadow: "3px 0px 10px 1px rgba(255, 255, 255, 0.9)",
      }}
    />
  );
};

const RearBumper = () => {
  return (
    <div
      style={{
        height: "100%",
        width: 30,
        position: "absolute",
        top: 1,
        left: -2,
        borderRadius: 100,
        backgroundColor: "#696969",
        boxShadow: "-2px 1px 3px 0px rgba(0, 0, 0, 0.95)",
      }}
    />
  );
};

const RearLight = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1, delay: 1.7 }}
    >
      <div
        style={{
          height: "90%",
          width: "30%",
          position: "absolute",
          top: 1,
          left: 0,
          filter: "blur(2px)",
          borderRadius: 100,
          boxShadow:
            "-1px 1px 1px 1px rgba(235, 53, 53, 1), -3px 1px 2px 1px rgba(0, 0, 0, 0.8)",
        }}
      />
      <div
        style={{
          zIndex: 100,
          height: "110%",
          width: "0.625rem",
          position: "absolute",
          top: 2,
          left: -12,
          filter: "blur(8px)",
          borderRadius: 100,
          backgroundColor: "red",
        }}
      />
    </motion.div>
  );
};

const RoadMap = () => {
  return (
    <svg
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(0, -5)">
        <title>Road Map</title>
        <g id="right_side">
          <rect
            transform="rotate(45 472.75 227.75)"
            opacity="0.5"
            stroke="#000"
            strokeWidth="0"
            rx="28"
            id="svg_6"
            height="276.38836"
            width="279.92388"
            y="89.55582"
            x="332.78806"
            fill="#3a526a"
          />
          <g id="svg_15">
            <rect
              transform="rotate(-45 361.5 187)"
              stroke="#000"
              rx="6"
              id="svg_11"
              height="17"
              width="28.92893"
              y="178.5"
              x="347.03554"
              strokeWidth="0"
              fill="#58728b"
            />
            <rect
              transform="rotate(45 364.5 271)"
              stroke="#000"
              rx="6"
              id="svg_12"
              height="17"
              width="28.92893"
              y="262.5"
              x="350.03554"
              strokeWidth="0"
              fill="#58728b"
            />
            <rect
              transform="rotate(45 463 227.5)"
              stroke="#000"
              rx="10"
              id="svg_10"
              height="203.53553"
              width="203.53553"
              y="125.73223"
              x="361.23223"
              strokeWidth="0"
              fill="#58728b"
            />
          </g>
        </g>
        <g id="left_side">
          <rect
            transform="rotate(45 -59.25 219.75)"
            stroke="#000"
            strokeWidth="0"
            rx="28"
            id="svg_5"
            height="276.38836"
            width="279.92388"
            y="81.55582"
            x="-199.21194"
            fill="#1e6063"
          />
          <rect
            transform="rotate(45 -69 218.5)"
            stroke="#000"
            rx="9"
            id="svg_8"
            height="203.53553"
            width="203.53553"
            y="116.73223"
            x="-170.76777"
            strokeWidth="0"
            fill="#226982"
          />
        </g>
        <g id="top_side">
          <rect
            transform="rotate(45 202.75 -41.25)"
            stroke="#000"
            strokeWidth="0"
            rx="28"
            id="svg_3"
            height="276.38836"
            width="279.92388"
            y="-179.44418"
            x="62.78806"
            fill="#3f5269"
          />
          <rect
            transform="rotate(45 208.5 -62.5)"
            rx="15"
            id="svg_18"
            height="216"
            width="200"
            y="-170.5"
            x="108.5"
            strokeWidth="0"
            stroke="#000"
            fill="#597799"
          />
        </g>
        <g id="bottom_side">
          <rect
            transform="rotate(45 205.75 489.75)"
            stroke="#000"
            strokeWidth="0"
            rx="28"
            id="svg_7"
            height="276.38836"
            width="279.92388"
            y="351.55582"
            x="65.78806"
            fill="#455c78"
          />
          <g id="svg_22">
            <rect
              transform="rotate(45 227.75 405.75)"
              stroke="#000"
              rx="5"
              id="svg_20"
              height="64.12133"
              width="139"
              y="373.68934"
              x="158.25"
              strokeWidth="0"
              fill="#597799"
            />
            <rect
              transform="rotate(-45 179 356)"
              stroke="#000"
              rx="2"
              id="svg_21"
              height="15"
              width="28.17157"
              y="348.5"
              x="164.91421"
              strokeWidth="0"
              fill="#597799"
            />
          </g>
          <rect
            transform="rotate(-45 143 405)"
            rx="4"
            id="svg_23"
            height="18"
            width="27"
            y="396"
            x="129.5"
            strokeWidth="0"
            stroke="#000"
            fill="#597799"
          />
        </g>
        <g id="cross_walks">
          <g id="top_right_lines">
            <rect
              transform="rotate(-45 253.75 136.25)"
              stroke="#000"
              id="svg_25"
              height="8.46447"
              width="43.75736"
              y="132.01777"
              x="231.87132"
              strokeWidth="0"
              fill="#778090"
            />
            <rect
              transform="rotate(-45 266.75 149.25)"
              stroke="#000"
              id="svg_26"
              height="8.46447"
              width="43.75736"
              y="145.01777"
              x="244.87132"
              strokeWidth="0"
              fill="#778090"
            />
            <rect
              transform="rotate(-45 279.75 162.25)"
              stroke="#000"
              id="svg_27"
              height="8.46447"
              width="43.75736"
              y="158.01777"
              x="257.87132"
              strokeWidth="0"
              fill="#778090"
            />
            <rect
              transform="rotate(-45 292.75 174.25)"
              stroke="#000"
              id="svg_28"
              height="8.46447"
              width="43.75736"
              y="170.01777"
              x="270.87132"
              strokeWidth="0"
              fill="#778090"
            />
          </g>
          <g transform="rotate(90 272.25 289.25)" id="bottom_right_lines">
            <rect
              transform="rotate(-45 252.75 270.25)"
              stroke="#000"
              id="svg_44"
              height="8.46447"
              width="43.75736"
              y="266.01777"
              x="230.87132"
              strokeWidth="0"
              fill="#778090"
            />
            <rect
              transform="rotate(-45 265.75 283.25)"
              stroke="#000"
              id="svg_45"
              height="8.46447"
              width="43.75736"
              y="279.01777"
              x="243.87132"
              strokeWidth="0"
              fill="#778090"
            />
            <rect
              transform="rotate(-45 278.75 296.25)"
              stroke="#000"
              id="svg_46"
              height="8.46447"
              width="43.75736"
              y="292.01777"
              x="256.87132"
              strokeWidth="0"
              fill="#778090"
            />
            <rect
              transform="rotate(-45 291.75 308.25)"
              stroke="#000"
              id="svg_47"
              height="8.46447"
              width="43.75736"
              y="304.01777"
              x="269.87132"
              strokeWidth="0"
              fill="#778090"
            />
          </g>
          <g id="bottom_left_lines">
            <rect
              transform="rotate(-45 119.75 265.25)"
              stroke="#000"
              id="svg_49"
              height="8.46447"
              width="43.75736"
              y="261.01777"
              x="97.87132"
              strokeWidth="0"
              fill="#778090"
            />
            <rect
              transform="rotate(-45 132.75 278.25)"
              stroke="#000"
              id="svg_50"
              height="8.46447"
              width="43.75736"
              y="274.01777"
              x="110.87132"
              strokeWidth="0"
              fill="#778090"
            />
            <rect
              transform="rotate(-45 145.75 291.25)"
              stroke="#000"
              id="svg_51"
              height="8.46447"
              width="43.75736"
              y="287.01777"
              x="123.87132"
              strokeWidth="0"
              fill="#778090"
            />
            <rect
              transform="rotate(-45 158.75 303.25)"
              stroke="#000"
              id="svg_52"
              height="8.46447"
              width="43.75736"
              y="299.01777"
              x="136.87132"
              strokeWidth="0"
              fill="#778090"
            />
          </g>
          <g transform="rotate(90 137.25 159.25)" id="top_left_lines">
            <rect
              transform="rotate(-45 117.75 140.25)"
              stroke="#000"
              id="svg_54"
              height="8.46447"
              width="43.75736"
              y="136.01777"
              x="95.87132"
              strokeWidth="0"
              fill="#778090"
            />
            <rect
              transform="rotate(-45 130.75 153.25)"
              stroke="#000"
              id="svg_55"
              height="8.46447"
              width="43.75736"
              y="149.01777"
              x="108.87132"
              strokeWidth="0"
              fill="#778090"
            />
            <rect
              transform="rotate(-45 143.75 166.25)"
              stroke="#000"
              id="svg_56"
              height="8.46447"
              width="43.75736"
              y="162.01777"
              x="121.87132"
              strokeWidth="0"
              fill="#778090"
            />
            <rect
              transform="rotate(-45 156.75 178.25)"
              stroke="#000"
              id="svg_57"
              height="8.46447"
              width="43.75736"
              y="174.01777"
              x="134.87132"
              strokeWidth="0"
              fill="#778090"
            />
          </g>
        </g>
        <g id="path_and_destination">
          <g id="drive_path">
            <g id="svg_45">
              <path
                id="svg_44"
                d="m38.60584,410.98402l164.95454,-163.80357c16.35752,-20.39641 13.93419,-40.18701 1.81751,-55.73676l-45.43759,-46.04342"
                opacity="NaN"
                strokeWidth="30"
                stroke="#62a4f3"
                fill="none"
              />
              <path
                id="svg_38"
                d="m38.60583,411.58986l164.95455,-164.4094c16.35752,-20.39641 13.93418,-40.18701 1.8175,-55.73676l-45.43759,-45.43758"
                opacity="NaN"
                strokeWidth="20"
                stroke="#367bef"
                fill="none"
              />
            </g>
          </g>
          <g id="destination">
            <ellipse
              ry="29"
              rx="29"
              id="bigger_circle"
              cy="131.39143"
              cx="147.14313"
              fill="#ffffff"
            />
            <ellipse
              ry="22"
              rx="22"
              id="smaller_circle"
              cy="131.39143"
              cx="147.14313"
              fill="#098dfa"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

const Car = () => {
  return (
    <motion.div
      initial={{ x: 3, y: 0 }}
      animate={{ x: 22, y: -18 }}
      transition={{ type: "spring", duration: 5, bounce: 0, delay: 0.4 }}
      className="absolute bottom-0"
    >
      <div className="size-fit -rotate-45">
        <RearBumper />
        <RearLight />
        <HeadLight />
        <FrontBumper />
        <div
          style={{
            width: "fit-content",
            height: "fit-content",
            backgroundColor: "#000000",
            overflow: "hidden",
            filter: "brightness(1.25)",
            borderRadius: 100,
            boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.95)",
          }}
        >
          <Image
            src="/dynamic-island/car.png"
            alt="Car"
            width={40}
            height={18}
            priority
          />
        </div>
      </div>
    </motion.div>
  );
};
