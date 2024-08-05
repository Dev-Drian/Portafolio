"use client"
import Image from "next/image";
import MotionTransition from "./transitions-components";

const AvatarPortafolio = () => {
    return (
        <MotionTransition positions="bottom" className="bottom-0 left-0 hidden md:inline-block md:absolute">
            <Image src="/avatar-works.png" width={300} height={300} className="w-full h-full" alt="Avatar portafolio"/>

        </MotionTransition>
      );
      
}
 
export default AvatarPortafolio;