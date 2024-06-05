import Image from "next/image";
import MotionTransition from "./transitions-components";

const AvatarServices = () => {
  return (
    <MotionTransition
      positions="right"
      className="bottom-0 left-0 hidden md:inline-block md:absolute"
    >
        <Image src="/services.png" width={300} height={300} className="w-[300px] h-full" alt="Avatar" />
    </MotionTransition>
  );
};

export default AvatarServices;
