import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { useGallerySlider } from '../services/dataBaseSecvice';
import { NextArrow, PrevArrow } from './Arrows';




const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

const GallerySlider = () => {
    const { data: gallery, isLoading: isLoadingGallery, error: errorGallery } = useGallerySlider()
  

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1600,
        cssEase: "ease-in-out",
        fade: true,
        arrows: true,
        prevArrow: <PrevArrow onClick={()=>{}}/>,
        nextArrow: <NextArrow onClick={()=>{}}/>,
        // responsive: [
        //   {
        //     breakpoint: 1024,
        //     settings: { slidesToShow: 2, slidesToScroll: 1 },
        //   },
        //   {
        //     breakpoint: 768,
        //     settings: { slidesToShow: 1, slidesToScroll: 1 },
        //   },
        // ],
      };


    if(isLoadingGallery) return <span className=' text-3xl text-yellow-600 font-bold animate-pulse duration-200'> loading images...</span>
    if(errorGallery) return <p> Something went wrong</p>

  return (
    <section className="flex flex-col justify-center my-[4rem] ">
    <motion.h2
      className="text-4xl font-extrabold text-center mb-7 text-slate-700"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      Gallery
    </motion.h2>
    <motion.p 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className=' text-gray-600 text-2xl font-bold mb-10 text-center'>
      Follow us on Instagram ⬇️
    </motion.p>
    <motion.div
      className=" mx-auto w-full"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <Slider {...settings} className="rounded-3xl  ">
        {gallery &&
          gallery.map((item, index) => (
            <motion.div
              key={index}
              className="w-full h-[500px] md:h-[900px] rounded-3xl overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              
              <a href="https://www.instagram.com/artea_rome/" target="_blank" rel="noopener noreferrer">
                <motion.img
                  className="h-full w-full object-cover"
                  src={item.image}
                  alt={`Gallery ${index}`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
              </a>
            </motion.div>
          ))}
      </Slider>
    </motion.div>
  </section>
  )
}

export default GallerySlider