# 許願池專案文檔

本目錄包含許願池專案的核心文檔，用於指導開發和設計工作。

## 專案概述

「許願池」是一個讓用戶發布需求並與潛在提供者建立聯繫的平台。用戶可以支付少量費用張貼自己的需求，其他用戶看到後可以與發布者聯繫以滿足這些需求。

## 文檔導航

- `development_status_summary.md` - 當前開發狀態摘要與近期計劃
- `wishing_pool_prd.md` - 產品需求文檔，包含高層次的產品描述與目標
- `wishing_pool_development_plan.md` - 開發計劃與時程
- `wishing_pool_db_schema.md` - 資料庫結構設計
- `wishing_pool_api_endpoints.md` - API 端點設計
- `wishing_pool_pages_overview.md` - 頁面架構與功能概述

## 開發進度

最後更新日期：2024 年 9 月 28 日

### 已完成頁面

- ✅ 首頁 (`/`)
- ✅ 許願列表頁 (`/wishes`)

### 進行中頁面

- ⏳ 許願詳情頁 (`/wishes/[id]`)
- ⏳ 發布許願頁 (`/wishes/create`)

### 待完成頁面

- 🔜 登入頁 (`/auth/login`)
- 🔜 註冊頁 (`/auth/register`)
- 🔜 個人中心頁 (`/profile`)
- 🔜 我的許願頁 (`/profile/wishes`)
- 🔜 我的訊息頁 (`/profile/messages`)
- 🔜 對話詳情頁 (`/profile/messages/[userId]`)
- 🔜 交易紀錄頁 (`/profile/transactions`)

## 優先開發任務

1. 完成許願詳情頁面，包括留言系統
2. 實作發布許願頁面，包括表單和圖片上傳功能
3. 設計並實作用戶認證系統

## 技術堆疊

- 前端：Next.js 15.3 (App Router)，Tailwind CSS，shadcn/ui
- 後端：Next.js API Routes，Prisma ORM
- 資料庫：PostgreSQL
- 認證：NextAuth.js

## 圖例

- ✅ - 已完成
- ⏳ - 進行中/高優先度
- 🔜 - 待開發
