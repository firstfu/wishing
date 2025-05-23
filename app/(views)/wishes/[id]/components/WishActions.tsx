// ====================================================================
// wishes/[id]/components/WishActions.tsx - 許願操作元件
// ====================================================================
// 作用：提供許願詳情頁的交互操作功能
// 功能：
// - 聯繫發布者：開啟訊息對話
// - 分享許願：複製連結或分享到社交媒體
// - 標記已完成：允許願望發起人標記願望為已完成
// - 模態窗口：處理訊息發送、分享和完成狀態更新
// ====================================================================

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/Button";
import Modal from "@/app/components/ui/Modal";
import Link from "next/link";
import { sendMessage, updateWishStatus } from "@/app/lib/data";

interface WishActionsProps {
  wishId: string;
  wishTitle: string;
  userId: string;
  userName: string;
  isOwner?: boolean;
  wishStatus?: "open" | "in_progress" | "completed";
}

export default function WishActions({ wishId, wishTitle, userId, userName, isOwner = false, wishStatus = "open" }: WishActionsProps) {
  const router = useRouter();

  // 模態窗口狀態
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [completionMessage, setCompletionMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");

  // 獲取當前網頁 URL
  const shareUrl = typeof window !== "undefined" ? window.location.href : `${process.env.NEXT_PUBLIC_HOST_URL || "http://localhost:3000"}/wishes/${wishId}`;

  // 聯繫發布者處理函數
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) return;

    setIsSending(true);

    try {
      // 使用 sendMessage API 發送訊息
      await sendMessage(userId, message, wishId);

      setIsSent(true);
      // 重置表單
      setMessage("");
      // 3秒後關閉模態窗口並導航到訊息頁面
      setTimeout(() => {
        setIsContactModalOpen(false);
        setIsSent(false);
        // 導航到與此用戶的對話頁
        router.push(`/profile/messages/${userId}`);
      }, 3000);
    } catch (error) {
      console.error("發送訊息失敗:", error);
    } finally {
      setIsSending(false);
    }
  };

  // 標記願望為已完成處理函數
  const handleCompleteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsUpdating(true);

    try {
      // 使用 updateWishStatus API 更新許願狀態
      const result = await updateWishStatus(wishId, "completed", completionMessage);

      if (result.success) {
        setIsCompleted(true);
        // 重置表單
        setCompletionMessage("");
        // 3秒後關閉模態窗口並刷新頁面
        setTimeout(() => {
          setIsCompleteModalOpen(false);
          setIsCompleted(false);
          // 刷新頁面以顯示更新後的狀態
          router.refresh();
        }, 3000);
      }
    } catch (error) {
      console.error("更新願望狀態失敗:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  // 複製連結處理函數
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(
      () => {
        setCopySuccess("已複製連結！");
        setTimeout(() => setCopySuccess(""), 3000);
      },
      () => {
        setCopySuccess("複製失敗，請手動複製");
      }
    );
  };

  // 分享平台連結
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`看看這個有趣的許願：${wishTitle}`)}`,
    line: `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}`,
  };

  return (
    <>
      {/* 操作按鈕 */}
      <div className="flex flex-wrap gap-4">
        {/* 聯繫發布者按鈕 - 僅當用戶不是願望擁有者時顯示 */}
        {!isOwner && (
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="flex-1 md:flex-none py-3 px-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path
                fillRule="evenodd"
                d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25a1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25a1.125 1.125 0 0 0 0-2.25Z"
                clipRule="evenodd"
              />
            </svg>
            聯繫發布者
          </button>
        )}

        {/* 願望已完成按鈕 - 僅當用戶是願望擁有者且願望未完成時顯示 */}
        {isOwner && wishStatus !== "completed" && (
          <button
            onClick={() => setIsCompleteModalOpen(true)}
            className="flex-1 md:flex-none py-3 px-6 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium hover:shadow-lg hover:shadow-green-500/20 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
              />
            </svg>
            標記為已完成
          </button>
        )}

        {/* 分享許願按鈕 */}
        <button
          onClick={() => setIsShareModalOpen(true)}
          className="flex-1 md:flex-none py-3 px-6 rounded-full border border-purple-200 dark:border-purple-800 bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-300 font-medium hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path
              fillRule="evenodd"
              d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z"
              clipRule="evenodd"
            />
          </svg>
          分享許願
        </button>
      </div>

      {/* 聯繫發布者模態窗口 */}
      <Modal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} title={`聯繫 ${userName}`}>
        {isSent ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                <path
                  fillRule="evenodd"
                  d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-green-600 mb-2">訊息已發送！</h3>
            <p className="text-gray-600">您的訊息已成功傳送給 {userName}，請耐心等待回覆。</p>
            <p className="text-gray-500 text-sm mt-3">即將跳轉至對話頁面...</p>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div>
              <p className="text-gray-600 mb-4">
                發送訊息給 {userName}，詢問關於「{wishTitle}」的事宜：
              </p>
              <textarea
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-purple-400 dark:focus:ring-purple-900/30"
                rows={5}
                placeholder={`嗨，${userName}，我對你的願望很感興趣...`}
                value={message}
                onChange={e => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setIsContactModalOpen(false)}>
                取消
              </Button>
              <Button type="submit" isLoading={isSending} disabled={!message.trim() || isSending}>
                發送訊息
              </Button>
            </div>
          </form>
        )}
      </Modal>

      {/* 標記願望已完成模態窗口 */}
      <Modal isOpen={isCompleteModalOpen} onClose={() => setIsCompleteModalOpen(false)} title="標記願望為已完成">
        {isCompleted ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                <path
                  fillRule="evenodd"
                  d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-green-600 mb-2">願望已完成！</h3>
            <p className="text-gray-600">您的願望已被標記為已完成，其他使用者可以看到此狀態。</p>
            <p className="text-gray-500 text-sm mt-3">頁面將自動重新載入...</p>
          </div>
        ) : (
          <form onSubmit={handleCompleteSubmit} className="space-y-4">
            <div>
              <p className="text-gray-600 mb-2">您即將將願望「{wishTitle}」標記為已完成。請分享一下是如何解決的：</p>
              <p className="text-sm text-amber-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 inline-block mr-1">
                  <path
                    fillRule="evenodd"
                    d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>
                標記為已完成後，此願望將不再接受新的解決方案。
              </p>
              <textarea
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-green-400 dark:focus:ring-green-900/30"
                rows={5}
                placeholder="請描述您的願望是如何被解決的，或者為什麼要將它標記為已完成..."
                value={completionMessage}
                onChange={e => setCompletionMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setIsCompleteModalOpen(false)}>
                取消
              </Button>
              <Button type="submit" isLoading={isUpdating} disabled={!completionMessage.trim() || isUpdating} className="bg-green-600 hover:bg-green-700">
                確認完成
              </Button>
            </div>
          </form>
        )}
      </Modal>

      {/* 分享許願模態窗口 */}
      <Modal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} title="分享這個許願">
        <div className="space-y-6">
          {/* 許願資訊 */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">{wishTitle}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">分享這個許願，讓更多人看到！</p>
          </div>

          {/* 分享連結 */}
          <div className="space-y-3">
            <div className="relative">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 pr-24 focus:border-purple-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={handleCopyLink}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-purple-100 px-3 py-1 text-sm font-medium text-purple-600 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-800/50"
              >
                複製
              </button>
            </div>
            {copySuccess && <p className="text-center text-sm text-green-600 dark:text-green-400">{copySuccess}</p>}
          </div>

          {/* 社交媒體分享 */}
          <div className="pt-2">
            <p className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">分享到社交媒體：</p>
            <div className="flex justify-center gap-4">
              <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition-colors hover:bg-blue-600 hover:text-white dark:bg-blue-900/40 dark:text-blue-300 dark:hover:bg-blue-700"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-500 transition-colors hover:bg-sky-500 hover:text-white dark:bg-sky-900/40 dark:text-sky-300 dark:hover:bg-sky-700"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href={shareLinks.line}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 transition-colors hover:bg-green-600 hover:text-white dark:bg-green-900/40 dark:text-green-300 dark:hover:bg-green-700"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 10.6c0-4.8-4.8-8.6-10.8-8.6S.5 5.8.5 10.6c0 4.3 3.8 7.8 8.9 8.5.3.1.8.2.9.5.1.3.1.6 0 .9l-.1.9c0 .3-.2 1 .9.5s5.7-3.4 7.8-5.8c1.4-1.6 2.1-3.2 2.1-5zM7.2 13.6H5.5c-.2 0-.4-.2-.4-.4v-4c0-.2.2-.4.4-.4h1.7c.2 0 .4.2.4.4v4c0 .2-.2.4-.4.4zm3.8 0H9.3c-.2 0-.4-.2-.4-.4v-4c0-.2.2-.4.4-.4H11c.2 0 .4.2.4.4v4c.1.2-.1.4-.4.4zm5.7 0h-3.8c-.2 0-.4-.2-.4-.4v-4c0-.2.2-.4.4-.4h3.8c.2 0 .4.2.4.4v4c0 .2-.2.4-.4.4z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
