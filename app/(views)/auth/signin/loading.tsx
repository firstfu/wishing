// signin/loading.tsx - 許願池登入頁面載入中組件
//
// 提供登入頁面載入中的視覺反饋，使用簡潔的動畫效果。
// 保持與主登入頁面相同的視覺風格，確保載入過程的平滑過渡。

export default function SignInLoading() {
  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-background via-background to-background/95">
      {/* 背景裝飾 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-background"></div>
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-br from-primary/15 to-secondary/15 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-gradient-to-br from-secondary/15 to-primary/15 rounded-full blur-3xl animate-pulse-slow animation-delay-400"></div>
      </div>

      <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8 z-10">
        <div className="flex flex-col items-center justify-center">
          {/* 載入指示器 */}
          <div className="relative w-20 h-20 mb-8">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary opacity-20 animate-ping"></div>
            <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/30">
              <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>

          {/* 載入文字 */}
          <h2 className="text-2xl font-medium text-foreground animate-pulse">正在載入...</h2>
          <p className="mt-2 text-sm text-muted-foreground">請稍候，我們正在為您準備登入頁面</p>
        </div>
      </div>
    </div>
  );
}
