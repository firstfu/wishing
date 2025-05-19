export default function WishDetailLoading() {
  return (
    <>
      {/* 頂部背景漸變條 */}
      <div className="h-32 bg-gradient-to-r from-purple-600 via-pink-500 to-pink-400 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dots opacity-20"></div>
      </div>

      {/* 主內容區域 */}
      <div className="container mx-auto px-4 -mt-16 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 麵包屑導航載入狀態 */}
          <div className="md:col-span-3 mb-2">
            <div className="h-8 w-64 bg-muted rounded-full animate-pulse"></div>
          </div>

          {/* 左側內容區載入狀態 */}
          <div className="md:col-span-2 space-y-8">
            {/* 許願詳情卡片載入狀態 */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-md animate-pulse">
              {/* 頂部狀態條 */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2"></div>

              <div className="p-8 space-y-6">
                {/* 標籤與日期載入狀態 */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="h-6 w-20 bg-muted rounded-full"></div>
                  <div className="h-4 w-32 bg-muted rounded-full"></div>
                </div>

                {/* 標題載入狀態 */}
                <div className="h-10 bg-muted rounded-lg w-3/4"></div>

                {/* 發布者與價格載入狀態 */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-accent/40 rounded-xl border border-accent/20">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-muted rounded-full"></div>
                    <div className="space-y-2">
                      <div className="h-5 w-24 bg-muted rounded-full"></div>
                      <div className="h-4 w-20 bg-muted rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <div className="h-4 w-16 bg-muted rounded-full"></div>
                    <div className="h-8 w-24 bg-muted rounded-full"></div>
                  </div>
                </div>

                {/* 內容區塊載入狀態 */}
                <div className="space-y-4">
                  <div className="h-4 bg-muted rounded-full w-full"></div>
                  <div className="h-4 bg-muted rounded-full w-full"></div>
                  <div className="h-4 bg-muted rounded-full w-3/4"></div>
                  <div className="h-4 bg-muted rounded-full w-full"></div>
                  <div className="h-4 bg-muted rounded-full w-5/6"></div>
                  <div className="h-4 bg-muted rounded-full w-full"></div>
                  <div className="h-4 bg-muted rounded-full w-2/3"></div>
                </div>

                {/* 操作按鈕載入狀態 */}
                <div className="flex flex-wrap gap-4 pt-6 border-t border-border">
                  <div className="h-10 w-32 bg-muted rounded-full"></div>
                  <div className="h-10 w-32 bg-muted rounded-full"></div>
                  <div className="h-8 w-32 bg-muted rounded-full ml-auto"></div>
                </div>
              </div>
            </div>

            {/* 留言區載入狀態 */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-md p-6 md:p-8 space-y-6 animate-pulse">
              <div className="h-8 bg-muted rounded-lg w-32"></div>
              <div className="h-32 bg-muted rounded-lg"></div>
              <div className="h-24 bg-muted rounded-lg"></div>
            </div>
          </div>

          {/* 右側側邊欄載入狀態 */}
          <div className="md:col-span-1 space-y-6">
            {/* 相關許願載入狀態 */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-md p-6 space-y-4 animate-pulse">
              <div className="h-6 bg-muted rounded-lg w-1/2"></div>
              <div className="h-20 bg-muted rounded-lg"></div>
              <div className="h-20 bg-muted rounded-lg"></div>
            </div>

            {/* 發布新願望卡片載入狀態 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-100 dark:border-purple-800/30 rounded-2xl overflow-hidden shadow-md p-6 space-y-4 animate-pulse">
              <div className="h-6 bg-white/50 dark:bg-gray-700 rounded-lg w-3/4"></div>
              <div className="h-4 bg-white/50 dark:bg-gray-700 rounded-lg w-full"></div>
              <div className="h-4 bg-white/50 dark:bg-gray-700 rounded-lg w-5/6"></div>
              <div className="h-10 bg-white/50 dark:bg-gray-700 rounded-full"></div>
            </div>

            {/* 聯絡資訊卡片載入狀態 */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-md p-6 space-y-4 animate-pulse">
              <div className="h-6 bg-muted rounded-lg w-1/2"></div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-muted rounded-full"></div>
                  <div className="h-4 bg-muted rounded-lg w-32"></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-muted rounded-full"></div>
                  <div className="h-4 bg-muted rounded-lg w-24"></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-muted rounded-full"></div>
                  <div className="h-4 bg-muted rounded-lg w-28"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
