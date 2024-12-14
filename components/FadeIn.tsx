import { motion } from "framer-motion";

export const FadeIn = () => (
  <motion.div
    initial={{ opacity: 1 }}
    animate={{ opacity: 0 }}
    transition={{ duration: 0.8 }}
    className="absolute inset-0 bg-[#0C0C0C] z-[10000] pointer-events-none"
  />
);
