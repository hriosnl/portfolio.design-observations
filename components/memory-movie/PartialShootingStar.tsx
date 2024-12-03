import { motion } from "motion/react";

export function PartialShootingStar({
  step,
  target,
}: {
  step: number;
  target: number[];
}) {
  const size = 90;
  const [targetX, targetY] = target;

  const isFrozen = step === 8;

  return (
    <motion.div
      initial={{
        opacity: 0,
        left: targetX + 140,
        top: targetY - 184,
        backgroundColor: "hsl(260, 100%, 100%)",
        borderRadius: 10,
        filter: "blur(1px)",
        scale: 1.2,
      }}
      animate={{
        opacity: isFrozen ? 0.77 : [0.9, 0.6, 0],
        left: isFrozen ? targetX + 140 : targetX,
        top: isFrozen ? targetY - 184 : targetY - 20,
        backgroundColor: [
          "hsl(270, 100%, 50%)",
          "hsl(220, 100%, 50%)",
          "hsl(270, 100%, 50%)",
        ],
        borderRadius: isFrozen ? 35 : 30,
        filter: isFrozen ? "blur(10px)" : "blur(6px)",
        scale: isFrozen ? 1.6 : 1,
        rotate: [0, 360],
      }}
      transition={{
        delay: isFrozen ? 0.3 : 1,
        duration: isFrozen ? 0.7 : 1.2,
        type: "spring",
        bounce: 0,
        backgroundColor: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        borderRadius: isFrozen ? { duration: 2 } : null,
        filter: isFrozen ? { duration: 2 } : null,
        opacity: {
          duration: 3,
          ease: "easeInOut",
          times: isFrozen ? null : [0.1, 0.6, 1.0],
        },
        scale: isFrozen ? { duration: 2, bounce: 10 } : null,
        rotate: {
          delay: 1,
          duration: 30,
          repeat: Infinity,
          repeatDelay: 0,
          ease: "linear",
        },
      }}
      style={{
        width: size,
        height: size,
        zIndex: 1000,
      }}
      className="absolute flex justify-center items-center"
    />
  );
}
