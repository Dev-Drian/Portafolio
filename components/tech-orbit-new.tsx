"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Text } from "@react-three/drei";
import * as THREE from "three";

// ═══════════════════════════════════════════════════════════
// TECH DATA CON COLORES
// ═══════════════════════════════════════════════════════════

const techOrbits = [
  {
    name: "Backend",
    color: "#8b5cf6",
    radius: 2.2,
    speed: 0.3,
    techs: [
      { name: "Laravel", color: "#FF2D20", emoji: "🔷" },
      { name: "NestJS", color: "#E0234E", emoji: "🔺" },
      { name: ".NET", color: "#512BD4", emoji: "🟣" },
      { name: "Node.js", color: "#339933", emoji: "🟢" },
    ]
  },
  {
    name: "Frontend",
    color: "#06b6d4",
    radius: 3.5,
    speed: 0.22,
    techs: [
      { name: "React", color: "#61DAFB", emoji: "⚛️" },
      { name: "Next.js", color: "#ffffff", emoji: "▲" },
      { name: "Vue.js", color: "#4FC08D", emoji: "💚" },
      { name: "TypeScript", color: "#3178C6", emoji: "🔷" },
    ]
  },
  {
    name: "Database",
    color: "#10b981",
    radius: 4.8,
    speed: 0.15,
    techs: [
      { name: "PostgreSQL", color: "#4169E1", emoji: "🐘" },
      { name: "MongoDB", color: "#47A248", emoji: "🍃" },
      { name: "Redis", color: "#DC382D", emoji: "🔴" },
    ]
  },
  {
    name: "DevOps",
    color: "#f97316",
    radius: 6.2,
    speed: 0.1,
    techs: [
      { name: "Docker", color: "#2496ED", emoji: "🐳" },
      { name: "K8s", color: "#326CE5", emoji: "☸️" },
      { name: "AWS", color: "#FF9900", emoji: "☁️" },
      { name: "Azure", color: "#0078D4", emoji: "🔷" },
    ]
  },
];

// ═══════════════════════════════════════════════════════════
// ORBIT RING - Anillo 3D
// ═══════════════════════════════════════════════════════════

function OrbitRing({ radius, color, isHighlighted }: { radius: number; color: string; isHighlighted: boolean }) {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return pts;
  }, [radius]);

  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial 
        color={color} 
        transparent 
        opacity={isHighlighted ? 0.8 : 0.3} 
        linewidth={1}
      />
    </line>
  );
}

// ═══════════════════════════════════════════════════════════
// TECH SPHERE - Esfera de tecnología
// ═══════════════════════════════════════════════════════════

interface TechSphereProps {
  tech: { name: string; color: string; emoji: string };
  angle: number;
  radius: number;
  speed: number;
  isHighlighted: boolean;
  isDimmed: boolean;
  onHover: (name: string | null) => void;
  isHovered: boolean;
}

function TechSphere({ tech, angle, radius, speed, isHighlighted, isDimmed, onHover, isHovered }: TechSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const angleRef = useRef(angle);

  useFrame((_, delta) => {
    if (meshRef.current) {
      angleRef.current += speed * delta;
      meshRef.current.position.x = Math.cos(angleRef.current) * radius;
      meshRef.current.position.z = Math.sin(angleRef.current) * radius;
    }
  });

  const scale = isHovered ? 1.4 : isHighlighted ? 1.2 : 1;
  const opacity = isDimmed ? 0.3 : 1;

  return (
    <mesh
      ref={meshRef}
      position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}
      scale={scale}
      onPointerEnter={() => onHover(tech.name)}
      onPointerLeave={() => onHover(null)}
    >
      <sphereGeometry args={[0.25, 32, 32]} />
      <meshStandardMaterial
        color={tech.color}
        emissive={tech.color}
        emissiveIntensity={isHovered ? 0.6 : 0.2}
        transparent
        opacity={opacity}
      />
      {/* Label HTML */}
      {(isHovered || isHighlighted) && (
        <Html distanceFactor={10} position={[0, 0.5, 0]} center>
          <div 
            className="px-2 py-1 rounded text-[10px] font-bold whitespace-nowrap pointer-events-none"
            style={{ 
              background: tech.color, 
              color: '#fff',
              boxShadow: `0 0 10px ${tech.color}`
            }}
          >
            {tech.name}
          </div>
        </Html>
      )}
    </mesh>
  );
}

// ═══════════════════════════════════════════════════════════
// ORBIT GROUP - Grupo de una órbita completa
// ═══════════════════════════════════════════════════════════

interface OrbitGroupProps {
  orbit: typeof techOrbits[0];
  isHighlighted: boolean;
  isDimmed: boolean;
  hoveredTech: string | null;
  onTechHover: (name: string | null) => void;
}

