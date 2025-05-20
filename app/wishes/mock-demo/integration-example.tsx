// integration-example.tsx
//
// 這個檔案示範如何將 mockdata 整合到現有的專案中
// 實際使用時，可以修改現有的 data.ts 檔案，將原本的函數替換為 mockdata 中的函數

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// 步驟1: 引入 mockdata 中的函數，而非 data.ts 中的函數
// 原本可能是這樣:
// import { getLatestWishes, getFeaturedWishes } from "@/app/lib/data";
// 替換為:
import { getMockLatestWishes, getMockFeaturedWishes } from "@/app/lib/mockdata";
import { Wish } from "@/app/components/wishes/WishCard";

// 步驟2: 在元件中使用 mock 函數

export default function IntegrationExample() {
  const [featuredWishes, setFeaturedWishes] = useState<Wish[]>([]);
  const [latestWishes, setLatestWishes] = useState<Wish[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        // 同時獲取熱門與最新許願
        const [featured, latest] = await Promise.all([
          getMockFeaturedWishes(), // 使用 mock 函數
          getMockLatestWishes(), // 使用 mock 函數
        ]);

        setFeaturedWishes(featured);
        setLatestWishes(latest);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-6 rounded-lg mb-8">
        <h1 className="text-2xl font-bold mb-3">整合示範</h1>
        <p className="mb-4">本頁面示範如何在應用中整合 mockdata。在真實應用中，你可以替換 data.ts 檔案中的函數， 使整個應用使用更真實的模擬資料，而不需要修改應用邏輯。</p>
        <div className="flex gap-3">
          <Link href="/wishes/mock-demo" className="bg-white px-4 py-2 rounded-md text-indigo-600 font-medium shadow-sm hover:shadow-md transition-shadow">
            返回 Demo 頁面
          </Link>
        </div>
      </div>

      {/* 整合步驟說明 */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">整合步驟</h2>
        <ol className="list-decimal list-inside space-y-3">
          <li>
            <span className="font-medium">識別需要替換的資料來源：</span>
            <p className="ml-6 mt-1 text-gray-600">檢查 app/lib/data.ts 中的函數，找出需要替換為更真實資料的函數。</p>
          </li>
          <li>
            <span className="font-medium">更新現有函數或建立包裝函數：</span>
            <p className="ml-6 mt-1 text-gray-600">你可以直接修改 data.ts 中的函數實現，或者創建包裝函數，內部呼叫 mockdata.ts 中的對應函數。 確保保持相同的函數簽名和返回格式。</p>
          </li>
          <li>
            <span className="font-medium">整合到整個應用：</span>
            <p className="ml-6 mt-1 text-gray-600">由於函數簽名保持不變，應用的其餘部分不需要做任何修改，就可以使用更真實的資料。</p>
          </li>
        </ol>
      </div>

      {/* 代碼示例 */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">代碼示例</h2>
        <p className="mb-4">下面是在 data.ts 中整合 mockdata 的方法：</p>

        <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
          {`// app/lib/data.ts
// 原本的實現
export async function getFeaturedWishes(): Promise<Wish[]> {
  // 原本的實現...
}

// 替換為:
import { getMockFeaturedWishes } from './mockdata';

export async function getFeaturedWishes(): Promise<Wish[]> {
  return getMockFeaturedWishes();
}

// 或使用直接重新導出:
export {
  getMockFeaturedWishes as getFeaturedWishes,
  getMockLatestWishes as getLatestWishes,
  // 其他需要替換的函數...
} from './mockdata';`}
        </pre>
      </div>

      {/* 資料展示 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 熱門許願 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">熱門許願 (getMockFeaturedWishes)</h2>

          {isLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {featuredWishes.slice(0, 3).map(wish => (
                <div key={wish.id} className="border border-gray-200 p-3 rounded">
                  <h3 className="font-medium">{wish.title}</h3>
                  <div className="flex justify-between mt-2 text-sm">
                    <span>{wish.user.name}</span>
                    <span className="text-indigo-600">${wish.price}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 最新許願 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">最新許願 (getMockLatestWishes)</h2>

          {isLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {latestWishes.slice(0, 3).map(wish => (
                <div key={wish.id} className="border border-gray-200 p-3 rounded">
                  <h3 className="font-medium">{wish.title}</h3>
                  <div className="flex justify-between mt-2 text-sm">
                    <span>{wish.user.name}</span>
                    <span className="text-indigo-600">${wish.price}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
