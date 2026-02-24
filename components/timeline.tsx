"use client";

import { dataAboutPage } from "@/data";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { 
  GraduationCap, 
  Terminal, 
  Zap, 
  Anchor,
  ChefHat,
  Briefcase,
  MapPin,
  Calendar,
  Award,
  Sparkles,
  ArrowRight,
  Circle
} from "lucide-react";

const colorVariants: { [key: string]: { 
  bg: string; 
  text: string; 
  border: string; 
  glow: string;
  gradient: string;
  shadow: string;
  ring: string;
  line: string;
} } = {
  cyan: {
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
    border: "border-cyan-500/30",
    glow: "shadow-cyan-500/50",
    gradient: "from-cyan-400 via-cyan-500 to-blue-500",
    shadow: "group-hover:shadow-cyan-500/30",
    ring: "ring-cyan-500/30",
    line: "via-cyan-500",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    glow: "shadow-emerald-500/50",
    gradient: "from-emerald-400 via-emerald-500 to-teal-500",
    shadow: "group-hover:shadow-emerald-500/30",
    ring: "ring-emerald-500/30",
    line: "via-emerald-500",
  },
  purple: {
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    border: "border-purple-500/30",
    glow: "shadow-purple-500/50",
    gradient: "from-purple-400 via-purple-500 to-pink-500",
    shadow: "group-hover:shadow-purple-500/30",
    ring: "ring-purple-500/30",
    line: "via-purple-500",
  },
  blue: {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    border: "border-blue-500/30",
    glow: "shadow-blue-500/50",
    gradient: "from-blue-400 via-blue-500 to-indigo-500",
    shadow: "group-hover:shadow-blue-500/30",
    ring: "ring-blue-500/30",
    line: "via-blue-500",
  },
  orange: {
    bg: "bg-orange-500/10",
    text: "text-orange-400",
    border: "border-orange-500/30",
    glow: "shadow-orange-500/50",
    gradient: "from-orange-400 via-orange-500 to-amber-500",
    shadow: "group-hover:shadow-orange-500/30",
    ring: "ring-orange-500/30",
    line: "via-orange-500",
  },
};

const iconMap: { [key: string]: React.ReactNode } = {
  education: <GraduationCap size={24} strokeWidth={1.5} />,
  code: <Terminal size={24} strokeWidth={1.5} />,
  rocket: <Zap size={24} strokeWidth={1.5} />,
  ship: <Anchor size={24} strokeWidth={1.5} />,
  food: <ChefHat size={24} strokeWidth={1.5} />,
  default: <Briefcase size={24} strokeWidth={1.5} />,
};

