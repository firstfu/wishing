// ====================================================================
// wishes/not-found.tsx - 許願頁面未找到提示
// ====================================================================
// 作用：當訪問不存在的許願頁面時顯示友善的提示頁面
// 功能：
// - 顯示「找不到頁面」的訊息
// - 提供返回首頁或瀏覽所有許願的按鈕
// - 簡潔友好的錯誤頁面設計
// ====================================================================

import Link from "next/link";
import { Button } from "@/app/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto">
        <div className="text-8xl mb-6">🔎</div>
        <h1 className="text-4xl font-bold mb-4">找不到頁面</h1>
        <p className="text-muted-foreground mb-8">您嘗試訪問的許願頁面不存在或已被移除。請返回首頁或瀏覽其他許願。</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="w-full sm:w-auto rounded-full px-6">返回首頁</Button>
          </Link>
          <Link href="/wishes">
            <Button variant="outline" className="w-full sm:w-auto rounded-full px-6">
              瀏覽所有許願
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
