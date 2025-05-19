"use client";

import { useState } from "react";
import { Comment, getWishComments } from "@/app/lib/data";
import CommentList from "@/app/components/wishes/CommentList";

interface ClientCommentsProps {
  initialComments: Comment[];
  totalComments: number;
  wishId: string;
}

export default function ClientComments({ initialComments, totalComments, wishId }: ClientCommentsProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const COMMENTS_PER_PAGE = 10;

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      const { comments: newComments } = await getWishComments(wishId, nextPage);

      setComments(prevComments => [...prevComments, ...newComments]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error("載入更多留言時發生錯誤:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  return <CommentList comments={comments} total={totalComments} currentPage={currentPage} onLoadMore={handleLoadMore} isLoadingMore={isLoadingMore} />;
}
