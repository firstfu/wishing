// ====================================================================
// wishes/components/CategoryTags.tsx - 分類標籤元件
// ====================================================================
// 作用：顯示許願分類標籤並提供選擇功能
// 功能：
// - 以橫向滾動形式展示多個分類
// - 支持選中狀態顯示
// - 點擊時觸發選擇回調
// ====================================================================

"use client";

import { useState, useRef, useEffect } from "react";
import { Badge } from "@/app/components/ui/Badge";

export interface Category {
  id: string;
  name: string;
  icon: string;
}

interface CategoryTagsProps {
  categories: Category[];
  selectedCategory?: string;
  onSelectCategory: (id: string) => void;
}

export default function CategoryTags({ categories, selectedCategory, onSelectCategory }: CategoryTagsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // 檢查是否需要顯示滾動按鈕
  useEffect(() => {
    if (containerRef.current) {
      const element = containerRef.current;
      const checkScrollButtons = () => {
        setShowScrollButtons(element.scrollWidth > element.clientWidth);
        setCanScrollLeft(element.scrollLeft > 0);
        setCanScrollRight(element.scrollLeft < element.scrollWidth - element.clientWidth);
      };

      // 初始檢查
      checkScrollButtons();

      // 監聽滾動事件
      element.addEventListener("scroll", checkScrollButtons);
      window.addEventListener("resize", checkScrollButtons);

      return () => {
        element.removeEventListener("scroll", checkScrollButtons);
        window.removeEventListener("resize", checkScrollButtons);
      };
    }
  }, []);

  // 處理滾動
  const handleScroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 200; // 每次滾動量
      const currentScroll = containerRef.current.scrollLeft;
      containerRef.current.scrollTo({
        left: direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      {/* 滾動按鈕 - 左側 */}
      {showScrollButtons && (
        <button
          onClick={() => handleScroll("left")}
          disabled={!canScrollLeft}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-background shadow-md border border-border ${
            !canScrollLeft ? "opacity-30 cursor-not-allowed" : "hover:bg-accent"
          }`}
          aria-label="Scroll left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path
              fillRule="evenodd"
              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}

      {/* 分類標籤容器 */}
      <div
        ref={containerRef}
        className="flex overflow-x-auto pb-2 scrollbar-none scroll-smooth px-2 -mx-2"
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE and Edge
        }}
      >
        <Badge
          onClick={() => onSelectCategory("")}
          className={`px-4 py-2 mr-2 cursor-pointer text-sm transition-colors whitespace-nowrap ${
            !selectedCategory ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-muted hover:bg-muted/80 text-foreground/70"
          }`}
        >
          🔍 全部類別
        </Badge>

        {categories.map(category => (
          <Badge
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`px-4 py-2 mr-2 cursor-pointer text-sm transition-colors whitespace-nowrap ${
              selectedCategory === category.id ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-muted hover:bg-muted/80 text-foreground/70"
            }`}
          >
            {category.icon} {category.name}
          </Badge>
        ))}
      </div>

      {/* 滾動按鈕 - 右側 */}
      {showScrollButtons && (
        <button
          onClick={() => handleScroll("right")}
          disabled={!canScrollRight}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-background shadow-md border border-border ${
            !canScrollRight ? "opacity-30 cursor-not-allowed" : "hover:bg-accent"
          }`}
          aria-label="Scroll right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path
              fillRule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}

      {/* 漸變模糊效果，提示可滾動 */}
      {canScrollLeft && <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>}
      {canScrollRight && <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>}
    </div>
  );
}
