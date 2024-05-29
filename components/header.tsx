import Link from "next/link";
import MotionTransition from "./transitions-components";

const Header = () => {
  return (
    <MotionTransition
      positions="bottom"
      className="absolute z-40 inline-block w-full top-5 md:top-10"
    >
      <header>
        <div className="container justify-between max-w-6xl mx-auto md:flex">
          <Link href="/">AdrianDev</Link>
        </div>
      </header>
    </MotionTransition>
  );
};
export default Header;