"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, Suspense, memo } from "react";
import * as THREE from "three";

// Ultra-optimized static particle field
const ParticleField = memo(function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Static positions - no animation for max performance
  const positions = useMemo(() => {
    const pos = new Float32Array(60 * 3);
    for (let i = 0; i < 60; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, []);

  // Gentle rotation only
  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={60}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ffffff"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
});

const CoverParticles = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 10], fov: 50 }}
          gl={{ 
            antialias: false, 
            alpha: true, 
            powerPreference: "low-power",
            failIfMajorPerformanceCaveat: true
          }}
          dpr={1}
          frameloop="demand"
          style={{ background: "transparent" }}
        >
          <ParticleField />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default CoverParticles;
