// wishes/create/loading.tsx - 發布許願頁面載入狀態
export default function CreateWishLoading() {
  return (
    <div className="bg-background">
      {/* 頂部橫幅 */}
      <section className="bg-gradient-to-r from-purple-600 via-pink-500 to-pink-400 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dots opacity-20"></div>
        <div className="container mx-auto px-4 py-12 md:py-16 relative">
          <div className="max-w-3xl animate-fade-in">
            <div className="h-10 w-48 bg-white/20 rounded-lg mb-4"></div>
            <div className="h-6 w-96 bg-white/20 rounded-lg"></div>
          </div>
        </div>
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
