"use client";
import Image from "next/image";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import AvatarHome from "./avatar-home";

const Introduction = () => {
  return (
    <div className="z-20 w-full bg-darkBg/60">
      
      <div className="z-20 grid items-center h-full p-6 py-20 md:py-0 grid-cols-2">
        <AvatarHome></AvatarHome>

        <div className="flex flex-col justify-center max-w-md">
          <h1 className="mb-5 text-2xl leading-light text-center md:text-left md:text-4xl md:mb-10">
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
              className="block font-bold text-secondary"
            />

          </h1>
          <p className="mx-auto mb-2 text-xl md:mx-0 md:mb-8">
            Desarrollador full-stack creando aplicaciones innovadoras de
            principio a fin
          </p>
          <div className="flex item-center justify-center gap-3 md:justify-start md:gap-10">
            <Link
              href="/projects"
              className="px-3 py-2 transition-all border-2 cursor-pointer text-md w-fit bg-slate-950 rounded-xl hover:shadow-xl hover:shadow-red-500"
            >
              Projects
            </Link>
            <Link
              href="/PROJECTS"
              className="px-3 py-2 transition-all border-2 cursor-pointer text-secondary border-secondary text-md w-fit rounded-xl hover:shadow-xl hover:shadow-secondary"
            >
              Contacta conmigo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Introduction;
