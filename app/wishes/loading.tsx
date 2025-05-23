// ====================================================================
// wishes/loading.tsx - 許願列表頁面載入狀態
// ====================================================================
// 用途：在許願列表頁面資料載入期間顯示的骨架屏幕。
// 功能：
// - 顯示與實際內容結構相符的載入佔位元素
// - 包含篩選器、搜尋框和願望卡片的骨架結構
// - 使用淡入淡出動畫提升使用者體驗
// - 自動由 Next.js 在資料載入期間顯示
// - 採用響應式設計，在不同裝置上保持一致的載入體驗
//
// 本頁面用於減少用戶等待感，提供視覺上的連續性，增強整體使用體驗。
// ====================================================================
export default function Loading() {
  return (
    <div className="container mx-auto py-8 px-4 animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold mb-8">許願列表</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 左側篩選器骨架 */}
        <div className="hidden lg:block">
          <div className="h-[500px] bg-muted animate-pulse rounded-lg"></div>
        </div>

        {/* 右側內容區 */}
        <div className="lg:col-span-3 space-y-6">
          {/* 搜尋框骨架 */}
          <div className="h-16 bg-muted animate-pulse rounded-lg"></div>

          {/* 許願卡片骨架 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, index) => (
              <div key={index} className="h-64 bg-muted animate-pulse rounded-lg"></div>
            ))}
          </div>

          {/* 分頁骨架 */}
          <div className="flex justify-center mt-8">
            <div className="h-10 w-64 bg-muted animate-pulse rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
