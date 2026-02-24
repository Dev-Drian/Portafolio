"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import MotionTransition from "./transitions-components";

const AvatarHome = () => {
  return (
    <div className="relative flex items-center justify-center">
      <MotionTransition positions="bottom" className="relative">
        {/* Single very subtle ambient glow */}
        <div className="absolute inset-0 rounded-full bg-blue-400/[0.04] blur-[40px]" style={{ margin: "-20px" }} />

        {/* Main image container */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="relative"
        >
          <div className="relative rounded-full p-[2px] bg-gradient-to-br from-blue-400/40 via-violet-400/30 to-blue-500/40 shadow-[0_0_20px_rgba(96,165,250,0.06)]">
            <div className="rounded-full p-[2px] bg-[#0a0c16]">
              <Image
                src="/image.png"
                priority
                height={350}
                width={350}
                alt="Adrian Castro - Full Stack Developer"
                className="rounded-full object-cover"
              />
            </div>
          </div>

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-[#0d0f1a]/80 backdrop-blur-md border border-emerald-500/20"
          >
            <span className="flex items-center gap-2 text-sm font-medium text-emerald-400">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Disponible
            </span>
          </motion.div>
        </motion.div>
      </MotionTransition>
    </div>
  );
};

export default AvatarHome;
