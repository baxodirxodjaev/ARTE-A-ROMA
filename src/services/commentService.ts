import { db } from "../services/firebase";
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc, orderBy, query } from "firebase/firestore";
import { Comments } from "../types";
import { useCreateQuery } from "../hooks/useCreateQuery";



// 🔹 Добавление комментария
export const addComment = async (commentData: {userId : string, userName: string, text: string}) => {
  await addDoc(collection(db, "comments"), {
    ...commentData,
    createdAt: new Date().toISOString(),
    likes: [], 
  });
};




// 🔹 Получение всех комментариев (по убыванию даты)
export const getComments = async () : Promise<Comments[]> => {
  const q = query(collection(db, "comments"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Comments)) ;
};

export const useComments = () => useCreateQuery<Comments>("comments", getComments);


// 🔹 Удаление комментария
export const deleteComment = async (commentId : string) => {
  await deleteDoc(doc(db, "comments", commentId));
};

// 🔹 Добавление лайка (userId может лайкнуть только 1 раз)
export const likeComment = async (commentId : string, userId : string, likes : string[]) => {
  const commentRef = doc(db, "comments", commentId);
  const hasLiked = likes.includes(userId);

  await updateDoc(commentRef, {
    likes: hasLiked ? likes.filter((id) => id !== userId) : [...likes, userId],
  });

  return !hasLiked; // Возвращает true, если лайк добавлен, false - если удалён
};
