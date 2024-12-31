"use client";

import { Bricolage_Grotesque, Inter } from "next/font/google";
import Image from "next/image";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";

import { Star, StarHalf } from "lucide-react";

const grotesk = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-display",
});

export default function Home() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Track mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map mouse position to parallax effect
  const xTransform = useTransform(x, [0, windowSize.width], [20, -20]);
  const yTransform = useTransform(y, [0, windowSize.height], [20, -10]);
  const xBlobTransform = useTransform(x, [0, windowSize.width], [-10, 10]);
  const yBlobTransform = useTransform(y, [0, windowSize.height], [-10, 10]);

  // Add spring animation to smooth movement (duration ~1s)
  const blobX1 = useSpring(xBlobTransform, {
    stiffness: 100,
    damping: 10,
    mass: 1,
  });
  const blobY1 = useSpring(yBlobTransform, {
    stiffness: 100,
    damping: 15,
    mass: 1,
  });
  const tree1X = useSpring(xTransform, {
    stiffness: 100,
    damping: 15,
    mass: 1,
  });
  const tree1Y = useSpring(yTransform, {
    stiffness: 100,
    damping: 25,
    mass: 1,
  });
  const tree2X = useSpring(xTransform, {
    stiffness: 100,
    damping: 25,
    mass: 2,
  });
  const tree2Y = useSpring(yTransform, {
    stiffness: 100,
    damping: 10,
    mass: 2,
  });
  const bgSmoothX = useSpring(xTransform, {
    stiffness: 10,
    damping: 20,
    mass: 3,
  });
  const bgSmoothY = useSpring(yTransform, {
    stiffness: 10,
    damping: 20,
    mass: 3,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });

      const handleMouseMove = (e: { clientX: number; clientY: number }) => {
        x.set(e.clientX);
        y.set(e.clientY);
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [x, y]);

  return (
    <div
      className={`relative h-screen w-screen flex flex-col items-center bg-white ${grotesk.className}`}
    >
      <NavBar />

      <motion.div
        style={{ x: bgSmoothX, y: bgSmoothY }}
        className="w-full h-screen pt-16 relative z-0"
      >
        <div className="w-full h-full absolute">
          <Image
            src="/other/pay4me/unibg.png"
            alt="Sketch of a University"
            fill={true}
            className="object-contain"
          />
        </div>
      </motion.div>

      <main className="w-full h-full flex absolute top-0 z-0">
        <motion.section
          style={{ x: tree1X, y: tree1Y }}
          className="w-1/2 relative"
        >
          <Image
            src="/other/pay4me/tree2.png"
            alt="Left Tree"
            width={300}
            height={600}
            className="absolute -bottom-3 left-0"
          />
        </motion.section>
        <motion.section
          style={{ x: tree2X, y: tree2Y }}
          className="w-1/2 relative"
        >
          <Image
            src="/other/pay4me/tree1.png"
            alt="Left Tree"
            width={300}
            height={600}
            className="absolute -bottom-3 right-0"
          />
        </motion.section>
      </main>

      <main className="w-full h-full flex absolute top-0 z-0">
        <motion.section
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0, delay: 0.3 }}
          className="w-1/2 bg-[#347928]/60 flex flex-col px-12 pt-40 gap-y-14"
        >
          <div className="font-semibold text-black space-y-1">
            <p className="text-5xl">Cross-border Payments for</p>
            <p className="text-5xl">International Students</p>
          </div>
          <p
            className={`w-[90%] text-white font-normal text-2xl ${inter.className}`}
          >
            The easiest and fastest way to pay tuition and fees to educational
            institutions, businesses, and government agencies worldwide
          </p>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="z-50 size-fit bg-white border-2 border-[#C2E4A5] text-black py-4 px-12 rounded-full text-2xl font-medium font-mono"
          >
            Make a Payment
          </motion.button>
        </motion.section>

        <motion.section
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0, delay: 0.3 }}
          className={`relative w-1/2 bg-[#FCCD2A]/50 ${inter.className}`}
        >
          <motion.div
            style={{ x: blobX1, y: blobY1 }}
            className="w-[430px] h-[290px] absolute top-4 right-[4rem] flex flex-col justify-center items-center pt-16"
          >
            <Image
              src="/other/pay4me/blob.png"
              alt="A Blob"
              fill={true}
              className="object-contain z-0"
            />

            <div className="z-10 flex flex-col justify-center items-center gap-y-2">
              <p className="font-medium text-black text-xl max-w-[300px] text-center">
                Loved by <span className="font-bold">100,000+ </span>
                <br /> Students Around the World
              </p>
              <div className="flex items-center gap-x-2 mt-1">
                <span className="font-mono font-medium mt-1">4.5</span>
                <div className="flex gap-x-2">
                  <Star
                    size={20}
                    strokeWidth={1.5}
                    color="#FFD700"
                    fill="#FFD700"
                  />
                  <Star
                    size={20}
                    strokeWidth={1.5}
                    color="#FFD700"
                    fill="#FFD700"
                  />
                  <Star
                    size={20}
                    strokeWidth={1.5}
                    color="#FFD700"
                    fill="#FFD700"
                  />
                  <Star
                    size={20}
                    strokeWidth={1.5}
                    color="#FFD700"
                    fill="#FFD700"
                  />
                  <StarHalf
                    size={20}
                    strokeWidth={1.5}
                    color="#FFD700"
                    fill="#FFD700"
                  />
                </div>
              </div>
              <div className="flex gap-x-2">
                <Image
                  src="/other/pay4me/playstore.png"
                  alt="A Blob"
                  width={22}
                  height={22}
                />
                <Image
                  src="/other/pay4me/appstore.png"
                  alt="A Blob"
                  width={22}
                  height={22}
                />
              </div>
            </div>
          </motion.div>
        </motion.section>
      </main>

      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0, delay: 0.8 }}
        className="w-full h-[75%] absolute bottom-0 z-0 pointer-events-none"
      >
        <Image
          src="/other/pay4me/beauty.png"
          alt="Pay4Me Girl"
          fill={true}
          className="object-contain"
        />
      </motion.div>

      <VideoSection />
    </div>
  );
}

const NavBar = () => (
  <div className="absolute w-full h-16 px-12 z-10">
    <div className="size-full bg-[#16423C] rounded-b-xl flex items-center text-white px-6">
      <div className="mr-auto flex items-center gap-x-2">
        <Image
          src="/other/pay4me/logo.png"
          alt="Pay4Me Logo"
          width={40}
          height={40}
        />
        <span className="font-semibold text-xl">Pay4Me App</span>
      </div>
      <nav className="w-1/2 flex justify-between items-center">
        <ul className="flex gap-x-12 font-medium text-lg">
          <li className="cursor-pointer">Blog</li>
          <li className="cursor-pointer">About</li>
          <li className="cursor-pointer">Support</li>
        </ul>
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="font-mono text-lg px-14 py-2 rounded-full bg-[#97D164] border-2 border-[#C2E4A5] text-black font-medium"
        >
          Download App
        </motion.button>
      </nav>
    </div>
  </div>
);

const VideoSection = () => (
  <div className="w-full h-32 absolute top-[100vh] bg-[#16423C]" />
);
