"use client";

import { useEffect, useState } from "react";

const PageLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Smooth easing - slower at start and end
        const remaining = 100 - prev;
        const increment = Math.max(1, remaining * 0.08);
        return Math.min(prev + increment, 100);
      });
    }, 60);

    // Start exit animation
    const startExit = setTimeout(() => {
      setIsExiting(true);
    }, 2200);

    // Remove loader after exit animation
    const hideLoader = setTimeout(() => {
      setIsLoading(false);
    }, 2800);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(startExit);
      clearTimeout(hideLoader);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-[#030014] flex items-center justify-center overflow-hidden
        transition-all duration-700 ease-out
        ${isExiting ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-40">
        <div 
          className="absolute w-[600px] h-[600px] rounded-full blur-[150px] transition-all duration-[3000ms] ease-out"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
            top: '20%',
            left: '20%',
            transform: `translate(${progress * 0.3}px, ${progress * 0.2}px)`,
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full blur-[120px] transition-all duration-[3000ms] ease-out"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, transparent 70%)',
            bottom: '20%',
            right: '20%',
            transform: `translate(${-progress * 0.2}px, ${-progress * 0.3}px)`,
          }}
        />
      </div>

      <div 
        className={`relative flex flex-col items-center gap-10 transition-all duration-500 ease-out
          ${isExiting ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'}`}
      >
        {/* Elegant logo animation */}
        <div className="relative">
          {/* Outer glow ring */}
          <div 
            className="absolute inset-0 rounded-full blur-xl transition-all duration-500"
            style={{
              background: `conic-gradient(from ${progress * 3.6}deg, rgba(139, 92, 246, 0.4), rgba(6, 182, 212, 0.4), rgba(139, 92, 246, 0.1))`,
              opacity: 0.6,
            }}
          />
          
          {/* Progress ring SVG */}
          <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
            {/* Background track */}
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="rgba(255, 255, 255, 0.03)"
              strokeWidth="1"
            />
            {/* Progress arc */}
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="url(#loaderGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={`${progress * 2.64} 264`}
              className="transition-all duration-300 ease-out"
            />
            <defs>
              <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 8px 32px rgba(139, 92, 246, 0.15)',
              }}
            >
              <span 
                className="text-3xl font-light tracking-tight"
                style={{
                  background: 'linear-gradient(135deg, #c4b5fd 0%, #a78bfa 50%, #67e8f9 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                A
              </span>
            </div>
          </div>
        </div>

        {/* Brand name with elegant typography */}
        <div className="flex flex-col items-center gap-3">
          <h1 
            className="text-3xl font-light tracking-wide"
            style={{
              background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 30%, #a5b4fc 60%, #93c5fd 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            AdrianDev
          </h1>
          <p 
            className="text-[10px] tracking-[0.4em] uppercase"
            style={{ color: 'rgba(255, 255, 255, 0.25)' }}
          >
            Full Stack Developer
          </p>
        </div>

        {/* Minimal progress indicator */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-40 h-px bg-white/[0.03] rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-300 ease-out"
              style={{ 
                width: `${progress}%`,
                background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.5) 0%, rgba(6, 182, 212, 0.5) 100%)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Subtle decorative rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div 
          className="w-[400px] h-[400px] rounded-full border transition-all duration-1000"
          style={{ 
            borderColor: 'rgba(255, 255, 255, 0.02)',
            transform: `scale(${1 + progress * 0.002})`,
          }}
        />
        <div 
          className="absolute inset-12 rounded-full border transition-all duration-1000"
          style={{ 
            borderColor: 'rgba(255, 255, 255, 0.015)',
            transform: `scale(${1 + progress * 0.001})`,
          }}
        />
      </div>
    </div>
  );
};

export default PageLoader;
