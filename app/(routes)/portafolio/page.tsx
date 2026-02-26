"use client";

import CircleImage from "@/components/circle-image";
import ProjectCard3D from "@/components/project-card-3d";
import TransitionsPage from "@/components/transitions-page";
import { dataPortfolio } from "@/data";
import { motion } from "framer-motion";

const PortafolioPage = () => {
  return (
    <>
      <TransitionsPage />
      <CircleImage />

      <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-28 md:py-32">
        <div className="w-full max-w-6xl mx-auto">
          {/* ── Header ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mb-14 md:mb-20 text-center md:text-left"
          >
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block text-[11px] font-mono tracking-[0.25em] uppercase text-violet-400/60 mb-4"
            >
              — Portafolio
            </motion.span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white/90 leading-[1.1]">
              Proyectos que
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient">
                hablan por sí solos.
              </span>
            </h1>

            <p className="mt-5 text-[15px] text-white/35 max-w-md leading-relaxed mx-auto md:mx-0">
              Una selección de trabajos que reflejan mi experiencia en desarrollo Full Stack.
            </p>
          </motion.div>

          {/* ── Projects Grid with 3D Cards ──────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataPortfolio.map((project, index) => (
              <ProjectCard3D key={project.id} project={project} index={index} />
            ))}
          </div>

          {/* ── CTA ────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-16 md:mt-20 pb-8"
          >
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-white/[0.06]" />
              <motion.a
                href="https://wa.me/573248014858?text=Hola%20Adrian%2C%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20hablar%20contigo"
                target="_blank"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-medium
                  rounded-full border border-emerald-400/[0.15] bg-emerald-500/[0.06]
                  text-emerald-300/70 hover:text-emerald-200 hover:border-emerald-400/25
                  transition-all duration-300 hover:shadow-[0_0_20px_rgba(52,211,153,0.12)]"
              >
                Contáctame
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.591-.832-6.32-2.222l-.44-.362-2.893.97.97-2.893-.362-.44A9.935 9.935 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
              </motion.a>
              <div className="h-px flex-1 bg-white/[0.06]" />
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PortafolioPage;
