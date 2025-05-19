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
      <section className="bg-gradient-to-r from-purple-600 via-pink-500 to-pink-400 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dots opacity-20"></div>
        <div className="container mx-auto px-4 py-12 md:py-16 relative">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-sm">
              發布<span className="text-white font-extrabold">許願</span>
            </h1>
            <p className="text-lg text-white mb-4 drop-shadow-sm">將您的需求告訴社群，讓更多願意幫助的人看到</p>
          </div>
        </div>
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
