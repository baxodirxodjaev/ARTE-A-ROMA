import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import PageNav from "../components/PageNav";
import UsersTable from "../components/UsersTable";
import AdminProducts from "../components/AdminProducts";
import AdminHomepage from "../components/AdminHomepage";
import AdminGallery from "../components/AdminGallery";
import { useReducer } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface initState {
  page: string;
}

type Action =
  | { type: "PRODUCTS" }
  | { type: "HOMEPAGE" }
  | { type: "GALLERY" };

const initialState: initState = {
  page: "products",
};

const reducer = (state: initState, action: Action) => {
  switch (action.type) {
    case "PRODUCTS":
      return { ...state, page: "products" };
    case "HOMEPAGE":
      return { ...state, page: "homepage" };
    case "GALLERY":
      return { ...state, page: "gallery" };
    default:
      return state;
  }
};

const AdminPanel = () => {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(reducer, initialState);

  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  const tabs = [
    { name: "Show All Products", type: "PRODUCTS" },
    { name: "Home Page Details", type: "HOMEPAGE" },
    { name: "All Gallery", type: "GALLERY" },
  ];

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
  };

  return (
    <section className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-6">
        <PageNav />
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold my-8 text-center text-gray-800"
        >
          ⚙️ Admin Panel
        </motion.h1>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {tabs.map((tab) => (
            <motion.button
              key={tab.type}
              onClick={() => dispatch({ type: tab.type as Action["type"] })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2 rounded-lg text-sm font-medium shadow-md transition-all ${
                state.page === tab.type.toLowerCase()
                  ? "bg-orange-500 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-orange-100"
              }`}
            >
              {tab.name}
            </motion.button>
          ))}
        </div>

        {/* Users Table */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          className="mb-12"
        >
          <UsersTable />
        </motion.div>

        <hr className="my-6" />

        {/* Dynamic Components with animation */}
        <AnimatePresence mode="wait">
          {state.page === "products" && (
            <motion.div
              key="products"
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <AdminProducts />
            </motion.div>
          )}
          {state.page === "homepage" && (
            <motion.div
              key="homepage"
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <AdminHomepage />
            </motion.div>
          )}
          {state.page === "gallery" && (
            <motion.div
              key="gallery"
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <AdminGallery />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AdminPanel;
