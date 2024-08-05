import AvatarPortafolio from "@/components/avatar-portafolio";
import CircleImage from "@/components/circle-image";
import ContainerPage from "@/components/container";
import PortafolioBox from "@/components/portafolio-box";
import TransitionsPage from "@/components/transitions-page";
import { dataPortfolio } from "@/data";

const PortafolioPage = () => {
  return (
    <ContainerPage>
      <TransitionsPage />
      <AvatarPortafolio />
      <CircleImage />
      <div className="flex flex-col justify-center h-full">
        <h1 className="text-2xl leading-tight text-center md:text-4xl md:mb-5">
          Mis ultimos{" "}
          <span className=" text-secondary font-bold">trabajos realizados</span>
        </h1>

        <div className="relative z-10 grid max-w-5xl 
        sm:grid-cols-2 gap-6 mx-auto mt-4 md:grid-cols-4">
          {dataPortfolio.map((data) => (
            <PortafolioBox key={data.id}  data={data} />
          ))}
        </div>
      </div>
    </ContainerPage>
  );
};

export default PortafolioPage;
