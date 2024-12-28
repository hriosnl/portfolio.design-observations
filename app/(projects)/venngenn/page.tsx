"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll } from "framer-motion";
export default function Venngenn() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    container: ref,
  });

  useEffect(() => {
    console.log("scrollYProgress: ", scrollYProgress);
  }, [scrollYProgress]);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-white text-6xl font-light">
      <motion.div
        ref={ref}
        className="rounded-full size-[30rem] border-2 border-dotted bg-red-50 flex justify-start items-center overflow-y-auto no-scrollbar"
      >
        <motion.ul className="otlr">
          <li>Surreal</li>
          <li>Futuristic</li>
          <li>Vintage</li>
          <li>Cyberpunk</li>
          <li>Oil Paint</li>
          <li>Gothic</li>
          <li>Celtic</li>
          <li>Ethereal</li>
          <li>Surreal</li>
          <li>Futuristic</li>
          <li>Vintage</li>
          <li>Cyberpunk</li>
          <li>Oil Paint</li>
          <li>Gothic</li>
          <li>Celtic</li>
          <li>Ethereal</li>
        </motion.ul>
      </motion.div>
      <div className="rounded-full size-[30rem] border-2 border-dotted bg-blue-50 text-right flex justify-end items-center overflow-y-auto no-scrollbar">
        <ul>
          <li>Tropical</li>
          <li>Subterranean</li>
          <li>Indoors</li>
          <li>Jungle</li>
          <li>Savanna</li>
          <li>Swamp</li>
          <li>Castle</li>
          <li>Volcanic</li>
          <li>Tropical</li>
          <li>Subterranean</li>
          <li>Indoors</li>
          <li>Jungle</li>
          <li>Savanna</li>
          <li>Swamp</li>
          <li>Castle</li>
          <li>Volcanic</li>
        </ul>
      </div>
    </div>
  );
}
