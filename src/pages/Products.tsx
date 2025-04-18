import { useProducts } from "../services/dataBaseSecvice";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filters";
import { useAppContext } from "../context/AppContext";
import Header from "../components/Header";
import PageNav from "../components/PageNav";
import Spinner from "../components/Spinner";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Products = () => {
  const { data: products, isLoading, error } = useProducts();
  const { state } = useAppContext();

  if (isLoading) return <Spinner />;
  if (error) return <p>Something went wrong</p>;

  let filteredProducts = products;

  // Filter by types
  if (state.filter) {
    filteredProducts = filteredProducts?.filter(p => p.type === state.filter);
  }

  // Filter by availibility
  if (state.availability === "active") {
    filteredProducts = filteredProducts?.filter(p => p.isActive);
  } else if (state.availability === "inactive") {
    filteredProducts = filteredProducts?.filter(p => !p.isActive);
  }

  // search
  if (state.searchQuery.trim()) {
    const query = state.searchQuery.toLowerCase();
    filteredProducts = filteredProducts?.filter(p => p.name.toLowerCase().includes(query));
  }

  // sort by price
  if (state.sortOrder === "asc") {
    filteredProducts = filteredProducts?.sort((a, b) => parseInt(a.price) - parseInt(b.price));
  } else if (state.sortOrder === "desc") {
    filteredProducts = filteredProducts?.sort((a, b) => parseInt(b.price)- parseInt(a.price));
  }

  return (
    <>
      <div className="container mx-auto">
      <Header />
        <PageNav />
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-100 via-white to-pink-100 py-16 text-center mt-6 mb-[3rem]">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4 titles">
          Discover Our Exclusive Collection
        </h1>
        <p className="text-2xl text-gray-600">
          Find the perfect products and services tailored just for you
        </p>
      </section>

      <section className="container mx-auto p-6 mb-[4rem] min-h-screen">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="mb-10">
            <SearchBar />
            <Filter />
          </div>

          {/* Popular Products */}
          <motion.div className="mb-12" initial="hidden" animate="visible" variants={containerVariants}>
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">Popular Picks ✨</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts
                ?.sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0))
                .slice(0, 3)
                .map((product) => (
                  <motion.div key={product.id} variants={itemVariants}>
                    <ProductCard picks={true} product={product} />
                  </motion.div>
              ))}
            </div>
          </motion.div>

          {/* All Products */}
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">All Events 🛍️</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2  gap-8">
              {filteredProducts?.map((product) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard picks={false} product={product} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </>
  );
};

export default Products;
