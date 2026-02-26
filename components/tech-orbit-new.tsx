"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// React Icons imports
import { 
  SiLaravel, SiNestjs, SiDotnet, SiNodedotjs,
  SiReact, SiNextdotjs, SiVuedotjs, SiTypescript,
  SiPostgresql, SiMongodb, SiRedis,
  SiDocker, SiKubernetes, SiGithubactions,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";

// ═══════════════════════════════════════════════════════════
// TECH DATA
// ═══════════════════════════════════════════════════════════

const baseTechOrbits = [
  {
    name: "Backend",
    color: "#8b5cf6",
    duration: 35,
    baseRadius: 70,
    techs: [
      { name: "Laravel", Icon: SiLaravel, color: "#FF2D20" },
      { name: "NestJS", Icon: SiNestjs, color: "#E0234E" },
      { name: ".NET", Icon: SiDotnet, color: "#512BD4" },
      { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
    ]
  },
  {
    name: "Frontend",
    color: "#06b6d4",
    duration: 42,
    baseRadius: 120,
    techs: [
      { name: "React", Icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", Icon: SiNextdotjs, color: "#ffffff" },
      { name: "Vue.js", Icon: SiVuedotjs, color: "#4FC08D" },
      { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
    ]
  },
  {
    name: "Database",
    color: "#10b981",
    duration: 50,
    baseRadius: 170,
    techs: [
      { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
      { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
      { name: "Redis", Icon: SiRedis, color: "#DC382D" },
    ]
  },
  {
    name: "DevOps",
    color: "#f97316",
    duration: 58,
    baseRadius: 220,
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
// HOOK PARA DETECTAR TAMAÑO
// ═══════════════════════════════════════════════════════════

const useScreenSize = () => {
  const [multiplier, setMultiplier] = useState(1);
  
  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width < 400) {
        setMultiplier(0.5);
      } else if (width < 500) {
        setMultiplier(0.6);
      } else if (width < 640) {
        setMultiplier(0.7);
      } else if (width < 768) {
        setMultiplier(0.85);
      } else {
        setMultiplier(1);
      }
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  
  return multiplier;
};

// ═══════════════════════════════════════════════════════════
// SINGLE TECH ICON COMPONENT
// ═══════════════════════════════════════════════════════════

interface TechIconProps {
  tech: { name: string; Icon: React.ComponentType<{ size: number; color: string }>; color: string };
  angle: number;
  radius: number;
  orbitDuration: number;
  iconSize: number;
  onHover: (name: string | null) => void;
  isHovered: boolean;
}

const TechIcon = ({ tech, angle, radius, orbitDuration, iconSize, onHover, isHovered }: TechIconProps) => {
  const Icon = tech.Icon;
  
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: '50%',
        top: '50%',
        transform: `rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg)`,
      }}
    >
      {/* Counter-rotate wrapper */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: orbitDuration,
          repeat: Infinity,
          ease: "linear"
        }}
        className="relative -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div 
          className="flex items-center justify-center rounded-lg pointer-events-auto cursor-pointer"
          style={{
            width: iconSize,
            height: iconSize,
            background: `linear-gradient(135deg, ${tech.color}15, ${tech.color}35)`,
            border: `1.5px solid ${tech.color}${isHovered ? 'cc' : '60'}`,
            boxShadow: isHovered ? `0 0 20px ${tech.color}50` : `0 2px 8px rgba(0,0,0,0.3)`,
          }}
          onMouseEnter={() => onHover(tech.name)}
          onMouseLeave={() => onHover(null)}
          whileHover={{ scale: 1.25 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon 
            size={iconSize * 0.55} 
            color={tech.color}
          />
        </motion.div>
        
        {/* Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.9 }}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-semibold whitespace-nowrap z-50 pointer-events-none"
              style={{ 
                background: tech.color,
                color: '#fff'
              }}
            >
              {tech.name}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════
// ORBIT RING COMPONENT
// ═══════════════════════════════════════════════════════════

interface OrbitRingProps {
  orbit: typeof baseTechOrbits[0];
  radius: number;
  isHighlighted: boolean;
  isDimmed: boolean;
  onTechHover: (name: string | null) => void;
  hoveredTech: string | null;
  iconSize: number;
}

const OrbitRing = ({ orbit, radius, isHighlighted, isDimmed, onTechHover, hoveredTech, iconSize }: OrbitRingProps) => {
  const techCount = orbit.techs.length;
  
  return (
    <div 
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500"
      style={{
        width: radius * 2,
        height: radius * 2,
        border: `1px solid ${orbit.color}${isHighlighted ? '70' : isDimmed ? '15' : '35'}`,
        boxShadow: isHighlighted ? `0 0 30px ${orbit.color}30, inset 0 0 20px ${orbit.color}10` : 'none',
        opacity: isDimmed ? 0.35 : 1,
      }}
    >
      {/* Rotating container for techs */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{
          duration: orbit.duration,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {orbit.techs.map((tech, techIndex) => {
          const angle = (techIndex / techCount) * 360;
          
          return (
            <TechIcon
              key={tech.name}
              tech={tech}
              angle={angle}
              radius={radius}
              orbitDuration={orbit.duration}
              iconSize={iconSize}
              onHover={onTechHover}
              isHovered={hoveredTech === tech.name}
            />
          );
        })}
      </motion.div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════
// CENTRAL CORE
// ═══════════════════════════════════════════════════════════

const CentralCore = ({ selectedOrbit, size }: { selectedOrbit: string | null; size: number }) => {
  const orbit = selectedOrbit ? baseTechOrbits.find(o => o.name === selectedOrbit) : null;
  const color = orbit?.color || "#8b5cf6";
  
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="rounded-full border flex items-center justify-center"
        style={{
          width: size,
          height: size,
          borderColor: `${color}50`,
          background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`,
        }}
      >
        <div 
          className="rounded-full"
          style={{ 
            width: size * 0.55,
            height: size * 0.55,
            border: `1px solid ${color}35`,
          }}
        />
      </motion.div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════
// LEGEND (Botones de filtro)
// ═══════════════════════════════════════════════════════════

const Legend = ({ 
  selectedOrbit, 
  onSelect 
}: { 
  selectedOrbit: string | null;
  onSelect: (name: string | null) => void;
}) => (
  <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-1 sm:gap-1.5 max-w-[95%] z-30 px-2">
    {baseTechOrbits.map((orbit) => {
      const isActive = selectedOrbit === orbit.name;
      return (
        <button
          key={orbit.name}
          onClick={() => onSelect(isActive ? null : orbit.name)}
          className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-medium transition-all duration-300 border backdrop-blur-sm"
          style={{
            background: isActive ? `${orbit.color}35` : 'rgba(0,0,0,0.6)',
            borderColor: isActive ? orbit.color : 'rgba(255,255,255,0.12)',
            color: isActive ? orbit.color : 'rgba(255,255,255,0.65)',
          }}
        >
          <span className="flex items-center gap-1">
            <span 
              className="w-1.5 h-1.5 rounded-full"
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
  const multiplier = useScreenSize();
  
  const selectedOrbit = externalSelectedOrbit !== undefined ? externalSelectedOrbit : internalSelectedOrbit;
  const setSelectedOrbit = onOrbitSelect || setInternalSelectedOrbit;

  // Tamaños calculados según pantalla
  const iconSize = Math.max(26, Math.round(38 * multiplier));
  const coreSize = Math.max(35, Math.round(55 * multiplier));

  return (
    <div className="relative w-full h-[320px] sm:h-[400px] md:h-[500px] lg:h-[550px] rounded-xl sm:rounded-2xl border border-white/[0.08] bg-gradient-to-b from-black/50 to-black/30">
      {/* Header */}
      <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-20">
        <h2 className="text-xs sm:text-sm md:text-base font-semibold text-white/90">
          Tech <span className="text-violet-400">Stack</span>
        </h2>
        <p className="text-[8px] sm:text-[9px] text-white/40 mt-0.5">
          {selectedOrbit ? `Filtrado: ${selectedOrbit}` : 'Hover para detalles'}
        </p>
      </div>

      {/* Clear filter button */}
      <AnimatePresence>
        {selectedOrbit && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => setSelectedOrbit(null)}
            className="absolute top-2 sm:top-3 right-2 sm:right-3 z-20 px-2 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-medium bg-white/10 border border-white/20 text-white/70 hover:bg-white/20 transition-all"
          >
            ✕ Limpiar
          </motion.button>
        )}
      </AnimatePresence>

      {/* Orbits container - NO overflow hidden, NO scale */}
      <div className="absolute inset-0 flex items-center justify-center">
        {baseTechOrbits.map((orbit) => (
          <OrbitRing
            key={orbit.name}
            orbit={orbit}
            radius={orbit.baseRadius * multiplier}
            isHighlighted={selectedOrbit === orbit.name}
            isDimmed={selectedOrbit !== null && selectedOrbit !== orbit.name}
            onTechHover={setHoveredTech}
            hoveredTech={hoveredTech}
            iconSize={iconSize}
          />
        ))}
        
        <CentralCore selectedOrbit={selectedOrbit} size={coreSize} />
      </div>

      {/* Legend filter buttons */}
      <Legend selectedOrbit={selectedOrbit} onSelect={setSelectedOrbit} />
    </div>
  );
};

export default TechOrbit;
