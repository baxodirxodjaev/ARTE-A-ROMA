import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Product } from "../types";
import { deleteFile, getPathFromUrl, uploadFile } from "../services/storageService";
import { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

interface ProductFormProp {
  initialData?: Product | null;
  onSubmit: (data: Product) => void;
  onClose: () => void;
}

const productSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  homeDescription: Yup.string().required("Home Description is required"),
  price: Yup.string().required("Price is required"),
  type: Yup.string().oneOf(["event", "tariff"]).required("Type is required"),
  date: Yup.string().required("Date is required"),
  location: Yup.string().required("Location is required"),
  isActive: Yup.boolean().default(true),
  likes: Yup.array(),
});

const ProductForm = ({ initialData, onSubmit, onClose }: ProductFormProp) => {
  const [localPoster, setLocalPoster] = useState<{ file?: File; url?: string }>({
    url: initialData?.poster,
  });

  const [localImages, setLocalImages] = useState<{ file?: File; url?: string }[]>(
    initialData?.images?.map((url) => ({ url })) || []
  );

  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [posterToDelete, setPosterToDelete] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      homeDescription: "",
      price: "",
      type: "tariff",
      date: new Date().toISOString().split("T")[0],
      location: "",
      isActive: true,
      likes: [],
    },
  });

  const moveImage = (fromIndex: number, toIndex: number) => {
    const updated = [...localImages];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setLocalImages(updated);
  };

  
  const handleFormSubmit = async (data: Product) => {
    if (!localPoster.url && !localPoster.file) {
      toast.error("Please upload a poster image!");
      return;
    }

    if (localImages.length === 0) {
      toast.error("Please upload at least one product image!");
      return;
    }

    setIsSubmitting(true);

    try {
      let finalPosterUrl = localPoster.url;

      if (localPoster.file) {
        const { url } = await uploadFile(localPoster.file, "posters");
        finalPosterUrl = url;
      }

      const uploadedImages = await Promise.all(
        localImages
          .filter((img) => img.file)
          .map((img) => uploadFile(img.file!, "product-images"))
      );

      const finalImages = [
        ...localImages.filter((img) => img.url && !imagesToDelete.includes(img.url)).map((img) => img.url!),
        ...uploadedImages.map((res) => res.url),
      ];

      if (posterToDelete) await deleteFile(getPathFromUrl(posterToDelete));
      await Promise.all(imagesToDelete.map((url) => deleteFile(getPathFromUrl(url))));

      await onSubmit({
        ...data,
        poster: finalPosterUrl!,
        images: finalImages,
      });

      toast.success(initialData ? "Product updated!" : "Product added!");
      reset();
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error while submitting the form!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-white shadow-lg rounded-lg p-6 space-y-5 max-w-3xl mx-auto"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
        {initialData ? "✏️ Edit Product" : "➕ Add New Product"}
      </h2>

      {/* Fields */}
      <div className="grid gap-4">
        <input
          {...register("name")}
          type="text"
          placeholder="Name / Title"
          className="input-style"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

        <textarea
          {...register("description")}
          placeholder="Description"
          className="input-style h-28"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

        <textarea
          {...register("homeDescription")}
          placeholder="Homepage Description"
          className="input-style h-24"
        />
        {errors.homeDescription && <p className="text-red-500 text-sm">{errors.homeDescription.message}</p>}

        <input {...register("price")} type="text" placeholder="Price (€)" className="input-style" />
        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}

        <select {...register("type")} className="input-style">
          <option value="tariff">Tariff</option>
          <option value="event">Event</option>
        </select>

        <input {...register("date")} type="date" className="input-style" />
        {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}

        <input {...register("location")} type="text" placeholder="Location" className="input-style" />
        {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
      </div>

      {/* Poster upload */}
      <div>
        <label className="font-medium">Poster Image</label>
        {localPoster.url ? (
          <div className="flex items-center gap-3 mt-2">
            <img src={localPoster.url} className="w-28 h-28 object-cover rounded" />
            <button
              onClick={() => {
                setPosterToDelete(localPoster.url!);
                setLocalPoster({});
              }}
              type="button"
              className="text-red-500 text-sm hover:underline"
            >
              ❌ Remove
            </button>
          </div>
        ) : (
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setLocalPoster({ file });
            }}
            className="input-style mt-2"
          />
        )}
      </div>

      {/* Images section */}
      <div>
        <label className="font-medium">Gallery Images</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            const files = Array.from(e.target.files || []);
            const newImgs = files.map((f) => ({ file: f }));
            setLocalImages((prev) => [...prev, ...newImgs]);
          }}
          className="input-style mt-2"
        />
        <p className="text-orange-500 text-sm mt-1">Add at least 3 images</p>

        {localImages.map((img, index) => (
          <div key={index} className="flex items-center gap-2 mt-2">
            {img.url && <img src={img.url} className="w-16 h-16 rounded object-cover" />}
            {img.file && <p className="text-green-600 text-sm">{img.file.name}</p>}
            <div className="flex gap-1 text-sm">
              {index > 0 && (
                <button onClick={() => moveImage(index, index - 1)} type="button" className="text-blue-500">⬆️</button>
              )}
              {index < localImages.length - 1 && (
                <button onClick={() => moveImage(index, index + 1)} type="button" className="text-blue-500">⬇️</button>
              )}
              <button
                type="button"
                className="text-red-500"
                onClick={() => {
                  if (img.url) setImagesToDelete((prev) => [...prev, img.url!]);
                  setLocalImages((prev) => prev.filter((_, i) => i !== index));
                }}
              >
                ❌
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Active toggle */}
      <label className="flex items-center mt-2">
        <input type="checkbox" {...register("isActive")} className="mr-2" />
        <span className="text-sm text-gray-700">Product is active</span>
      </label>

      {/* Buttons */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full ${
          isSubmitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        } text-white font-medium py-2 rounded transition`}
      >
        {isSubmitting ? "Saving..." : initialData ? "Update Product" : "Add Product"}
      </button>

      <button
        type="button"
        onClick={onClose}
        className="w-full bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 rounded transition mt-2"
      >
        Cancel
      </button>
    </motion.form>
  );
};

export default ProductForm;
