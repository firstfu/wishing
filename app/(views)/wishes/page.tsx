// ====================================================================
// wishes/page.tsx - 許願池許願列表頁面
// ====================================================================
// 提供完整的許願瀏覽功能，包含搜尋、排序、篩選和分類功能。
// 使用響應式網格佈局顯示許願卡片，支援無限滾動載入更多內容。
// 頁面集成了多個子元件，如 WishesHeader（搜尋和排序）、WishesFilter（篩選）和 WishesList（列表顯示）。
// 實現動態 URL 查詢參數處理，用戶可以直接分享特定篩選條件的頁面。
// 包含載入狀態顯示和骨架屏幕，提升使用者體驗。
// 頁面會根據 URL 參數自動套用搜尋、過濾和排序條件，實現無痕 URL 狀態同步。
// ====================================================================
import React from "react";
import { Suspense } from "react";
import WishesHeader from "./components/WishesHeader";
import WishesList from "./components/WishesList";
import WishesFilter from "./components/WishesFilter";
import { Button } from "@/app/components/ui/Button";
import Link from "next/link";

// 載入狀態組件
function LoadingState() {
  return (
    <div className="animate-pulse mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(9)].map((_, index) => (
          <div key={index} className="h-64 bg-muted rounded-lg"></div>
        ))}
      </div>
    </div>
  );
}

// 許願列表主組件
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function WishesPage(props: any) {
  // 從 props 中解構 searchParams
  const { searchParams = {} } = props;

  // 處理搜尋參數
  const search = typeof searchParams.search === "string" ? searchParams.search : "";
  const category = typeof searchParams.category === "string" ? searchParams.category : "";
  const sort = typeof searchParams.sort === "string" ? searchParams.sort : "latest";
  const page = typeof searchParams.page === "string" ? parseInt(searchParams.page) : 1;
  const minPrice = typeof searchParams.minPrice === "string" ? parseInt(searchParams.minPrice) : undefined;
  const maxPrice = typeof searchParams.maxPrice === "string" ? parseInt(searchParams.maxPrice) : undefined;

  return (
    <div className="bg-background">
      {/* 頂部橫幅 */}
      <section className="relative overflow-hidden">
        {/* 背景漸層 */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-pink-400"></div>

        {/* 幾何形狀裝飾元素 */}
        <div className="absolute top-10 right-[5%] w-32 h-32 bg-gradient-to-tr from-pink-300/30 to-purple-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-[10%] w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 left-[15%] w-12 h-12 bg-white/10 rounded-full"></div>
        <div className="absolute top-1/3 right-[20%] w-16 h-16 bg-white/10 rounded-full"></div>

        {/* 圓點網格裝飾 */}
        <div className="absolute inset-0 bg-[url('/grid-dots.svg')] opacity-20"></div>

        {/* 內容區域 */}
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-3xl animate-fade-in">
            <div className="inline-block px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm mb-6">
              <span className="text-sm font-medium text-white">✨ 尋找許願</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-sm">
              探索<span className="relative bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-100 font-black px-1">願望世界</span>
            </h1>
            <p className="text-lg md:text-xl text-white mb-8 drop-shadow-sm">瀏覽所有許願，或使用篩選器找到您感興趣的內容</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/wishes/create">
                <Button
                  size="lg"
                  className="rounded-full px-8 py-6 bg-white text-pink-600 hover:bg-white/90 hover:shadow-lg font-bold hover:shadow-pink-700/20 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2">
                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                  </svg>
                  發布許願
                </Button>
              </Link>
              <Link href="#wishList">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 py-6 border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2">
                    <path
                      fillRule="evenodd"
                      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 012 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                  瀏覽列表
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* 半透明波浪效果 */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/10 to-transparent"></div>
      </section>

      <div id="wishList" className="container mx-auto px-4 pb-16">
        {/* 搜尋和篩選頭部 */}
        <WishesHeader search={search} sort={sort} />

        <div className="flex flex-col lg:flex-row gap-8 mt-6">
          {/* 篩選側邊欄 */}
          <div className="lg:w-1/4">
            <WishesFilter category={category} minPrice={minPrice} maxPrice={maxPrice} />

            {/* 側邊欄中添加發布許願按鈕 */}
            <div className="mt-8 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-pink-100">
              <h3 className="font-bold text-lg mb-2 text-pink-800">還沒找到合適的？</h3>
              <p className="text-sm text-gray-600 mb-4">發布您自己的許願，讓社群了解您的需求</p>
              <Link href="/wishes/create" className="w-full block">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-md hover:shadow-pink-500/20">發布許願</Button>
              </Link>
            </div>

            {/* 用戶推薦卡片 */}
            <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">王</span>
                </div>
                <div>
                  <div className="font-medium">王大華</div>
                  <div className="text-xs text-gray-500">台北市 • 軟體工程師</div>
                </div>
              </div>

              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-yellow-400">
                    <path
                      fillRule="evenodd"
                      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>

              <blockquote className="text-sm text-gray-600 italic mb-2">
                「我在許願池找到了幫我解決程式問題的專家，他們不只解決了技術問題，還教會了我解決類似問題的思路。這種專業交流在其他平台上很難找到。」
              </blockquote>
              <p className="text-xs text-blue-600 font-medium">最近完成了3個願望</p>
            </div>
          </div>

          {/* 許願列表 */}
          <div className="lg:w-3/4">
            <Suspense fallback={<LoadingState />}>
              <WishesList search={search} category={category} sort={sort} page={page} minPrice={minPrice} maxPrice={maxPrice} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
