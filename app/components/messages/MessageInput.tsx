"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/app/components/ui/Button";

// 許願池 MessageInput 元件
// ---------------------------------------------
// 用途：
//   - 提供訊息輸入介面，允許用戶在對話中發送新訊息。
//   - 支援基本的文字輸入和發送功能。
// 主要 Props：
//   - onSendMessage: 發送訊息的回調函數
//   - disabled: 是否停用輸入（選填）
//   - placeholder: 輸入框占位文字（選填）
// 用法範例：
//   <MessageInput onSendMessage={(message) => handleSend(message)} />
// 設計重點：
//   - 自動調整高度的文字輸入區
//   - Enter 鍵發送訊息
//   - 空輸入防護
// ---------------------------------------------

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function MessageInput({ onSendMessage, disabled = false, placeholder = "輸入訊息..." }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [rows, setRows] = useState(1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);

    // 自動調整高度
    const lineHeight = 24; // 行高
    const maxRows = 5; // 最大行數
    const currentRows = Math.min(maxRows, Math.max(1, Math.ceil(e.target.scrollHeight / lineHeight) - 1));

    setRows(currentRows);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter 發送（不按 Shift 時）
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || disabled) return;

    onSendMessage(trimmedMessage);
    setMessage("");
    setRows(1);

    // 焦點回到輸入框
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // 自動聚焦到輸入框
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-end space-x-2">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            rows={rows}
            disabled={disabled}
            placeholder={placeholder}
            className="w-full resize-none border rounded-xl py-3 px-4 focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-800 focus:border-purple-500 focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all"
          />
          <div className="absolute right-3 bottom-3 text-xs text-gray-400">{message.length > 0 && `${message.length}/1000`}</div>
        </div>
        <Button
          onClick={handleSendMessage}
          disabled={!message.trim() || disabled}
          className="px-4 py-2 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-lg transition-all duration-200"
        >
          發送
        </Button>
      </div>
    </div>
  );
}
