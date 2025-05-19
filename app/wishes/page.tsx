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
export default async function WishesPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const search = typeof searchParams.search === "string" ? searchParams.search : "";
  const category = typeof searchParams.category === "string" ? searchParams.category : "";
  const sort = typeof searchParams.sort === "string" ? searchParams.sort : "latest";
  const page = typeof searchParams.page === "string" ? parseInt(searchParams.page) : 1;
  const minPrice = typeof searchParams.minPrice === "string" ? parseInt(searchParams.minPrice) : undefined;
  const maxPrice = typeof searchParams.maxPrice === "string" ? parseInt(searchParams.maxPrice) : undefined;

  return (
    <div className="bg-background">
      {/* 頂部橫幅 */}
      <div className="bg-gradient relative py-12 mb-8">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[center_top_-1px]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">尋找許願</h1>
            <p className="text-white/90 mb-6">瀏覽所有許願，或使用篩選器找到您感興趣的內容</p>
            <Link href="/wishes/create">
              <Button size="lg" className="rounded-full px-6 bg-white text-primary hover:bg-white/90">
                發布許願
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        {/* 搜尋和篩選頭部 */}
        <WishesHeader search={search} sort={sort} />

        <div className="flex flex-col lg:flex-row gap-8 mt-6">
          {/* 篩選側邊欄 */}
          <div className="lg:w-1/4">
            <WishesFilter category={category} minPrice={minPrice} maxPrice={maxPrice} />
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
