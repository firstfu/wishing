"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { mockUsers, mockWishes, mockComments, getMockLatestWishes, getMockWishesByFilter } from "@/app/lib/mockdata";
import { Wish } from "@/app/components/wishes/WishCard";

// 簡單的願望卡片元件
function WishCard({ wish }: { wish: Wish }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
      <h3 className="text-lg font-medium mb-2">{wish.title}</h3>
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{wish.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-pink-600 font-medium">{wish.price > 0 ? `$${wish.price}` : "免費"}</span>
        <span className="text-gray-500 text-sm">{wish.user.name}</span>
      </div>
    </div>
  );
}

// 使用者卡片元件
function UserCard({ user }: { user: (typeof mockUsers)[0] }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-medium mb-1">{user.name}</h3>
      <p className="text-gray-600 text-sm mb-2">{user.occupation}</p>
      <p className="text-gray-500 text-xs">{user.location}</p>
    </div>
  );
}

export default function MockDataDemo() {
  const [latestWishes, setLatestWishes] = useState<Wish[]>([]);
  const [filteredWishes, setFilteredWishes] = useState<Wish[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState("");

  // 載入最新許願
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const wishes = await getMockLatestWishes();
        setLatestWishes(wishes);
      } catch (error) {
        console.error("Error loading wishes:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  // 根據類別篩選許願
  useEffect(() => {
    async function filterWishes() {
      setIsLoading(true);
      try {
        const result = await getMockWishesByFilter("", category);
        setFilteredWishes(result.wishes.slice(0, 3));
      } catch (error) {
        console.error("Error filtering wishes:", error);
      } finally {
        setIsLoading(false);
      }
    }

    filterWishes();
  }, [category]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">許願池 Mock 資料展示</h1>

      {/* 導覽列與說明 */}
      <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-3">關於 Mock 資料</h2>
        <p className="mb-4">
          這個頁面展示了如何使用 <code className="bg-white px-2 py-1 rounded">app/lib/mockdata.ts</code> 中的模擬資料。這些資料接近真實場景，具有台灣風格的人名和情境。
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/" className="bg-white px-4 py-2 rounded-md text-pink-600 font-medium shadow-sm hover:shadow-md transition-shadow">
            返回首頁
          </Link>
          <Link href="/wishes" className="bg-white px-4 py-2 rounded-md text-purple-600 font-medium shadow-sm hover:shadow-md transition-shadow">
            查看許願列表
          </Link>
        </div>
      </div>

      {/* 用戶資料展示 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">用戶資料</h2>
        <p className="mb-4">以下是部分模擬用戶資料，每個用戶都有完整的基本資料、職業和地區等信息。</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockUsers.slice(0, 8).map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </section>

      {/* 最新許願展示 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">最新許願</h2>
        <p className="mb-4">
          使用 <code className="bg-gray-100 px-2 py-1 rounded">getMockLatestWishes()</code> 函數獲取的最新許願。
        </p>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-200 h-40 rounded-lg"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {latestWishes.slice(0, 3).map(wish => (
              <WishCard key={wish.id} wish={wish} />
            ))}
          </div>
        )}
      </section>

      {/* 類別篩選展示 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">類別篩選</h2>
        <p className="mb-4">
          使用 <code className="bg-gray-100 px-2 py-1 rounded">getMockWishesByFilter()</code> 函數根據類別篩選許願。
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <button className={`px-3 py-1 rounded-full ${category === "" ? "bg-pink-600 text-white" : "bg-gray-200"}`} onClick={() => setCategory("")}>
            全部
          </button>
          <button className={`px-3 py-1 rounded-full ${category === "education" ? "bg-pink-600 text-white" : "bg-gray-200"}`} onClick={() => setCategory("education")}>
            教育
          </button>
          <button className={`px-3 py-1 rounded-full ${category === "technology" ? "bg-pink-600 text-white" : "bg-gray-200"}`} onClick={() => setCategory("technology")}>
            科技
          </button>
          <button className={`px-3 py-1 rounded-full ${category === "lifestyle" ? "bg-pink-600 text-white" : "bg-gray-200"}`} onClick={() => setCategory("lifestyle")}>
            生活
          </button>
          <button className={`px-3 py-1 rounded-full ${category === "health" ? "bg-pink-600 text-white" : "bg-gray-200"}`} onClick={() => setCategory("health")}>
            健康
          </button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-200 h-40 rounded-lg"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredWishes.map(wish => (
              <WishCard key={wish.id} wish={wish} />
            ))}
          </div>
        )}
      </section>

      {/* 留言資料展示 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">留言資料</h2>
        <p className="mb-4">mockdata.ts 中包含真實風格的留言和對話，以下是一些範例：</p>

        <div className="space-y-4">
          {mockComments.slice(0, 3).map(comment => (
            <div key={comment.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between mb-2">
                <span className="font-medium">{comment.user.name}</span>
                <span className="text-gray-500 text-sm">{new Date(comment.createdAt).toLocaleDateString("zh-TW")}</span>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 使用說明 */}
      <section className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">如何使用 Mock 資料</h2>
        <div className="prose max-w-none">
          <p>從 mockdata.ts 引入需要的資料和函數：</p>
          <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
            {`import {
  mockUsers,
  mockWishes,
  mockComments,
  getMockLatestWishes,
  getMockWishesByFilter
} from '@/app/lib/mockdata';`}
          </pre>

          <p className="mt-4">使用範例：</p>
          <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
            {`// 取得最新許願
const latestWishes = await getMockLatestWishes();

// 根據條件篩選許願
const result = await getMockWishesByFilter('', 'education', 'latest', 1, 10);
const filteredWishes = result.wishes;

// 取得單一許願詳情
const wish = await getMockWishById('wish-1');

// 取得相關許願
const relatedWishes = await getMockRelatedWishes('wish-1', 'education');`}
          </pre>

          <p className="mt-4">可以更新 app/lib/data.ts 中的函數，替換為 mockdata.ts 中的函數，使整個應用程序使用更真實的資料。</p>
        </div>
      </section>
    </div>
  );
}
