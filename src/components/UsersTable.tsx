import { useEffect, useState } from 'react';
import { useProducts, useUsers } from '../services/dataBaseSecvice';
import Spinner from './Spinner';
import { Product } from '../types';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useComments } from '../services/commentService';

const UsersTable = () => {
  const { data: users, isLoading: isLoadingUsers, error: errorUsers } = useUsers();
  const { data: products, isLoading : isLoadingProducts, error: errorProduct } = useProducts();
  const {data: comments, isLoading: isLoadingComments, error: errorComments} = useComments();

  const [likedProducts, setLikedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!users || !products) return;

    const userIds = users.map(user => user.id);

    const filteredProducts = products.filter(product =>
      product.likes.some(likeId => userIds.includes(likeId))
    );

    setLikedProducts(filteredProducts);
  }, [users, products]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  if (isLoadingUsers) return <Spinner />;
  if (errorUsers) return <div className="text-red-500 text-center">Error loading users</div>;
  console.log(errorComments, errorProduct, errorUsers);
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto p-6"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold text-gray-800 mb-8 text-center"
      >
        👥 Users Overview
      </motion.h1>

      <div className="overflow-x-auto bg-white shadow-xl rounded-lg">
        <table className="w-full border-collapse text-sm text-gray-700">
          {/* Table Head */}
          <thead className="bg-gradient-to-r from-orange-100 via-pink-100 to-rose-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Created at</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Liked Products</th>
              <th className="px-4 py-3 text-left">Comments</th>
              <th className="px-4 py-3 text-left">Liked Comments</th>
            </tr>
          </thead>

          {/* Table Body */}
          <motion.tbody>
            {users && users.length > 0 ? (
              users.map((user, index) => (
                <motion.tr
                  key={user.id}
                  variants={rowVariants}
                  whileHover={{ scale: 1.01, backgroundColor: '#f9fafb' }}
                  className="transition-all duration-300 border-b border-gray-200"
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 font-semibold">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">
                    {user.createdAt && new Date(user.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 capitalize">{user.role}</td>
                  <td className="px-4 py-3 flex flex-wrap gap-2">
                    {isLoadingProducts ? <span className='animate-pulse duration-150'>Loading...</span> :  likedProducts
                      .filter(prod => prod.likes.includes(user.id))
                      .map(prod => (
                        <Link
                          to={`/product/${prod.type}/${prod.id}`}
                          key={prod.id}
                          className="bg-blue-100/55  text-blue-700 px-2 py-1 rounded-full text-xs hover:bg-blue-200 transition"
                        >
                          {prod.name}
                        </Link>
                      ))}
                    {likedProducts.filter(prod => prod.likes.includes(user.id)).length === 0 && (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                
                {/* user quantity of comments and liked comments */}
                  <td className="px-4 py-3 capitalize">
                    {isLoadingComments ? (
                      <span className="animate-pulse duration-150">Loading...</span>
                    ) : (
                      comments?.filter(com => com.userId === user.id).length ?? 0
                    )}
                  </td>

                  <td className="px-4 py-3">
                    {isLoadingComments ? (
                      <span className="animate-pulse duration-150">Loading...</span>
                    ) : (
                      comments
                        ?.filter(com => com.likes.includes(user.id))
                        .map(com => (
                          <div key={com.id} className="relative group inline-block mr-2">
                            <span className="text-blue-600 text-sm cursor-pointer">{com.userName } <br /> </span>

                            {/* modul of comment */}
                            <div className="absolute z-10 hidden group-hover:flex bg-white text-gray-800 text-xs rounded shadow-md py-2 px-4 w-48 -left-1/2 top-full mt-1 transition-opacity duration-300">
                              {com.text}
                            </div>
                          </div>
                        )) ?? <span className="text-gray-400">—</span>
                    )}
                  </td>

                </motion.tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No users found
                </td>
              </tr>
            )}
          </motion.tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default UsersTable;
