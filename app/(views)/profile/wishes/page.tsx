"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/app/components/ui/Button";
import { formatDate } from "@/app/lib/utils";

// 許願池我的許願頁面
// ---------------------------------------------
// 用途：
//   - 顯示用戶發布的所有許願
//   - 提供願望狀態管理和操作功能
// 設計重點：
//   - 清晰的願望列表展示
//   - 狀態篩選功能
//   - 願望操作按鈕（編輯、刪除、置頂）
//   - 響應式設計
// ---------------------------------------------

// 願望狀態類型
type WishStatus = "全部" | "進行中" | "已完成" | "已關閉";

// 模擬願望數據
const MOCK_WISHES = [
  {
    id: "wish-1",
    title: "尋找二手 Macbook Pro 2019",
    description: "需要一台二手的 Macbook Pro 2019 款，配置要求 i7 處理器，16GB 內存，512GB SSD。",
    price: 35000,
    status: "進行中",
    createdAt: "2023-11-15T10:30:00Z",
    isPinned: false,
    commentCount: 3,
    viewCount: 120,
  },
  {
    id: "wish-2",
    title: "徵求台北到高雄的共乘夥伴",
    description: "計劃在本週六早上從台北出發到高雄，尋找 1-2 位共乘夥伴分攤油費。",
    price: 500,
    status: "已完成",
    createdAt: "2023-10-20T14:15:00Z",
    isPinned: false,
    commentCount: 8,
    viewCount: 245,
  },
  {
    id: "wish-3",
    title: "尋找資深 React 開發者進行專案諮詢",
    description: "需要一位有 3 年以上 React 開發經驗的工程師，協助解決專案中的性能問題。",
    price: 2000,
    status: "進行中",
    createdAt: "2023-12-01T09:45:00Z",
    isPinned: true,
    commentCount: 5,
    viewCount: 178,
  },
  {
    id: "wish-4",
    title: "徵求二手健身器材",
    description: "想購買二手啞鈴、健身墊和拉力繩，品相良好即可。",
    price: 1500,
    status: "已關閉",
    createdAt: "2023-09-05T16:20:00Z",
    isPinned: false,
    commentCount: 2,
    viewCount: 89,
  },
  {
    id: "wish-5",
    title: "尋找攝影師拍攝畢業照",
    description: "需要一位專業攝影師為我拍攝畢業照，時間在下個月初，地點在台大校園。",
    price: 3000,
    status: "進行中",
    createdAt: "2023-11-28T11:10:00Z",
    isPinned: false,
    commentCount: 6,
    viewCount: 152,
  },
];

// 狀態標籤顏色映射
const STATUS_COLORS: Record<string, string> = {
  進行中: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  已完成: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  已關閉: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
};

export default function MyWishesPage() {
  const [statusFilter, setStatusFilter] = useState<WishStatus>("全部");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [wishToDelete, setWishToDelete] = useState<string | null>(null);

  // 篩選願望
  const filteredWishes = MOCK_WISHES.filter(wish => {
    if (statusFilter === "全部") return true;
    return wish.status === statusFilter;
  });

  // 處理刪除願望
  const handleDeleteWish = (wishId: string) => {
    setWishToDelete(wishId);
    setIsDeleteModalOpen(true);
  };

  // 確認刪除願望
  const confirmDeleteWish = () => {
    // 實際應用中這裡會呼叫 API 刪除願望
    console.log(`刪除願望: ${wishToDelete}`);
    setIsDeleteModalOpen(false);
    setWishToDelete(null);
    // 這裡應該重新獲取願望列表或更新狀態
  };

  // 處理置頂願望
  const handlePinWish = (wishId: string) => {
    // 實際應用中這裡會呼叫 API 置頂願望
    console.log(`置頂願望: ${wishId}`);
    // 這裡應該重新獲取願望列表或更新狀態
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">我的許願</h2>
        <Link href="/wishes/create">
          <Button>發布新許願</Button>
        </Link>
      </div>

      {/* 狀態篩選器 */}
      <div className="flex flex-wrap gap-2">
        {(["全部", "進行中", "已完成", "已關閉"] as WishStatus[]).map(status => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              statusFilter === status
                ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* 願望列表 */}
      <div className="space-y-4">
        {filteredWishes.length > 0 ? (
          filteredWishes.map(wish => (
            <div
              key={wish.id}
              className={`bg-white dark:bg-gray-800 border rounded-lg p-5 shadow-sm ${
                wish.isPinned ? "border-purple-300 dark:border-purple-700" : "border-gray-200 dark:border-gray-700"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {wish.isPinned && <span className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 text-xs px-2 py-1 rounded-full">置頂</span>}
                    <span className={`text-xs px-2 py-1 rounded-full ${STATUS_COLORS[wish.status]}`}>{wish.status}</span>
                  </div>
                  <Link href={`/wishes/${wish.id}`} className="text-lg font-medium hover:text-purple-600 dark:hover:text-purple-400">
                    {wish.title}
                  </Link>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-2">{wish.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>發布於 {formatDate(wish.createdAt)}</span>
                    <span>• {wish.commentCount} 則回應</span>
                    <span>• {wish.viewCount} 次瀏覽</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 md:flex-nowrap">
                  <Link href={`/wishes/${wish.id}/edit`}>
                    <Button variant="outline" size="sm">
                      編輯
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={() => handlePinWish(wish.id)} className={wish.isPinned ? "text-purple-600 border-purple-300" : ""}>
                    {wish.isPinned ? "取消置頂" : "置頂"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteWish(wish.id)} className="text-red-600 border-red-300 hover:bg-red-50">
                    刪除
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">沒有符合條件的許願</p>
            <Link href="/wishes/create" className="mt-4 inline-block">
              <Button>發布新許願</Button>
            </Link>
          </div>
        )}
      </div>

      {/* 刪除確認對話框 */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium mb-4">確認刪除</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">您確定要刪除這個許願嗎？此操作無法復原。</p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                取消
              </Button>
              <Button onClick={confirmDeleteWish} className="bg-red-600 hover:bg-red-700">
                確認刪除
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
