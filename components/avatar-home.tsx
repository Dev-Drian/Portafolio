import Image from "next/image";
import MotionTransition from "./transitions-components";

const AvatarHome = () => {
  return (
    <div className="relative  ">
      <MotionTransition positions="bottom" className="absolute inset-0 flex items-center justify-center">
        <Image
          src="/image.png"
          priority
          height={400}
          width={400}
          objectFit="cover"
          alt="Profile pic"
          className="rounded-full border border-1"
        />
      </MotionTransition>
    </div>
  );
};

export default AvatarHome;
