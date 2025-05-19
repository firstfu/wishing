export default function Loading() {
  return (
    <div className="bg-background">
      {/* 頂部橫幅骨架屏 */}
      <div className="bg-gradient relative py-12 mb-8">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[center_top_-1px]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <div className="h-12 w-64 bg-white/20 rounded-md mb-4 animate-pulse"></div>
            <div className="h-6 w-96 bg-white/20 rounded-md mb-6 animate-pulse"></div>
            <div className="h-12 w-32 bg-white/20 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        {/* 搜尋框骨架屏 */}
        <div className="h-16 bg-muted rounded-lg animate-pulse mb-6"></div>

        <div className="flex flex-col lg:flex-row gap-8 mt-6">
          {/* 側邊欄骨架屏 */}
          <div className="lg:w-1/4">
            <div className="bg-muted rounded-lg h-96 animate-pulse"></div>
          </div>

          {/* 列表骨架屏 */}
          <div className="lg:w-3/4">
            <div className="h-6 bg-muted rounded-md w-48 animate-pulse mb-6"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, index) => (
                <div key={index} className="h-64 bg-muted rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
