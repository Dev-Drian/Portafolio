"use client";

import { dataAboutPage } from "@/data";
import { useRef, useState, useEffect, memo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { 
  GraduationCap, 
  Code2, 
  Rocket, 
  Ship,
  UtensilsCrossed,
  Briefcase,
  Calendar,
  MapPin,
  ChevronDown,
  Home
} from "lucide-react";

// ═══════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════

const COLORS: { [key: string]: string } = {
  cyan: "#22d3ee",
  emerald: "#34d399",
  purple: "#a855f7",
  blue: "#3b82f6",
  orange: "#f97316",
};

const ICON_MAP: { [key: string]: typeof GraduationCap } = {
  education: GraduationCap,
  code: Code2,
  rocket: Rocket,
  ship: Ship,
  food: UtensilsCrossed,
  default: Briefcase,
};

// ═══════════════════════════════════════════════════════════
// EXPERIENCE CARD - Scroll-driven appearance
// ═══════════════════════════════════════════════════════════

const ExperienceCard = memo(function ExperienceCard({ 
  item, 
  index,
  isActive,
}: { 
  item: typeof dataAboutPage[0];
  index: number;
  isActive: boolean;
}) {
  const color = COLORS[item.color] || COLORS.purple;
  const IconComponent = ICON_MAP[item.icon] || ICON_MAP.default;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -60 : 60, scale: 0.9 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ 
        duration: 0.6, 
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.1
      }}
      className={`relative flex items-center gap-6 md:gap-10 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
    >
      {/* Card Content */}
      <div 
        className={`flex-1 max-w-md ${isEven ? 'text-right' : 'text-left'}`}
      >
        <motion.div
          whileHover={{ scale: 1.02, y: -4 }}
          transition={{ duration: 0.3 }}
          className="relative p-6 rounded-2xl backdrop-blur-sm"
          style={{
            background: isActive 
              ? `linear-gradient(135deg, ${color}15, rgba(10,10,30,0.95))`
              : 'linear-gradient(135deg, rgba(20,20,40,0.6), rgba(10,10,30,0.8))',
            border: `1px solid ${isActive ? color + '40' : 'rgba(139,92,246,0.15)'}`,
            boxShadow: isActive 
              ? `0 20px 60px -15px ${color}30, 0 0 30px ${color}10`
              : '0 10px 40px -15px rgba(0,0,0,0.5)',
          }}
        >
          {/* Date Badge */}
          <div 
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs mb-4 ${isEven ? 'ml-auto' : ''}`}
            style={{ 
              background: `${color}15`,
              color: color,
              border: `1px solid ${color}30`
            }}
          >
            <Calendar size={12} />
            <span className="font-medium">{item.date}</span>
          </div>

          {/* Title */}
          <h3 
            className="text-xl md:text-2xl font-semibold mb-2 transition-colors duration-300"
            style={{ color: isActive ? color : 'white' }}
          >
            {item.title}
          </h3>

          {/* Subtitle */}
          <p className="text-white/60 text-sm md:text-base mb-3 flex items-center gap-2" style={{ justifyContent: isEven ? 'flex-end' : 'flex-start' }}>
            <MapPin size={14} className="opacity-50" />
            {item.subtitle}
          </p>

          {/* Description */}
          <p className="text-white/40 text-sm leading-relaxed">
            {item.description}
          </p>

          {/* Current badge */}
          {item.endDate === "Actualidad" && (
            <div 
              className={`inline-flex items-center gap-1.5 mt-4 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${isEven ? 'ml-auto' : ''}`}
              style={{ 
                background: `${color}20`,
                color: color,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: color }} />
              Actual
            </div>
          )}
        </motion.div>
      </div>

      {/* Center Timeline Node */}
      <div className="relative flex flex-col items-center z-10">
        {/* Icon Circle */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.4, delay: 0.2, type: "spring", stiffness: 200 }}
          className="relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center"
          style={{
            background: isActive 
              ? `linear-gradient(135deg, ${color}30, ${color}10)`
              : 'linear-gradient(135deg, rgba(30,30,60,0.8), rgba(20,20,40,0.9))',
            border: `2px solid ${isActive ? color : 'rgba(139,92,246,0.3)'}`,
            boxShadow: isActive 
              ? `0 0 30px ${color}40, inset 0 0 20px ${color}10`
              : '0 0 20px rgba(139,92,246,0.1)',
          }}
        >
          <span style={{ color: isActive ? color : 'rgba(139,92,246,0.6)' }}>
            <IconComponent 
              size={28} 
              strokeWidth={1.5}
            />
          </span>
          
          {/* Pulse ring when active */}
          {isActive && (
            <motion.div
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 rounded-full"
              style={{ border: `2px solid ${color}` }}
            />
          )}
        </motion.div>

        {/* Number */}
        <span 
          className="mt-2 text-xs font-mono"
          style={{ color: isActive ? color : 'rgba(255,255,255,0.3)' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Empty space for layout balance */}
      <div className="flex-1 max-w-md" />
    </motion.div>
  );
});

