import Link from "next/link";

// ====================================================================
// profile/layout.tsx - 個人中心頁面布局
// ====================================================================
// 作用：為個人中心相關頁面提供共用布局
// 功能：
// - 頂部標題展示
// - 側邊導航欄：包含個人資料、我的許願、訊息中心等連結
// - 主內容區：顯示各子頁面內容
// - 響應式設計：支援手機和桌面視圖
// ====================================================================

interface ProfileLayoutProps {
  children: React.ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">個人中心</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* 側邊導航欄 */}
        <aside className="w-full lg:w-1/4">
          <nav className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
            <ul className="space-y-1">
              <li>
                <Link href="/profile" className="block px-4 py-2 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-300">
                  個人資料
                </Link>
              </li>
              <li>
                <Link href="/profile/wishes" className="block px-4 py-2 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-300">
                  我的許願
                </Link>
              </li>
              <li>
                <Link
                  href="/profile/messages"
                  className="block px-4 py-2 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-300"
                >
                  訊息中心
                </Link>
              </li>
              <li>
                <Link
                  href="/profile/deposit"
                  className="block px-4 py-2 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-300"
                >
                  帳戶儲值
                </Link>
              </li>
              <li>
                <Link
                  href="/profile/transactions"
                  className="block px-4 py-2 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-300"
                >
                  交易紀錄
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* 主內容區 */}
        <main className="w-full lg:w-3/4 bg-white dark:bg-gray-800 shadow rounded-lg p-6">{children}</main>
      </div>
    </div>
  );
}
