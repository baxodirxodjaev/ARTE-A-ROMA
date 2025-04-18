import { Product } from '../types';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, picks }: { product: Product, picks: boolean }) => {
  const { type, 
    name, 
    price,  
    poster, 
    // likes, 
    isActive, 
    id } = product;

  return (
    <div className="relative  backdrop-blur-lg  rounded-xl overflow-hidden 
      hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out animate-fadeUp">
     
        <Link to={`/product/${type}/${id}`}>
          <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-md">
            <img 
              src={poster} 
              alt={name} 
              className={`w-full h-full object-cover transition-transform duration-300 hover:scale-110
                ${!isActive ? 'grayscale opacity-75' : ''}`} 
                />

            {/* name of product in the cantre of image */}
            <div className={ `${!picks ? 'hidden' : ''} absolute inset-0 flex flex-col justify-center items-center bg-black/40`}>
              <h3 className="text-2xl text-center uppercase font-bold text-white titles">{name}</h3>  
              {/* <p className='ml-4 text-2xl text-white font-bold'>❤️{likes.length}</p> */}
            </div>
          </div>
        </Link>

      {/* Информация о товаре */}
      <div className={`${picks ? 'hidden' : ''} p-4`}>
        <div className="p-4 text-center">
              <h3 className="text-2xl uppercase font-bold text-gray-800 titles">{name}</h3>
              <p className="text-lg text-blue-500 font-medium mt-2">Price: € {price} EURO</p>
              {
                !isActive && <p className="text-red-500 font-medium mt-2">Sorry , this service is not available</p>
              }
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
