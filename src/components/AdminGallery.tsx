import { useState } from "react";
import { useGallerySlider } from "../services/dataBaseSecvice";
import { addGalleryItem, deleteGalleryItem } from "../services/dataBaseSecvice";
import Spinner from "./Spinner";
import GalleryForm from "./GalleryForm";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const AdminGallery = () => {
  const { data: gallery, error, isLoading, refetch } = useGallerySlider();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (isLoading) return <Spinner />;
  if (error) return <div className="text-red-500 text-center">Something went wrong</div>;

  const handleAdd = async (url: string) => {
    try {
      await addGalleryItem({ image: url });
      toast.success("Image added");
      await refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add image");
    }
  };

  const handleDelete = async (id: string, url: string) => {
    const confirmed = window.confirm("Delete this image?");
    if (!confirmed) return;

    setDeletingId(id);
    try {
      await deleteGalleryItem(id, url);
      toast.success("Image deleted");
      await refetch();
    } catch (error) {
      toast.error("Failed to delete");
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-6"
    >
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        🖼 Gallery Manager
      </h1>

      <GalleryForm onSubmit={handleAdd} />

      <div className="grid grid-cols-2 lg:grid-cols-3  gap-4 mt-6">
        {gallery?.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative group rounded overflow-hidden shadow hover:shadow-xl transition-all"
          >
            <img
              src={item.image}
              alt="Gallery"
              className="w-full h-40 md:h-[500px] object-cover rounded"
            />
            <button
              onClick={() => handleDelete(item.id, item.image)}
              disabled={deletingId === item.id}
              className="absolute top-2 right-2 bg-fuchsia-400 text-white px-2 py-1 text-xs rounded shadow-md opacity-0 group-hover:opacity-100 transition"
            >
              {deletingId === item.id ? "..." : "❌"}
            </button>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default AdminGallery;
