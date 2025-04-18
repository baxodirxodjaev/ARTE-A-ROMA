export const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };
  
  export const fadeIn = (direction = "up", delay = 0) => {
    const variants = {
      hidden: {
        y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
        opacity: 0,
      },
      show: {
        y: 0,
        opacity: 1,
        transition: {
          delay,
          duration: 0.6,
          ease: "easeOut",
        },
      },
    };
    return variants;
  };
  