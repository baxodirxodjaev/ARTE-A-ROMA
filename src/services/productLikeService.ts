import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { LikeTarget } from "../types";



export const likeProduct = async ( { id, userId, likes }: LikeTarget) => {
  const commentRef = doc(db, "products", id);
  const hasLiked = likes.includes(userId);

  await updateDoc(commentRef, {
    likes: hasLiked ? likes.filter((id : string) => id !== userId) : [...likes, userId],
  });

  return !hasLiked; 
};