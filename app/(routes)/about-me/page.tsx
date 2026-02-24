"use client";

import TransitionsPage from "@/components/transitions-page";
import ContainerPage from "@/components/container";
import Avatar from "@/components/avatar";
import CounterServices from "@/components/counter-services";
import TimeLine from "@/components/timeline";
import { motion } from "framer-motion";

const PageAboutMe = () => {
  return (
    <>
      <TransitionsPage />
      <ContainerPage>
        <Avatar />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <h1 className="text-2xl leading-tight text-center md:text-left md:text-5xl md:mt-10">
            Toda mi{" "}
            <span className="font-bold gradient-text">
              Trayectoria Profesional
            </span>
          </h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "120px" }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="h-1 mt-4 rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-blue-400 mx-auto md:mx-0"
          />
        </motion.div>

        <CounterServices />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <TimeLine />
        </motion.div>
      </ContainerPage>
    </>
  );
};
export default PageAboutMe;
