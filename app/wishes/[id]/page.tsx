import { Suspense } from "react";
import { getWishById, getRelatedWishes, getWishComments } from "@/app/lib/data";
import WishDetail from "@/app/components/wishes/WishDetail";
import CommentList from "@/app/components/wishes/CommentList";
import RelatedWishes from "@/app/components/wishes/RelatedWishes";
import { notFound } from "next/navigation";
import ClientComments from "./ClientComments";

// 生成頁面元數據
export async function generateMetadata({ params }: { params: { id: string } }) {
  const wish = await getWishById(params.id);

  if (!wish) {
    return {
      title: "許願未找到 | 許願池",
      description: "找不到您請求的許願內容。",
    };
  }

  return {
    title: `${wish.title} | 許願池`,
    description: wish.description.substring(0, 160),
  };
}

// 載入狀態組件
function LoadingState() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="h-60 bg-muted rounded-lg"></div>
      <div className="h-40 bg-muted rounded-lg"></div>
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="h-20 bg-muted rounded-lg"></div>
        ))}
      </div>
    </div>
  );
}

export default async function WishPage({ params }: { params: { id: string } }) {
  // 獲取許願詳情
  const wish = await getWishById(params.id);

  // 如果許願不存在，導向 404 頁面
  if (!wish) {
    notFound();
  }

  // 獲取相關許願
  const relatedWishes = await getRelatedWishes(wish.id, wish.category);

  // 獲取初始留言
  const initialCommentsData = await getWishComments(wish.id);

  return (
    <div className="bg-background">
      {/* 頂部橫幅 */}
      <div className="bg-gradient relative py-12 mb-8">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[center_top_-1px]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">許願詳情</h1>
            <p className="text-white/90">查看許願詳情，發表留言或聯繫發布者</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 主內容區 */}
          <div className="lg:w-2/3">
            <Suspense fallback={<LoadingState />}>
              <WishDetail wish={wish} />

              <div className="mt-8">
                <ClientComments initialComments={initialCommentsData.comments} totalComments={initialCommentsData.total} wishId={wish.id} />
              </div>
            </Suspense>
          </div>

          {/* 側邊欄 */}
          <div className="lg:w-1/3 space-y-6">
            <RelatedWishes wishes={relatedWishes} />
          </div>
        </div>
      </div>
    </div>
  );
}
