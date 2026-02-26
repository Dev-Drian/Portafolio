"use client";

import { useRef, useMemo, useState, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, PerspectiveCamera, Line } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

// React Icons imports
import { 
  SiLaravel, SiNestjs, SiDotnet, SiNodedotjs, SiSpringboot,
  SiReact, SiNextdotjs, SiVuedotjs, SiAngular, SiTypescript,
  SiPostgresql, SiMongodb, SiRedis, SiMysql, SiElasticsearch,
  SiDocker, SiKubernetes, SiGithubactions,
  SiGit, SiJira, SiFigma, SiPostman, SiGraphql,
  SiN8N, SiZapier
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";

// ═══════════════════════════════════════════════════════════
// TECH DATA WITH REAL ICONS
// ═══════════════════════════════════════════════════════════

const techOrbits = [
  {
    name: "Backend",
    radius: 2.5,
    speed: 0.25,
    color: "#8b5cf6",
    techs: [
      { name: "Laravel", Icon: SiLaravel, color: "#FF2D20" },
      { name: "NestJS", Icon: SiNestjs, color: "#E0234E" },
      { name: ".NET", Icon: SiDotnet, color: "#512BD4" },
      { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
      { name: "Spring Boot", Icon: SiSpringboot, color: "#6DB33F" },
    ]
  },
  {
    name: "Frontend",
    radius: 3.8,
    speed: 0.2,
    color: "#06b6d4",
    techs: [
      { name: "React", Icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", Icon: SiNextdotjs, color: "#ffffff" },
      { name: "Vue.js", Icon: SiVuedotjs, color: "#4FC08D" },
      { name: "Angular", Icon: SiAngular, color: "#DD0031" },
      { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
    ]
  },
  {
    name: "Database",
    radius: 5.0,
    speed: 0.15,
    color: "#10b981",
    techs: [
      { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
      { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
      { name: "Redis", Icon: SiRedis, color: "#DC382D" },
      { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
      { name: "Elasticsearch", Icon: SiElasticsearch, color: "#005571" },
    ]
  },
  {
    name: "DevOps",
    radius: 6.2,
    speed: 0.12,
    color: "#f97316",
    techs: [
      { name: "Docker", Icon: SiDocker, color: "#2496ED" },
      { name: "Kubernetes", Icon: SiKubernetes, color: "#326CE5" },
      { name: "AWS", Icon: FaAws, color: "#FF9900" },
      { name: "Azure", Icon: VscAzure, color: "#0078D4" },
      { name: "GitHub Actions", Icon: SiGithubactions, color: "#2088FF" },
    ]
  },
  {
    name: "Tools",
    radius: 7.4,
    speed: 0.1,
    color: "#ec4899",
    techs: [
      { name: "Git", Icon: SiGit, color: "#F05032" },
      { name: "Jira", Icon: SiJira, color: "#0052CC" },
      { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
      { name: "Postman", Icon: SiPostman, color: "#FF6C37" },
      { name: "GraphQL", Icon: SiGraphql, color: "#E10098" },
    ]
  },
];

// ═══════════════════════════════════════════════════════════
// ORBIT RING COMPONENT WITH HIGHLIGHT
// ═══════════════════════════════════════════════════════════

function OrbitRing({ 
  radius, 
  color, 
  isHighlighted, 
  isDimmed 
}: { 
  radius: number; 
  color: string;
  isHighlighted: boolean;
  isDimmed: boolean;
}) {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 128; i++) {
      const angle = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return pts;
  }, [radius]);

  return (
    <Line
      points={points}
      color={color}
      lineWidth={isHighlighted ? 3 : 1}
      transparent
      opacity={isDimmed ? 0.1 : isHighlighted ? 0.8 : 0.3}
    />
  );
}

// ═══════════════════════════════════════════════════════════
// TECH NODE WITH HTML ICON
// ═══════════════════════════════════════════════════════════

function TechNode({ 
  tech, 
  orbitRadius, 
  orbitSpeed, 
  index, 
  totalInOrbit,
  onHover,
  isHovered,
  isHighlighted,
  isDimmed
}: { 
  tech: { name: string; Icon: any; color: string };
  orbitRadius: number;
  orbitSpeed: number;
  index: number;
  totalInOrbit: number;
  onHover: (name: string | null) => void;
  isHovered: boolean;
  isHighlighted: boolean;
  isDimmed: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialAngle = (index / totalInOrbit) * Math.PI * 2;
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime();
      const speed = isHighlighted ? orbitSpeed * 1.5 : orbitSpeed;
      const angle = initialAngle + time * speed;
      meshRef.current.position.x = Math.cos(angle) * orbitRadius;
      meshRef.current.position.z = Math.sin(angle) * orbitRadius;
      meshRef.current.position.y = Math.sin(time * 0.5 + index) * 0.3;
    }
  });

  const Icon = tech.Icon;
  const scale = isHighlighted ? 1.3 : isDimmed ? 0.7 : 1;

  return (
    <mesh 
      ref={meshRef}
      onPointerEnter={() => onHover(tech.name)}
      onPointerLeave={() => onHover(null)}
    >
      <sphereGeometry args={[0.01, 8, 8]} />
      <meshBasicMaterial transparent opacity={0} />
      <Html
        center
        distanceFactor={7}
        style={{
          transition: 'all 0.4s ease',
          transform: `scale(${isHovered ? scale * 1.2 : scale})`,
          opacity: isDimmed ? 0.3 : 1,
        }}
      >
        <div 
          className="relative group cursor-pointer"
          style={{ 
            filter: isHovered || isHighlighted ? `drop-shadow(0 0 ${isHighlighted ? '20px' : '12px'} ${tech.color})` : 'none'
          }}
        >
          {/* Icon container */}
          <div 
            className={`rounded-xl flex items-center justify-center transition-all duration-300 ${isHighlighted ? 'w-14 h-14' : 'w-11 h-11'}`}
            style={{ 
              background: `linear-gradient(135deg, ${tech.color}25, ${tech.color}50)`,
              border: `${isHighlighted ? '2px' : '1px'} solid ${tech.color}${isHighlighted ? '80' : '50'}`,
              boxShadow: isHovered || isHighlighted 
                ? `0 0 30px ${tech.color}70, inset 0 0 20px ${tech.color}30` 
                : `0 4px 16px rgba(0,0,0,0.4)`
            }}
          >
            <Icon 
              size={isHighlighted ? 28 : 22} 
              color={tech.color}
              style={{ filter: 'brightness(1.3)' }}
            />
          </div>
          
          {/* Tooltip */}
          {(isHovered || isHighlighted) && (
            <div 
              className="absolute -bottom-9 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap"
              style={{ 
                background: `${tech.color}`,
                color: '#fff',
                boxShadow: `0 4px 20px ${tech.color}60`
              }}
            >
              {tech.name}
            </div>
          )}
        </div>
      </Html>
    </mesh>
  );
}

// ═══════════════════════════════════════════════════════════
// CENTRAL CORE
// ═══════════════════════════════════════════════════════════

function CentralCore({ selectedOrbit }: { selectedOrbit: string | null }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const orbit = selectedOrbit ? techOrbits.find(o => o.name === selectedOrbit) : null;
  const color = orbit?.color || "#8b5cf6";
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.2;
    }
  });

  return (
    <group>
      {/* Core sphere */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial 
          color={color} 
          wireframe 
          transparent 
          opacity={0.7}
        />
      </mesh>
      
      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.2}
        />
      </mesh>
      
      {/* Outer pulse */}
      <mesh scale={1.2}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.05}
          wireframe
        />
      </mesh>
      
      {/* Label */}
      <Html center distanceFactor={8}>
        <div className="text-center pointer-events-none">
          <div 
            className="font-bold text-xl tracking-wider transition-colors duration-300"
            style={{ color: color }}
          >
            {selectedOrbit || "STACK"}
          </div>
          <div className="text-white/50 text-[10px] mt-1">
            {selectedOrbit ? `${orbit?.techs.length} tecnologías` : "Tech Orbit"}
          </div>
        </div>
      </Html>
    </group>
  );
}

