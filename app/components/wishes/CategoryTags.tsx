"use client";

import Link from "next/link";

// 模擬分類數據
const categories = [
  { id: "technology", name: "科技" },
  { id: "education", name: "教育" },
  { id: "lifestyle", name: "生活" },
  { id: "health", name: "健康" },
  { id: "food", name: "美食" },
  { id: "travel", name: "旅遊" },
  { id: "entertainment", name: "娛樂" },
  { id: "sports", name: "運動" },
];

export default function CategoryTags() {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map(category => (
        <Link
          key={category.id}
          href={`/wishes?category=${category.id}`}
          className="inline-flex items-center justify-center rounded-full px-3 py-1 text-sm bg-accent hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}
