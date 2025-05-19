export default function WishDetailLoading() {
  return (
    <div className="bg-background">
      {/* 頂部橫幅骨架 */}
      <div className="bg-gradient relative py-12 mb-8">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[center_top_-1px]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <div className="h-10 w-64 bg-white/20 rounded-lg animate-pulse mb-4"></div>
            <div className="h-6 w-96 bg-white/20 rounded-lg animate-pulse"></div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 主內容區骨架 */}
          <div className="lg:w-2/3 space-y-8">
            {/* 許願詳情骨架 */}
            <div className="bg-card border border-border rounded-xl overflow-hidden p-6 animate-pulse">
              <div className="flex gap-2 items-center mb-6">
                <div className="h-6 w-16 bg-muted rounded-full"></div>
                <div className="h-5 w-24 bg-muted rounded-full ml-auto"></div>
              </div>
              <div className="h-10 bg-muted rounded-lg w-3/4 mb-6"></div>
              <div className="flex justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-5 bg-muted rounded w-24"></div>
                    <div className="h-3 bg-muted rounded w-16"></div>
                  </div>
                </div>
                <div className="h-8 bg-muted rounded w-24"></div>
              </div>
              <div className="space-y-4 mb-6">
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
                <div className="h-4 bg-muted rounded w-4/6"></div>
              </div>
              <div className="pt-4 border-t border-border">
                <div className="flex gap-4">
                  <div className="h-10 w-32 bg-muted rounded-full"></div>
                  <div className="h-10 w-24 bg-muted rounded-full"></div>
                </div>
              </div>
            </div>

            {/* 留言區骨架 */}
            <div className="animate-pulse">
              <div className="h-8 w-40 bg-muted rounded mb-6"></div>
              <div className="bg-card border border-border rounded-lg p-4 mb-6">
                <div className="h-24 bg-muted rounded-lg mb-3"></div>
                <div className="h-10 w-24 bg-muted rounded ml-auto"></div>
              </div>
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="border border-border rounded-lg p-4 bg-card">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-muted rounded-full"></div>
                        <div className="h-5 w-20 bg-muted rounded"></div>
                      </div>
                      <div className="h-4 w-32 bg-muted rounded"></div>
                    </div>
                    <div className="pl-10">
                      <div className="h-4 bg-muted rounded w-full mt-2"></div>
                      <div className="h-4 bg-muted rounded w-5/6 mt-2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 側邊欄骨架 */}
          <div className="lg:w-1/3">
            <div className="bg-card border border-border rounded-xl overflow-hidden p-6 animate-pulse">
              <div className="h-8 w-32 bg-muted rounded mb-4"></div>
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="p-4 rounded-lg bg-muted/50">
                    <div className="h-5 bg-muted rounded w-full mb-2"></div>
                    <div className="h-4 bg-muted rounded w-5/6 mb-3"></div>
                    <div className="flex justify-between">
                      <div className="h-3 bg-muted rounded w-32"></div>
                      <div className="h-5 bg-muted rounded w-20"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
