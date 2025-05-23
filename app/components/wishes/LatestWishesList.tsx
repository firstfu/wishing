// wishes/LatestWishesList.tsx - 最新願望列表元件
//
// 用途：在首頁或相關頁面顯示最近發布的願望列表。
// 功能：
// - 以網格佈局展示最新發布的願望卡片
// - 每個願望卡片顯示標題、簡短描述、分類和預算金額
// - 支援響應式設計，在不同裝置上自動調整卡片和網格佈局
// - 提供「查看更多」選項，引導用戶前往完整願望列表頁
// - 可顯示發布者資訊與發布時間
// - 點擊卡片可跳轉至願望詳情頁
//
// 本元件用於增強平台內容新鮮度，展示最新活動，並引導用戶探索更多內容。

"use client";

import Link from "next/link";
import { Button } from "@/app/components/ui/Button";
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
