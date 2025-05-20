"use client";

import { Message } from "@/app/lib/data";
import { useEffect, useRef } from "react";

// 許願池 MessageList 元件
// ---------------------------------------------
// 用途：
//   - 顯示與特定用戶的對話訊息列表。
//   - 支援顯示發送者和接收者的訊息、時間戳記。
// 主要 Props：
//   - messages: 訊息資料
//   - currentUserId: 當前用戶ID，用於區分自己和對方的訊息
// 用法範例：
//   <MessageList messages={messages} currentUserId="current-user" />
// 設計重點：
//   - 區分自己和對方的訊息
//   - 自動滾動到最新訊息
//   - 顯示訊息時間
// ---------------------------------------------

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

export default function MessageList({ messages, currentUserId }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 自動滾動到最新訊息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 格式化時間顯示
  const formatMessageTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString("zh-TW", { hour: "2-digit", minute: "2-digit" });
  };

  // 格式化日期顯示
  const formatMessageDate = (timeString: string) => {
    const date = new Date(timeString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const isYesterday = new Date(now.setDate(now.getDate() - 1)).toDateString() === date.toDateString();

    if (isToday) return "今天";
    if (isYesterday) return "昨天";
    return date.toLocaleDateString("zh-TW", { year: "numeric", month: "long", day: "numeric" });
  };

  // 獲取分組的日期標籤
  const getDateLabels = () => {
    const dates = new Set<string>();
    messages.forEach(message => {
      const date = new Date(message.createdAt).toDateString();
      dates.add(date);
    });
    return Array.from(dates);
  };

  const dateLabelMap = getDateLabels().reduce<{ [key: string]: string }>((acc, date) => {
    acc[date] = formatMessageDate(date);
    return acc;
  }, {});

  // 檢查是否需要顯示日期標籤
  const shouldShowDateLabel = (current: Message, index: number) => {
    if (index === 0) return true;
    const currentDate = new Date(current.createdAt).toDateString();
    const prevDate = new Date(messages[index - 1].createdAt).toDateString();
    return currentDate !== prevDate;
  };

  return (
    <div className="flex flex-col space-y-4 p-4">
      {messages.map((message, index) => (
        <div key={message.id} className="flex flex-col">
          {/* 日期分隔線 */}
          {shouldShowDateLabel(message, index) && (
            <div className="flex justify-center my-4">
              <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs text-gray-600 dark:text-gray-300">{formatMessageDate(message.createdAt)}</div>
            </div>
          )}

          {/* 訊息氣泡 */}
          <div className={`flex ${message.senderId === currentUserId ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[75%] px-4 py-2 rounded-2xl ${
                message.senderId === currentUserId ? "bg-purple-500 text-white rounded-tr-none" : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-tl-none"
              }`}
            >
              <div className="text-sm">{message.content}</div>
              <div className={`text-xs mt-1 ${message.senderId === currentUserId ? "text-purple-200" : "text-gray-500 dark:text-gray-400"} text-right`}>
                {formatMessageTime(message.createdAt)}
                {message.senderId === currentUserId && <span className="ml-1">{message.isRead ? "已讀" : "未讀"}</span>}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* 用於自動滾動的參考元素 */}
      <div ref={messagesEndRef} />

      {/* 無訊息提示 */}
      {messages.length === 0 && <div className="py-10 text-center text-gray-500 dark:text-gray-400">開始新的對話吧！</div>}
    </div>
  );
}
