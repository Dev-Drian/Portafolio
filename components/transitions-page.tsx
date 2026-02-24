"use client";
import { transitionVariantsPage } from "@/utils/motion-transitions";

import { AnimatePresence, motion } from "framer-motion";

const TransitionsPage = () => {
  return (
    <AnimatePresence>
      <div>
        {/* Slide overlay — deep dark with subtle blue tint */}
        <motion.div
          className="fixed top-0 bottom-0 right-full w-screen z-30 bg-[#0b0d14]"
          variants={transitionVariantsPage}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ delay: 0.08, duration: 0.4, ease: [0.83, 0, 0.17, 1] }}
        />
      </div>
    </AnimatePresence>
  );
};
export default TransitionsPage;
