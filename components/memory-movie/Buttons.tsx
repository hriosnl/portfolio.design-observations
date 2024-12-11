import Link from "next/link";
import { motion } from "motion/react";

import { ChevronLeft, ChevronRight, X } from "lucide-react";

import useBreakpoint from "@/hooks/useBreakpoint";

export const PrevButton = ({
  onButtonClick,
}: {
  onButtonClick: () => void;
}) => {
  const isMobile = useBreakpoint("xs");

  return (
    <button onClick={onButtonClick}>
      <motion.div
        initial={{
          opacity: 0,
          filter: "blur(10px)",
          scale: 1.2,
        }}
        animate={{
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          color: [
            "hsl(0, 100%, 100%)",
            "hsl(270, 100%, 50%)",
            "hsl(330, 100%, 50%)",
            "hsl(0, 100%, 100%)",
          ],
          borderColor: [
            "hsl(0, 100%, 100%)",
            "hsl(270, 100%, 50% )",
            "hsl(330, 100%, 50%)",
            "hsl(0, 100%, 100% / 0.2)",
          ],
        }}
        whileHover={{
          backgroundColor: "hsl(0, 100%, 100% / 0.05)",
          transition: { duration: 0.25 },
        }}
        transition={{
          delay: 0.5,
          duration: 1.7,
          ease: "easeOut",
          color: { delay: 0, duration: 1.75 },
          borderColor: { delay: 0, duration: 1.75 },
        }}
        style={{ border: isMobile ? "none" : "1px solid" }}
        className="flex items-center border-opacity-60 rounded-md sm:px-2 sm:py-1"
      >
        <ChevronLeft size={isMobile ? 30 : 13} />
      </motion.div>
    </button>
  );
};

export const NextButton = ({
  onButtonClick,
}: {
  onButtonClick: () => void;
}) => {
  const isMobile = useBreakpoint("xs");

  return (
    <button onClick={onButtonClick}>
      <motion.div
        initial={{
          opacity: 0,
          filter: "blur(10px)",
          scale: 1.2,
        }}
        animate={{
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          color: [
            "hsl(0, 100%, 100%)",
            "hsl(270, 100%, 50%)",
            "hsl(330, 100%, 50%)",
            "hsl(0, 100%, 100%)",
          ],
          borderColor: [
            "hsl(0, 100%, 100%)",
            "hsl(270, 100%, 50% )",
            "hsl(330, 100%, 50%)",
            "hsl(0, 100%, 100% / 0.2)",
          ],
        }}
        whileHover={{
          backgroundColor: "hsl(0, 100%, 100% / 0.05)",
          transition: { duration: 0.25 },
        }}
        transition={{
          delay: 0.5,
          duration: 1.7,
          ease: "easeOut",
          color: { delay: 0, duration: 1.75 },
          borderColor: { delay: 0, duration: 1.75 },
        }}
        style={{ border: isMobile ? "none" : "1px solid" }}
        className="flex items-center border-opacity-60 rounded-md sm:px-2 sm:py-1"
      >
        <ChevronRight size={isMobile ? 30 : 13} />
      </motion.div>
    </button>
  );
};

export const CloseButton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.66, duration: 0.8 }}
    className="absolute top-4 right-4 cursor-pointer z-[1000]"
  >
    <Link href="/">
      <X size={30} color="rgba(255, 255, 255, 0.6)" strokeWidth={1} />
    </Link>
  </motion.div>
);
