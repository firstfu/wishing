"use client";

import { Conversation } from "@/app/lib/data";
import Link from "next/link";
import { useState } from "react";

// 許願池 ConversationList 元件
// ---------------------------------------------
// 用途：
//   - 顯示用戶的所有對話列表。
//   - 支援未讀標記、時間顯示和相關許願資訊。
// 主要 Props：
//   - conversations: 對話列表資料
// 用法範例：
//   <ConversationList conversations={conversations} />
// 設計重點：
//   - 對未讀訊息醒目標記
//   - 顯示最後訊息時間
//   - 可選顯示相關許願資訊
// ---------------------------------------------

interface ConversationListProps {
  conversations: Conversation[];
}

export default function ConversationList({ conversations }: ConversationListProps) {
  const [activeConversation, setActiveConversation] = useState<string | null>(null);

  // 格式化時間顯示
  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      // 今天 - 顯示時間
      return date.toLocaleTimeString("zh-TW", { hour: "2-digit", minute: "2-digit" });
    } else if (diffDays === 1) {
      // 昨天
      return "昨天";
    } else if (diffDays < 7) {
      // 一週內 - 顯示星期幾
      return ["週日", "週一", "週二", "週三", "週四", "週五", "週六"][date.getDay()];
    } else {
      // 更久以前 - 顯示日期
      return date.toLocaleDateString("zh-TW", { month: "2-digit", day: "2-digit" });
    }
  };

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {conversations.length === 0 ? (
        <div className="py-10 text-center text-gray-500 dark:text-gray-400">目前沒有任何對話</div>
      ) : (
        conversations.map(conversation => (
          <Link
            href={`/profile/messages/${conversation.userId}`}
            key={conversation.userId}
            className={`block p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
              activeConversation === conversation.userId ? "bg-purple-50 dark:bg-purple-900/20" : ""
            }`}
            onClick={() => setActiveConversation(conversation.userId)}
          >
            <div className="flex space-x-3">
              {/* 頭像 */}
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-800/50 text-purple-600 dark:text-purple-300 rounded-full flex items-center justify-center text-lg font-medium">
                {conversation.userName.charAt(0)}
              </div>

              {/* 對話資訊 */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 truncate">{conversation.userName}</h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{formatTime(conversation.lastMessageTime)}</span>
                </div>

                {/* 最後訊息預覽 */}
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-1">{conversation.lastMessage}</div>

                {/* 相關許願資訊 */}
                {conversation.relatedWishTitle && (
                  <div className="mt-1 flex items-center">
                    <div className="text-xs px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full truncate max-w-[200px]">
                      {conversation.relatedWishTitle}
                    </div>
                  </div>
                )}
              </div>

              {/* 未讀標記 */}
              {conversation.unreadCount > 0 && (
                <div className="flex flex-col items-end justify-start ml-2">
                  <span className="px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">{conversation.unreadCount}</span>
                </div>
              )}
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
