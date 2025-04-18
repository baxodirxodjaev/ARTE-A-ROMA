import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import PageNav from '../components/PageNav'
import Footer from '../components/Footer'

const Policy = () => {
  return (
    <>
      <section className='container mx-auto'>
        <Header/>
        <PageNav/>
        <Outlet/>
      </section>
      <Footer/>
    </>
  )
}

export default Policy