import { motion } from "motion/react";

export const Spotlight = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: [1.0, 0.8, 0.54, 0.44, 0.54, 0.6, 1.0] }}
      transition={{ delay: 8, duration: 11, repeat: Infinity }}
      className="absolute w-[1000px] h-[1100px] -top-[200px] sm:w-[1500px] sm:h-[1000px] sm:-top-[160px]"
    >
      <motion.div
        initial={{
          background:
            "radial-gradient(circle, rgba(14, 88, 128, 0), transparent 55%)",
        }}
        animate={{
          background:
            "radial-gradient(circle, rgba(14, 88, 128, 0.69), transparent 55%)",
        }}
        transition={{ duration: 2.5, delay: 0.5 }}
        className="size-full"
      />
    </motion.div>
  );
};

export const FinalStepSpotlight = ({ delay }: { delay: number }) => {
  return (
    <motion.div className="absolute w-[660px] h-[1000px] -top-[130px]">
      <motion.div
        initial={{
          background:
            "radial-gradient(circle, rgba(14, 88, 128, 0), transparent 55%)",
        }}
        animate={{
          background:
            "radial-gradient(circle, rgba(254, 255, 255, 0.2), transparent 55%)",
        }}
        transition={{ duration: 0.3, delay }}
        className="size-full"
      />
    </motion.div>
  );
};
