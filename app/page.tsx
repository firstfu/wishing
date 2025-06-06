// page.tsx - 許願池網站首頁
//
// 網站的主入口頁面，展示平台核心功能和內容亮點。
// 包含引人注目的英雄區塊，介紹平台願景和核心價值主張。
// 展示熱門分類、置頂願望輪播、最新願望列表等關鍵內容。
// 使用 Server Components 進行資料獲取，確保內容的 SEO 友好。
// 實現骨架屏幕和懶加載功能，優化使用者首次加載體驗。
// 整合 CTAs（行動召喚按鈕），引導用戶發布願望或瀏覽更多內容。
// 設計響應式佈局，針對各種裝置和螢幕尺寸進行優化。
// 頁面間元素使用漸變動畫和交互效果，增強視覺吸引力和用戶體驗。

import { Suspense } from "react";
import { getLatestWishes, getFeaturedWishes } from "@/app/lib/data";
import LatestWishesListClientWrapper from "@/app/components/wishes/LatestWishesListClientWrapper";
import CategoryTags from "@/app/components/wishes/CategoryTags";
import { Button } from "@/app/components/ui/Button";
import Link from "next/link";
import FeaturedWishesCarousel from "@/app/components/wishes/FeaturedWishesCarousel";

// 載入狀態組件
function LoadingState() {
  return (
    <div className="animate-pulse">
      <div className="h-60 bg-muted rounded-lg mb-8"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="h-60 bg-muted rounded-lg"></div>
        ))}
      </div>
    </div>
  );
}

// 模擬熱門許願數據
const trendingWishes = [
  {
    id: "trend1",
    title: "一起來海邊淨灘",
    description: "希望能找到志同道合的朋友，一起到北海岸進行淨灘活動，為環保盡一份心力。",
    price: 0,
    category: "環保",
    status: "open",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    user: {
      id: "user1",
      name: "環保達人",
      avatar: "/avatars/user1.jpg",
    },
    viewCount: 358,
    commentCount: 24,
  },
  {
    id: "trend2",
    title: "需要程式開發導師指導",
    description: "正在自學React和Next.js，希望能找到有經驗的開發者給予一些指導和建議。",
    price: 500,
    category: "教育",
    status: "open",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    user: {
      id: "user2",
      name: "程式新手",
      avatar: "/avatars/user2.jpg",
    },
    viewCount: 246,
    commentCount: 18,
  },
  {
    id: "trend3",
    title: "找尋共同創業夥伴",
    description: "有一個關於永續時尚的創業想法，正在尋找有設計或行銷背景的夥伴一起實現。",
    price: 0,
    category: "創業",
    status: "open",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    user: {
      id: "user3",
      name: "綠色創業家",
      avatar: "/avatars/user3.jpg",
    },
    viewCount: 302,
    commentCount: 29,
  },
];

