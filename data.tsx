import {
  BookText,
  CodeSquare,
  HomeIcon,
  UserRound,
  Linkedin,
  Twitter,
  Rss,
  Twitch,
  Youtube,
  Crop,
  Pencil,
  Computer,
  Book,
  Rocket,
  Speech,
  GitBranch,
  Gitlab,
  Github,
  DatabaseIcon,
  DockIcon,
} from "lucide-react";

export const socialNetworks = [
  {
    id: 2,
    logo: <Linkedin size={30} strokeWidth={1} />,
    src: "https://www.linkedin.com/in/adrian-castro-241857149/",
  },
  {
    id: 3,
    logo: <Github size={30} strokeWidth={1} />,
    src: "https://github.com/Dev-Drian",
  },
];

export const itemsNavbar = [
  {
    id: 1,
    title: "Home",
    icon: <HomeIcon size={25} color="#fff" strokeWidth={1} />,
    link: "/",
  },
  {
    id: 2,
    title: "User",
    icon: <UserRound size={25} color="#fff" strokeWidth={1} />,
    link: "/about-me",
  },
  {
    id: 3,
    title: "Book",
    icon: <BookText size={25} color="#fff" strokeWidth={1} />,
    link: "/services",
  },
  {
    id: 4,
    title: "Target",
    icon: <CodeSquare size={25} color="#fff" strokeWidth={1} />,
    link: "/portafolio",
  },
];

export const dataAboutPage = [
  {
    id: 1,
    title: "Analista de requerimientos",
    subtitle: "Tecnologico Comfenalco",
    description:
      "Trabaje con un equipo dinámico para analizar y documentar requerimientos clave, asegurando que las soluciones desarrolladas satisfagan las necesidades de nuestros clientes y contribuyan al éxito en un entorno digital en constante evolución.",
    date: "enero 2023",
  },
  {
    id: 2,
    title: "Desarrollador  fullstack ",
    subtitle: "Tecnologico Comfenalco",
    description:
      "Soy un desarrollador Full Stack con experiencia en Laravel y Livewire, especializado en la creación de soluciones web completas, desde el diseño de la arquitectura backend hasta la implementación de interfaces de usuario dinámicas y reactivas. Me enfoco en desarrollar aplicaciones robustas y escalables que ofrezcan una experiencia de usuario fluida y satisfactoria. Mi trabajo abarca todas las etapas del ciclo de vida del desarrollo, asegurando calidad, rendimiento y alineación con los objetivos del cliente.",
    date: "enero 2024",
  },
];

export const dataCounter = [
  {
    id: 0,
    endCounter: 2,
    text: "Años de experiencia",
    lineRight: true,
    lineRightMobile: true,
  },
  {
    id: 1,
    endCounter: 10,
    text: "Clientes satisfechos",
    lineRight: true,
    lineRightMobile: false,
  },
  {
    id: 2,
    endCounter: 4,
    text: "Proyectos finalizados",
    lineRight: false,
    lineRightMobile: false,
  },
];

export const serviceData = [
  {
    icon: <Crop />,
    title: "Desarrollo de Backend",
    description:
      "Desarrollo de backend en lenguajes como PHP, Java, Spring Boot y Laravel.",
  },
  {
    icon: <Pencil />,
    title: "Desarrollo Frontend",
    description:
      "Implementación de interfaces frontend utilizando HTML, CSS y JavaScript, con el uso de frameworks como React y Next.js.",
  },
  {
    icon: <Computer />,
    title: "Desarrollo Fullstack",
    description:
      "Desarrollo fullstack utilizando PHP, Laravel y Livewire para crear aplicaciones web completas y dinámicas.",
  },

  {
    icon: <DatabaseIcon />,
    title: "Gestión de Bases de Datos",
    description:
      "Gestion de bases de datos relacionales utilizando SQL, PostgreSQL y MySQL.",
  },

  {
    icon: <DockIcon />,
    title: "Análisis de Requerimientos",
    description:
      "Especializado en el análisis de requerimientos para entender y documentar las necesidades del cliente.",
  },
];

export const dataPortfolio = [
  {
    id: 1,
    title: "Nova",
    image: "/image-1.jpg",
    urlGithub: "#!",
    urlDemo: "#!",
  },
  {
    id: 2,
    title: "Nova Life",
    image: "/image-2.jpg",
    urlGithub: "https://github.com/Adecas-Eg/Nova_life",
    urlDemo: "#!",
    
  },
  {
    id: 3,
    title: "Ikarus",
    image: "/image-3.jpg",
    urlGithub: "#!",
    urlDemo: "#!",
  },
  
];