// ═══════════════════════════════════════════════════════════
// SCROLL PROGRESS INDICATOR
// ═══════════════════════════════════════════════════════════

const ScrollProgress = memo(function ScrollProgress({ progress }: { progress: number }) {
  const springProgress = useSpring(progress, { stiffness: 100, damping: 30 });
  
  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-3">
      {/* Progress line */}
      <div className="relative h-40 w-1 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="absolute bottom-0 left-0 right-0 rounded-full"
          style={{ 
            height: springProgress.get() * 100 + '%',
            background: 'linear-gradient(to top, #8b5cf6, #06b6d4)'
          }}
        />
      </div>
      
      {/* Progress text */}
      <span className="text-[10px] font-mono text-white/30">
        {Math.round(progress * 100)}%
      </span>
      
      {/* House icon */}
      <Home size={16} className="text-violet-400/40" />
    </div>
  );
});

// ═══════════════════════════════════════════════════════════
// MAIN COMPONENT - TIMELINE SCROLL EXPERIENCE
// ═══════════════════════════════════════════════════════════

const Timeline3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Scroll progress for the entire container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Track which experience is currently in view
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const cards = containerRef.current.querySelectorAll('[data-experience-card]');
      const viewportCenter = window.innerHeight / 2;
      
      let closestIndex = 0;
      let closestDistance = Infinity;
      
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(cardCenter - viewportCenter);
        
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      
      setActiveIndex(closestIndex);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = dataAboutPage.length;
  const progress = (activeIndex + 1) / totalItems;

  return (
    <div ref={containerRef} className="relative py-20">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl" />
      </div>

      {/* Progress indicator */}
      <ScrollProgress progress={progress} />

      {/* Header */}
      <div className="text-center mb-16 px-4">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.3em] uppercase text-violet-400/60 mb-3 block"
        >
          Mi Trayectoria
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-light text-white/90 tracking-tight mb-4"
        >
          Casa de Experiencias
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/40 max-w-md mx-auto text-sm"
        >
          Cada paso en mi carrera ha construido los cimientos de quien soy hoy
        </motion.p>
        <div className="w-20 h-px mx-auto mt-6 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
        
        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-10"
        >
          <ChevronDown className="mx-auto text-violet-400/30 animate-bounce" size={24} />
          <span className="text-[10px] text-white/20 tracking-wider">Scroll para explorar</span>
        </motion.div>
      </div>

      {/* Timeline Container */}
      <div className="relative max-w-5xl mx-auto px-4">
        {/* Central Timeline Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
          {/* Base line */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/20 to-transparent" />
          
          {/* Progress line */}
          <motion.div
            className="absolute top-0 left-0 right-0 bg-gradient-to-b from-violet-500 via-purple-500 to-cyan-500"
            style={{ 
              height: `${progress * 100}%`,
              boxShadow: '0 0 20px rgba(139,92,246,0.5)'
            }}
          />
          
          {/* Nodes */}
          {dataAboutPage.map((item, index) => {
            const nodeProgress = (index + 1) / totalItems;
            const isPassed = progress >= nodeProgress;
            const color = COLORS[item.color] || COLORS.purple;
            
            return (
              <div
                key={item.id}
                className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
                style={{
                  top: `${(index / (totalItems - 1)) * 100}%`,
                  background: isPassed ? color : 'rgba(30,30,60,0.8)',
                  border: `2px solid ${isPassed ? color : 'rgba(139,92,246,0.3)'}`,
                  boxShadow: isPassed ? `0 0 15px ${color}60` : 'none',
                }}
              />
            );
          })}
        </div>

        {/* Experience Cards */}
        <div className="relative space-y-24 md:space-y-32 py-10">
          {dataAboutPage.map((item, index) => (
            <div key={item.id} data-experience-card>
              <ExperienceCard
                item={item}
                index={index}
                isActive={activeIndex === index}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-20 px-4"
      >
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-violet-500/20">
          <Home size={18} className="text-violet-400" />
          <span className="text-sm text-white/60">
            {totalItems} experiencias que construyen mi historia
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default Timeline3D;
