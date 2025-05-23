// profile/messages/[userId]/page.tsx - 許願池一對一對話頁面
//
// 提供與特定用戶的一對一即時通訊界面，支援訊息發送和歷史訊息查看。
// 使用動態路由參數 [userId] 獲取對話對象的用戶 ID，顯示完整的通訊歷史。
// 實現自動滾動至最新訊息、訊息已讀狀態顯示和時間分組功能。
// 支援即時發送訊息，並自動更新訊息列表和已讀狀態。
// 顯示對話用戶的基本資訊和關聯的願望資訊（如有）。
// 整合返回按鈕，方便用戶返回訊息列表。
// 設計適應各種裝置的響應式佈局，提供流暢的通訊體驗。

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Message, getMessages, sendMessage, markMessagesAsRead } from "@/app/lib/data";
import MessageList from "@/app/components/messages/MessageList";
import MessageInput from "@/app/components/messages/MessageInput";
import { Button } from "@/app/components/ui/Button";

// 許願池訊息對話頁面
// ---------------------------------------------
// 用途：
//   - 顯示與特定用戶的訊息對話。
//   - 提供訊息發送和閱讀功能。
// 設計重點：
//   - 即時展示訊息內容
//   - 直覺的訊息輸入和發送
//   - 未讀狀態管理
// ---------------------------------------------

export default function ConversationPage() {
  const params = useParams();
  const userId = params.userId as string;

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 載入訊息對話
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsLoading(true);
        const data = await getMessages(userId);
        setMessages(data);

        // 標記訊息為已讀
        markMessagesAsRead(userId).catch(err => {
          console.error("Failed to mark messages as read:", err);
        });
      } catch (err) {
        console.error("Failed to fetch messages:", err);
        setError("無法載入訊息，請稍後再試");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [userId]);

  // 發送訊息
  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isSending) return;

    setIsSending(true);
    try {
      const newMessage = await sendMessage(userId, content);
      setMessages(prev => [...prev, newMessage]);
    } catch (err) {
      console.error("Failed to send message:", err);
      alert("發送訊息失敗，請稍後再試");
    } finally {
      setIsSending(false);
    }
  };

  // 獲取對話對象資訊
  const conversationPartner = {
    name:
      messages.length > 0 && messages[0].senderId !== "current-user"
        ? messages[0].senderId.includes("-")
          ? messages[0].senderId.split("-")[1] // 從發送者ID提取名稱部分
          : "對話者"
        : userId.includes("-")
        ? userId.split("-")[1] // 從URL參數中提取名稱部分
        : "對話者",
    isOnline: Math.random() > 0.5, // 模擬在線狀態
  };

  return (
    <div className="flex flex-col h-[calc(100vh-16rem)]">
      {/* 對話標題 */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Link href="/profile/messages" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <div>
              <h2 className="text-xl font-semibold">{conversationPartner.name}</h2>
              <div className="flex items-center text-sm">
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${conversationPartner.isOnline ? "bg-green-500" : "bg-gray-400"}`}></span>
                <span className="text-gray-500 dark:text-gray-400">{conversationPartner.isOnline ? "線上" : "離線"}</span>
              </div>
            </div>
          </div>

          {/* 許願相關資訊 (如果有) */}
          {messages.length > 0 && messages[0].wishId && (
            <Link
              href={`/wishes/${messages[0].wishId}`}
              className="px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
            >
              查看相關許願
            </Link>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500"></div>
        </div>
      ) : error ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 dark:text-red-400 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-red-500 dark:text-red-400">{error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              重新載入
            </Button>
          </div>
        </div>
      ) : (
        <>
          {/* 訊息列表 */}
          <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-800/50 rounded-lg mb-4">
            <MessageList messages={messages} currentUserId="current-user" />
          </div>

          {/* 訊息輸入框 */}
          <MessageInput onSendMessage={handleSendMessage} disabled={isSending} placeholder={`傳送訊息給 ${conversationPartner.name}...`} />
        </>
      )}
    </div>
  );
}
