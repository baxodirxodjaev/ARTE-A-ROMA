import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { Policy } from "../types";
import { useQuery } from "@tanstack/react-query";




const fetchPolicy = async (): Promise<Policy[]> => {
    const querySnapshot = await getDocs(collection(db, "policy"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Policy));
  };

  
  export const usePolicy = () => {
    return useQuery<Policy[]>({
      queryKey: ["policy"],
      queryFn: fetchPolicy,
      staleTime: 1000 * 60 * 5,
    });
  };