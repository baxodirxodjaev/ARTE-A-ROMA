import { useState } from "react";
import { useHomePage, updateHomepage } from "../services/dataBaseSecvice";
import HomepageForm from "./HomepageForm";
import Spinner from "./Spinner";
import { Homepage } from "../types";
import { motion, AnimatePresence } from "framer-motion";

const AdminHomepage = () => {
  const { data: homePage, isLoading, refetch } = useHomePage();
  const [editingHomepage, setEditingHomepage] = useState<Homepage | null>(null);

  if (isLoading) return <Spinner />;
  if (!homePage) return <p>No homepage data found.</p>;

  const handleUpdate = async (updatedData: Homepage) => {
    await updateHomepage(updatedData.id, updatedData);
    await refetch();
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-6"
    >
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        🏠 Homepage Content
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {homePage.map((block) => (
          <motion.div
            key={block.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-md rounded-lg p-4 space-y-3 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              {block.homeTitle}
            </h2>
            <p className="text-gray-600 text-sm line-clamp-3">
              {block.homeDescription}
            </p>
            {block.homePoster && (
              <img
                src={block.homePoster}
                alt="Poster"
                className="w-full h-40 object-cover rounded"
              />
            )}
            <button
              className="mt-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
              onClick={() => setEditingHomepage(block)}
            >
              ✏️ Edit Section
            </button>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {editingHomepage && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="mt-10"
          >
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
              ✍️ Edit Homepage Section
            </h2>
            <HomepageForm
              initialData={editingHomepage}
              onSubmit={handleUpdate}
              onClose={() => setEditingHomepage(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default AdminHomepage;
