"use client";

// Fixed star positions to avoid hydration mismatch
const STARS = [
  { x: 15, y: 10, size: 1.2, opacity: 0.4 },
  { x: 85, y: 15, size: 0.8, opacity: 0.3 },
  { x: 45, y: 25, size: 1.5, opacity: 0.5 },
  { x: 70, y: 35, size: 1.0, opacity: 0.35 },
  { x: 25, y: 45, size: 0.9, opacity: 0.4 },
  { x: 90, y: 55, size: 1.3, opacity: 0.45 },
  { x: 10, y: 65, size: 1.1, opacity: 0.3 },
  { x: 55, y: 75, size: 0.7, opacity: 0.35 },
  { x: 35, y: 85, size: 1.4, opacity: 0.4 },
  { x: 75, y: 90, size: 1.0, opacity: 0.5 },
  { x: 5, y: 30, size: 0.9, opacity: 0.3 },
  { x: 95, y: 70, size: 1.2, opacity: 0.4 },
];

const InteractiveBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030014] via-[#050520] to-[#030014]" />

      {/* Static nebula effects */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full opacity-10 blur-[80px]"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)",
          left: "10%",
          top: "20%",
        }}
      />
      <div 
        className="absolute w-[400px] h-[400px] rounded-full opacity-10 blur-[60px]"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)",
          right: "5%",
          bottom: "10%",
        }}
      />

      {/* Fixed position stars */}
      {STARS.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
          }}
        />
      ))}

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, transparent 0%, rgba(3, 0, 20, 0.5) 100%)",
        }}
      />
    </div>
  );
};

export default InteractiveBackground;
