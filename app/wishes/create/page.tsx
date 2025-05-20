// ====================================================================
// wishes/create/page.tsx - 發布許願頁面
// ====================================================================
// 作用：提供表單讓用戶創建新的許願
// 功能：
// - 頂部橫幅展示頁面說明
// - 許願表單：支援填寫標題、描述、價格等資訊
// - 分類選擇：提供預設分類供用戶選擇
// - 表單驗證：確保所有必填欄位有效
// ====================================================================
import { Suspense } from "react";
import { getCategories } from "@/app/lib/data";
import WishForm from "@/app/wishes/create/components/WishForm";

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

        {/* 用戶推薦區塊 */}
        <div className="max-w-3xl mx-auto mt-8 p-6 md:p-8 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800/30 shadow-sm">
          <h3 className="text-xl font-bold mb-4 text-indigo-900 dark:text-indigo-300">成功故事</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                  <span className="text-white text-lg font-medium">吳</span>
                </div>
              </div>
              <div>
                <div className="flex items-center mb-1">
                  <div className="font-semibold text-gray-900 dark:text-gray-100 mr-2">吳明哲</div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">新竹市 • 攝影師</span>
                </div>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-amber-400">
                      <path
                        fillRule="evenodd"
                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-sm text-gray-700 dark:text-gray-300 italic">
                  「發布攝影教學願望後，不到兩天就有三位學生與我聯繫。許願池讓我不只能分享技術，還讓我認識了許多志同道合的朋友。」
                </blockquote>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-white text-lg font-medium">李</span>
                </div>
              </div>
              <div>
                <div className="flex items-center mb-1">
                  <div className="font-semibold text-gray-900 dark:text-gray-100 mr-2">李佳玲</div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">台中市 • 瑜珈老師</span>
                </div>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 ${i < 4 ? "text-amber-400" : "text-gray-300"}`}>
                      <path
                        fillRule="evenodd"
                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-sm text-gray-700 dark:text-gray-300 italic">
                  「我發布了尋找場地的許願，很快就有人提供了合適的空間讓我舉辦瑜珈工作坊。許願池真的比一般社群媒體更有針對性和效率！」
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