// ═══════════════════════════════════════════════════════════
// COMPLETE ORBIT SYSTEM
// ═══════════════════════════════════════════════════════════

function OrbitSystem({ 
  hoveredTech, 
  setHoveredTech,
  selectedOrbit 
}: { 
  hoveredTech: string | null; 
  setHoveredTech: (name: string | null) => void;
  selectedOrbit: string | null;
}) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.08) * 0.15 + 0.3;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.3, 0, 0]}>
      <CentralCore selectedOrbit={selectedOrbit} />
      
      {techOrbits.map((orbit) => {
        const isHighlighted = selectedOrbit === orbit.name;
        const isDimmed = selectedOrbit !== null && !isHighlighted;
        
        return (
          <group key={orbit.name}>
            <OrbitRing 
              radius={orbit.radius} 
              color={orbit.color}
              isHighlighted={isHighlighted}
              isDimmed={isDimmed}
            />
            
            {orbit.techs.map((tech, techIndex) => (
              <TechNode
                key={tech.name}
                tech={tech}
                orbitRadius={orbit.radius}
                orbitSpeed={orbit.speed}
                index={techIndex}
                totalInOrbit={orbit.techs.length}
                onHover={setHoveredTech}
                isHovered={hoveredTech === tech.name}
                isHighlighted={isHighlighted}
                isDimmed={isDimmed}
              />
            ))}
          </group>
        );
      })}
    </group>
  );
}