// 展示熱門許願
function TrendingWishesDisplay() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {trendingWishes.map(wish => (
        <Link
          href={`/wishes/${wish.id}`}
          key={wish.id}
          className="group bg-card rounded-xl overflow-hidden border border-muted shadow-sm hover:shadow-md transition-all duration-200"
        >
          <div className="relative bg-gradient-to-tr from-pink-100 to-purple-50 p-6 h-48 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-white/90 text-pink-600 hover:bg-white ring-1 ring-inset ring-pink-200">
                {wish.category}
              </span>

              <div className="flex items-center text-sm text-muted-foreground">
                <span className="flex items-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1">
                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    <path
                      fillRule="evenodd"
                      d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {wish.viewCount}
                </span>
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1">
                    <path
                      fillRule="evenodd"
                      d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 0-1.5h-9Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {wish.commentCount}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 line-clamp-1 group-hover:text-pink-600 transition-colors">{wish.title}</h3>
              <p className="text-muted-foreground line-clamp-2">{wish.description}</p>
            </div>
          </div>

          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <span className="text-xs font-medium">{wish.user.name.charAt(0).toUpperCase()}</span>
              </div>
              <span className="text-sm font-medium">{wish.user.name}</span>
            </div>

            <div className="text-sm font-medium">{wish.price > 0 ? <span className="text-pink-600">${wish.price}</span> : <span className="text-emerald-600">免費</span>}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

// 異步獲取最新許願數據
async function LatestWishes() {
  const latestWishes = await getLatestWishes();
  return <LatestWishesListClientWrapper wishes={latestWishes} />;
}

// 置頂許願 Server Component
async function FeaturedWishes() {
  const featuredWishes = await getFeaturedWishes();
  return <FeaturedWishesCarousel wishes={featuredWishes} />;
}

export default function Home() {
  return (
    <>
      {/* 頂部橫幅/Hero 區塊 */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center">
        {/* 背景漸層 */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-pink-400"></div>

        {/* 幾何形狀裝飾元素 */}
        <div className="absolute top-20 right-[5%] w-64 h-64 bg-gradient-to-tr from-pink-300/30 to-purple-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-[10%] w-72 h-72 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 left-[20%] w-16 h-16 bg-white/10 rounded-full"></div>
        <div className="absolute top-1/3 right-[25%] w-24 h-24 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-[30%] right-[15%] w-12 h-12 bg-white/10 rounded-full"></div>

        {/* 圓點網格裝飾 */}
        <div className="absolute inset-0 bg-[url('/grid-dots.svg')] opacity-20"></div>

        {/* 半透明波浪效果 */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/10 to-transparent"></div>

        {/* 內容區域 */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* 左側文字內容 */}
            <div className="lg:w-1/2 text-white">
              <div className="inline-block px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm mb-6">
                <span className="text-sm font-medium">✨ 實現願望的地方</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
                在<span className="relative bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-100 font-black px-1">許願池</span>
                <br />
                發現與實現夢想
              </h1>

              <p className="text-lg md:text-xl mb-8 max-w-lg opacity-90">在這裡發布您的願望，尋找可能的幫助，或幫助他人達成心願，讓美好的事物傳遞下去</p>

              <div className="flex flex-wrap gap-4">
                <Link href="/wishes/create">
                  <Button size="lg" className="rounded-full px-8 py-6 bg-white text-pink-600 hover:bg-white/90 hover:shadow-lg font-bold hover:shadow-pink-700/20 transition-all">
                    立即發布許願
                  </Button>
                </Link>
                <Link href="/wishes">
                  <Button variant="outline" size="lg" className="rounded-full px-8 py-6 border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-all">
                    瀏覽許願
                  </Button>
                </Link>
              </div>

              <div className="mt-12 flex items-center space-x-4">
                <p className="text-sm font-medium">已有 12,000+ 願望實現</p>
              </div>
            </div>

            {/* 右側漂浮卡片效果 */}
            <div className="lg:w-1/2 relative">
              <div className="absolute top-4 left-4 w-full h-full rounded-2xl bg-gradient-to-br from-purple-200/20 to-pink-200/20 backdrop-blur-xl border border-white/10"></div>
              <div className="absolute top-2 left-2 w-full h-full rounded-2xl bg-gradient-to-br from-purple-300/20 to-pink-300/20 backdrop-blur-xl border border-white/10"></div>
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                      <span className="text-white font-medium">心</span>
                    </div>
                    <div>
                      <h3 className="text-white font-bold">許願池精選</h3>
                      <p className="text-white/70 text-sm">幫助他人實現願望</p>
                    </div>
                  </div>
                  <span className="px-3 py-1.5 bg-white/20 rounded-full text-white text-xs font-medium">即時更新</span>
                </div>

                <div className="bg-white/10 rounded-xl p-5 mb-4 hover:bg-white/20 transition">
                  <div className="flex justify-between items-start mb-3">
                    <span className="bg-pink-500/80 text-white text-xs px-2 py-0.5 rounded-full">教育</span>
                    <p className="text-white/60 text-xs">2小時前</p>
                  </div>
                  <h4 className="text-white font-semibold mb-2">尋找數學家教，高中數學補強</h4>
                  <p className="text-white/70 text-sm">希望能找到有耐心的數學家教，幫助我準備大學入學考試...</p>
                </div>

                <div className="bg-white/10 rounded-xl p-5 hover:bg-white/20 transition">
                  <div className="flex justify-between items-start mb-3">
                    <span className="bg-purple-500/80 text-white text-xs px-2 py-0.5 rounded-full">社區</span>
                    <p className="text-white/60 text-xs">1天前</p>
                  </div>
                  <h4 className="text-white font-semibold mb-2">社區老人共餐活動志工招募</h4>
                  <p className="text-white/70 text-sm">我們正在尋找願意每週末幫忙準備餐點的志工，為社區長者...</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 底部波浪曲線 */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* 熱門分類區 */}
        <section className="mb-16 animate-fade-in animation-delay-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">
              <span className="relative inline-block">
                熱門分類
                <span className="absolute -bottom-1 left-0 w-1/2 h-1 bg-[#ff69b4] rounded-full"></span>
              </span>
            </h2>
          </div>
          <CategoryTags />
        </section>

        {/* 置頂許願區 */}
        <section className="mb-16 animate-fade-in animation-delay-300">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">
              <span className="relative inline-block">
                置頂許願
                <span className="absolute -bottom-1 left-0 w-1/2 h-1 bg-[#ff69b4] rounded-full"></span>
              </span>
            </h2>
          </div>
          <Suspense fallback={<div className="h-40 bg-muted rounded-lg animate-pulse"></div>}>
            <FeaturedWishes />
          </Suspense>
        </section>

        {/* 熱門許願區 */}
        <section className="mb-16 animate-fade-in animation-delay-400">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">
              <span className="relative inline-block">
                熱門許願
                <span className="absolute -bottom-1 left-0 w-1/2 h-1 bg-[#ff69b4] rounded-full"></span>
              </span>
            </h2>
            <Link href="/wishes?sort=trending" className="text-[#ff69b4] hover:text-[#ff69b4]/80 font-medium flex items-center gap-1 group">
              查看更多
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          </div>
          <Suspense fallback={<div className="h-60 bg-muted rounded-lg animate-pulse"></div>}>
            <TrendingWishesDisplay />
          </Suspense>
        </section>

        {/* 最新許願區 */}
        <section className="mb-16 animate-fade-in animation-delay-600">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">
              <span className="relative inline-block">
                最新許願
                <span className="absolute -bottom-1 left-0 w-1/2 h-1 bg-[#ff69b4] rounded-full"></span>
              </span>
            </h2>
            <Link href="/wishes" className="text-[#ff69b4] hover:text-[#ff69b4]/80 font-medium flex items-center gap-1 group">
              查看全部
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          </div>
          <Suspense fallback={<LoadingState />}>
            <LatestWishes />
          </Suspense>
        </section>

        {/* 用戶推薦區塊 */}
        <section className="py-16 md:py-24 container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">用戶心得分享</h2>
            <p className="text-lg text-muted-foreground">聽聽他們如何透過許願池實現願望，建立連結</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 用戶推薦 1 */}
            <div className="bg-card border border-border rounded-xl p-8 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center">
                    <span className="text-white text-xl font-semibold">陳</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold">陳小明</h4>
                  <p className="text-sm text-muted-foreground">台北市 • 大學生</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex mb-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-amber-400">
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">2023年12月15日</p>
              </div>

              <blockquote className="italic text-gray-700 mb-6">
                「透過許願池，我找到了願意免費指導我程式設計的資深工程師。他不僅教我技術，還給了我很多職涯建議。這種無私的幫助讓我非常感動，也讓我想要將這份善意傳遞下去。」
              </blockquote>

              <div className="pt-4 border-t border-border">
                <p className="text-emerald-600 font-medium text-sm">願望已完成：程式設計指導</p>
              </div>
            </div>

            {/* 用戶推薦 2 */}
            <div className="bg-card border border-border rounded-xl p-8 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 flex items-center justify-center">
                    <span className="text-white text-xl font-semibold">林</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold">林美玲</h4>
                  <p className="text-sm text-muted-foreground">高雄市 • 小學老師</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex mb-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-amber-400">
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">2024年3月4日</p>
              </div>

              <blockquote className="italic text-gray-700 mb-6">
                「我為我班上的弱勢學生發布了募集二手書籍的願望，沒想到短短兩週就收到超過300本書！許願池連結了我和許多有愛心的陌生人，讓這些孩子有了更多學習資源，真的非常感謝。」
              </blockquote>

              <div className="pt-4 border-t border-border">
                <p className="text-emerald-600 font-medium text-sm">願望已完成：弱勢學童二手書募集</p>
              </div>
            </div>

            {/* 用戶推薦 3 */}
            <div className="bg-card border border-border rounded-xl p-8 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center">
                    <span className="text-white text-xl font-semibold">張</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold">張志偉</h4>
                  <p className="text-sm text-muted-foreground">台中市 • 咖啡廳老闆</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex mb-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 ${i < 4 ? "text-amber-400" : "text-gray-300"}`}>
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">2024年1月18日</p>
              </div>

              <blockquote className="italic text-gray-700 mb-6">
                「我在許願池上分享了希望為咖啡廳尋找在地藝術家合作的願望，結果認識了幾位才華洋溢的年輕畫家。現在我的咖啡廳每個月都有新的藝術展，不僅為空間增添活力，也幫助這些藝術家展示作品。」
              </blockquote>

              <div className="pt-4 border-t border-border">
                <p className="text-emerald-600 font-medium text-sm">願望已完成：尋找在地藝術家合作</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/wishes">
              <Button size="lg" className="rounded-full px-8 bg-gradient text-white hover:shadow-lg transition-all">
                發現更多成功故事
              </Button>
            </Link>
          </div>
        </section>

        {/* 社群號召區塊 */}
        <section className="py-16 bg-gradient text-white relative overflow-hidden">
          {/* 背景裝飾 */}
          <div className="absolute inset-0 bg-[url('/grid-dots.svg')] opacity-20"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl"></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">加入我們的願望實現者社群</h2>
              <p className="text-xl mb-10 opacity-90">成為改變的一部分，無論是需要幫助或願意伸出援手，都能在這裡找到歸屬</p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/wishes/create">
                  <Button size="lg" className="rounded-full px-8 py-6 bg-white text-pink-600 hover:bg-white/90 hover:shadow-lg font-bold hover:shadow-pink-700/20 transition-all">
                    立即發布許願
                  </Button>
                </Link>
                <Link href="/wishes">
                  <Button variant="outline" size="lg" className="rounded-full px-8 py-6 border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-all">
                    探索願望
                  </Button>
                </Link>
              </div>

              <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <p className="text-4xl font-bold mb-2">320+</p>
                  <p className="text-white/70">已實現願望</p>
                </div>
                <div>
                  <p className="text-4xl font-bold mb-2">680+</p>
                  <p className="text-white/70">註冊用戶</p>
                </div>
                <div>
                  <p className="text-4xl font-bold mb-2">210+</p>
                  <p className="text-white/70">成功配對</p>
                </div>
                <div>
                  <p className="text-4xl font-bold mb-2">4.6/5</p>
                  <p className="text-white/70">用戶滿意度</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
