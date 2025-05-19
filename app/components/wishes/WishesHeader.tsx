"use client";

import { useState, FormEvent } from "react";
import { useRouter, usePathname } from "next/navigation";

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
