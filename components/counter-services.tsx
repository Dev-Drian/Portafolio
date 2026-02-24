"use client";

import CountUp from "react-countup";
import { motion } from "framer-motion";
import { dataCounter } from "@/data";
import { Rocket, Star, Code2, Coins, GitCommitHorizontal } from "lucide-react";

const iconVariants: { [key: string]: React.ReactNode } = {
  rocket: <Rocket size={28} className="text-purple-400" />,
  star: <Star size={28} className="text-yellow-400" />,
  code: <Code2 size={28} className="text-cyan-400" />,
  coin: <GitCommitHorizontal size={28} className="text-emerald-400" />,
};

const gradientVariants: { [key: string]: string } = {
  rocket: "from-purple-500/20 to-pink-500/20",
  star: "from-yellow-500/20 to-orange-500/20",
  code: "from-cyan-500/20 to-blue-500/20",
  coin: "from-emerald-500/20 to-teal-500/20",
};

const borderVariants: { [key: string]: string } = {
  rocket: "hover:border-purple-500/40 hover:shadow-purple-500/20",
  star: "hover:border-yellow-500/40 hover:shadow-yellow-500/20",
  code: "hover:border-cyan-500/40 hover:shadow-cyan-500/20",
  coin: "hover:border-emerald-500/40 hover:shadow-emerald-500/20",
};

const CounterServices = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="grid justify-between max-w-5xl grid-cols-2 md:grid-cols-4 gap-4 mx-auto my-12"
    >
      {dataCounter.map(
        ({ id, endCounter, text, lineRight, icon }, index) => (
          <motion.div 
            key={id} 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + index * 0.15, duration: 0.5, type: "spring" }}
            whileHover={{ scale: 1.05, y: -8 }}
            className={`relative group p-5 md:p-6 rounded-2xl glass border border-white/10
              transition-all duration-500
              ${borderVariants[icon] || "hover:border-purple-500/30"} hover:shadow-xl
              ${lineRight ? "md:border-r md:border-r-white/10" : ""}`}
          >
            {/* Background glow */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradientVariants[icon] || "from-purple-500/10 to-pink-500/10"} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            {/* Icon container */}
            <motion.div 
              className={`relative z-10 mb-4 w-14 h-14 rounded-xl bg-gradient-to-br ${gradientVariants[icon] || "from-purple-500/20 to-pink-500/20"} flex items-center justify-center border border-white/10`}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
            >
              {iconVariants[icon] || <Rocket size={28} className="text-purple-400" />}
            </motion.div>
            
            {/* Counter */}
            <div className="relative z-10">
              <p className="flex items-baseline gap-1 mb-2 text-3xl md:text-4xl font-bold">
                <span className="text-slate-500 text-xl">+</span>
                <span className="gradient-text">
                  <CountUp end={endCounter} start={0} duration={3} enableScrollSpy scrollSpyOnce />
                </span>
              </p>
              <p className="text-xs md:text-sm text-slate-400 font-medium tracking-wide uppercase">
                {text}
              </p>
            </div>

            {/* Decorative line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "50px" }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
              className={`h-0.5 mt-4 rounded-full bg-gradient-to-r ${
                icon === "rocket" ? "from-purple-500" : 
                icon === "star" ? "from-yellow-500" : 
                icon === "code" ? "from-cyan-500" : 
                "from-emerald-500"
              } to-transparent`}
            />
          </motion.div>
        )
      )}
    </motion.div>
  );
};

export default CounterServices;
