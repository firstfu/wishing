// ====================================================================
// wishes/components/WishCard.tsx - 許願卡片組件
// ====================================================================
// 作用：顯示單個許願的卡片視圖，用於許願列表
// 功能：
// - 展示許願標題、描述、價格和分類
// - 提供許願發布者和發布時間信息
// - 支持置頂標記和其他狀態指示
// ====================================================================

import React from "react";
import Link from "next/link";
import { Badge } from "@/app/components/ui/Badge";

// 用戶類型定義
export interface User {
  id: string;
  name: string;
  avatar?: string;
}

// 許願類型定義
export interface Wish {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  isPinned?: boolean;
  status?: "open" | "in_progress" | "completed";
}

// 格式化價格顯示
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("zh-TW", {
    style: "currency",
    currency: "TWD",
    minimumFractionDigits: 0,
  }).format(price);
};

// 計算時間差 (顯示如 "3天前", "1小時前" 等)
const timeAgo = (date: string) => {
  const now = new Date();
  const past = new Date(date);
  const diff = now.getTime() - past.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}天前`;
  } else if (hours > 0) {
    return `${hours}小時前`;
  } else if (minutes > 0) {
    return `${minutes}分鐘前`;
  } else {
    return "剛剛";
  }
};

// 獲取分類圖標和名稱
const getCategoryInfo = (category: string) => {
  switch (category) {
    case "technology":
      return { icon: "💻", name: "科技" };
    case "education":
      return { icon: "📚", name: "教育" };
    case "lifestyle":
      return { icon: "🏡", name: "生活" };
    case "health":
      return { icon: "💪", name: "健康" };
    case "food":
      return { icon: "🍜", name: "美食" };
    case "travel":
      return { icon: "✈️", name: "旅遊" };
    case "entertainment":
      return { icon: "🎮", name: "娛樂" };
    case "sports":
      return { icon: "⚽", name: "運動" };
    default:
      return { icon: "🔍", name: category };
  }
};

// 許願卡片組件
export default function WishCard({ wish }: { wish: Wish }) {
  const { icon, name } = getCategoryInfo(wish.category);
  const firstLine = wish.description.split("\n")[0];
  const truncatedDescription = firstLine.length > 100 ? firstLine.substring(0, 100) + "..." : firstLine;

  return (
    <Link href={`/wishes/${wish.id}`} className="block h-full">
      <div className="bg-card border border-border rounded-xl overflow-hidden h-full shadow-sm hover:shadow-md hover:border-purple-200 dark:hover:border-purple-800/50 transition-all duration-200">
        {/* 頂部狀態條 - 只有置頂或特殊狀態的卡片才會顯示此條 */}
        {wish.isPinned && <div className="h-1 bg-gradient-to-r from-amber-400 to-amber-500"></div>}
        {wish.status === "in_progress" && <div className="h-1 bg-gradient-to-r from-blue-400 to-blue-500"></div>}
        {wish.status === "completed" && <div className="h-1 bg-gradient-to-r from-green-400 to-green-500"></div>}

        <div className="p-6">
          {/* 分類和時間戳 */}
          <div className="flex justify-between items-center mb-3">
            <Badge variant="outline" className="bg-accent/50 border-accent/50 text-foreground/80 text-xs">
              {icon} {name}
            </Badge>
            <div className="text-xs text-muted-foreground">{timeAgo(wish.createdAt)}</div>
          </div>

          {/* 標題和描述 */}
          <h3 className="text-xl font-bold mb-2 line-clamp-1 text-foreground">{wish.title}</h3>
          <p className="text-sm text-muted-foreground mb-5 line-clamp-2">{truncatedDescription}</p>

          {/* 底部信息區 */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
            {/* 發布者信息 */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {wish.user.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium">{wish.user.name}</span>
            </div>

            {/* 價格顯示 */}
            <div className="text-primary font-bold">{formatPrice(wish.price)}</div>
          </div>

          {/* 置頂標記 */}
          {wish.isPinned && (
            <div className="absolute top-2 right-2">
              <div className="bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                  <path
                    fillRule="evenodd"
                    d="M10 1a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 1zM5.05 3.05a.75.75 0 011.06 0l1.062 1.06A.75.75 0 116.11 5.173L5.05 4.11a.75.75 0 010-1.06zm9.9 0a.75.75 0 010 1.06l-1.06 1.062a.75.75 0 01-1.062-1.061l1.061-1.06a.75.75 0 011.06 0zM3 10a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 013 10zm11 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 0114 10zm-6.828 2.828a.75.75 0 010 1.061L6.11 14.95a.75.75 0 01-1.06-1.06l1.06-1.06a.75.75 0 011.06 0zm3.594-3.317a.75.75 0 00-1.37.364l-.492 3.937a.75.75 0 001.229.59l1.335-1.336 2.263 2.263a.75.75 0 001.061-1.061L13.45 9.576l1.335-1.336a.75.75 0 00-.59-1.228l-3.938.492z"
                    clipRule="evenodd"
                  />
                </svg>
                置頂
              </div>
            </div>
          )}

          {/* 狀態標籤 */}
          {wish.status === "in_progress" && (
            <div className="absolute top-2 right-2">
              <div className="bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 text-xs px-2 py-1 rounded-full">進行中</div>
            </div>
          )}
          {wish.status === "completed" && (
            <div className="absolute top-2 right-2">
              <div className="bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 text-xs px-2 py-1 rounded-full">已完成</div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
