"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// 許願池 Modal 元件
// ---------------------------------------------
// 用途：
//   - 提供彈出式對話框功能，支援淡入淡出效果。
//   - 用於在不跳轉頁面的情況下顯示額外內容或執行操作。
// 主要 Props：
//   - isOpen: 控制對話框是否開啟（必填）
//   - onClose: 關閉對話框的回調函數（必填）
//   - title: 對話框標題（選填）
//   - children: 對話框內容（必填）
// 用法範例：
//   <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="聯繫我們">
//     <p>對話框內容...</p>
//   </Modal>
// 設計重點：
//   - 點擊背景或按 ESC 鍵可關閉
//   - 支援自定義標題和內容
//   - 淡入淡出效果
// ---------------------------------------------

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);

  // 處理 ESC 按鍵關閉
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  // 處理點擊背景關閉
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (backdropRef.current === e.target) {
      onClose();
    }
  };

  // 處理顯示與消失動畫
  useEffect(() => {
    setIsMounted(true);

    if (isOpen) {
      document.body.style.overflow = "hidden"; // 防止背景滾動
      setTimeout(() => {
        setIsVisible(true);
      }, 10);
    } else {
      setIsVisible(false);
      setTimeout(() => {
        document.body.style.overflow = ""; // 恢復背景滾動
      }, 300); // 等待動畫完成
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isMounted) return null;

  return createPortal(
    isOpen ? (
      <div
        ref={backdropRef}
        onClick={handleBackdropClick}
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
      >
        <div
          className={`relative w-full max-w-md rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-xl transition-all duration-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {/* 關閉按鈕 */}
          <button onClick={onClose} className="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* 標題 */}
          {title && <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">{title}</h3>}

          {/* 內容 */}
          <div>{children}</div>
        </div>
      </div>
    ) : null,
    document.body
  );
}
