// ====================================================================
// wishes/[id]/components/CommentsSectionClient.tsx - 許願留言區客戶端元件
// ====================================================================
// 作用：管理許願留言的客戶端交互狀態
// 功能：
// - 管理留言狀態
// - 處理載入更多留言的邏輯
// - 連接 CommentList 元件顯示留言
// ====================================================================

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
