"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
    filter: "blur(10px)",
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 1.02,
    filter: "blur(10px)",
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const slideVariants = {
  initial: { scaleY: 1 },
  animate: { 
    scaleY: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    }
  },
  exit: { 
    scaleY: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    }
  },
};

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 600);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {/* Transition overlay slides */}
      <AnimatePresence mode="wait">
        {isTransitioning && (
          <>
            {/* Top slide */}
            <motion.div
              key={`slide-top-${pathname}`}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-violet-600 to-violet-900 z-[100] origin-top"
            />
            {/* Bottom slide */}
            <motion.div
              key={`slide-bottom-${pathname}`}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-cyan-600 to-violet-900 z-[100] origin-bottom"
            />
            {/* Center text */}
            <motion.div
              key={`text-${pathname}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 flex items-center justify-center z-[101] pointer-events-none"
            >
              <span className="text-4xl md:text-6xl font-bold text-white/90 tracking-tight">
                {getPageName(pathname)}
              </span>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Page content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          variants={pageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          className="min-h-screen"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

const getPageName = (pathname: string): string => {
  const routes: Record<string, string> = {
    "/": "Inicio",
    "/about-me": "Sobre Mí",
    "/services": "Servicios",
    "/portafolio": "Portafolio",
  };
  return routes[pathname] || "Cargando";
};

export default PageTransition;