function OrbitGroup({ orbit, isHighlighted, isDimmed, hoveredTech, onTechHover }: OrbitGroupProps) {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef}>
      {/* Anillo */}
      <OrbitRing radius={orbit.radius} color={orbit.color} isHighlighted={isHighlighted} />
      
      {/* Label del anillo */}
      {isHighlighted && (
        <Html position={[orbit.radius + 0.5, 0.5, 0]} center>
          <span 
            className="text-[11px] font-bold px-2 py-0.5 rounded"
            style={{ color: orbit.color, background: 'rgba(0,0,0,0.7)' }}
          >
            {orbit.name}
          </span>
        </Html>
      )}
      
      {/* Tecnologías */}
      {orbit.techs.map((tech, i) => {
        const angle = (i / orbit.techs.length) * Math.PI * 2;
        return (
          <TechSphere
            key={tech.name}
            tech={tech}
            angle={angle}
            radius={orbit.radius}
            speed={orbit.speed}
            isHighlighted={isHighlighted}
            isDimmed={isDimmed}
            onHover={onTechHover}
            isHovered={hoveredTech === tech.name}
          />
        );
      })}
    </group>
  );
}

// ═══════════════════════════════════════════════════════════
// CENTRAL CORE - Núcleo central
// ═══════════════════════════════════════════════════════════

function CentralCore({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[0.5, 1]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        wireframe
      />
    </mesh>
  );
}

// ═══════════════════════════════════════════════════════════
// SCENE - Escena 3D completa
// ═══════════════════════════════════════════════════════════

interface SceneProps {
  selectedOrbit: string | null;
  hoveredTech: string | null;
  onTechHover: (name: string | null) => void;
}

function Scene({ selectedOrbit, hoveredTech, onTechHover }: SceneProps) {
  const coreColor = selectedOrbit 
    ? techOrbits.find(o => o.name === selectedOrbit)?.color || "#8b5cf6"
    : "#8b5cf6";

  return (
    <>
      {/* Luces */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />

      {/* Core central */}
      <CentralCore color={coreColor} />

      {/* Órbitas */}
      {techOrbits.map((orbit) => (
        <OrbitGroup
          key={orbit.name}
          orbit={orbit}
          isHighlighted={selectedOrbit === orbit.name}
          isDimmed={selectedOrbit !== null && selectedOrbit !== orbit.name}
          hoveredTech={hoveredTech}
          onTechHover={onTechHover}
        />
      ))}

      {/* Controles de órbita - ZOOM, PAN, ROTATE */}
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={15}
        autoRotate={!selectedOrbit}
        autoRotateSpeed={0.5}
        makeDefault
      />
    </>
  );
}

// ═══════════════════════════════════════════════════════════
// LEGEND - Botones de filtro
// ═══════════════════════════════════════════════════════════

interface LegendProps {
  selectedOrbit: string | null;
  onSelect: (name: string | null) => void;
}

function Legend({ selectedOrbit, onSelect }: LegendProps) {
  return (
    <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-1 sm:gap-1.5 z-20 max-w-[95%] px-2">
      {techOrbits.map((orbit) => {
        const isActive = selectedOrbit === orbit.name;
        return (
          <button
            key={orbit.name}
            onClick={() => onSelect(isActive ? null : orbit.name)}
            className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-medium transition-all duration-300 border backdrop-blur-sm"
            style={{
              background: isActive ? `${orbit.color}40` : 'rgba(0,0,0,0.6)',
              borderColor: isActive ? orbit.color : 'rgba(255,255,255,0.15)',
              color: isActive ? orbit.color : 'rgba(255,255,255,0.7)',
            }}
          >
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: orbit.color }} />
              {orbit.name}
            </span>
          </button>
        );
      })}
    </div>
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
  
  const selectedOrbit = externalSelectedOrbit !== undefined ? externalSelectedOrbit : internalSelectedOrbit;
  const setSelectedOrbit = onOrbitSelect || setInternalSelectedOrbit;

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] rounded-xl sm:rounded-2xl border border-white/[0.08] bg-gradient-to-b from-black/60 to-black/40 overflow-hidden">
      {/* Header */}
      <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-20">
        <h2 className="text-xs sm:text-sm md:text-base font-semibold text-white/90">
          Tech <span className="text-violet-400">Stack</span>
        </h2>
        <p className="text-[8px] sm:text-[9px] text-white/40 mt-0.5">
          Arrastra para rotar • Scroll para zoom
        </p>
      </div>

      {/* Clear filter button */}
      {selectedOrbit && (
        <button
          onClick={() => setSelectedOrbit(null)}
          className="absolute top-2 sm:top-3 right-2 sm:right-3 z-20 px-2 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-medium bg-white/10 border border-white/20 text-white/70 hover:bg-white/20 transition-all"
        >
          ✕ Limpiar
        </button>
      )}

      {/* THREE.JS CANVAS */}
      <Canvas
        camera={{ position: [0, 8, 8], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <Scene
          selectedOrbit={selectedOrbit}
          hoveredTech={hoveredTech}
          onTechHover={setHoveredTech}
        />
      </Canvas>

      {/* Legend filter buttons */}
      <Legend selectedOrbit={selectedOrbit} onSelect={setSelectedOrbit} />
    </div>
  );
};

export default TechOrbit;
