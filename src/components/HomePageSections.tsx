import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Homepage } from "../types";

export default function HomeHeroSection({
  homepage,
  bgElementImg,
}: {
  homepage: Homepage;
  bgElementImg: string;
}) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  };

  if (!homepage) return null;

  return (
    <section
      ref={ref}
      className="relative w-full min-h-[100vh] flex flex-col md:flex-row items-center justify-center px-4 py-10 md:py-20 overflow-hidden"
    >
      {/* Decorative Background Image Behind Text */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <img
          src={bgElementImg}
          alt="Decorative element"
          className="absolute left-0 top-[20%] w-[400px] md:w-[600px] opacity-30 md:opacity-40 z-0"
        />
      </div>

      {/* Left: Text Content */}
      <motion.div
        className="w-full md:w-1/2 flex flex-col justify-center items-start z-10 relative"
        variants={textVariants}
        initial="hidden"
        animate={controls}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 mb-[2rem] md:mb-[6rem] leading-tight">
          {homepage?.homeTitle}
        </h1>
        <p className="text-gray-600 text-base sm:text-lg md:text-xl lg:text-4xl max-w-xl">
          {homepage?.homeDescription}
        </p>
      </motion.div>

      {/* Right: Image */}
      <motion.div
        className="w-full md:w-1/2 mt-8 md:mt-0 flex justify-center items-center z-10"
        variants={imageVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="overflow-hidden rounded-lg shadow-xl h-[88vh] w-full">
          <img
            src={homepage?.homePoster}
            alt={homepage?.homeTitle}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </motion.div>
    </section>
  );
}
