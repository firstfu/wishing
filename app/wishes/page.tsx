// wishes/page.tsx - 願望列表頁面
import { Suspense } from "react";
import WishesHeader from "@/app/components/wishes/WishesHeader";
import WishesList from "@/app/components/wishes/WishesList";
import WishesFilter from "@/app/components/wishes/WishesFilter";
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
      <section className="bg-gradient-banner relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dots opacity-20"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-sm">
              尋找<span className="text-white font-extrabold">許願</span>
            </h1>
            <p className="text-lg md:text-xl text-white mb-8 drop-shadow-sm">瀏覽所有許願，或使用篩選器找到您感興趣的內容</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/wishes/create">
                <Button size="lg" className="rounded-full px-6 py-6 bg-white text-pink-600 hover:bg-white/90 hover:shadow-lg font-bold hover:shadow-pink-700/20 transition-all">
                  發布許願
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">
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
