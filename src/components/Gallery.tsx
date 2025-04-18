import { useGallerySlider } from '../services/dataBaseSecvice';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';

const Gallery = () => {
  const { data: gallery, isLoading: isLoadingGallery, error: errorGallery } = useGallerySlider();

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openLightbox = (image: string) => {
    setSelectedImage(image);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedImage(null);
  };

  if (isLoadingGallery) return <p className="text-center text-gray-500">Loading gallery...</p>;
  if (errorGallery) return <p className="text-center text-red-500">Error loading gallery</p>;

  return (
    <section className="container mx-auto px-6 py-12">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold text-center text-slate-700 mb-12"
      >
        Our Gallery
      </motion.h2>

      <div
        ref={ref}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {gallery &&
          gallery.map((item, index) => (
            <motion.div
              key={index}
              className="overflow-hidden rounded-lg shadow-lg group relative cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => openLightbox(item.image)}
            >
              <motion.img
                src={item.image}
                alt={`Gallery image ${index}`}
                className="object-cover w-full h-64 md:h-[450px] transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <p className="text-white text-lg font-medium">View Image</p>
              </div>
            </motion.div>
          ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src={selectedImage}
              alt="Selected"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-full max-h-full rounded-lg shadow-xl"
            />
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white bg-gray-800 bg-opacity-70 hover:bg-opacity-100 p-3 rounded-full shadow-lg transition"
            >
              ❌
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
