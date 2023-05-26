import { useToastAction } from "@/components/providers/ToastProvider";
import { parseAsPositiveInt } from "@/lib/util";
import { postLike } from "@/services/client/Like";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Props } from "./";
import { useSearchParams } from "react-router-dom";

export const useLikeButton = ({
  likeCount,
  liked,
  isMyPost,
  isLoggedIn,
}: Props) => {
  const [isLiked, setIsLiked] = useState(liked);
  const [localLikeCount, setLocalLikeCount] = useState(likeCount);
  const [params] = useSearchParams();
  const { handleSubmit, formState } = useForm();
  const { showToast } = useToastAction();
  const postId = Number(parseAsPositiveInt(params.get("postId")));
  const isDisabled =
    formState.isSubmitting || isLiked || isMyPost || !isLoggedIn;
  const onSubmit = handleSubmit(async () => {
    try {
      await postLike({ postId });
      setIsLiked(true);
      setLocalLikeCount((prev) => prev + 1);
    } catch (err) {
      showToast({ message: "エラーが発生しました", style: "failed" });
    }
  });
  return { isLiked, isDisabled, localLikeCount, onSubmit };
};
