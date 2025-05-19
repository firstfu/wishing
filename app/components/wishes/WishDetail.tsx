// wishes/WishDetail.tsx - 願望詳情元件
import { Wish } from "./WishCard";
import { Button } from "@/app/components/ui/Button";
import Link from "next/link";

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

// 格式化價格顯示
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("zh-TW", {
    style: "currency",
    currency: "TWD",
    minimumFractionDigits: 0,
  }).format(price);
};

interface WishDetailProps {
  wish: Wish;
}

export default function WishDetail({ wish }: WishDetailProps) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* 許願頂部資訊 */}
      <div className="p-6">
        <div className="flex flex-wrap gap-2 items-center mb-4">
          {wish.isPinned && <div className="bg-gradient text-primary-foreground text-xs px-2 py-1 rounded-full">置頂</div>}
          <div className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(wish.category)}`}>{translateCategory(wish.category)}</div>
          <div className="text-xs text-muted-foreground ml-auto">發布於 {new Date(wish.createdAt).toLocaleDateString("zh-TW")}</div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold mb-4">{wish.title}</h1>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center text-lg font-medium">{wish.user.name.charAt(0)}</div>
            <div>
              <div className="font-medium">{wish.user.name}</div>
              <div className="text-xs text-muted-foreground">用戶 ID: {wish.user.id}</div>
            </div>
          </div>
          <div className="text-2xl font-bold text-primary">{formatPrice(wish.price)}</div>
        </div>

        {/* 許願詳細描述 */}
        <div className="prose prose-stone dark:prose-invert max-w-none mb-6">
          {wish.description.split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* 操作按鈕 */}
        <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
          <Button size="lg" className="rounded-full px-6 bg-gradient">
            聯繫發布者
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-6">
            分享
          </Button>
          <Link href="/wishes" className="ml-auto">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <span className="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                </svg>
              </span>
              返回許願列表
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
