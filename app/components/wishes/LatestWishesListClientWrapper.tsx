"use client";
import LatestWishesList from "./LatestWishesList";
import { Wish } from "./WishCard";

// 許願池 LatestWishesListClientWrapper 元件
// ---------------------------------------------
// 用途：
//   - 包裝 LatestWishesList 以支援 client component 用法。
//   - 用於首頁等需要 client component 的情境。
// 主要 Props：
//   - wishes: Wish[] 許願清單（必填）
// 用法範例：
//   <LatestWishesListClientWrapper wishes={wishes} />
// 設計重點：
//   - 僅作為包裝，無額外邏輯
// ---------------------------------------------

export default function LatestWishesListClientWrapper({ wishes }: { wishes: Wish[] }) {
  return <LatestWishesList wishes={wishes} />;
}
