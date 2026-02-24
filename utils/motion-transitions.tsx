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

export const fadeIn = (positions: string) => {
  return {
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.8,
        delay: 0.2,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    hidden: {
      y: positions === "botton" ? -60 : 0,
      x: positions === "righ" ? -60 : 0,
      opacity: 0,
      transition: {
        type: "tween",
        duration: 0.6,
        delay: 0.1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };
};
