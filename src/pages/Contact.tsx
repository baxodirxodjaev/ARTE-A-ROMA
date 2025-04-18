import { motion } from 'framer-motion';
import PageNav from '../components/PageNav';
import Header from '../components/Header';
import Footer from '../components/Footer';
import whatsapp from '../../public/icons/whatsapp-logo-4456.svg';
import instagramm from '../../public/icons/instagram-logo-pink-10678.svg';
import Faq from '../components/Faq';
import Comments from '../components/Comments';
import { fadeIn } from '../utils/motionVariants';
import AddComment from '../components/AddComment';

const Contact = () => {
  return (
    <>
      <section className="container mx-auto min-h-screen flex flex-col pb-6">
        <Header />
        <PageNav />

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="p-6"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-5xl font-bold text-gray-700 text-center mb-8"
          >
            Contact with us
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <form className="flex flex-col gap-6 bg-white shadow-xl py-9 px-8 rounded-lg w-full max-w-lg">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-col gap-4"
              >
                <input
                  className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                  type="email"
                  placeholder="Email"
                />
                <input
                  className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                  type="text"
                  placeholder="Name"
                />
              </motion.div>

              <motion.textarea
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition resize-none"
                placeholder="Message"
                rows={4}
              />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-md bg-green-400 hover:bg-green-500 text-white font-semibold transition"
              >
                Send it
              </motion.button>
            </form>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center mt-12"
        >
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">
            You can find us in the following social media
          </h2>
          <div className="flex justify-center gap-6 mb-6">
            <motion.a
              href="https://www.instagram.com/artea_rome/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <img src={instagramm} alt="Instagram" className="w-12 h-12" />
            </motion.a>
            <motion.a
              href="https://wa.me/393515414198"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <img src={whatsapp} alt="WhatsApp" className="w-12 h-12" />
            </motion.a>
          </div>

          <div className="text-gray-600">
            <p>
              <strong>Email:</strong> artearomainfo@gmail.com
            </p>
            <p>
              <strong>Number:</strong> +393515414198
            </p>
          </div>
        </motion.div>

        <motion.div variants={fadeIn("up", 1)} >
          <AddComment/>
          <Comments />
        </motion.div>
        <Faq/>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
