// ====================================================================
// wishes/[id]/components/CommentList.tsx - 許願留言列表元件
// ====================================================================
// 作用：顯示許願的留言列表，並提供發表留言的功能
// 功能：
// - 顯示留言列表與留言數
// - 留言表單：用戶輸入留言
// - 載入更多：支援分頁載入更多留言
// ====================================================================

import { Comment } from "@/app/lib/data";
import { Button } from "@/app/components/ui/Button";

interface CommentListProps {
  comments: Comment[];
  total: number;
  currentPage: number;
  onLoadMore: () => void;
  isLoadingMore?: boolean;
}

export default function CommentList({ comments, total, onLoadMore, isLoadingMore = false }: CommentListProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">留言區 ({total})</h2>

      {/* 留言表單 */}
      <div className="bg-card border border-border rounded-lg p-4">
        <textarea
          className="w-full min-h-[100px] rounded-lg border border-input bg-transparent p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="分享您的想法或問題..."
        />
        <div className="flex justify-end mt-3">
          <Button>發表留言</Button>
        </div>
      </div>

      {/* 留言列表 */}
      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map(comment => (
            <div key={comment.id} className="border border-border rounded-lg p-4 bg-card">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-medium">{comment.user.name.charAt(0)}</div>
                  <div className="font-medium">{comment.user.name}</div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(comment.createdAt).toLocaleString("zh-TW", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
              <div className="pl-10">{comment.content}</div>
            </div>
          ))}

          {/* 載入更多按鈕 */}
          {comments.length < total && (
            <div className="flex justify-center mt-6">
              <Button variant="outline" onClick={onLoadMore} disabled={isLoadingMore} className="rounded-full px-6">
                {isLoadingMore ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    載入中...
                  </>
                ) : (
                  `載入更多留言 (${comments.length}/${total})`
                )}
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-10 text-muted-foreground">目前還沒有留言，成為第一個留言的人吧！</div>
      )}
    </div>
  );
}