const TimelineItem = ({ data, index, isLast, totalItems }: { data: any; index: number; isLast: boolean; totalItems: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const colors = colorVariants[data.color] || colorVariants.emerald;
  const icon = iconMap[data.icon] || iconMap.default;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative flex items-start ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:gap-10 gap-6 mb-8 md:mb-0`}
    >
      {/* Card */}
      <motion.div
        whileHover={{ scale: 1.02, y: -8 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={`group relative w-full md:w-[calc(50%-50px)] overflow-hidden`}
      >
        {/* Main card */}
        <div className={`relative p-6 md:p-8 rounded-3xl
          border ${colors.border} ${colors.bg} backdrop-blur-xl
          transition-all duration-700 ease-out
          hover:shadow-2xl ${colors.shadow}
          ring-1 ${colors.ring}
          ${isEven ? 'md:text-right' : 'md:text-left'}`}
        >
          {/* Animated background gradient */}
          <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
              animate={isInView ? { translateX: ["−100%", "200%"] } : {}}
              transition={{ duration: 1.5, delay: index * 0.2 + 0.5, ease: "easeInOut" }}
            />
          </div>

          {/* Top row: Badge + Number */}
          <div className={`flex items-center gap-3 mb-5 ${isEven ? 'md:justify-end' : 'md:justify-start'} justify-between`}>
            {/* Step number */}
            <motion.span
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
              className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold
                bg-gradient-to-br ${colors.gradient} text-white shadow-lg`}
            >
              {String(index + 1).padStart(2, '0')}
            </motion.span>

            {/* Status badge */}
            {data.isEducation ? (
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 + 0.4 }}
                className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full bg-gradient-to-r ${colors.gradient} text-white shadow-lg`}
              >
                <GraduationCap size={14} />
                Formación
              </motion.span>
            ) : data.endDate === "Actualidad" ? (
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 + 0.4 }}
                className="relative inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                  Actualmente
                </span>
              </motion.span>
            ) : (
              <span className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-full ${colors.bg} ${colors.text} border ${colors.border}`}>
                <Award size={12} />
                Completado
              </span>
            )}
          </div>

          {/* Title */}
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1 + 0.2 }}
            className={`text-2xl md:text-3xl font-bold mb-4 ${colors.text} group-hover:text-white transition-colors duration-500`}
          >
            {data.title}
          </motion.h3>

          {/* Company & Location - Styled as pills */}
          <div className={`flex items-center gap-2 mb-4 ${isEven ? 'md:justify-end' : 'md:justify-start'} justify-start flex-wrap`}>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${colors.bg} ${colors.text} border ${colors.border}`}>
              <Briefcase size={14} />
              {data.subtitle.split('·')[0].trim()}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm bg-slate-800/50 text-slate-400 border border-slate-700/50">
              <MapPin size={14} />
              {data.subtitle.split('·')[1]?.trim() || 'Remoto'}
            </span>
          </div>

          {/* Date range - More prominent */}
          <div className={`flex items-center gap-3 mb-5 ${isEven ? 'md:justify-end' : 'md:justify-start'} justify-start`}>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${colors.bg} border ${colors.border}`}>
              <Calendar size={16} className={colors.text} />
              <span className={`text-sm font-bold ${colors.text}`}>
                {data.date}
              </span>
              <ArrowRight size={14} className="text-slate-500" />
              <span className={`text-sm font-bold ${data.endDate === "Actualidad" ? "text-emerald-400" : colors.text}`}>
                {data.endDate}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-400 text-sm md:text-base leading-relaxed group-hover:text-slate-300 transition-colors">
            {data.description}
          </p>

          {/* Decorative elements */}
          <div className={`absolute ${isEven ? '-right-4 -top-4' : '-left-4 -top-4'} w-24 h-24 rounded-full bg-gradient-to-br ${colors.gradient} opacity-5 blur-2xl group-hover:opacity-20 transition-opacity duration-700`} />
          <div className={`absolute ${isEven ? '-left-2 -bottom-2' : '-right-2 -bottom-2'} w-16 h-16 rounded-full bg-gradient-to-br ${colors.gradient} opacity-5 blur-xl group-hover:opacity-15 transition-opacity duration-700`} />
        </div>
      </motion.div>

      {/* Center line & Icon */}
      <div className="relative flex flex-col items-center z-20 md:absolute md:left-1/2 md:-translate-x-1/2">
        {/* Icon container - Premium hexagonal style */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: index * 0.1 + 0.2 }}
          className="relative"
        >
          {/* Outer rotating ring */}
          <motion.div
            className={`absolute -inset-5 rounded-full border-2 border-dashed ${colors.border} opacity-40`}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Outer glow ring */}
          <motion.div
            className={`absolute -inset-4 rounded-full bg-gradient-to-br ${colors.gradient} opacity-20 blur-lg`}
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Secondary ring */}
          <motion.div
            className={`absolute -inset-2 rounded-full bg-gradient-to-br ${colors.gradient} opacity-30`}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          
          {/* Main icon circle with gradient border */}
          <div className={`relative flex items-center justify-center w-18 h-18 rounded-full
            bg-slate-900 shadow-2xl ${colors.glow}
            p-[3px] z-10`}
            style={{ width: '72px', height: '72px' }}
          >
            {/* Gradient border */}
            <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${colors.gradient} opacity-100`} />
            
            {/* Inner dark circle */}
            <div className="relative flex items-center justify-center w-full h-full rounded-full bg-slate-900 z-10">
              {/* Icon with glow */}
              <motion.span 
                className={`${colors.text} drop-shadow-lg`}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                {icon}
              </motion.span>
            </div>
          </div>
          
          {/* Corner accents */}
          <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-br ${colors.gradient} opacity-80`} />
          <div className={`absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-gradient-to-br ${colors.gradient} opacity-60`} />
        </motion.div>

        {/* Premium connecting line with animated dots */}
        {!isLast && (
          <div className="relative h-44 md:h-56 w-8 mt-2 flex flex-col items-center">
            {/* Main line container */}
            <div className="relative h-full w-[4px] rounded-full overflow-visible">
              {/* Background solid line */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 1.2, delay: index * 0.1 + 0.5, ease: "easeOut" }}
                style={{ originY: 0 }}
                className={`absolute inset-0 rounded-full bg-gradient-to-b ${colors.gradient}`}
              />
              
              {/* Animated flowing light particle */}
              <motion.div
                className="absolute w-3 h-3 -left-[4px] rounded-full bg-white shadow-lg shadow-white/50"
                animate={{ y: ["-10%", "110%"], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
              />
              
              {/* Second particle */}
              <motion.div
                className={`absolute w-2 h-2 -left-[2px] rounded-full bg-gradient-to-br ${colors.gradient}`}
                animate={{ y: ["0%", "100%"], scale: [1, 0.5, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: index * 0.4 + 1 }}
              />
            </div>
            
            {/* Decorative dots along the line */}
            <div className="absolute inset-0 flex flex-col items-center justify-evenly py-4">
              {[0, 1, 2, 3].map((dotIndex) => (
                <motion.div
                  key={dotIndex}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ delay: index * 0.1 + 0.7 + dotIndex * 0.12, type: "spring" }}
                  className={`w-2 h-2 rounded-full bg-gradient-to-br ${colors.gradient} ring-2 ring-slate-900`}
                />
              ))}
            </div>
            
            {/* Line glow effect */}
            <div className={`absolute inset-0 w-[6px] left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-b ${colors.gradient} opacity-20 blur-md`} />
            
            {/* End connector dot */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: index * 0.1 + 1.2, type: "spring" }}
              className={`absolute -bottom-2 w-4 h-4 rounded-full bg-gradient-to-br ${colors.gradient} ring-4 ring-slate-900 shadow-lg`}
            />
          </div>
        )}
      </div>

      {/* Empty space for alignment */}
      <div className="hidden md:block md:w-[calc(50%-50px)]" />
    </motion.div>
  );
};

