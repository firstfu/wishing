// profile/messages/page.tsx - 許願池訊息中心頁面
//
// 提供用戶訊息管理中心，展示所有對話列表和最新訊息通知。
// 頁面使用客戶端渲染，實時獲取並顯示用戶的所有對話資訊。
// 顯示訊息發送者、最後訊息內容、時間和未讀計數。
// 支援按照最後訊息時間排序，並高亮顯示未讀訊息。
// 可跳轉至單一對話詳細頁面，進行一對一即時通訊。
// 整合相關願望資訊，讓用戶可以快速了解聊天背景和內容。
// 設計響應式佈局，提供良好的移動端使用體驗。

"use client";

import { useEffect, useState } from "react";
import { Conversation, getConversations } from "@/app/lib/data";
import ConversationList from "@/app/components/messages/ConversationList";

// 許願池訊息中心頁面
// ---------------------------------------------
// 用途：
//   - 展示用戶的所有對話列表。
//   - 提供導航至個別對話詳情頁的入口。
// 設計重點：
//   - 清晰的對話列表
//   - 未讀訊息提示
//   - 簡潔的 UI 介面
// ---------------------------------------------

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 載入對話列表
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setIsLoading(true);
        const data = await getConversations();
        setConversations(data);
      } catch (err) {
        console.error("Failed to fetch conversations:", err);
        setError("無法載入訊息，請稍後再試");
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversations();
  }, []);

  // 計算未讀總數
  const totalUnread = conversations.reduce((total, conv) => total + conv.unreadCount, 0);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">訊息中心</h2>
        {totalUnread > 0 && (
          <div className="px-3 py-1 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300 rounded-full text-sm">{totalUnread} 則未讀</div>
        )}
      </div>

      {isLoading ? (
        <div className="py-20">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500"></div>
          </div>
          <p className="text-center mt-4 text-gray-500 dark:text-gray-400">載入中...</p>
        </div>
      ) : error ? (
        <div className="py-20 text-center">
          <div className="text-red-500 dark:text-red-400 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-red-500 dark:text-red-400">{error}</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600">
          <ConversationList conversations={conversations} />
        </div>
      )}

      {/* 無訊息提示 */}
      {!isLoading && !error && conversations.length === 0 && (
        <div className="py-20 text-center bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          <p className="text-gray-500 dark:text-gray-400">您目前沒有任何訊息</p>
          <p className="text-gray-400 dark:text-gray-500 mt-2">瀏覽許願頁面並聯繫發布者開始對話吧！</p>
        </div>
      )}
    </div>
  );
}
