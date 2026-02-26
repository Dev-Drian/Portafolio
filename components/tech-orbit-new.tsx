"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// React Icons imports
import { 
  SiLaravel, SiNestjs, SiDotnet, SiNodedotjs, SiSpringboot,
  SiReact, SiNextdotjs, SiVuedotjs, SiAngular, SiTypescript,
  SiPostgresql, SiMongodb, SiRedis, SiMysql,
  SiDocker, SiKubernetes, SiGithubactions,
  SiGit, SiJira, SiFigma, SiPostman, SiGraphql
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";

// ═══════════════════════════════════════════════════════════
// TECH DATA
// ═══════════════════════════════════════════════════════════

const techOrbits = [
  {
    name: "Backend",
    color: "#8b5cf6",
    duration: 30,
    radius: 120,
    techs: [
      { name: "Laravel", Icon: SiLaravel, color: "#FF2D20" },
      { name: "NestJS", Icon: SiNestjs, color: "#E0234E" },
      { name: ".NET", Icon: SiDotnet, color: "#512BD4" },
      { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
      { name: "Spring", Icon: SiSpringboot, color: "#6DB33F" },
    ]
  },
  {
    name: "Frontend",
    color: "#06b6d4",
    duration: 35,
    radius: 180,
    techs: [
      { name: "React", Icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", Icon: SiNextdotjs, color: "#ffffff" },
      { name: "Vue.js", Icon: SiVuedotjs, color: "#4FC08D" },
      { name: "Angular", Icon: SiAngular, color: "#DD0031" },
      { name: "TS", Icon: SiTypescript, color: "#3178C6" },
    ]
  },
  {
    name: "Database",
    color: "#10b981",
    duration: 40,
    radius: 240,
    techs: [
      { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
      { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
      { name: "Redis", Icon: SiRedis, color: "#DC382D" },
      { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
    ]
  },
  {
    name: "DevOps",
    color: "#f97316",
    duration: 45,
    radius: 300,
    techs: [
      { name: "Docker", Icon: SiDocker, color: "#2496ED" },
      { name: "K8s", Icon: SiKubernetes, color: "#326CE5" },
      { name: "AWS", Icon: FaAws, color: "#FF9900" },
      { name: "Azure", Icon: VscAzure, color: "#0078D4" },
      { name: "Actions", Icon: SiGithubactions, color: "#2088FF" },
    ]
  },
];

// ═══════════════════════════════════════════════════════════
// ORBIT COMPONENT
// ═══════════════════════════════════════════════════════════

interface OrbitProps {
  orbit: typeof techOrbits[0];
  index: number;
  isHighlighted: boolean;
  isDimmed: boolean;
  onHover: (name: string | null) => void;
  hoveredTech: string | null;
}

const Orbit = ({ orbit, index, isHighlighted, isDimmed, onHover, hoveredTech }: OrbitProps) => {
  const techCount = orbit.techs.length;
  
  return (
    <div 
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500"
      style={{
        width: orbit.radius * 2,
        height: orbit.radius * 2,
        border: `1px solid ${orbit.color}${isHighlighted ? '60' : isDimmed ? '10' : '25'}`,
        boxShadow: isHighlighted ? `0 0 30px ${orbit.color}30, inset 0 0 30px ${orbit.color}10` : 'none',
        opacity: isDimmed ? 0.3 : 1,
      }}
    >
      {/* Orbit ring glow */}
      {isHighlighted && (
        <div 
          className="absolute inset-0 rounded-full animate-pulse"
          style={{ 
            background: `radial-gradient(circle, transparent 60%, ${orbit.color}20 100%)` 
          }}
        />
      )}
      
      {/* Rotating container */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{
          duration: isHighlighted ? orbit.duration * 0.6 : orbit.duration,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {orbit.techs.map((tech, techIndex) => {
          const angle = (techIndex / techCount) * 360;
          const Icon = tech.Icon;
          const isHovered = hoveredTech === tech.name;
          
          return (
            <motion.div
              key={tech.name}
              className="absolute cursor-pointer"
              style={{
                left: '50%',
                top: '50%',
                transform: `rotate(${angle}deg) translateX(${orbit.radius}px) rotate(-${angle}deg)`,
              }}
              onHoverStart={() => onHover(tech.name)}
              onHoverEnd={() => onHover(null)}
              whileHover={{ scale: 1.3 }}
            >
              {/* Counter-rotate to keep icons upright */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: isHighlighted ? orbit.duration * 0.6 : orbit.duration,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="relative -translate-x-1/2 -translate-y-1/2"
              >
                <div 
                  className={`flex items-center justify-center rounded-xl transition-all duration-300 ${
                    isHighlighted ? 'w-12 h-12' : 'w-10 h-10'
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${tech.color}20, ${tech.color}40)`,
                    border: `1px solid ${tech.color}${isHovered || isHighlighted ? '80' : '40'}`,
                    boxShadow: isHovered || isHighlighted 
                      ? `0 0 20px ${tech.color}50` 
                      : `0 4px 12px rgba(0,0,0,0.3)`,
                    opacity: isDimmed ? 0.4 : 1,
                  }}
                >
                  <Icon 
                    size={isHighlighted ? 24 : 20} 
                    color={tech.color}
                  />
                </div>
                
                {/* Label - only show on hover or when highlighted */}
                <AnimatePresence>
                  {(isHovered || isHighlighted) && !isDimmed && (
                    <motion.span
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-medium whitespace-nowrap px-2 py-0.5 rounded"
                      style={{ 
                        background: `${tech.color}dd`,
                        color: '#fff'
                      }}
                    >
                      {tech.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════
// CENTRAL CORE
// ═══════════════════════════════════════════════════════════

const CentralCore = ({ selectedOrbit }: { selectedOrbit: string | null }) => {
  const orbit = selectedOrbit ? techOrbits.find(o => o.name === selectedOrbit) : null;
  const color = orbit?.color || "#8b5cf6";
  
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
      {/* Outer glow */}
      <div 
        className="absolute inset-0 rounded-full blur-xl transition-colors duration-500"
        style={{ 
          background: `radial-gradient(circle, ${color}30 0%, transparent 70%)`,
          width: 120,
          height: 120,
          marginLeft: -60,
          marginTop: -60,
        }}
      />
      
      {/* Core */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="relative w-20 h-20 rounded-full border-2 flex items-center justify-center"
        style={{
          borderColor: `${color}50`,
          background: `linear-gradient(135deg, ${color}10, transparent)`,
          boxShadow: `0 0 40px ${color}30, inset 0 0 20px ${color}10`,
        }}
      >
        <div 
          className="absolute inset-2 rounded-full border"
          style={{ borderColor: `${color}30` }}
        />
      </motion.div>
      
      {/* Label */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 text-center">
        <motion.span 
          key={selectedOrbit}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg font-bold transition-colors duration-300"
          style={{ color }}
        >
          {selectedOrbit || "STACK"}
        </motion.span>
        <p className="text-[10px] text-white/40 mt-1">
          {selectedOrbit ? `${orbit?.techs.length} tecnologías` : "Tech Orbit"}
        </p>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════
// LEGEND
// ═══════════════════════════════════════════════════════════

const Legend = ({ 
  selectedOrbit, 
  onSelect 
}: { 
  selectedOrbit: string | null;
  onSelect: (name: string | null) => void;
}) => (
  <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-1 sm:gap-1.5 md:gap-2 max-w-[90%] px-2">
    {techOrbits.map((orbit) => {
      const isActive = selectedOrbit === orbit.name;
      return (
        <button
          key={orbit.name}
          onClick={() => onSelect(isActive ? null : orbit.name)}
          className="px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] md:text-[11px] font-medium transition-all duration-300 border backdrop-blur-sm"
          style={{
            background: isActive ? `${orbit.color}25` : 'rgba(0,0,0,0.4)',
            borderColor: isActive ? orbit.color : 'rgba(255,255,255,0.1)',
            color: isActive ? orbit.color : 'rgba(255,255,255,0.6)',
            boxShadow: isActive ? `0 0 15px ${orbit.color}30` : 'none',
            transform: isActive ? 'scale(1.05)' : 'scale(1)'
          }}
        >
          <span className="flex items-center gap-1 sm:gap-1.5">
            <span 
              className="w-2 h-2 rounded-full"
              style={{ background: orbit.color }}
            />
            {orbit.name}
          </span>
        </button>
      );
    })}
  </div>
);

// ═══════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════

interface TechOrbitProps {
  selectedOrbit?: string | null;
  onOrbitSelect?: (name: string | null) => void;
}

const TechOrbit = ({ selectedOrbit: externalSelectedOrbit, onOrbitSelect }: TechOrbitProps) => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [internalSelectedOrbit, setInternalSelectedOrbit] = useState<string | null>(null);
  
  const selectedOrbit = externalSelectedOrbit !== undefined ? externalSelectedOrbit : internalSelectedOrbit;
  const setSelectedOrbit = onOrbitSelect || setInternalSelectedOrbit;

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[650px] rounded-2xl overflow-hidden border border-white/[0.06] bg-gradient-to-b from-black/30 to-transparent">
      {/* Header */}
      <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20">
        <h2 className="text-sm sm:text-base md:text-lg font-semibold text-white/90">
          Tech <span className="text-violet-400">Stack</span>
        </h2>
        <p className="text-[8px] sm:text-[10px] text-white/40 mt-0.5">
          {selectedOrbit ? `Filtrado: ${selectedOrbit}` : 'Hover para ver • Click para filtrar'}
        </p>
      </div>

      {/* Clear button */}
      <AnimatePresence>
        {selectedOrbit && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => setSelectedOrbit(null)}
            className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] font-medium bg-white/10 border border-white/20 text-white/70 hover:bg-white/20 transition-all"
          >
            ✕ Limpiar
          </motion.button>
        )}
      </AnimatePresence>

      {/* Orbits container - scaled down for mobile */}
      <div className="absolute inset-0 flex items-center justify-center scale-[0.5] sm:scale-[0.65] md:scale-[0.8] lg:scale-100 origin-center">
        {techOrbits.map((orbit, index) => (
          <Orbit
            key={orbit.name}
            orbit={orbit}
            index={index}
            isHighlighted={selectedOrbit === orbit.name}
            isDimmed={selectedOrbit !== null && selectedOrbit !== orbit.name}
            onHover={setHoveredTech}
            hoveredTech={hoveredTech}
          />
        ))}
        
        <CentralCore selectedOrbit={selectedOrbit} />
      </div>

      {/* Legend */}
      <Legend selectedOrbit={selectedOrbit} onSelect={setSelectedOrbit} />

      {/* Background gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.5) 80%)'
        }}
      />
    </div>
  );
};

export default TechOrbit;
