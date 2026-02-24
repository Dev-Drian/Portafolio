"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import MotionTransition from "./transitions-components";
import { socialNetworks } from "@/data";

const Header = () => {
  return (
    <MotionTransition
      positions="bottom"
      className="absolute z-40 inline-block w-full top-5 md:top-10 px-6 md:px-20"
    >
      <header>
        <div className="container justify-between max-w-6xl mx-auto md:flex items-center">
          <Link href="/" className="group">
            <motion.h1 
              className="my-3 text-3xl md:text-4xl font-bold text-center md:text-left"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <span className="text-white/90 group-hover:text-white transition-colors duration-300">Adrian</span>
              <span className="gradient-text">Dev</span>
              <span className="inline-block w-2 h-2 ml-1 bg-blue-400 rounded-full animate-pulse" />
            </motion.h1>
          </Link>
          <div className="flex items-center justify-center gap-4 md:gap-6">
            {socialNetworks.map(({logo, src, id}, index) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Link 
                  href={src} 
                  target="_blank" 
                  className="group relative p-2.5 rounded-full glass border border-white/10 block
                    transition-all duration-300
                    hover:border-blue-400/40 hover:shadow-[0_0_16px_rgba(96,165,250,0.2)]
                    hover:scale-110"
                >
                  <span className="text-slate-400 group-hover:text-white transition-colors">
                    {logo}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </header>
    </MotionTransition>
  );
};
export default Header;
