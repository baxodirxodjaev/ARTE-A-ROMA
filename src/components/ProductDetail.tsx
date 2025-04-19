import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {  useProducts } from "../services/dataBaseSecvice";
import { Product } from "../types";
import Spinner from "./Spinner";
import ProductSlider from "./ProductSlider";
import Header from "./Header";
import Footer from "./Footer";
import PageNav from "./PageNav";
// import { useProductActions } from "../hooks/useProductLike";
// import { useAuth } from "../context/AuthContext";
// import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../utils/motionVariants";
import Faq from "./Faq";
import Gallery from "./Gallery";
import Comments from "./Comments";
import AddComment from "./AddComment";

const ProductDetail = () => {
  const { id } = useParams(); 
  const { data: products, isLoading, error } = useProducts();
  // const { likeProductMutation } = useProductActions();
  // const { user } = useAuth();
  
  const [productState, setProductState] = useState<Product | null>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  

  useEffect(() => {
    if (products) {
      const foundProduct = products.find((item) => item.id === id);
      setProductState(foundProduct || null); 
    }
  }, [products, id]);

  if (isLoading) return <Spinner />;
  if (error) return <p>Error in loading items.</p>;
  if (!productState) return <p>Item not found.</p>;

  const {
    name,
    price,
    description,
    images,
    location,
    poster,
    // likes = [], 
    isActive,
    date,
    homeDescription,
    type,
  } = productState;

  // const hasLiked = user && likes.includes(user?.id); 

  // const handleLike = () => {
  //   if (!user) {
  //     toast.error("Please login to put like!", { position: "top-right" });
  //     return;
  //   }

  //   likeProductMutation.mutate({ productId: productState.id, userId: user.id, likes : productState.likes });
  // };

  
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={staggerContainer}
      className="min-h-screen bg-gray-100 w-full"
    >
      <div className="container mx-auto">
        <Header />
        <PageNav />
      </div>

      <div className="container mx-auto p-6">
        {/* poster */}
        <motion.div
          variants={fadeIn("up", 0.2)}
          className="relative mt-8 mx-auto  overflow-hidden rounded-lg shadow-lg"
        >
          <motion.img
            src={poster}
            alt={name}
            onClick={() => setFullscreenImage(poster)}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className={`w-full h-96 md:h-[700px] object-cover transition-transform duration-300 ${
              !isActive ? "grayscale opacity-75" : ""
            }`}
          />
          {!isActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-black/40"
            >
              <p className="text-white text-xl font-semibold">
                This event is currently unavailable
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* name and date */}
        <motion.h1
          variants={fadeIn("up", 0.3)}
          style={{fontFamily: '"Josefin Sans", sans-serif'}}
          className="my-[3rem] text-5xl uppercase font-bold text-center text-gray-700"
        >
          {name}
          <hr />
        </motion.h1>
        <motion.p
          variants={fadeIn("up", 0.4)}
          className="text-start text-gray-600 mt-2 text-2xl"
        >
          {
            type === 'event' &&
            <span>
              📅 {date}
            </span>
          }
           • <strong>Location </strong>:  📍 {location}
        </motion.p>

        {/* description */}
        <motion.div
          variants={fadeIn("up", 0.5)}
          className="mt-6 w-full mx-auto text-center"
        >
          <p className="text-gray-700 text-3xl leading-relaxed italic">
            {description}
          </p>
        </motion.div>

        {/* images of the item */}
        <motion.div
          variants={fadeIn("up", 0.6)}
          className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10 relative"
        >
          {/* Left: Gallery column */}
          <div className="lg:col-span-2 space-y-6 ">
            {images?.map(
              (img, index) =>
                img && (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="overflow-hidden rounded-lg shadow-md transition-transform duration-300"
                  >
                    <img
                      src={img}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-[400px] object-cover rounded-lg"
                      onClick={() => setFullscreenImage(img)}
                    />
                  </motion.div>
                )
            )}
          </div>

          {/* Right: Sticky Info */}
          <div className="lg:sticky lg:top-32 h-fit bg-white rounded-xl shadow-xl p-6 space-y-6">
            <p className="text-gray-700 text-2xl leading-relaxed">
              {homeDescription}
            </p>

            <span className="block text-xl font-semibold underline text-blue-600">
               Price: {price} €
            </span>

            <motion.button
              whileHover={{ scale: isActive ? 1.05 : 1 }}
              whileTap={{ scale: isActive ? 0.95 : 1 }}
              className={`w-full px-6 py-3 rounded-lg text-white font-bold shadow-lg transition-all duration-300 ${
                isActive
                  ? "bg-orange-600 hover:bg-orange-700"
                  : "bg-gray-500 cursor-not-allowed"
              }`}
              disabled={!isActive}
            >
              <a
                href="https://wa.me/393515414198"
                target="_blank"
                rel="noopener noreferrer"
              >
                {isActive ? "Book Now" : "Not Available"}
              </a>
            </motion.button>
          </div>
        </motion.div>

        {/* Slider of products */}
        <div className="flex flex-col gap-[4rem] mt-[4rem]">
          <motion.div variants={fadeIn("up", 1)} >
            <ProductSlider />
          </motion.div>

          {/* all images */}
          <motion.div variants={fadeIn("up", 1)} >
            <Gallery />
          </motion.div>

          {/* all Comments */}
          <motion.div variants={fadeIn("up", 1)} >
            <AddComment/>
            <Comments />
          </motion.div>
        </div>
        
        <Faq/>
      </div>

      {fullscreenImage && (
        <motion.div
          className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setFullscreenImage(null)} 
        >
          <motion.img
            src={fullscreenImage}
            alt="fullscreen"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-[90vw] max-h-[90vh] object-contain shadow-2xl rounded-lg"
            onClick={(e) => e.stopPropagation()} 
          />

          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-5 right-5 text-white text-3xl font-bold hover:scale-110 transition"
          >
            &times;
          </button>
        </motion.div>
      )}


      <Footer />
    </motion.div>
  );
};

export default ProductDetail;
