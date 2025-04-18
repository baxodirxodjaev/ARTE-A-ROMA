import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment, getComments, deleteComment, likeComment } from "../services/commentService";
import { toast } from "react-toastify";

//  Get comments
export const useComments = () => {
    return useQuery({
      queryKey: ["comments"],
      queryFn: getComments,
    });
  };

//  Hook to working with comments
export const useCommentActions = () => {
    const queryClient = useQueryClient();
  
    //   Add comment
    const addCommentMutation = useMutation({
      mutationFn: addComment,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["comments"] });
        toast.success("Comment is added!");
      },
      onError: () => toast.error(" Error in adding comment!"),
    });
  
    //   Delete comment
    const deleteCommentMutation = useMutation({
      mutationFn: deleteComment,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["comments"] });
        toast.success(" Comment is deleted!");
      },
      onError: () => toast.error(" Error in deleting comment!"),
    });
  
    //   Like comment
    const likeCommentMutation = useMutation({
      mutationFn: ({ commentId, userId, likes } : {commentId : string, userId : string, likes : string[]}) => likeComment(commentId, userId, likes),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["comments"] });
      },
      onError: () => toast.error(" Error in liking comment!"),
    });
  
    return { addCommentMutation, deleteCommentMutation, likeCommentMutation };
  };