import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Homepage, HomepageFormInput } from "../types";
import { useState } from "react";
import { deleteFile, getPathFromUrl, uploadFile } from "../services/storageService";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

interface HomepageFormProps {
  initialData: Homepage;
  onSubmit: (data: Homepage) => void;
  onClose: () => void;
}

const homepageSchema = Yup.object().shape({
  homeTitle: Yup.string().required("Title is required"),
  homeDescription: Yup.string().required("Description is required"),
});

const HomepageForm = ({ initialData, onSubmit, onClose }: HomepageFormProps) => {
  const [localPoster, setLocalPoster] = useState<{ file?: File; url?: string }>({
    url: initialData?.homePoster,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm <HomepageFormInput>({
    resolver: yupResolver(homepageSchema),
    defaultValues: {
      homeTitle: initialData?.homeTitle || "",
      homeDescription: initialData?.homeDescription || "",
    },
  });

  const handleFormSubmit = async (data: HomepageFormInput) => {
    if (!localPoster.url && !localPoster.file) {
      toast.error("Poster is required.");
      return;
    }

    setIsSubmitting(true);
  
    try {
      let finalPosterUrl = localPoster.url;
  
      // 🗑️ Удаляем старый постер, если загружен новый
      if (localPoster.file && localPoster.url) {
        const path = getPathFromUrl(localPoster.url);
        await deleteFile(path);
        console.log(path);
        
      }
  
      // ⬆️ Загружаем новый постер
      if (localPoster.file) {
        const { url } = await uploadFile(localPoster.file, "home-posters");
        finalPosterUrl = url;
      }
  
      // 🔁 Обновляем Firestore
      await onSubmit({
        ...initialData,
        ...data,
        homePoster: finalPosterUrl!,
      });
  
      toast.success("Homepage updated!");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update homepage.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <motion.form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-white shadow-lg rounded-xl p-6 space-y-5 max-w-2xl mx-auto"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div>
        <label className="block font-semibold mb-1 text-gray-700">Title</label>
        <input
          {...register("homeTitle")}
          type="text"
          placeholder="Enter a title"
          className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.homeTitle && <p className="text-red-500 text-sm">{errors.homeTitle.message}</p>}
      </div>

      <div>
        <label className="block font-semibold mb-1 text-gray-700">Description</label>
        <textarea
          {...register("homeDescription")}
          placeholder="Enter a description"
          className="w-full border px-4 py-2 rounded h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.homeDescription && (
          <p className="text-red-500 text-sm">{errors.homeDescription.message}</p>
        )}
      </div>

      {/* Poster image section */}
      <div>
        <label className="block font-semibold mb-1 text-gray-700">Poster</label>
        {localPoster.url && (
          <div className="flex items-center gap-4">
            <img src={localPoster.url} alt="Poster" className="w-24 h-24 object-cover rounded" />
            <button
              type="button"
              onClick={() => setLocalPoster({})}
              className="text-red-500 text-sm hover:underline"
            >
              ❌ Remove
            </button>
          </div>
        )}

        {!localPoster.url && (
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setLocalPoster({ file });
            }}
            className="w-full border px-3 py-2 rounded mt-2"
          />
        )}

        {localPoster.file && (
          <p className="text-green-600 text-sm mt-1">Selected: {localPoster.file.name}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full text-white px-4 py-2 rounded transition-all duration-300 ${
          isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isSubmitting ? "Updating..." : "Update Section"}
      </button>

      <button
        className={`w-full text-white px-4 py-2 rounded transition-all duration-300 
           bg-gray-400 hover:bg-gray-600 cursor-pointer  "
        `}
      >
        {initialData &&  "Cancel"}
      </button>
    </motion.form>
  );
};

export default HomepageForm;
