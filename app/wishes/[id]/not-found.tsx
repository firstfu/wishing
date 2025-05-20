// ====================================================================
// wishes/[id]/not-found.tsx - 許願詳情頁面未找到提示
// ====================================================================
// 作用：當訪問不存在的許願詳情頁時顯示友善的提示頁面
// 功能：
// - 顯示「找不到許願」的訊息
// - 提供瀏覽其他許願或發布新許願的按鈕
// - 良好的用戶體驗設計
// ====================================================================

import Link from "next/link";
import { Button } from "@/app/components/ui/Button";

export default function WishNotFound() {
  return (
    <div className="bg-background min-h-[70vh] flex items-center justify-center">
      <div className="container mx-auto px-4 text-center max-w-lg">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-4 text-foreground">找不到許願</h1>
          <p className="text-muted-foreground mb-8">您要查看的許願可能已被刪除或不存在。</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/wishes">
            <Button className="rounded-full px-6 py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-200">
              瀏覽其他許願
            </Button>
          </Link>
          <Link href="/wishes/create">
            <Button
              variant="outline"
              className="rounded-full px-6 py-5 border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/30"
            >
              發布新許願
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
