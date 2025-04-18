import PageNav from '../components/PageNav'
import Footer from '../components/Footer'
import { useHomePage, useProducts } from '../services/dataBaseSecvice'
import Spinner from '../components/Spinner'
import HomePageSections from '../components/HomePageSections'
import styles from './HomePage.module.css'
import HeroSection from '../components/HeroSection'
import AddComment from '../components/AddComment'
import Comments from '../components/Comments'
import ProductSlider from '../components/ProductSlider'
import GallerySlider from '../components/GallerySlider'
import EventSection from '../components/EventSection'
import { useEffect, useState } from 'react'
import { Product,  } from '../types'
import Faq from '../components/Faq'
import WhatsappInstagram from '../components/WhatsappInstagram'
import { motion } from 'framer-motion'

const HomePage = () => {
  const { data: products, isLoading: isLoadingProducts, error: errorProducts } = useProducts()
  const { data: homepage, isLoading: isLoadingHome, error: errorHome } = useHomePage()

  const [events, setEvents] = useState<Product[]>([])

  useEffect(() => {
    if (products) {
      const filteredEvents = products.filter((product) => product.type === 'event' && product.isActive === true)
      setEvents(filteredEvents)
    }
  }, [products])

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  if (isLoadingProducts || isLoadingHome ) return <Spinner />
  if (errorProducts || errorHome ) {
    return <p>{errorProducts?.message || errorHome?.message }</p>
  }

  if (!products || !homepage ) return <Spinner />

  return (
    <section className="min-h-screen w-full ">
      <div className='fixed right-[1.2rem] top-9/12 z-50'>
        <WhatsappInstagram/>
      </div>

      <div className="bg-white pb-6 w-full">
        <HeroSection />
        <div className="container mx-auto px-6 pb-6">
          <PageNav />
          {events.length > 0 && <EventSection event={events} />}
          {homepage[1] && <HomePageSections homepage={homepage[1]} />}
          {homepage[3] && <HomePageSections homepage={homepage[3]} />}
        </div>
      </div>


      {homepage[4] && homepage[4] && (
        <section className={`${styles['scroll-section']} `}>
          <motion.div 
            variants={cardVariants}
            className={`${styles['scroll-content']} `}>
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 mb-[3rem] titles leading-tight">{homepage[4].homeTitle}</h3>
            <p className="md:text-2xl text-slate-700">{homepage[4].homeDescription}</p>
          </motion.div>
          <img
            className={styles['scroll-image']}
            src={homepage[4].homePoster}
            alt={homepage[4].homeTitle}
          />
        </section>
      )}


      <div className="w-full p-5 bg-gray-100">
        <div className="container mx-auto w-full">
          {homepage[0] && <HomePageSections homepage={homepage[0]} />}
          <GallerySlider  />
          <ProductSlider  />
          <AddComment />
          <Comments />
          <Faq/>
        </div>
      </div>

      <Footer />
    </section>
  )
}

export default HomePage
