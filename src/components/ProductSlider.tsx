import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { useProducts } from "../services/dataBaseSecvice";
import { NextArrow, PrevArrow } from "./Arrows";


const ProductSlider = () => {
    const { data: products, isLoading: isLoadingProducts, error: errorProducts } = useProducts()
  

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 3000, 
    pauseOnHover: true, 
    arrows:  true,
    prevArrow: <PrevArrow onClick={()=>{}}/>,
    nextArrow: <NextArrow onClick={()=>{}}/>,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

   if( isLoadingProducts ) return <span className="text-3xl font-bold animate-pulse duration-200">Loading similar products...</span>;
   if( errorProducts ) return <p>Error...</p>;

  return (
    <div className="mx-auto py-10  ">
      <h2 className="text-3xl font-bold text-center text-slate-700 mb-6">You may also like</h2>
      <Slider {...settings}>
        {products && products.map((product) => (
        <Link to={`/product/${product.type}/${product.id}`} key={product.id}>
          <div className="px-4">
            <div
              className={`relative overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300 ${
                !product.isActive ? "grayscale opacity-75" : ""
              }`}
            >
              {/* image */}
              <img
                src={product.poster}
                alt={product.name}
                className="w-full h-64 object-cover"
                />

              {/* imformation */}
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4 text-white">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="text-sm">{product.location}</p>
                <div className="flex justify-between mt-2">
                  {!product.isActive && (
                      <span className="text-sm bg-red-500 px-2 py-1 rounded">
                      Not Available
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Link>
        ))}
      </Slider>
    </div>
  );
};

export default ProductSlider;
