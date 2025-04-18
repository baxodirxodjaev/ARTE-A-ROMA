import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { likeProduct } from "../services/productLikeService";

export const useProductActions = () => {
  const queryClient = useQueryClient();

  // like products
  const likeProductMutation = useMutation({
    mutationFn: ({ productId  , userId, likes } : {productId : string, userId : string, likes : string[] }) => likeProduct(productId , userId, likes),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
      },
      onError: () => toast.error(" Error liking product"),
  });

  return { likeProductMutation };
};


