// wishes/WishesHeader.tsx - 願望列表頁頭部組件
//
// 用途：提供願望列表頁的搜尋和排序功能區塊。
// 功能：
// - 搜尋框：允許用戶使用關鍵詞搜尋願望
// - 排序選擇器：提供多種排序選項（最新、熱門、價格高低等）
// - 可保留並同步當前搜尋和排序條件到 URL
// - 表單提交時觸發搜尋行為
// - 採用響應式設計，在移動裝置上自適應
//
// 本組件與 WishesList 和 WishesFilter 配合使用，共同構成願望瀏覽的完整界面。

"use client";

import React, { useState, FormEvent } from "react";
import { useRouter, usePathname } from "next/navigation";

// 許願池 WishesHeader 元件
// ---------------------------------------------
// 用途：
//   - 許願列表搜尋與排序元件。
//   - 提供搜尋框與排序選項，支援即時查詢與切換排序，更新 URL 參數。
//   - 用於 /wishes 頁面頂部，與 WishesList、WishesFilter 搭配。
// 主要 Props：
//   - search: 預設搜尋字串（選填）
//   - sort: 預設排序方式（選填，預設 latest）
// 用法範例：
//   <WishesHeader search={search} sort={sort} />
// 設計重點：
//   - 支援即時搜尋與排序切換
//   - 變更時自動更新 URL 參數
//   - 響應式設計，適合桌機與行動裝置
// ---------------------------------------------

interface WishesHeaderProps {
  search?: string;
  sort?: string;
}

export default function WishesHeader({ search = "", sort = "latest" }: WishesHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState(search);

  // 處理搜尋提交
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    // 生成搜尋查詢參數
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (sort && sort !== "latest") params.set("sort", sort);

    // 導航到包含搜尋參數的頁面
    router.push(`${pathname}?${params.toString()}`);
  };

  // 處理排序變更
  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (newSort && newSort !== "latest") params.set("sort", newSort);

    router.push(`${pathname}?${params.toString()}`);
  };

  // 排序選項
  const sortOptions = [
    { value: "latest", label: "最新發布" },
    { value: "oldest", label: "最舊發布" },
    { value: "price_low", label: "價格低至高" },
    { value: "price_high", label: "價格高至低" },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-5 shadow-custom">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* 搜尋表單 */}
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="搜尋許願..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full rounded-full border border-input py-2 pl-4 pr-10 bg-background focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
              aria-label="搜尋"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
          </div>
        </form>

        {/* 排序選項 */}
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-sm text-muted-foreground mr-1">排序:</span>
          <div className="flex flex-wrap gap-2">
            {sortOptions.map(option => (
              <button
                key={option.value}
                onClick={() => handleSortChange(option.value)}
                className={`text-sm px-3 py-1 rounded-full transition-colors ${
                  sort === option.value ? "bg-primary text-primary-foreground" : "bg-accent text-foreground hover:bg-accent/80"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