// ═══════════════════════════════════════════════════════════
// LEGEND COMPONENT
// ═══════════════════════════════════════════════════════════

function OrbitLegend({ 
  activeOrbit, 
  setActiveOrbit 
}: {
  activeOrbit: string | null;
  setActiveOrbit: (name: string | null) => void;
}) {
  return (
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-1.5 px-3">
      {techOrbits.map((orbit) => {
        const isActive = activeOrbit === orbit.name;
        return (
          <button
            key={orbit.name}
            onClick={() => setActiveOrbit(isActive ? null : orbit.name)}
            className="px-2.5 py-1 rounded-full text-[10px] font-medium transition-all duration-300 border backdrop-blur-sm"
            style={{
              background: isActive ? `${orbit.color}30` : 'rgba(0,0,0,0.5)',
              borderColor: isActive ? orbit.color : 'rgba(255,255,255,0.1)',
              color: isActive ? orbit.color : 'rgba(255,255,255,0.6)',
              boxShadow: isActive ? `0 0 15px ${orbit.color}40` : 'none',
              transform: isActive ? 'scale(1.1)' : 'scale(1)'
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
}

// ═══════════════════════════════════════════════════════════
// TECH LIST PANEL (shows when orbit selected)
// ═══════════════════════════════════════════════════════════

function TechListPanel({ selectedOrbit }: { selectedOrbit: string | null }) {
  const orbit = techOrbits.find(o => o.name === selectedOrbit);
  
  if (!orbit) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute top-3 left-3 right-3 flex flex-wrap justify-center gap-2"
    >
      {orbit.techs.map((tech, i) => {
        const Icon = tech.Icon;
        return (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md"
            style={{ 
              background: `${tech.color}20`,
              border: `1px solid ${tech.color}40`
            }}
          >
            <Icon size={14} color={tech.color} />
            <span className="text-[11px] font-medium" style={{ color: tech.color }}>
              {tech.name}
            </span>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

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
  
  // Use external or internal state
  const selectedOrbit = externalSelectedOrbit !== undefined ? externalSelectedOrbit : internalSelectedOrbit;
  const setSelectedOrbit = onOrbitSelect || setInternalSelectedOrbit;

  return (
    <div className="relative w-full h-[500px] lg:h-[600px] rounded-2xl overflow-hidden border border-white/[0.06] bg-gradient-to-b from-black/20 to-transparent">
      {/* Header */}
      <div className="absolute top-3 left-3 z-10">
        <h2 className="text-lg font-semibold text-white/90">
          Tech <span className="text-violet-400">Stack</span>
        </h2>
        <p className="text-[10px] text-white/40 mt-0.5">
          {selectedOrbit ? `Mostrando: ${selectedOrbit}` : 'Click en una carta para filtrar'}
        </p>
      </div>

      {/* 3D Canvas */}
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 10, 16]} fov={45} />
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        
        <Suspense fallback={null}>
          <OrbitSystem 
            hoveredTech={hoveredTech} 
            setHoveredTech={setHoveredTech}
            selectedOrbit={selectedOrbit}
          />
        </Suspense>
        
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          minDistance={10}
          maxDistance={25}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.2}
          autoRotate
          autoRotateSpeed={selectedOrbit ? 1 : 0.3}
        />
      </Canvas>

      {/* Tech list when selected */}
      <AnimatePresence>
        {selectedOrbit && <TechListPanel selectedOrbit={selectedOrbit} />}
      </AnimatePresence>

      {/* Legend buttons */}
      <OrbitLegend activeOrbit={selectedOrbit} setActiveOrbit={setSelectedOrbit} />
      
      {/* Clear selection button */}
      <AnimatePresence>
        {selectedOrbit && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setSelectedOrbit(null)}
            className="absolute top-3 right-3 px-3 py-1.5 rounded-full text-[10px] font-medium bg-white/10 border border-white/20 text-white/70 hover:bg-white/20 transition-all"
          >
            ✕ Limpiar filtro
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TechOrbit;
