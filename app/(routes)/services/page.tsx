import AvatarServices from "@/components/avatar-services";
import CircleImage from "@/components/circle-image";
import SliderServices from "@/components/slider-services";
import TransitionsPage from "@/components/transitions-page";

const ServicesPage = () => {
  return (
    <>
      <TransitionsPage />
      <CircleImage />
      <AvatarServices />
      <div
        className="grid items-center justify-center h-screen 
      max-w-5xl gap-6 mx-auto md:grid-cols-2 "
      >
        <div className="max-w-[450px] md:p-20">
          <h1 className="text-2xl leading-tight text-center md:text-left md:text-4xl md:mb-5">
            Mis <span className="font-bold text-secondary"> Servicios</span>
            <p className="mb-3 text-xl text-gray-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
              impedit error, adipisci nesciunt rerum est commodi totam harum
              dolorum sint hic excepturi quam! Labore magni error doloribus cum
              saepe totam.
            </p>
            <button className="px-3 py-2 rounded-lg bg-secondary hover:bg-secondary/65"> Contactame</button>
          </h1>
        </div>

        {/* slider */}

        <div>
          <SliderServices/>
        </div>
      </div>
    </>
  );
};

export default ServicesPage;
