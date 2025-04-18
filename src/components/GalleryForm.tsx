import { useState } from "react";
import { uploadFile } from "../services/storageService";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

interface GalleryFormProps {
  onSubmit: (url: string) => void;
}

const GalleryForm = ({ onSubmit }: GalleryFormProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select an image.");
      return;
    }

    setIsUploading(true);
    try {
      const { url } = await uploadFile(file, "gallery-images");
      onSubmit(url);
      toast.success("Image uploaded successfully!");
      setFile(null);
    } catch (error) {
      console.error(error);
      toast.error("Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow p-4 mb-4 max-w-md mx-auto"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">➕ Add New Image</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="w-full border px-3 py-2 rounded"
      />
      {file && (
        <p className="text-green-600 text-sm mt-2">
          Selected: {file.name}
        </p>
      )}
      <button
        onClick={handleUpload}
        disabled={isUploading}
        className={`w-full mt-3 py-2 text-white rounded transition ${
          isUploading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isUploading ? "Uploading..." : "Upload"}
      </button>
    </motion.div>
  );
};

export default GalleryForm;
