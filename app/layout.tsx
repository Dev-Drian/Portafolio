import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Navbar from "@/components/navbar";
import Header from "@/components/header";
import PageLoader from "@/components/page-loader";
import InteractiveBackground from "@/components/interactive-background";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AdrianDev | Full Stack Developer",
  description: "Portafolio profesional de Adrian Castro - Desarrollador Full Stack especializado en Laravel, Vue.js, React y más",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={urbanist.className}>
        <PageLoader />
        <InteractiveBackground />
        <div className="relative z-10">
          {children}
        </div>
        <Navbar/>
        <Header/>
      </body>
    </html>
  );
}
