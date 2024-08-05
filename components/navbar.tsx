"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { itemsNavbar } from "@/data";

import MotionTransition from "./transitions-components";

const Navbar = () => {
  const router = usePathname();

  return (
    <MotionTransition positions="right" className="fixed z-40 flex flex-col items-center justify-center w-full mt-auto h-max bottom-10">
      <nav className="flex items-center justify-center gap-0px-4 py-1 rounded-full bg-white/15 background-blulr-sm">
        {itemsNavbar.map((item) => (
          <div
            key={item.id}
            className={ `px-3 py-2 transition duration-150 rounded-full cursor-pointer hover:bg-slate-500   hover:text-black
            ${router === item.link && 'bg-slate-500'}` }
          >
            <Link  href={item.link}> {item.icon}  </Link>
          </div>
        ))}
      </nav>
    </MotionTransition>
  );
};
export default Navbar;
