import { Link } from 'react-router-dom'
import logoImg from '../../public/icons/art-LOGO.png'


const Logo = () => {
  return (
        <h1 className='w-[7rem] h-[7rem] md:w-[11rem] md:h-[11rem] rounded-[50%] overflow-hidden '>
            <Link to={'/'} >
              <img src={logoImg} alt="Logo" className='w-full h-full object-cover '/>
            </Link>
        </h1>
  )
}

export default Logo