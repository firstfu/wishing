// ====================================================================
// components/wishes/WishCard.tsx - 許願卡片組件
// ====================================================================
// 作用：顯示單個許願的卡片視圖，用於許願列表
// 功能：
// - 展示許願標題、描述、價格和分類
// - 提供許願發布者和發布時間信息
// - 支持置頂標記和其他狀態指示
// ====================================================================

"use client";

import Link from "next/link";

// 許願池 WishCard 元件
// ---------------------------------------------
// 用途：
//   - 顯示單一許願摘要資訊，支援 default/compact 兩種版型。
//   - 用於許願列表、輪播、推薦等區塊。
//   - 顯示分類顏色、價格格式化、發布者資訊。
// 主要 Props：
//   - wish: Wish 物件（必填）
//   - variant: "default" | "compact"（選填，預設 default）
// 用法範例：
//   <WishCard wish={wish} />
//   <WishCard wish={wish} variant="compact" />
// 設計重點：
//   - 支援分類顏色與中文翻譯
//   - 價格格式化為新台幣
//   - 置頂標記顯示
//   - 使用 Next.js Link 進行路由跳轉
// ---------------------------------------------

// 許願的類型定義
export interface Wish {
  id: string;
  title: string;
  description: string;
  price: number;
  isPinned: boolean;
  category: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    image?: string;
  };
}

interface WishCardProps {
  wish: Wish;
  variant?: "default" | "compact";
}

export default function WishCard({ wish, variant = "default" }: WishCardProps) {
  // 格式化描述文字，限制字數
  const formatDescription = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // 格式化價格顯示
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("zh-TW", {
      style: "currency",
      currency: "TWD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // 獲取分類名稱對應的顏色
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      technology: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      education: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      lifestyle: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      health: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      food: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      travel: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
      entertainment: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
      sports: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    };
    return colors[category] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  };

  // 翻譯分類名稱
  const translateCategory = (category: string) => {
    const translations: Record<string, string> = {
      technology: "科技",
      education: "教育",
      lifestyle: "生活",
      health: "健康",
      food: "美食",
      travel: "旅遊",
      entertainment: "娛樂",
      sports: "運動",
    };
    return translations[category] || category;
  };

  if (variant === "compact") {
    return (
      <Link href={`/wishes/${wish.id}`}>
        <div className="border border-border rounded-lg p-3 hover:shadow-custom transition-all duration-300 hover:-translate-y-1">
          <h3 className="font-semibold truncate">{wish.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{formatPrice(wish.price)}</p>
        </div>
      </Link>
    );
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden hover:shadow-custom transition-all duration-300 hover:-translate-y-1 bg-card">
      <Link href={`/wishes/${wish.id}`} className="block">
        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            {wish.isPinned && <div className="bg-gradient text-primary-foreground text-xs px-2 py-1 rounded-full inline-block">置頂</div>}
            <div className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(wish.category)}`}>{translateCategory(wish.category)}</div>
          </div>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{wish.title}</h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{formatDescription(wish.description, 120)}</p>
          <div className="flex justify-between items-center pt-3 border-t border-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-medium">
                {wish.user.name.charAt(0)}
              </div>
              <span className="text-sm">{wish.user.name}</span>
            </div>
            <div className="font-medium text-primary">{formatPrice(wish.price)}</div>
          </div>
          <div className="mt-3 text-xs text-muted-foreground">{new Date(wish.createdAt).toLocaleDateString("zh-TW")}</div>
        </div>
      </Link>
    </div>
  );
}
