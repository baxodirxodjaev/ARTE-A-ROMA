import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCommentActions } from "../hooks/useComments";
import { motion } from "framer-motion";

const AddComment = () => {
  const { user } = useAuth();
  const { addCommentMutation } = useCommentActions();
  const [text, setText] = useState("");

  if (!user) return <p className="text-gray-500 text-lg text-center mt-[3rem]"> Please login to comment</p>;

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) return;

    addCommentMutation.mutate({ userId: user.id, userName: user.name, text });
    setText("");
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-4 w-full mt-[3rem]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className=" text-2xl text-slate-500 font-medium text-center my-4"> Leave a comment</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        rows={3}
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md mt-3 hover:bg-blue-700 transition-colors"
      >
        Add Comment
      </button>
    </motion.form>
  );
};

export default AddComment;
