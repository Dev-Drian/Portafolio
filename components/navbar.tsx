"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { itemsNavbar } from "@/data";
import MotionTransition from "./transitions-components";

const Navbar = () => {
  const router = usePathname();

  return (
    <MotionTransition positions="right" className="fixed z-40 flex flex-col items-center justify-center w-full mt-auto h-max bottom-4 sm:bottom-6 md:bottom-10 px-4">
      <nav className="flex items-center justify-center gap-0.5 sm:gap-1 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full glass-strong border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
        {itemsNavbar.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.15, y: -4 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className={`relative px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-full cursor-pointer transition-all duration-300
              ${router === item.link 
                ? 'bg-gradient-to-r from-blue-500 to-violet-500 shadow-[0_0_20px_rgba(96,165,250,0.4)]' 
                : 'hover:bg-white/10'}`}
          >
            <Link href={item.link} className="relative z-10">
              {item.icon}
            </Link>
            {router === item.link && (
              <motion.div
                layoutId="navbar-indicator"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.div>
        ))}
      </nav>
    </MotionTransition>
  );
};
export default Navbar;
