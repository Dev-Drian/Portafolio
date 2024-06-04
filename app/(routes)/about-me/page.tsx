import TransitionsPage from "@/components/transitions-page";

import ContainerPage from "@/components/container";
import Avatar from "@/components/avatar";
import CounterServices from "@/components/counter-services";
import TimeLine from "@/components/timeline";

const PageAboutMe = () => {
  return (
    <>
      <TransitionsPage />
      <ContainerPage>
        <Avatar />

        <h1 className="text-2xl leanding-light text-center  md:text-left md:text-5xl md:mt-10">
          {" "}
          Toda mi{" "}
          <span className="font-bold text-secondary">
            Trayectoria Profesional
          </span>
        </h1>
        <CounterServices />

        <TimeLine />
      </ContainerPage>
    </>
  );
};
export default PageAboutMe;
