"use client";

// profile/page.tsx - 許願池用戶個人主頁
//
// 提供用戶個人中心主頁，展示用戶基本資訊、統計數據和最近活動摘要。
// 包含用戶檔案資訊、帳戶餘額、發布和參與的願望數據統計。
// 顯示最近發布的願望卡片和參與的願望互動。
// 提供快速訪問入口，引導用戶發布新願望或查看個人訊息。
// 整合活動時間軸，展示用戶在平台上的互動歷史。
// 設計響應式佈局，確保在各種設備上的最佳展示效果。

import React from "react";
import { Button } from "@/app/components/ui/Button";
import Link from "next/link";

// 許願池個人中心頁面
// ---------------------------------------------
// 用途：
//   - 顯示用戶個人資訊、統計數據和快速導覽功能。
//   - 作為個人功能的集中入口。
// 設計重點：
//   - 資訊卡片展示用戶基本資料
//   - 統計區塊顯示許願和訊息摘要
//   - 快速導航至詳細頁面
// ---------------------------------------------

export default function ProfilePage() {
  // 模擬用戶資料
  const user = {
    name: "張小明",
    email: "user@example.com",
    avatar: "/placeholder-avatar.jpg",
    joined: "2023年10月",
    balance: 500,
    wishCount: 4,
    messageCount: 6,
    unreadMessageCount: 2,
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold">基本資訊</h2>

      {/* 用戶資訊卡 */}
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* 頭像 */}
          <div className="w-24 h-24 bg-purple-100 dark:bg-purple-800/50 text-purple-600 dark:text-purple-300 rounded-full flex items-center justify-center text-4xl font-medium">
            {user.name.charAt(0)}
          </div>

          {/* 用戶資訊 */}
          <div className="flex-1 space-y-3 text-center md:text-left">
            <h3 className="text-xl font-bold">{user.name}</h3>
            <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">加入時間：{user.joined}</p>

            {/* 帳戶餘額 */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <span className="text-gray-600 dark:text-gray-300">帳戶點數：</span>
                  <span className="font-semibold text-purple-600 dark:text-purple-300 ml-1">{user.balance} 點</span>
                </div>
                <Link href="/profile/deposit">
                  <Button className="mt-3 md:mt-0">儲值</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 活動摘要區 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 我的許願摘要 */}
        <div className="border rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">我的許願</h3>
            <Link href="/profile/wishes" className="text-sm text-purple-600 dark:text-purple-300 hover:underline">
              查看全部
            </Link>
          </div>

          <div className="space-y-1">
            <p>
              已發布許願：<span className="font-medium">{user.wishCount}</span>
            </p>
            <p>
              未完成許願：<span className="font-medium">{Math.floor(user.wishCount * 0.7)}</span>
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
            <Link href="/wishes/create">
              <Button className="w-full">發布新許願</Button>
            </Link>
          </div>
        </div>

        {/* 我的訊息摘要 */}
        <div className="border rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">訊息中心</h3>
            <Link href="/profile/messages" className="text-sm text-purple-600 dark:text-purple-300 hover:underline">
              查看全部
            </Link>
          </div>

          <div className="space-y-1">
            <p>
              未讀訊息：
              <span className={`font-medium ${user.unreadMessageCount > 0 ? "text-red-500" : ""}`}>{user.unreadMessageCount}</span>
            </p>
            <p>
              對話總數：<span className="font-medium">{user.messageCount}</span>
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
            <Link href="/profile/messages">
              <Button className="w-full">查看訊息</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
