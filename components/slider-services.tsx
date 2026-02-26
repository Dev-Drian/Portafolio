"use client";

import { serviceData } from "@/data";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { MouseEvent } from "react";
import { Sparkles } from "lucide-react";

/* ── Spotlight Card ───────────────────────────────────── */
const SpotlightCard = ({
  children,
  className = "",
  color = "#8b5cf6",
  isSelected = false,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
  isSelected?: boolean;
  onClick?: () => void;
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
      onClick={onClick}
      onMouseMove={handleMouseMove}
      className={`group/spotlight relative overflow-hidden rounded-2xl border transition-all duration-500 cursor-pointer ${
        isSelected 
          ? 'border-white/20 shadow-2xl scale-[1.02]' 
          : 'border-white/[0.06] hover:border-white/[0.12] hover:shadow-xl'
      } bg-gradient-to-b from-white/[0.03] to-transparent ${className}`}
      style={{
        boxShadow: isSelected ? `0 0 40px ${color}30, 0 20px 60px ${color}15` : undefined
      }}
    >
      {/* Selected glow ring */}
      {isSelected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${color}20, transparent 60%)`,
            border: `2px solid ${color}50`,
          }}
        />
      )}
      {/* Spotlight gradient */}
      <motion.div
        className="pointer-events-none absolute -inset-px z-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover/spotlight:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              ${color}20,
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

/* ── Color map ─────────────────────────────────────────── */
const colors: { [key: string]: { hex: string; icon: string; gradient: string } } = {
  purple: { hex: "#8b5cf6", icon: "text-violet-400", gradient: "from-violet-500/20 to-violet-600/5" },
  cyan:   { hex: "#06b6d4", icon: "text-cyan-400", gradient: "from-cyan-500/20 to-cyan-600/5" },
  emerald:{ hex: "#10b981", icon: "text-emerald-400", gradient: "from-emerald-500/20 to-emerald-600/5" },
  blue:   { hex: "#3b82f6", icon: "text-blue-400", gradient: "from-blue-500/20 to-blue-600/5" },
  orange: { hex: "#f97316", icon: "text-orange-400", gradient: "from-orange-500/20 to-orange-600/5" },
  pink:   { hex: "#ec4899", icon: "text-pink-400", gradient: "from-pink-500/20 to-pink-600/5" },
};

/* ── Main Component ────────────────────────────────────── */
interface SliderServicesProps {
  onServiceSelect?: (index: number | null) => void;
  selectedIndex?: string | null;
}

const SliderServices = ({ onServiceSelect, selectedIndex }: SliderServicesProps) => {
  const handleCardClick = (index: number) => {
    if (onServiceSelect) {
      // Toggle: si ya está seleccionado, deseleccionar
      if (selectedIndex === String(index)) {
        onServiceSelect(null);
      } else {
        onServiceSelect(index);
      }
    }
  };

  return (
    <div className="relative">
      {/* Section header */}
      <div className="text-center mb-5 sm:mb-8">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-violet-400/60 block mb-1.5 sm:mb-2"
        >
          Servicios
        </motion.span>
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg sm:text-xl md:text-2xl font-light text-white/90"
        >
          Lo que puedo hacer por ti
        </motion.h3>
        <p className="text-[10px] sm:text-xs text-white/40 mt-1.5 sm:mt-2">Click en una carta para ver las tecnologías</p>
        <div className="w-10 sm:w-12 h-px mx-auto mt-2 sm:mt-3 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
      </div>
      
      {/* Grid - 2 columns for compact view */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {serviceData.map((item, index) => {
          const c = colors[item.color] || colors.purple;
          const isSelected = selectedIndex === String(index);

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
            >
              <SpotlightCard 
                className="h-full" 
                color={c.hex}
                isSelected={isSelected}
                onClick={() => handleCardClick(index)}
              >
                <div className="p-4 sm:p-5 flex flex-col h-full min-h-[160px] sm:min-h-[180px]">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    {/* Icon */}
                    <div 
                      className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl flex items-center justify-center bg-gradient-to-br ${c.gradient} border border-white/[0.08] transition-transform duration-300 ${isSelected ? 'scale-110' : ''} [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5`}
                      style={{ boxShadow: isSelected ? `0 0 20px ${c.hex}40` : `0 4px 16px ${c.hex}10` }}
                    >
                      <span className={`${c.icon} opacity-90`}>
                        {item.icon}
                      </span>
                    </div>
                    
                    {/* Number badge */}
                    <span 
                      className="text-[9px] sm:text-[10px] font-mono tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full"
                      style={{ 
                        background: isSelected ? `${c.hex}30` : `${c.hex}10`,
                        color: c.hex,
                        border: `1px solid ${c.hex}${isSelected ? '50' : '20'}`
                      }}
                    >
                      0{index + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 
                    className="text-sm sm:text-base font-semibold tracking-tight mb-1.5 sm:mb-2 transition-colors duration-300"
                    style={{ color: isSelected ? c.hex : 'rgba(255,255,255,0.9)' }}
                  >
                    {item.title}
                  </h3>

                  {/* Description - shorter */}
                  <p className="text-[11px] sm:text-[12px] leading-relaxed text-white/40 mb-3 sm:mb-4 flex-1 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Tags - compact */}
                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {item.tags.slice(0, 3).map((tag, j) => (
                      <span
                        key={j}
                        className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md text-[9px] sm:text-[10px] font-medium"
                        style={{ 
                          background: `${c.hex}${isSelected ? '20' : '10'}`,
                          color: `${c.hex}${isSelected ? 'ff' : 'bb'}`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                    {item.tags.length > 3 && (
                      <span className="text-[9px] sm:text-[10px] text-white/30 px-1">
                        +{item.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SliderServices;