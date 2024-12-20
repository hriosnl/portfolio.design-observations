"use client";

import { motion, MotionConfig } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Check } from "lucide-react";
import { useOnClickOutside } from "usehooks-ts";

export default function ImageStack() {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const boxRef = useRef(null);
  useOnClickOutside(boxRef, () => {
    setIsOpen(false);
    setSelectedImages([]);
  });

  useEffect(() => {
    console.log("Selected: ", selectedImages);
  }, [selectedImages]);

  function handleClick(name: string) {
    if (selectedImages.includes(name)) {
      setSelectedImages(selectedImages.filter((i) => i !== name));
    } else {
      setSelectedImages([...selectedImages, name]);
    }
  }

  return (
    <MotionConfig transition={{ type: "spring", duration: 0.45, bounce: 0 }}>
      <motion.div
        ref={boxRef}
        whileHover={{ scale: 1.1 }}
        className="flex justify-center items-center size-full relative"
      >
        {!isOpen ? (
          <motion.div
            className="size-28 cursor-pointer select-none relative z-50"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={() => {
              setIsOpen(true);
              setIsHovered(false);
            }}
          >
            <div className="pointer-events-none">
              <motion.img
                src="/ui-components/japan.webp"
                alt="japan"
                // className="w-full h-full rounded-2xl border border-[#F05B67] absolute left-0 top-0 z-40"
                className="w-full h-full rounded-2xl  absolute left-0 top-0 z-40"
                layoutId="japan"
              />
              <motion.img
                src="/ui-components/jungle.webp"
                alt="jungle"
                // className="w-full h-full rounded-2xl border border-[#4F823E] absolute left-0 top-0 z-30"
                className="w-full h-full rounded-2xl absolute left-0 top-0 z-30"
                layoutId="jungle"
                animate={
                  !isHovered
                    ? { rotate: 12 }
                    : {
                        x: -12,
                        y: -16,
                        rotate: -16,
                      }
                }
              />
              <motion.img
                src="/ui-components/new-york.webp"
                alt="new-york"
                // className="w-full h-full rounded-2xl border border-[#C98159] absolute left-0 top-0 z-20"
                className="w-full h-full rounded-2xl absolute left-0 top-0 z-20"
                layoutId="new-york"
                animate={
                  !isHovered
                    ? { rotate: 24 }
                    : {
                        x: 12,
                        y: -12,
                        rotate: 20,
                      }
                }
              />
              <motion.img
                src="/ui-components/desert.webp"
                alt="desert"
                // className="w-full h-full rounded-2xl border border-[#BDCFE0] absolute left-0 top-0 z-10"
                className="w-full h-full rounded-2xl absolute left-0 top-0 z-10"
                layoutId="desert"
                animate={!isHovered ? { rotate: 36 } : { x: 1, y: -28 }}
              />
            </div>
          </motion.div>
        ) : null}

        {isOpen ? (
          <div className="size-3/5 select-none flex flex-col justify-center items-center">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <motion.img
                  src="/ui-components/japan.webp"
                  alt="japan"
                  // className="w-full h-full rounded-xl cursor-pointer border border-[#F05B67]"
                  className="w-full h-full rounded-xl cursor-pointer"
                  onClick={() => handleClick("japan")}
                  layoutId="japan"
                />
                <div className="absolute top-2 right-2">
                  <RoundedCheckbox
                    name="japan"
                    checked={selectedImages.includes("japan")}
                    onSelected={handleClick}
                  />
                </div>
              </div>
              <div className="relative">
                <motion.img
                  src="/ui-components/jungle.webp"
                  alt="jungle"
                  // className="w-full h-full rounded-xl cursor-pointer border border-[#4F823E]"
                  className="w-full h-full rounded-xl cursor-pointer"
                  onClick={() => handleClick("jungle")}
                  layoutId="jungle"
                />
                <div className="absolute top-2 right-2">
                  <RoundedCheckbox
                    name="jungle"
                    checked={selectedImages.includes("jungle")}
                    onSelected={handleClick}
                  />
                </div>
              </div>
              <div className="relative">
                <motion.img
                  src="/ui-components/new-york.webp"
                  alt="new-york"
                  // className="w-full h-full rounded-xl cursor-pointer border border-[#C98159]"
                  className="w-full h-full rounded-xl cursor-pointer"
                  onClick={() => handleClick("new-york")}
                  layoutId="new-york"
                />
                <div className="absolute top-2 right-2">
                  <RoundedCheckbox
                    name="new-york"
                    checked={selectedImages.includes("new-york")}
                    onSelected={handleClick}
                  />
                </div>
              </div>
              <div className="relative">
                <motion.img
                  src="/ui-components/desert.webp"
                  alt="desert"
                  // className="w-full h-full rounded-xl cursor-pointer border border-[#BDCFE0]"
                  className="w-full h-full rounded-xl cursor-pointer"
                  onClick={() => handleClick("desert")}
                  layoutId="desert"
                />
                <div className="absolute top-2 right-2">
                  <RoundedCheckbox
                    name="desert"
                    checked={selectedImages.includes("desert")}
                    onSelected={handleClick}
                  />
                </div>
              </div>
            </div>
            <motion.button
              animate={{ opacity: selectedImages.length > 0 ? 1 : 0.5 }}
              onClick={() => {
                setIsOpen(false);
                setSelectedImages([]);
              }}
              className="text-gray-700 py-1 w-2/4 mt-6 rounded-lg bg-white font-mono uppercase text-sm"
            >
              Good
            </motion.button>
          </div>
        ) : null}
      </motion.div>
    </MotionConfig>
  );
}

function RoundedCheckbox({
  name,
  checked,
  onSelected,
}: {
  name: string;
  checked: boolean;
  onSelected: (place: string) => void;
}) {
  return (
    <motion.div
      className={`size-5 rounded-full cursor-pointer flex items-center justify-center ${
        checked
          ? "bg-white"
          : "border border-dotted border-white/80 bg-white/15"
      }`}
      onClick={() => onSelected(name)}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0.5, opacity: 0, filter: "blur(4px)" }}
      animate={{ scale: 1, opacity: 1, filter: "blur(0)" }}
      transition={{ delay: 0.1 }}
    >
      {checked && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            bounce: 0,
            duration: 0.5,
          }}
        >
          <Check className="text-gray-800" size={14} strokeWidth={3} />
        </motion.div>
      )}
    </motion.div>
  );
}
