import { Suspense } from "react";
import { getFeaturedWishes, getLatestWishes } from "@/app/lib/data";
import FeaturedWishesCarousel from "@/app/components/wishes/FeaturedWishesCarousel";
import LatestWishesList from "@/app/components/wishes/LatestWishesList";
import CategoryTags from "@/app/components/wishes/CategoryTags";
import { Button } from "@/app/components/ui/Button";
import Link from "next/link";

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

// 異步獲取特色許願數據
async function FeaturedWishes() {
  const featuredWishes = await getFeaturedWishes();
  return <FeaturedWishesCarousel wishes={featuredWishes} />;
}

// 異步獲取最新許願數據
async function LatestWishes() {
  const latestWishes = await getLatestWishes();
  return <LatestWishesList wishes={latestWishes} />;
}

export default function Home() {
  return (
    <>
      {/* 頂部橫幅/Hero 區塊 */}
      <section className="bg-gradient-banner relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[center_top_-1px]"></div>
        <div className="absolute inset-0 bg-pattern-dots"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              在<span className="text-pink-200">許願池</span>發現與實現夢想
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">在這裡發布您的願望，尋找可能的幫助，或幫助他人達成心願，讓美好的事物傳遞下去</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/wishes/create">
                <Button size="lg" className="rounded-full px-6 py-6 bg-white text-primary hover:bg-white/90 hover:shadow-lg hover:shadow-pink-200/30 transition-all">
                  發布許願
                </Button>
              </Link>
              <Link href="/wishes">
                <Button size="lg" variant="outline" className="rounded-full px-6 py-6 text-white border-white hover:bg-white/20 hover:border-pink-200 transition-all">
                  探索許願
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* 熱門分類區 */}
        <section className="mb-16 animate-fade-in animation-delay-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">
              <span className="relative inline-block">
                熱門分類
                <span className="absolute -bottom-1 left-0 w-1/2 h-1 bg-gradient rounded-full"></span>
              </span>
            </h2>
          </div>
          <CategoryTags />
        </section>

        {/* 置頂許願區 */}
        <section className="mb-16 animate-fade-in animation-delay-400">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">
              <span className="relative inline-block">
                置頂許願
                <span className="absolute -bottom-1 left-0 w-1/2 h-1 bg-gradient rounded-full"></span>
              </span>
            </h2>
          </div>
          <Suspense fallback={<div className="h-60 bg-muted rounded-lg animate-pulse"></div>}>
            <FeaturedWishes />
          </Suspense>
        </section>

        {/* 最新許願區 */}
        <section className="mb-16 animate-fade-in animation-delay-600">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">
              <span className="relative inline-block">
                最新許願
                <span className="absolute -bottom-1 left-0 w-1/2 h-1 bg-gradient rounded-full"></span>
              </span>
            </h2>
            <Link href="/wishes" className="text-primary hover:text-primary/80 font-medium flex items-center gap-1 group">
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
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-secondary/10"></div>
          <div className="absolute inset-0 bg-pattern-dots opacity-50"></div>
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
