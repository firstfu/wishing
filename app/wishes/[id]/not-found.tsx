import Link from "next/link";
import { Button } from "@/app/components/ui/Button";

export default function WishNotFound() {
  return (
    <div className="bg-background">
      {/* 頂部橫幅 */}
      <div className="bg-gradient relative py-12 mb-8">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[center_top_-1px]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">許願未找到</h1>
            <p className="text-white/90">找不到您請求的許願內容</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="bg-card border border-border rounded-xl p-8 md:p-12 text-center max-w-2xl mx-auto">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold mb-4">許願未找到</h2>
          <p className="text-muted-foreground mb-8">抱歉，我們找不到您正在尋找的許願。它可能已被刪除或鏈接錯誤。</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/wishes">
              <Button size="lg" className="rounded-full px-6">
                瀏覽所有許願
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="lg" className="rounded-full px-6">
                返回首頁
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
