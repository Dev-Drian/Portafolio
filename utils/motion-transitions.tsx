export const transitionVariantsPage = {
  initial: {
    x: "100%",
    with: "100%",
  },
  animate: {
    x: "0%",
    with: "0%",
  },
  exit: {
    x: ["0%", "100%"],
    with: ["0%", "100%"],
  },
};

//esto es lo que hace que el comportaminto cambiue el cual se lo pasamso de tesnasitons
export const fadeIn = (positions: string) => {
  return {
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 1.4,
        delay: 0.5,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
    hidden: {
      y: positions === "botton" ? -80 : 0,
      x: positions === "righ" ? -80 : 0,
      opacity: 0,
      transition: {
        type: "tween",
        duration: 1.4,
        delay: 0.5,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};
