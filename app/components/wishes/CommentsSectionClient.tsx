"use client";

import { useState } from "react";
import CommentList from "./CommentList";
import { getWishComments } from "@/app/lib/data";

interface CommentsSectionClientProps {
  wishId: string;
  initialComments: any[];
  total: number;
}

export default function CommentsSectionClient({ wishId, initialComments, total }: CommentsSectionClientProps) {
  const [comments, setComments] = useState(initialComments);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    const { comments: moreComments } = await getWishComments(wishId, currentPage + 1);
    setComments([...comments, ...moreComments]);
    setCurrentPage(currentPage + 1);
    setIsLoadingMore(false);
  };

  return <CommentList comments={comments} total={total} currentPage={currentPage} onLoadMore={handleLoadMore} isLoadingMore={isLoadingMore} />;
}
