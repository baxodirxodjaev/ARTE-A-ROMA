import { Product } from '../types';
import { Link } from 'react-router-dom';
import { useProductActions } from '../hooks/useProductLike';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const EventSection = ({ event }: { event: Product[] }) => {
  const { likeProductMutation } = useProductActions();
  const { user } = useAuth();

  const handleLike = (id: string, likes: string[]) => {
    if (!user) {
      toast.error('Please login to put like!', { position: 'top-right' });
      return;
    }

    likeProductMutation.mutate({ id: id, userId: user.id, likes } );
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' },
    }),
  };

  const columns = event.length === 1 ? 'sm:grid-cols-1' 
             : event.length === 2 ? 'sm:grid-cols-2'
             : event.length === 3 ? 'sm:grid-cols-3'
             : 'sm:grid-cols-3'; 

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative w-full mt-6 rounded-2xl py-16 bg-gradient-to-r from-slate-50 via-neutral-50 to-gray-100 overflow-hidden"
    >
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-12"
        >
           Upcoming Events
        </motion.h2>

        <div className={`grid grid-cols-1 ${columns}  gap-10`}>
          {event.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={index}
              className="bg-white shadow-xl rounded-2xl overflow-hidden group hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              {/* Image Block */}
              <div className="relative h-64 md:h-[500px] overflow-hidden">
                <img
                  src={item.poster}
                  alt={item.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
                  <h3 className="text-2xl font-bold text-white">{item.name}</h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col gap-4 text-left">
                <Link to={`/product/${item.type}/${item.id}`}>
                  <h3 className="text-xl font-semibold text-gray-800 hover:text-orange-600 transition">
                    {item.name} ⬅️
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3">{item.description}</p>
                </Link>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleLike(item.id, item.likes)}
                  className="mt-auto w-fit  bg-orange-500 text-white font-bold py-3 px-[3rem] rounded-md shadow hover:bg-orange-600 transition-all duration-300"
                >
                  I like it 😍 {item.likes.length}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default EventSection;
