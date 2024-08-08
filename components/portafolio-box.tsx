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
    <div className=" p-4 border border-teal-50 rounded-xl">
      <h3 className="mb-4 text-xl">{title}</h3>
      <Image
        src={image}
        alt="Image product"
        width={200}
        height={200}
        className="w-full md:w-[200px] rounded-2xl h-auto"
      />
      <div className="flex gap-5 mt-5">
        <Link
          href={urlGithub}
          target="_blank"
          className="p-2 transition rounded-lg duration-150 bg-slate-500 hover:bg-slate-500/80"
        >
          Git
        </Link>
        <Link
          href={urlDemo}
          target="_blank"
          className="p-2 transition rounded-lg duration-150 bg-[#f5741c] hover:bg-[#f5741c]/80"
        >
          {" "}
          Demo
        </Link>
      </div>
    </div>
  );
};

export default PortafolioBox;
