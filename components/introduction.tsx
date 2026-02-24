"use client";
import Image from "next/image";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import AvatarHome from "./avatar-home";

const Introduction = () => {
  return (
    <div className="z-20 w-full bg-darkBg/40 backdrop-blur-sm">
      
      <div className="z-20 grid items-center h-full p-6 py-20 md:py-0 grid-cols-2">
        <AvatarHome />

        <div className="flex flex-col justify-center max-w-md">
          {/* Animated badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full glass border border-emerald-500/30 text-emerald-400">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Disponible para proyectos
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }}
            className="mb-5 text-2xl leading-light text-center md:text-left md:text-4xl md:mb-10"
          >
            <TypeAnimation
              sequence={[
                "Transformo ideas",
                1000,
                "Codifico experiencias",
                1000,
                "Construyo APIs",
                1000,
                "Innovo soluciones",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="block font-bold gradient-text-warm"
            />
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mx-auto mb-2 text-xl md:mx-0 md:mb-8 text-slate-300"
          >
            Desarrollador Full Stack con{" "}
            <span className="font-semibold text-white">+4 años</span> creando 
            aplicaciones innovadoras de principio a fin
          </motion.p>

          {/* Tech stack mini badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-2 mb-6"
          >
            {["React", "Next.js", "Node.js", "Laravel", "TypeScript"].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/30 transition-all cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex items-center justify-center gap-4 md:justify-start"
          >
            <Link
              href="/portafolio"
              className="group relative px-6 py-3 overflow-hidden rounded-xl font-semibold transition-all duration-300
                bg-gradient-to-r from-blue-500 to-violet-500 
                hover:from-blue-400 hover:to-violet-400
                hover:shadow-[0_0_30px_rgba(96,165,250,0.4)]
                hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                Ver Proyectos
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>

            <Link
              href="/about-me"
              className="group relative px-6 py-3 rounded-xl font-semibold transition-all duration-300
                border-2 border-white/20 hover:border-white/40
                bg-white/5 hover:bg-white/10
                hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]
                hover:scale-105"
            >
              <span className="flex items-center gap-2">
                Mi Trayectoria
                <svg className="w-4 h-4 transition-transform group-hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
export default Introduction;
