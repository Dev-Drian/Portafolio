import Image from "next/image";
import MotionTransition from "./transitions-components";

const Avatar = () => {
  return (
    <MotionTransition
      positions="bottom"
      className="bottom-0 right-0 hidden md:inline-block md:absolute"
    >
      <Image
        src="/avatar-1.png"
        width={400}
        height={400}
        className="w-full h-full"
        alt="Avatar"
      />
       
     
    </MotionTransition>
  );
};

export default Avatar;
