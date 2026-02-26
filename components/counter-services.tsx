"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { dataCounter } from "@/data";
import { Rocket, Star, Code2, GitCommitHorizontal } from "lucide-react";

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

// Simple animated counter without external library
const AnimatedNumber = ({ end, duration = 2 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted, end, duration]);

  return <span ref={ref}>{count}</span>;
};

const CounterServices = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="grid justify-between max-w-5xl grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mx-auto my-8 sm:my-12"
    >
      {dataCounter.map(
        ({ id, endCounter, text, lineRight, icon }, index) => (
          <motion.div 
            key={id} 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + index * 0.15, duration: 0.5, type: "spring" }}
            whileHover={{ scale: 1.05, y: -8 }}
            className={`relative group p-3 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl glass border border-white/10
              transition-all duration-500
              ${borderVariants[icon] || "hover:border-purple-500/30"} hover:shadow-xl
              ${lineRight ? "md:border-r md:border-r-white/10" : ""}`}
          >
            {/* Background glow */}
            <div className={`absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br ${gradientVariants[icon] || "from-purple-500/10 to-pink-500/10"} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            {/* Icon container */}
            <div 
              className={`relative z-10 mb-2 sm:mb-4 w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br ${gradientVariants[icon] || "from-purple-500/20 to-pink-500/20"} flex items-center justify-center border border-white/10 [&>svg]:w-5 [&>svg]:h-5 sm:[&>svg]:w-7 sm:[&>svg]:h-7`}
            >
              {iconVariants[icon] || <Rocket size={28} className="text-purple-400" />}
            </div>
            
            {/* Counter */}
            <div className="relative z-10">
              <p className="flex items-baseline gap-0.5 sm:gap-1 mb-1 sm:mb-2 text-2xl sm:text-3xl md:text-4xl font-bold">
                <span className="text-slate-500 text-base sm:text-xl">+</span>
                <span className="gradient-text">
                  <AnimatedNumber end={endCounter} duration={2.5} />
                </span>
              </p>
              <p className="text-[10px] sm:text-xs md:text-sm text-slate-400 font-medium tracking-wide uppercase">
                {text}
              </p>
            </div>

            {/* Decorative line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "50px" }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
              className={`h-0.5 mt-2 sm:mt-4 rounded-full bg-gradient-to-r ${
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
