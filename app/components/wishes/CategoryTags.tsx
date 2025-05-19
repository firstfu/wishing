"use client";

import Link from "next/link";

// wishes/CategoryTags.tsx - 類別標籤元件
//
// 顯示所有許願分類，支援 icon、顏色、連結跳轉。
// 用於首頁熱門分類區塊，點擊可篩選對應分類。

// 分類定義，包含顏色
const categories = [
  { id: "technology", name: "科技", icon: "💻", color: "from-blue-500 to-indigo-500" },
  { id: "education", name: "教育", icon: "📚", color: "from-green-500 to-emerald-500" },
  { id: "lifestyle", name: "生活", icon: "🏡", color: "from-purple-500 to-violet-500" },
  { id: "health", name: "健康", icon: "💪", color: "from-red-500 to-rose-500" },
  { id: "food", name: "美食", icon: "🍜", color: "from-yellow-500 to-amber-500" },
  { id: "travel", name: "旅遊", icon: "✈️", color: "from-indigo-500 to-blue-500" },
  { id: "entertainment", name: "娛樂", icon: "🎮", color: "from-pink-500 to-fuchsia-500" },
  { id: "sports", name: "運動", icon: "⚽", color: "from-orange-500 to-amber-500" },
];

export default function CategoryTags() {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map(category => (
        <Link key={category.id} href={`/wishes?category=${category.id}`} className="group">
          <div className="flex items-center gap-2 p-2 rounded-full bg-accent hover:scale-105 transition-all duration-300 hover:shadow-md">
            <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-white shadow-sm group-hover:shadow`}>
              <span>{category.icon}</span>
            </div>
            <span className="pr-3 font-medium text-foreground/80 group-hover:text-foreground">{category.name}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