const TimeLine = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div ref={containerRef} className="relative flex flex-col justify-center py-16 overflow-hidden">
      {/* Background decorations */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
      </motion.div>

      <div className="relative w-full max-w-7xl mx-auto px-4 md:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 rounded-full glass border border-purple-500/30 text-purple-400 text-sm font-medium"
          >
            <Sparkles size={16} className="animate-pulse" />
            Mi Trayectoria Profesional
          </motion.span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Construyendo </span>
            <span className="gradient-text">Experiencia</span>
          </h2>
          
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Más de <span className="text-white font-semibold">4 años</span> transformando ideas en 
            <span className="text-purple-400"> soluciones digitales</span> que generan impacto
          </p>

          {/* Stats mini row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-8 mt-8"
          >
            {[
              { value: "5+", label: "Empresas" },
              { value: "10+", label: "Proyectos" },
              { value: "4+", label: "Años" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Central line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ originY: 0 }}
              className="h-full w-full bg-gradient-to-b from-purple-500/50 via-cyan-500/50 to-emerald-500/50"
            />
          </div>

          {dataAboutPage.map((data, index) => (
            <TimelineItem 
              key={data.id} 
              data={data} 
              index={index} 
              isLast={index === dataAboutPage.length - 1}
              totalItems={dataAboutPage.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
