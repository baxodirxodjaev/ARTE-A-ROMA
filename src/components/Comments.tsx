import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import {  useCommentActions } from "../hooks/useComments";
import { motion } from "framer-motion";
import { useComments } from "../services/commentService";

const Comments = () => {
  const { user } = useAuth();
  const { data: comments, isLoading } = useComments();
  const { deleteCommentMutation, likeCommentMutation } = useCommentActions();

  const INITIAL_VISIBLE = 12;
  const LOAD_MORE_STEP = 6;

  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const handleLikeComment = (commentId: string, commentLikes: string[]) => {
    if (!user) {
      toast.error("Please login to put like!", { position: "top-right" });
      return;
    }

    likeCommentMutation.mutate({
      commentId,
      userId: user.id,
      likes: commentLikes,
    });
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const handleDeleteComment = async(id : string)=>{
    const isConfirmed = window.confirm("Are you sure you want to delete this comment?");
    if (!isConfirmed) return;

    deleteCommentMutation.mutate(id)
  }

  const visibleComments = comments?.slice(0, visibleCount);

  if(isLoading) return <p className="text-2xl font-bold text-slate-600 animate-bounce my-[3rem]">Loading comments...</p>;

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto px-6 py-12"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold text-center mb-10 text-gray-800"
      >
        💬 What people are saying
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleComments?.map((comment) => (
          <motion.div
            key={comment.id}
            variants={cardVariants}
            className="bg-white shadow-lg rounded-xl p-6 relative hover:shadow-2xl transition-all duration-500"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2"> <strong> {comment.userName}</strong></h3>
            <p className="text-gray-600 mb-4">{comment.text}</p>
            <div className="text-sm text-gray-400">
              {new Date(comment.createdAt).toLocaleDateString()} •{" "}
              {new Date(comment.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>

            <div className="flex items-center gap-6 mt-2">
              <button
                onClick={() => handleLikeComment(comment.id, comment.likes)}
                className={`flex items-center gap-1 text-red-400 hover:text-red-600 transition ${
                  
                    user?.id && comment.likes.includes(user.id)
                      ? "font-extrabold scale-110 text-red-600 "
                      : ""
                  
                }`}
              >
                ❤️ {comment.likes.length}
              </button>

              {user?.role === "admin" && (
                <button
                  onClick={()=>handleDeleteComment(comment.id)}
                  className="text-red-400 hover:text-red-600 transition"
                >
                  🗑 Delete
                </button>
              )}
            </div>

            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-pink-500" />
          </motion.div>
        ))}
      </div>

      {/* Кнопка "Показать ещё" */}
      {comments && visibleCount < comments.length && (
        <div className="text-center mt-10">
          <button
            onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_STEP)}
            className="px-6 py-2 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600 transition"
          >
            Show more
          </button>
        </div>
      )}
    </motion.section>
  );
};

export default Comments;
