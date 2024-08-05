"use client";
import { transitionVariantsPage } from "@/utils/motion-transitions";


import { AnimatePresence, motion } from "framer-motion";
const TransitionsPage = () => {
  return (
    //animatePresence viene d eframer motion
    <AnimatePresence>
      <div>
        <motion.div
        //div para que cuando recargemos la pagina y el transition de page y todos los efectos
          className="fixed top-0 bottom-0 right-full w-screen z-30 bg-[#e0e1dd]"
          variants={transitionVariantsPage}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ delay: 0.2, duration: 0.6, ease: "easeInOut" }}
        ></motion.div>
      </div>
    </AnimatePresence>
  );
};
export default TransitionsPage;
