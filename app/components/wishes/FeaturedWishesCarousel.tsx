"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

import { Wish } from "./WishCard";
import { cn } from "@/app/lib/utils";
import { Badge } from "@/app/components/ui/Badge";
import { Button } from "@/app/components/ui/Button";

// 獲取分類名稱對應的顏色和中文名稱
const getCategoryInfo = (category: string) => {
  const categoryMap: Record<string, { color: string; name: string }> = {
    technology: { color: "bg-blue-100 text-blue-600", name: "科技" },
    education: { color: "bg-green-100 text-green-600", name: "教育" },
    lifestyle: { color: "bg-purple-100 text-purple-600", name: "生活" },
    health: { color: "bg-red-100 text-red-600", name: "健康" },
    food: { color: "bg-yellow-100 text-yellow-600", name: "美食" },
    travel: { color: "bg-indigo-100 text-indigo-600", name: "旅遊" },
    entertainment: { color: "bg-pink-100 text-pink-600", name: "娛樂" },
    sports: { color: "bg-orange-100 text-orange-600", name: "運動" },
  };
  return categoryMap[category] || { color: "bg-gray-100 text-gray-600", name: "其他" };
};

// 格式化價格顯示
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("zh-TW", {
    style: "currency",
    currency: "TWD",
    minimumFractionDigits: 0,
  }).format(price);
};

export default function FeaturedWishesCarousel({ wishes }: { wishes: Wish[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const nextSlide = useCallback(() => {
    setActiveIndex(current => (current === wishes.length - 1 ? 0 : current + 1));
  }, [wishes.length]);

  const prevSlide = useCallback(() => {
    setActiveIndex(current => (current === 0 ? wishes.length - 1 : current - 1));
  }, [wishes.length]);

  // 自動輪播
  useEffect(() => {
    if (!isPaused && wishes.length > 1) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [isPaused, nextSlide, wishes.length]);

  // 觸控滑動事件處理
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // 左滑
      nextSlide();
    }

    if (touchStart - touchEnd < -100) {
      // 右滑
      prevSlide();
    }
  };

  // 如果沒有許願，顯示一個空的占位元件
  if (!wishes.length) {
    return (
      <div className="h-96 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center">
        <p className="text-muted-foreground">目前沒有置頂許願</p>
      </div>
    );
  }

  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 背景裝飾元素 */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 opacity-70"></div>
      <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-white/30 to-transparent"></div>
      <div className="absolute left-20 top-20 w-32 h-32 rounded-full bg-blue-200/20 blur-3xl"></div>
      <div className="absolute right-20 bottom-20 w-40 h-40 rounded-full bg-pink-200/30 blur-3xl"></div>

      {/* 輪播內容 */}
      <div className="relative h-[460px] transition-all duration-500 ease-in-out">
        {wishes.map((wish, index) => {
          const isActive = index === activeIndex;
          const categoryInfo = getCategoryInfo(wish.category);

          return (
            <div
              key={wish.id}
              className={cn("absolute inset-0 transition-opacity duration-500 ease-in-out grid grid-cols-1 md:grid-cols-12", isActive ? "opacity-100 z-10" : "opacity-0 z-0")}
            >
              {/* 左側內容 */}
              <div className="md:col-span-6 flex flex-col justify-center p-8 md:p-12 z-20">
                {/* 置頂標籤 */}
                <div className="mb-6 flex items-center">
                  <span className="inline-flex items-center gap-1 bg-pink-50 border border-pink-200 text-pink-600 px-3 py-1 rounded-full text-sm font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    置頂
                  </span>
                  <span className="mx-3 text-gray-300">|</span>
                  <Badge className={`${categoryInfo.color} border-none`}>{categoryInfo.name}</Badge>
                </div>

                {/* 標題與描述 */}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 line-clamp-2">{wish.title}</h2>
                <p className="text-gray-600 mb-6 line-clamp-3">{wish.description.split("\n")[0]}</p>

                {/* 價格與時間 */}
                <div className="mb-8">
                  <span className="text-2xl font-bold text-pink-600">{formatPrice(wish.price)}</span>
                  <span className="text-gray-500 text-sm ml-3">{new Date(wish.createdAt).toLocaleDateString("zh-TW")}</span>
                </div>

                {/* 用戶資訊與按鈕 */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-400 to-pink-400 flex items-center justify-center text-white font-medium">
                      {wish.user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{wish.user.name}</p>
                      <p className="text-xs text-gray-500">願望發布者</p>
                    </div>
                  </div>
                  <Link href={`/wishes/${wish.id}`}>
                    <Button className="bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white rounded-full px-6">查看詳情</Button>
                  </Link>
                </div>
              </div>

              {/* 右側圖案/圖片 */}
              <div className="hidden md:flex md:col-span-6 items-center justify-center relative z-10">
                <div className="w-64 h-64 rounded-full bg-gradient-to-r from-indigo-200 to-pink-200 flex items-center justify-center shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-24 h-24 text-white">
                    <path d="M11.644 1.59a.75.75 0 0 1 .712 0l9.75 5.25a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.712 0l-9.75-5.25a.75.75 0 0 1 0-1.32l9.75-5.25Z" />
                    <path d="m3.265 10.602 7.668 4.129a2.25 2.25 0 0 0 2.134 0l7.668-4.13 1.37.739a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.71 0l-9.75-5.25a.75.75 0 0 1 0-1.32l1.37-.738Z" />
                    <path d="m10.933 19.231-7.668-4.13-1.37.739a.75.75 0 0 0 0 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 0 0 0-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 0 1-2.134-.001Z" />
                  </svg>
                </div>
                <div className="absolute -left-10 top-1/4 w-20 h-20 rounded-full bg-blue-100"></div>
                <div className="absolute right-16 bottom-20 w-12 h-12 rounded-full bg-pink-100"></div>
                <div className="absolute right-32 top-16 w-16 h-16 rounded-full bg-yellow-100"></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 輪播控制按鈕 */}
      {wishes.length > 1 && (
        <>
          <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-20" onClick={prevSlide} aria-label="上一個">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-gray-600"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-20" onClick={nextSlide} aria-label="下一個">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-gray-600"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </>
      )}

      {/* 分頁指示器 */}
      {wishes.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
          {wishes.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn("w-2 h-2 rounded-full transition-all duration-300", index === activeIndex ? "bg-pink-500 w-6" : "bg-gray-300 hover:bg-gray-400")}
              aria-label={`跳到第${index + 1}頁`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
