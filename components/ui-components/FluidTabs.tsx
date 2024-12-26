"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Box, Lightbulb, Cog } from "lucide-react";
export default function FluidTabs() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex justify-center items-center size-full z-10 relative">
      <ul className="bg-[#F7F3ED] font-semibold rounded-full py-[0.4rem] px-1 flex gap-2 select-none cursor-pointer">
        {tabs.map((tab) => (
          <motion.li
            key={tab.name}
            onClick={() => setActiveTab(tab.id)}
            className={`text-${
              activeTab === tab.id ? "[#2D2D2B]" : "[#999891]"
            } flex items-center relative py-3 px-5`}
          >
            {activeTab === tab.id ? (
              <motion.div
                layoutId="tab-highlight"
                className="absolute inset-0 rounded-full bg-[#FAFCF9] shadow-md"
              />
            ) : null}
            <motion.span
              // key={`title-${tab.name}`}
              className="relative text-inherit"
              // initial={{ scale: 2 }}
              // animate={{ scale: 1 }}
              // transition={{ duration: 2 }}
            >
              {tab.icon}
              {tab.name}
            </motion.span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

const tabs = [
  {
    id: 0,
    name: "Products",
    icon: <Box size={18} className="inline-block mr-1" />,
  },
  {
    id: 1,
    name: "Solutions",
    icon: <Lightbulb size={18} className="inline-block mr-[0.1rem]" />,
  },
  {
    id: 2,
    name: "Resources",
    icon: <Cog size={18} className="inline-block mr-1" />,
  },
];
