import { useAppContext } from '../context/AppContext';
import { useProducts } from '../services/dataBaseSecvice';
import { Link } from 'react-router-dom';

const SearchResults = () => {
  const { state } = useAppContext();
  const { data: products, isLoading } = useProducts();

  if (!state.searchQuery.trim()) return null;

  const filteredProducts = products?.filter(product =>
    product.name.toLowerCase().includes(state.searchQuery.toLowerCase())
  );

  if (isLoading) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="bg-white shadow-lg rounded-lg mt-2 max-w-2xl mx-auto p-4">
      {filteredProducts?.length ? (
        filteredProducts.map(product => (
          <Link
            to={`/product/${product.type}/${product.id}`}
            key={product.id}
            className="flex justify-between items-center border-b last:border-none p-2 hover:bg-gray-100 transition"
          >
            <span className="text-gray-800">{product.name}</span>
            {product.poster && (
              <img src={product.poster} alt={product.name} className="w-12 h-12 object-cover rounded-md ml-4" />
            )}
          </Link>
        ))
      ) : (
        <p className="text-center text-gray-500">No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
