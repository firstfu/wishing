// ====================================================================
// wishes/not-found.tsx - 許願頁面未找到提示
// ====================================================================
// 作用：當訪問不存在的許願頁面時顯示友善的提示頁面
// 功能：
// - 顯示「找不到頁面」的訊息
// - 提供返回首頁或瀏覽所有許願的按鈕
// - 簡潔友好的錯誤頁面設計
// ====================================================================

// wishes/not-found.tsx - 許願列表 404 頁面
//
// 用途：當用戶訪問不存在的願望列表頁面或篩選條件時顯示的錯誤頁面。
// 功能：
// - 顯示友好的 404 錯誤訊息
// - 提供返回首頁和願望列表的快速連結
// - 使用視覺化圖示增強用戶體驗
// - 保持與網站整體設計風格一致
// - 自動由 Next.js 在路由不匹配時顯示
//
// 本頁面用於優化用戶在遇到無效路徑時的體驗，減少用戶流失。

import Link from "next/link";
import { Button } from "@/app/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
      <div className="text-6xl mb-6">🔍</div>
      <h1 className="text-3xl font-bold mb-4">找不到許願頁面</h1>
      <p className="text-muted-foreground mb-8 max-w-md">很抱歉，您嘗試訪問的頁面不存在或已被移除。請確認網址是否正確，或返回首頁繼續瀏覽。</p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/">
          <Button variant="default" size="lg">
            返回首頁
          </Button>
        </Link>
        <Link href="/wishes">
          <Button variant="outline" size="lg">
            瀏覽所有許願
          </Button>
        </Link>
      </div>
    </div>
  );
}
