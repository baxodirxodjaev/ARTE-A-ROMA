import { Link } from 'react-router-dom';
import { Product } from '../types';
import { motion } from 'framer-motion';

interface ProductListProp {
  products: Product[];
  onEdit: (value: Product) => void;
  onDelete: (id: string) => void;
}

const ProductList = ({ products, onEdit, onDelete }: ProductListProp) => {
  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const card = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
    >
      {products.map((product) => (
        <motion.div
          key={product.id}
          variants={card}
          whileHover={{ scale: 1.03 }}
          className="bg-white shadow-xl rounded-xl overflow-hidden p-6 flex flex-col justify-between hover:shadow-2xl transition-all duration-300"
        >
          {/* name of the product */}
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">{product.name}</h3>

          {/* description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {product.description.slice(0, 200)}...
          </p>

          {/* type */}
          <p className="text-xs text-gray-400 mb-6">Type: {product.type}</p>

          {/*  */}
          <div className="flex flex-wrap gap-3 mt-auto">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onEdit(product)}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded transition-all duration-300"
            >
              ✏️ Edit
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onDelete(product.id)}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded transition-all duration-300"
            >
              🗑 Delete
            </motion.button>

            <Link
              to={`/product/${product.type}/${product.id}`}
              className="flex-1 bg-sky-400 hover:bg-sky-500 text-white text-center px-3 py-2 rounded transition-all duration-300"
            >
              See the item
            </Link>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProductList;
