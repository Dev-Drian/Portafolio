import Image from "next/image";
import Link from "next/link";

interface PortafolioBoxProps {
  data: {
    id: number;
    title: string;
    image: string;
    urlGithub: string;
    urlDemo: string;
  };
}

const PortafolioBox = (props: PortafolioBoxProps) => {
  const { data } = props;
  const { id, title, image, urlGithub, urlDemo } = data;
  return (
    <div className=" p-4 border border-teal-50 rounded-xl ">
      <h3 className="mb-4 text-xl font-bold">{title}</h3>
      <Image
        src={image}
        alt="Image product"
        width={200}
        height={200}
        className="w-full md:w-[200px] rounded-2xl h-auto "
      />
      <div className="flex gap-5 mt-5  justify-end">
        <Link
          href={urlGithub}
          target="_blank"
          className="px-3 py-2 transition-all   align-middle  border-2 cursor-pointer text-secondary border-secondary text-md w-fit rounded-xl hover:shadow-xl hover:shadow-secondary"
        >
          Git
        </Link>
       
      </div>
    </div>
  );
};

export default PortafolioBox;
