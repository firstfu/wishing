// wishes/create/page.tsx - 發布許願頁面
import { Suspense } from "react";
import { getCategories } from "@/app/lib/data";
import WishForm from "@/app/components/wishes/WishForm";

// 載入狀態組件
function LoadingState() {
  return (
    <div className="animate-pulse mt-6">
      <div className="h-12 bg-muted rounded-lg mb-4 w-1/2"></div>
      <div className="h-8 bg-muted rounded-lg mb-4 w-1/4"></div>
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="h-16 bg-muted rounded-lg"></div>
        ))}
      </div>
    </div>
  );
}

// 獲取分類信息
async function CategoriesProvider() {
  const categories = await getCategories();
  return <WishForm categories={categories} />;
}

export default function CreateWishPage() {
  return (
    <div className="bg-background">
      {/* 頂部橫幅 */}
      <section className="relative overflow-hidden">
        {/* 背景漸層 */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-pink-400"></div>

        {/* 幾何形狀裝飾元素 */}
        <div className="absolute top-10 right-[5%] w-28 h-28 bg-gradient-to-tr from-pink-300/30 to-purple-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-[5%] w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-[10%] w-10 h-10 bg-white/10 rounded-full"></div>
        <div className="absolute top-1/4 right-[15%] w-12 h-12 bg-white/10 rounded-full"></div>

        {/* 圓點網格裝飾 */}
        <div className="absolute inset-0 bg-[url('/grid-dots.svg')] opacity-20"></div>

        {/* 內容區域 */}
        <div className="container mx-auto px-4 py-12 md:py-16 relative">
          <div className="max-w-3xl animate-fade-in">
            <div className="inline-block px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm mb-6">
              <span className="text-sm font-medium text-white">✨ 創建願望</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-sm">
              發布<span className="relative bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-100 font-black px-1">許願</span>
            </h1>
            <p className="text-lg text-white mb-4 drop-shadow-sm">將您的需求告訴社群，讓更多願意幫助的人看到</p>
          </div>
        </div>

        {/* 半透明波浪效果 */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/10 to-transparent"></div>
      </section>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto bg-card border border-border rounded-xl shadow-sm p-6 md:p-8">
          <Suspense fallback={<LoadingState />}>
            <CategoriesProvider />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
