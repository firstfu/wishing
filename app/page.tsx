// 許願池首頁頁面組件
// - 展示 Hero 區塊、熱門分類、熱門許願、最新許願與社群號召
// - 熱門許願為靜態假資料，最新許願動態取得
// - 使用多個共用元件（如 CategoryTags、LatestWishesListClientWrapper）
// - 採用 Server Component，部分區塊用 Suspense 處理載入狀態
//
// 位置：app/page.tsx
//
// 本檔案為 Next.js App Router 首頁，負責網站主入口的內容展示

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
      <section className="bg-gradient-banner relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dots opacity-20"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-sm">
              在<span className="text-white font-extrabold">許願池</span>發現與實現夢想
            </h1>
            <p className="text-lg md:text-xl text-white mb-8 drop-shadow-sm">在這裡發布您的願望，尋找可能的幫助，或幫助他人達成心願，讓美好的事物傳遞下去</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/wishes/create">
                <Button size="lg" className="rounded-full px-6 py-6 bg-white text-pink-600 hover:bg-white/90 hover:shadow-lg font-bold hover:shadow-pink-700/20 transition-all">
                  發布許願
                </Button>
              </Link>
              <Link href="/wishes">
                <Button size="lg" variant="outline" className="rounded-full px-6 py-6 text-pink-600  border-white font-bold hover:bg-white/10 hover:border-white transition-all">
                  探索許願
                </Button>
              </Link>
            </div>
          </div>
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

        {/* 加入我們的號召區 */}
        <section className="rounded-2xl p-8 md:p-12 bg-accent relative overflow-hidden animate-fade-in animation-delay-800">
          <div className="absolute inset-0 bg-gradient-to-br from-[#ffb6c1]/20 to-[#ff69b4]/15"></div>
          <div className="absolute inset-0 bg-pattern-dots opacity-30"></div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">加入我們的社群</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mb-6">成為我們溫暖社群的一員，在這裡分享、幫助與交流，讓每個願望都有被實現的機會。</p>
            <Link href="/auth/register">
              <Button size="lg" className="rounded-full px-6 bg-gradient">
                立即註冊
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
