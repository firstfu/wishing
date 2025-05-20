// 許願池 Mock 資料示範頁面

import Link from "next/link";

export default function MockDemoIndex() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-12 rounded-xl shadow-xl mb-12 text-white">
        <h1 className="text-4xl font-bold mb-4">許願池 Mock 資料示範</h1>
        <p className="text-lg mb-6">這個頁面展示如何使用更真實的模擬資料，包含台灣特色的人名、真實語境的許願內容和留言對話。</p>
        <div className="flex flex-wrap gap-3 mt-6">
          <Link href="/" className="bg-white px-5 py-2.5 rounded-lg text-purple-600 font-medium shadow-sm hover:shadow-md transition-shadow">
            返回首頁
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-bold mb-4 text-purple-600">模擬資料展示</h2>
          <p className="text-gray-600 mb-6">查看 mock 資料的內容和結構，了解如何使用各種模擬資料函數，包含用戶數據、許願、留言和訊息。</p>
          <Link href="/wishes/mock-demo/page" className="inline-block bg-purple-100 text-purple-700 px-5 py-2.5 rounded-lg font-medium hover:bg-purple-200 transition-colors">
            查看展示頁面
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-bold mb-4 text-pink-600">整合示範</h2>
          <p className="text-gray-600 mb-6">了解如何在現有專案中整合 mock 資料，替換原有的資料來源，使整個應用程序使用更真實的資料。</p>
          <Link
            href="/wishes/mock-demo/integration-example"
            className="inline-block bg-pink-100 text-pink-700 px-5 py-2.5 rounded-lg font-medium hover:bg-pink-200 transition-colors"
          >
            查看整合範例
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6">資料檔案結構</h2>

        <div className="bg-gray-100 p-4 rounded-lg mb-8">
          <h3 className="text-lg font-medium mb-3">mockdata.ts</h3>
          <p className="text-gray-600 mb-3">
            位於 <code className="bg-gray-200 px-2 py-1 rounded">app/lib/mockdata.ts</code>， 包含了所有模擬資料和函數。
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>用戶資料 - 真實台灣風格人名、職業和背景</li>
            <li>許願資料 - 模擬真實用戶發布的許願內容</li>
            <li>留言資料 - 真實風格的互動留言</li>
            <li>訊息資料 - 模擬用戶間的私訊對話</li>
            <li>API 函數 - 模擬獲取和操作資料的函數</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-3">主要函數</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>getMockFeaturedWishes</li>
              <li>getMockLatestWishes</li>
              <li>getMockWishById</li>
              <li>getMockWishesByFilter</li>
              <li>getMockWishComments</li>
              <li>getMockUserConversations</li>
              <li>getMockMessagesWithUser</li>
              <li>createMockWish</li>
            </ul>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-3">資料結構</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>mockUsers - 用戶資料數組</li>
              <li>mockWishes - 許願資料數組</li>
              <li>mockComments - 留言資料數組</li>
              <li>mockMessages - 訊息資料數組</li>
              <li>generateMoreWishes - 產生更多許願資料</li>
              <li>getMockConversations - 生成對話列表</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
