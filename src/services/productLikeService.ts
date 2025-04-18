import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";



export const likeProduct = async (productId : string, userId : string, likes : string[]) => {
  const commentRef = doc(db, "products", productId);
  const hasLiked = likes.includes(userId);

  await updateDoc(commentRef, {
    likes: hasLiked ? likes.filter((id : string) => id !== userId) : [...likes, userId],
  });

  return !hasLiked; 
};