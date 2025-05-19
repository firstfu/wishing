"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import WishCard, { Wish } from "@/app/components/wishes/WishCard";
import { getWishesByFilter } from "@/app/lib/data";
import { Button } from "@/app/components/ui/Button";

// 許願池 WishesList 元件
// ---------------------------------------------
// 用途：
//   - 根據搜尋、分類、價格、排序等參數取得許願資料，並顯示分頁、無結果提示。
//   - 主要用於 /wishes 頁面，支援分頁切換、動態資料載入、骨架屏。
// 主要 Props：
//   - search: 搜尋字串（選填）
//   - category: 分類（選填）
//   - sort: 排序方式（選填，預設 latest）
//   - page: 當前頁碼（選填，預設 1）
//   - minPrice: 最低價格（選填）
//   - maxPrice: 最高價格（選填）
// 用法範例：
//   <WishesList search={search} category={category} sort={sort} page={page} minPrice={minPrice} maxPrice={maxPrice} />
// 設計重點：
//   - 動態取得資料，支援 loading 狀態
//   - 分頁控制與 URL 參數同步
//   - 無結果時顯示提示
// ---------------------------------------------

interface WishesListProps {
  search?: string;
  category?: string;
  sort?: string;
  page?: number;
  minPrice?: number;
  maxPrice?: number;
}

export default function WishesList({ search = "", category = "", sort = "latest", page = 1, minPrice, maxPrice }: WishesListProps) {
  const [wishesData, setWishesData] = useState<{ wishes: Wish[]; total: number }>({ wishes: [], total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getWishesByFilter(
          search,
          category,
          sort,
          page,
          9, // 每頁數量
          minPrice,
          maxPrice
        );
        setWishesData(data);
      } catch (error) {
        console.error("獲取許願資料失敗:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search, category, sort, page, minPrice, maxPrice]);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, index) => (
            <div key={index} className="h-64 bg-muted rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  // 計算分頁信息
  const totalPages = Math.ceil(wishesData.total / 9);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  // 構建分頁URL生成器 - 改為普通函數
  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category) params.set("category", category);
    if (sort && sort !== "latest") params.set("sort", sort);
    if (minPrice) params.set("minPrice", minPrice.toString());
    if (maxPrice) params.set("maxPrice", maxPrice.toString());
    params.set("page", pageNumber.toString());

    return `?${params.toString()}`;
  };

  // 生成頁碼數組
  const pageNumbers = [];
  const maxPageButtons = 5;
  let startPage = Math.max(1, page - Math.floor(maxPageButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // 沒有結果時的提示
  if (wishesData.wishes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mb-4 text-5xl">🔍</div>
        <h3 className="text-xl font-semibold mb-2">未找到符合條件的許願</h3>
        <p className="text-muted-foreground mb-6">嘗試更改搜尋條件或瀏覽所有許願</p>
        <Link href="/wishes">
          <Button className="rounded-full px-6">查看所有許願</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <p className="text-muted-foreground mb-6">
        找到 <strong>{wishesData.total}</strong> 個符合條件的許願
      </p>

      {/* 許願卡片網格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {wishesData.wishes.map(wish => (
          <WishCard key={wish.id} wish={wish} />
        ))}
      </div>

      {/* 分頁控制 */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex items-center gap-1">
            <Link
              href={hasPrevPage ? createPageURL(page - 1) : "#"}
              className={`w-10 h-10 rounded-md flex items-center justify-center border
                ${hasPrevPage ? "border-border hover:bg-accent" : "border-border/40 text-muted-foreground cursor-not-allowed"}`}
              aria-disabled={!hasPrevPage}
            >
              <span className="sr-only">上一頁</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </Link>

            {pageNumbers.map(num => (
              <Link
                key={num}
                href={createPageURL(num)}
                className={`w-10 h-10 rounded-md flex items-center justify-center border
                  ${num === page ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-accent"}`}
              >
                {num}
              </Link>
            ))}

            <Link
              href={hasNextPage ? createPageURL(page + 1) : "#"}
              className={`w-10 h-10 rounded-md flex items-center justify-center border
                ${hasNextPage ? "border-border hover:bg-accent" : "border-border/40 text-muted-foreground cursor-not-allowed"}`}
              aria-disabled={!hasNextPage}
            >
              <span className="sr-only">下一頁</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
