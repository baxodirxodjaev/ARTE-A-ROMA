import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import phone from '../../public/icons/phone-call.png'
import email from '../../public/icons/gmail.png'
import { motion } from 'framer-motion'
import whatsapp from '../../public/icons/whatsapp-logo-4456.svg';
import instagramm from '../../public/icons/instagram-logo-pink-10678.svg';


const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && footerRef.current) {
          footerRef.current.classList.add('animate-fade-in')
        }
      },
      { threshold: 0.1 }
    )
    if (footerRef.current) observer.observe(footerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <footer
      ref={footerRef}
      className='bg-gradient-to-r from-[#1f1f1f] to-[#2c2c2c] text-white shadow-inner relative overflow-hidden backdrop-blur-sm'
    >
      {/* Subtle Noise Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-10 pointer-events-none" />

      <div className='container mx-auto px-8 py-14 relative z-10'>
        <div className='flex flex-wrap items-start justify-between gap-12'>
          {/* Contact Block */}
          <div className='max-w-sm'>
            <h3 className='text-3xl font-semibold font-mono mb-4'>Questions?</h3>
            <p className='text-gray-400 italic mb-6'>
              We'll be more than happy to help!<br /> Feel free to contact us at:
            </p>
            <div className='space-y-3 text-gray-300'>
              <p className='flex items-center gap-3 hover:text-white transition duration-300'>
                <img src={email} alt="mail" className='w-5 h-5 opacity-70' />
                <strong>artearomainfo@gmail.com</strong>
              </p>
              <p className='flex items-center gap-3 hover:text-white transition duration-300'>
                <img src={phone} alt="phone" className='w-5 h-5 opacity-70' />
                <strong>+393515414198</strong>
              </p>
            </div>
          </div>

          {/* Policies Block */}
          <div>
            <h2 className='uppercase text-3xl font-mono mb-6 border-b-2 border-gradient-to-r from-purple-400 via-pink-500 to-red-500 pb-2'>
              Our Policies
            </h2>
            <ul className='space-y-4 text-slate-400'>
              {['Refund Policy', 'Privacy Policy', 'Terms and Conditions'].map((policy) => (
                <li key={policy} className='group'>
                  <Link
                    to={`/policies/${policy.toLowerCase().replace(/\s/g, '-')}`}
                    className='hover:text-white transition duration-300 group-hover:pl-1'
                  >
                    {policy}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h2 className='uppercase text-3xl font-mono mb-6 border-b-2 border-gradient-to-r from-purple-400 via-pink-500 to-red-500 pb-2'>
              Follow Us
            </h2>
            <div className="flex items-center justify-center gap-6 mb-6">
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
          </div>
        </div>

        {/* Divider */}
        <div className='mt-12 border-t border-gradient-to-r from-purple-400 via-pink-500 to-red-500 pt-6 text-center text-gray-500'>
          <p>All rights reserved © 2025</p>
        </div>
      </div>

      {/* Animation class */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 1.2s ease-out forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .glow-hover:hover {
          filter: drop-shadow(0 0 6px rgba(255, 99, 211, 0.7));
        }
      `}</style>
    </footer>
  )
}

export default Footer
