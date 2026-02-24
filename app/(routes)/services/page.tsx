"use client";

import CircleImage from "@/components/circle-image";
import SliderServices from "@/components/slider-services";
import TransitionsPage from "@/components/transitions-page";
import { motion } from "framer-motion";

const ServicesPage = () => {
  return (
    <>
      <TransitionsPage />
      <CircleImage />

      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-28 md:py-32">
        <div className="w-full max-w-5xl">
          {/* ── Header ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mb-14 md:mb-20"
          >
            {/* Eyebrow */}
            <span className="inline-block text-[11px] font-mono tracking-[0.25em] uppercase text-blue-300/40 mb-4">
              — Lo que hago
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white/90 leading-[1.1]">
              Construyo software
              <br />
              <span className="gradient-text">que importa.</span>
            </h1>

            <p className="mt-5 text-[15px] text-white/35 max-w-md leading-relaxed">
              Desarrollo soluciones end-to-end con arquitecturas modernas,
              DevOps y automatización inteligente.
            </p>
          </motion.div>

          {/* ── Bento Grid ─────────────────────────── */}
          <SliderServices />
        </div>
      </div>
    </>
  );
};

export default ServicesPage;
