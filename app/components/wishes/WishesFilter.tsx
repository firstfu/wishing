"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/app/components/ui/Button";
import { getCategories } from "@/app/lib/data";

// wishes/WishesFilter.tsx - 願望篩選側邊欄組件
//
// 用途：提供願望列表的進階篩選功能，包括分類和價格範圍篩選。
// 功能：
// - 分類選擇器：以圖標和名稱顯示所有願望分類
// - 價格範圍篩選：提供最低和最高價格輸入
// - 篩選條件應用和重置功能
// - 將篩選條件同步到 URL 參數
// - 支援響應式設計，在移動裝置上可折疊顯示
// - 自動獲取可用分類列表
//
// 本組件與 WishesHeader 和 WishesList 配合使用，提供完整的願望瀏覽體驗。

// 篩選器組件Props類型定義
interface WishesFilterProps {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export default function WishesFilter({ category = "", minPrice, maxPrice }: WishesFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 狀態
  const [categories, setCategories] = useState<{ id: string; name: string; icon: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [priceRange, setPriceRange] = useState<{
    min?: number;
    max?: number;
  }>({ min: minPrice, max: maxPrice });

  // 獲取分類數據
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // 應用篩選器處理函數
  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    // 更新分類
    if (selectedCategory) {
      params.set("category", selectedCategory);
    } else {
      params.delete("category");
    }

    // 更新價格範圍
    if (priceRange.min) {
      params.set("minPrice", priceRange.min.toString());
    } else {
      params.delete("minPrice");
    }

    if (priceRange.max) {
      params.set("maxPrice", priceRange.max.toString());
    } else {
      params.delete("maxPrice");
    }

    // 如果有頁碼參數，重設回第一頁
    if (params.has("page")) {
      params.set("page", "1");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  // 重設篩選器
  const resetFilters = () => {
    setSelectedCategory("");
    setPriceRange({ min: undefined, max: undefined });

    // 保留搜尋和排序參數，刪除其他篩選參數
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    params.delete("minPrice");
    params.delete("maxPrice");
    params.delete("page");

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-5 shadow-custom sticky top-24">
      <h2 className="text-xl font-bold mb-6">篩選條件</h2>

      {/* 分類篩選 */}
      <div className="mb-6">
        <h3 className="text-md font-semibold mb-3">類別</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(selectedCategory === cat.id ? "" : cat.id)}
              className={`flex items-center gap-1 text-sm px-3 py-1.5 rounded-full transition-colors ${
                selectedCategory === cat.id ? "bg-primary text-primary-foreground" : "bg-accent text-foreground hover:bg-accent/80"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 價格範圍 */}
      <div className="mb-6">
        <h3 className="text-md font-semibold mb-3">價格範圍</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="min-price" className="block text-sm text-muted-foreground mb-1">
              最低價格
            </label>
            <input
              id="min-price"
              type="number"
              min="0"
              placeholder="最低"
              value={priceRange.min || ""}
              onChange={e =>
                setPriceRange({
                  ...priceRange,
                  min: e.target.value ? parseInt(e.target.value) : undefined,
                })
              }
              className="w-full rounded-md border border-input py-1.5 px-3 bg-background focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label htmlFor="max-price" className="block text-sm text-muted-foreground mb-1">
              最高價格
            </label>
            <input
              id="max-price"
              type="number"
              min="0"
              placeholder="最高"
              value={priceRange.max || ""}
              onChange={e =>
                setPriceRange({
                  ...priceRange,
                  max: e.target.value ? parseInt(e.target.value) : undefined,
                })
              }
              className="w-full rounded-md border border-input py-1.5 px-3 bg-background focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
            />
          </div>
        </div>
      </div>

      {/* 按鈕 */}
      <div className="flex gap-3">
        <Button onClick={applyFilters} className="flex-1 rounded-full bg-primary hover:bg-primary/90">
          套用篩選
        </Button>
        <Button variant="outline" onClick={resetFilters} className="rounded-full">
          重設
        </Button>
      </div>
    </div>
  );
}
