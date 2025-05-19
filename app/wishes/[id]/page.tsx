// wishes/[id]/page.tsx - 許願詳情頁面
import { Suspense } from "react";
import { getWishById, getWishComments, getRelatedWishes } from "@/app/lib/data";
import RelatedWishes from "@/app/components/wishes/RelatedWishes";
import { Badge } from "@/app/components/ui/Badge";
import Link from "next/link";
import CommentsSectionClient from "@/app/components/wishes/CommentsSectionClient";

// 獲取相關許願
async function RelatedWishesSection({ wishId, category }: { wishId: string; category: string }) {
  const relatedWishes = await getRelatedWishes(wishId, category);
  return <RelatedWishes wishes={relatedWishes} />;
}

// 獲取許願留言
async function CommentsSection({ wishId }: { wishId: string }) {
  const { comments, total } = await getWishComments(wishId, 1);
  return <CommentsSectionClient wishId={wishId} initialComments={comments} total={total} />;
}

// 許願詳情頁面主元件
export default async function WishPage({ params }: { params: { id: string } }) {
  const wish = await getWishById(params.id);

  // 如果找不到許願，返回 404
  if (!wish) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">找不到許願</h1>
        <p className="text-muted-foreground mb-8">您查找的許願可能已被刪除或不存在</p>
        <Link href="/wishes" className="text-primary hover:underline">
          返回許願列表
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* 頂部背景漸變條 */}
      <div className="h-32 bg-gradient-to-r from-purple-600 via-pink-500 to-pink-400 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dots opacity-20"></div>
      </div>

      {/* 主內容區域 */}
      <div className="container mx-auto px-4 -mt-16 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 麵包屑導航 */}
          <div className="md:col-span-3 mb-2">
            <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-full px-4 py-2 inline-flex items-center text-sm shadow-sm">
              <Link href="/" className="text-muted-foreground hover:text-foreground">
                首頁
              </Link>
              <span className="mx-2 text-muted-foreground">/</span>
              <Link href="/wishes" className="text-muted-foreground hover:text-foreground">
                許願列表
              </Link>
              <span className="mx-2 text-muted-foreground">/</span>
              <span className="text-foreground font-medium truncate max-w-[200px]">{wish.title}</span>
            </div>
          </div>

          {/* 左側內容區 */}
          <div className="md:col-span-2 space-y-8">
            {/* 許願詳情卡片 */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl">
              {/* 頂部狀態條 */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2"></div>

              <div className="p-8">
                {/* 分類標籤與日期 */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
                  <div className="flex flex-wrap gap-2">
                    {wish.isPinned && (
                      <Badge className="bg-amber-500/90 hover:bg-amber-500 text-white border-none">
                        <span className="mr-1">⭐</span> 置頂
                      </Badge>
                    )}
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/60 dark:text-blue-300 dark:border-blue-800/60">
                      {wish.category === "technology"
                        ? "💻 科技"
                        : wish.category === "education"
                        ? "📚 教育"
                        : wish.category === "lifestyle"
                        ? "🏡 生活"
                        : wish.category === "health"
                        ? "💪 健康"
                        : wish.category === "food"
                        ? "🍜 美食"
                        : wish.category === "travel"
                        ? "✈️ 旅遊"
                        : wish.category === "entertainment"
                        ? "🎮 娛樂"
                        : wish.category === "sports"
                        ? "⚽ 運動"
                        : wish.category}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    發布於{" "}
                    {new Date(wish.createdAt).toLocaleDateString("zh-TW", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>

                {/* 標題 */}
                <h1 className="text-3xl font-bold mb-6 text-foreground leading-tight">{wish.title}</h1>

                {/* 價格與發布者 */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 p-4 bg-accent/40 rounded-xl border border-accent/20">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-lg shadow-md">
                      {wish.user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{wish.user.name}</div>
                      <div className="text-sm text-muted-foreground">願望發起人</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-sm text-muted-foreground mb-1">預算金額</div>
                    <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-br from-purple-600 to-pink-600 text-transparent bg-clip-text">
                      {new Intl.NumberFormat("zh-TW", {
                        style: "currency",
                        currency: "TWD",
                        minimumFractionDigits: 0,
                      }).format(wish.price)}
                    </div>
                  </div>
                </div>

                {/* 內容區塊 */}
                <div className="prose prose-lg prose-pink dark:prose-invert max-w-none mb-8">
                  {wish.description.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-700 dark:text-gray-300">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* 操作按鈕 */}
                <div className="flex flex-wrap gap-4 pt-6 border-t border-border">
                  <button className="flex-1 md:flex-none py-3 px-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-200 flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path
                        fillRule="evenodd"
                        d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    聯繫發布者
                  </button>
                  <button className="flex-1 md:flex-none py-3 px-6 rounded-full border border-purple-200 dark:border-purple-800 bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-300 font-medium hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all duration-200 flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path
                        fillRule="evenodd"
                        d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    分享許願
                  </button>
                  <Link href="/wishes" className="ml-auto inline-flex items-center">
                    <button className="py-2 px-4 rounded-full text-muted-foreground hover:text-foreground text-sm flex items-center gap-1 hover:bg-accent transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                      </svg>
                      返回許願列表
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* 留言區 */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-md p-6 md:p-8">
              <Suspense
                fallback={
                  <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-muted rounded-lg w-1/3"></div>
                    <div className="h-32 bg-muted rounded-lg"></div>
                    <div className="h-24 bg-muted rounded-lg"></div>
                  </div>
                }
              >
                <CommentsSection wishId={params.id} />
              </Suspense>
            </div>
          </div>

          {/* 右側側邊欄 */}
          <div className="md:col-span-1 space-y-6">
            {/* 相關許願 */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-md">
              <div className="p-6">
                <Suspense
                  fallback={
                    <div className="animate-pulse space-y-4">
                      <div className="h-6 bg-muted rounded-lg w-1/2"></div>
                      <div className="h-20 bg-muted rounded-lg"></div>
                      <div className="h-20 bg-muted rounded-lg"></div>
                    </div>
                  }
                >
                  <RelatedWishesSection wishId={params.id} category={wish.category} />
                </Suspense>
              </div>
            </div>

            {/* 發布新願望卡片 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-100 dark:border-purple-800/30 rounded-2xl overflow-hidden shadow-md p-6">
              <h3 className="text-lg font-bold mb-3 text-purple-800 dark:text-purple-300">有自己的願望嗎？</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">在許願池發布您的願望，讓社群幫助您實現它！</p>
              <Link href="/wishes/create">
                <button className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-200">
                  發布我的願望
                </button>
              </Link>
            </div>

            {/* 聯絡資訊卡片 */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-md p-6">
              <h3 className="text-lg font-bold mb-4">幫助與支持</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/60 flex items-center justify-center text-blue-600 dark:text-blue-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                      <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                    </svg>
                  </div>
                  <span>support@wishingpool.tw</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/60 flex items-center justify-center text-green-600 dark:text-green-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path
                        fillRule="evenodd"
                        d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span>(02) 2345-6789</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/60 flex items-center justify-center text-purple-600 dark:text-purple-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634Zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 0 1-.189-.866c0-.298.059-.605.189-.866Zm2.023 6.828a.75.75 0 1 0-1.06-1.06 3.75 3.75 0 0 1-5.304 0 .75.75 0 0 0-1.06 1.06 5.25 5.25 0 0 0 7.424 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span>常見問題解答</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
