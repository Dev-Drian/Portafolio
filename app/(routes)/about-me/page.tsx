"use client";

import TransitionsPage from "@/components/transitions-page";
import ContainerPage from "@/components/container";
import Avatar from "@/components/avatar";
import CounterServices from "@/components/counter-services";
import TimeLine from "@/components/timeline";
import { motion } from "framer-motion";

const PageAboutMe = () => {
  return (
    <>
      <TransitionsPage />
      <ContainerPage>
        <Avatar />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <h1 className="text-2xl leading-tight text-center md:text-left md:text-5xl md:mt-10">
            Toda mi{" "}
            <span className="font-bold gradient-text">
              Trayectoria Profesional
            </span>
          </h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "120px" }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="h-1 mt-4 rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-blue-400 mx-auto md:mx-0"
          />
        </motion.div>

        <CounterServices />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <TimeLine />
        </motion.div>

        {/* ── CTA Contáctame ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 md:mt-20"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-white/[0.06]" />
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-white/25">Contacto</span>
            <div className="h-px flex-1 bg-white/[0.06]" />
          </div>

          <div className="text-center">
            <p className="text-white/40 text-sm mb-2">¿Te gustó lo que viste?</p>
            <h3 className="text-xl md:text-2xl font-bold text-white/90 mb-6">
              Trabajemos <span className="gradient-text">juntos</span>
            </h3>
            <motion.a
              href="https://wa.me/573248014858?text=Hola%20Adrian%2C%20vi%20tu%20trayectoria%20y%20me%20gustar%C3%ADa%20hablar%20contigo"
              target="_blank"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 px-7 py-3 text-sm font-semibold
                rounded-full bg-emerald-500/15 border border-emerald-400/20
                text-emerald-300 hover:text-emerald-200 hover:border-emerald-400/35
                transition-all duration-300 hover:shadow-[0_0_25px_rgba(52,211,153,0.15)]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.591-.832-6.32-2.222l-.44-.362-2.893.97.97-2.893-.362-.44A9.935 9.935 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              Contáctame por WhatsApp
            </motion.a>
          </div>
        </motion.div>
      </ContainerPage>
    </>
  );
};
export default PageAboutMe;
