"use client";

import { serviceData } from "@/data";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { MouseEvent } from "react";

/* ── Spotlight Card ───────────────────────────────────── */
const SpotlightCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`group/spotlight relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0b0d14] transition-colors duration-500 hover:border-white/[0.12] ${className}`}
    >
      {/* Spotlight gradient that follows cursor */}
      <motion.div
        className="pointer-events-none absolute -inset-px z-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover/spotlight:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              380px circle at ${mouseX}px ${mouseY}px,
              rgba(96, 165, 250, 0.10),
              transparent 80%
            )
          `,
        }}
      />
      {/* Border glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px z-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover/spotlight:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              220px circle at ${mouseX}px ${mouseY}px,
              rgba(167, 139, 250, 0.20),
              transparent 80%
            )
          `,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "xor" as any,
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

/* ── Color map ─────────────────────────────────────────── */
const colors: { [key: string]: { icon: string; tag: string; dot: string } } = {
  purple: { icon: "text-violet-400", tag: "text-violet-300/80", dot: "bg-violet-500" },
  cyan:   { icon: "text-cyan-400",   tag: "text-cyan-300/80",   dot: "bg-cyan-500"   },
  emerald:{ icon: "text-emerald-400",tag: "text-emerald-300/80",dot: "bg-emerald-500" },
  blue:   { icon: "text-blue-400",   tag: "text-blue-300/80",   dot: "bg-blue-500"   },
  orange: { icon: "text-orange-400", tag: "text-orange-300/80", dot: "bg-orange-500"  },
  pink:   { icon: "text-pink-400",   tag: "text-pink-300/80",   dot: "bg-pink-500"   },
};

/* ── Bento grid spans ──────────────────────────────────── */
const bentoCols = [
  "md:col-span-2",   // Backend   → wide
  "md:col-span-1",   // Frontend
  "md:col-span-1",   // Fullstack
  "md:col-span-2",   // DevOps    → wide
  "md:col-span-1",   // n8n
  "md:col-span-1",   // Agile
];

/* ── Main Component ────────────────────────────────────── */
const SliderServices = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      {serviceData.map((item, index) => {
        const c = colors[item.color] || colors.purple;
        const span = bentoCols[index] || "md:col-span-1";

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.08,
              duration: 0.5,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className={`${span}`}
          >
            <SpotlightCard className="h-full">
              <div className="p-6 sm:p-7 flex flex-col h-full">
                {/* Icon row */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`${c.icon} opacity-80`}>
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-mono text-white/20 tracking-wider">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-[17px] font-semibold tracking-tight text-white/90 mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-[13px] leading-relaxed text-white/40 mb-5 flex-1">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
                  {item.tags.map((tag, j) => (
                    <span
                      key={j}
                      className={`inline-flex items-center gap-1.5 text-[11px] font-medium ${c.tag}`}
                    >
                      <span className={`w-1 h-1 rounded-full ${c.dot} opacity-60`} />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        );
      })}
    </div>
  );
};

export default SliderServices;