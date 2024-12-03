"use client";

import Link from "next/link";
import { motion } from "motion/react";

export default function Home() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <nav className="w-4/6">
        <ul className="divide-y divide-black">
          <motion.li
            initial={{ opacity: 0.69 }}
            whileHover={{ opacity: 1 }}
            className="text-4xl py-2"
          >
            <Link href="/dynamic-island">Dynamic Island</Link>
          </motion.li>
          <motion.li
            initial={{ opacity: 0.69 }}
            whileHover={{ opacity: 1 }}
            className="text-4xl py-2"
          >
            <Link href="/memory-movie">Memory Movie</Link>
          </motion.li>
        </ul>
      </nav>
    </div>
  );
}
