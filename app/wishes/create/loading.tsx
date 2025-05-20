// ====================================================================
// wishes/create/loading.tsx - 發布許願頁面載入狀態
// ====================================================================
// 作用：於資料尚未取得時顯示發布許願頁的骨架屏
// 功能：
// - 頂部橫幅的預載動畫
// - 許願表單各欄位的骨架屏
// - 分類選擇器的骨架屏
// - 提交按鈕的預載效果
// ====================================================================

export default function CreateWishLoading() {
  return (
    <div className="bg-background">
      {/* 頂部橫幅 */}
      <section className="relative overflow-hidden">
        {/* 背景漸層 */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-pink-400"></div>

        {/* 幾何形狀裝飾元素 */}
        <div className="absolute top-10 right-[5%] w-28 h-28 bg-gradient-to-tr from-pink-300/30 to-purple-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-[5%] w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>

        {/* 圓點網格裝飾 */}
        <div className="absolute inset-0 bg-[url('/grid-dots.svg')] opacity-20"></div>

        {/* 內容區域 */}
        <div className="container mx-auto px-4 py-12 md:py-16 relative">
          <div className="max-w-3xl animate-fade-in">
            <div className="inline-block px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm mb-6 w-32 h-6"></div>
            <div className="h-10 w-48 bg-white/20 rounded-lg mb-4"></div>
            <div className="h-6 w-96 bg-white/20 rounded-lg"></div>
          </div>
        </div>

        {/* 半透明波浪效果 */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/10 to-transparent"></div>
      </section>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto bg-card border border-border rounded-xl shadow-sm p-6 md:p-8">
          <div className="animate-pulse space-y-6">
            <div className="space-y-2">
              <div className="h-8 bg-muted rounded-lg w-1/3"></div>
              <div className="h-4 bg-muted rounded-lg w-2/3"></div>
            </div>

            <div className="space-y-2">
              <div className="h-5 bg-muted rounded-lg w-1/4"></div>
              <div className="h-10 bg-muted rounded-lg"></div>
            </div>

            <div className="space-y-2">
              <div className="h-5 bg-muted rounded-lg w-1/4"></div>
              <div className="h-32 bg-muted rounded-lg"></div>
            </div>

            <div className="space-y-2">
              <div className="h-5 bg-muted rounded-lg w-1/4"></div>
              <div className="h-10 bg-muted rounded-lg"></div>
            </div>

            <div className="space-y-2">
              <div className="h-5 bg-muted rounded-lg w-1/4"></div>
              <div className="flex flex-wrap gap-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-8 w-20 bg-muted rounded-full"></div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <div className="h-12 bg-muted rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
