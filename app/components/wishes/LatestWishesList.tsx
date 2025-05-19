"use client";

import WishCard, { Wish } from "./WishCard";

// 許願池 LatestWishesList 元件
// ---------------------------------------------
// 用途：
//   - 顯示最新發布的許願，資料由 getLatestWishes 取得。
//   - 用於首頁、其他推薦區塊，支援無資料提示。
// 主要 Props：
//   - wishes: Wish[] 許願清單（必填）
// 用法範例：
//   <LatestWishesList wishes={wishes} />
// 設計重點：
//   - 無資料時顯示提示
//   - 使用 WishCard 呈現每筆許願
// ---------------------------------------------

interface LatestWishesListProps {
  wishes: Wish[];
}

export default function LatestWishesList({ wishes }: LatestWishesListProps) {
  if (!wishes || wishes.length === 0) {
    return (
      <div className="h-60 flex items-center justify-center bg-muted rounded-lg">
        <p className="text-muted-foreground">目前還沒有許願</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {wishes.map(wish => (
        <WishCard key={wish.id} wish={wish} />
      ))}
    </div>
  );
}
