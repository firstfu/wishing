// ====================================================================
// wishes/components/WishDetail.tsx - 許願詳情元件
// ====================================================================
// 作用：顯示單個許願的詳細資訊
// 功能：
// - 展示許願標題、描述、價格等完整資訊
// - 提供發布者資訊與聯繫方式
// - 支持許願狀態指示
// ====================================================================

import { Wish } from "./WishCard";
import { Badge } from "@/app/components/ui/Badge";

// 格式化價格顯示
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("zh-TW", {
    style: "currency",
    currency: "TWD",
    minimumFractionDigits: 0,
  }).format(price);
};

// 獲取分類中文名稱
const getCategoryName = (category: string) => {
  const categoryMap: Record<string, string> = {
    technology: "科技",
    education: "教育",
    lifestyle: "生活",
    health: "健康",
    food: "美食",
    travel: "旅遊",
    entertainment: "娛樂",
    sports: "運動",
  };
  return categoryMap[category] || category;
};

// 獲取分類圖示
const getCategoryIcon = (category: string) => {
  const iconMap: Record<string, string> = {
    technology: "💻",
    education: "📚",
    lifestyle: "🏡",
    health: "💪",
    food: "🍜",
    travel: "✈️",
    entertainment: "🎮",
    sports: "⚽",
  };
  return iconMap[category] || "🔍";
};

interface WishDetailProps {
  wish: Wish;
}

export default function WishDetail({ wish }: WishDetailProps) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
      <div className="p-6">
        {/* 分類與狀態 */}
        <div className="flex flex-wrap justify-between items-center mb-4">
          <Badge className="bg-accent/70 hover:bg-accent text-accent-foreground">
            {getCategoryIcon(wish.category)} {getCategoryName(wish.category)}
          </Badge>
          {wish.isPinned && <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-800/30 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-800/40">⭐ 置頂</Badge>}
        </div>

        {/* 標題 */}
        <h1 className="text-2xl font-bold mb-4">{wish.title}</h1>

        {/* 用戶與價格資訊 */}
        <div className="flex flex-wrap justify-between items-center p-4 bg-accent/20 rounded-lg mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-medium">
              {wish.user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="font-medium">{wish.user.name}</div>
              <div className="text-sm text-muted-foreground">許願者</div>
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">預算金額</div>
            <div className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">{formatPrice(wish.price)}</div>
          </div>
        </div>

        {/* 描述內容 */}
        <div className="space-y-4 mb-6">
          <h2 className="font-semibold text-lg">詳細描述</h2>
          <div className="prose prose-sm max-w-none">
            {wish.description.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700 dark:text-gray-300">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* 底部資訊 */}
        <div className="text-sm text-muted-foreground border-t border-border pt-4 flex justify-between">
          <div>
            發布於{" "}
            {new Date(wish.createdAt).toLocaleDateString("zh-TW", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div>ID: {wish.id}</div>
        </div>
      </div>
    </div>
  );
}
