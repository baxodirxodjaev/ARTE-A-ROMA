import { motion } from 'framer-motion'
import whatsapp from '../../public/icons/whatsapp-logo-4456.svg';
import instagramm from '../../public/icons/instagram-logo-pink-10678.svg';



const WhatsappInstagram = () => {
  return (
    <div className="flex flex-col-reverse justify-center gap-6 mb-6">
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
  )
}

export default WhatsappInstagram