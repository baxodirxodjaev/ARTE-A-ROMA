import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import userIcon from '../../public/icons/person.svg';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const User = () => {
  const { user, logout } = useAuth();

  const [isVisible, setIsVisible] = useState(false);

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center space-y-3"
        >
          <div className="flex items-center gap-2">
            <p className="text-gray-700 text-sm sm:font-medium">Hello, <br /> {user.name}!</p>
          </div>
          <motion.button
            onClick={logout}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow transition-all duration-300"
          >
            Log out
          </motion.button>
        </motion.div>
      ) : (
        <>
          {/* Mobile view: Turn into clean icon menu */}
          <div className="lg:hidden relative group">
            <motion.button
              onClick={()=>setIsVisible((prev)=> !prev)}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="bg-slate-200/25 text-gray-700 p-2 rounded-full shadow"
            >
              <img src={userIcon} alt="User icon" className="w-6 h-6" />
            </motion.button>

            {/* Dropdown menu */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`${!isVisible ? "hidden" : "absolute"}  top-12 right-0 bg-white shadow-lg rounded-md overflow-hidden  transition-opacity duration-300 z-20`}
            >
              <Link
                to="/login"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Sign up
              </Link>
            </motion.div>
          </div>

          {/* Desktop view: beautiful buttons */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden md:flex gap-3"
          >
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Link
                to="/login"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow transition-all duration-300"
              >
                Log in
              </Link>
            </motion.div>

            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Link
                to="/signup"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow transition-all duration-300"
              >
                Sign up
              </Link>
            </motion.div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default User;
