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
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">許願池</h1>
            <p className="text-muted-foreground">發布您的願望，尋找可能的幫助，或協助他人實現願望</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link href="/wishes/create">
              <Button size="lg">發布許願</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">熱門分類</h2>
        <CategoryTags />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">置頂許願</h2>
        <Suspense fallback={<div className="h-60 bg-muted rounded-lg animate-pulse"></div>}>
          <FeaturedWishes />
        </Suspense>
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">最新許願</h2>
          <Link href="/wishes" className="text-primary hover:underline">
            查看全部
          </Link>
        </div>
        <Suspense fallback={<LoadingState />}>
          <LatestWishes />
        </Suspense>
      </section>
    </div>
  );
}
