# 許願池 | Wishing Pool

這是一個使用 [Next.js](https://nextjs.org) 創建的許願池平台，讓使用者可以發布願望並獲得他人幫助。

## 開始使用

首先，運行開發伺服器：

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
# 或
bun dev
```

在瀏覽器中打開 [http://localhost:3000](http://localhost:3000) 查看結果。

您可以通過修改 `app/page.tsx` 開始編輯頁面。當您編輯文件時，頁面會自動更新。

## 專案概述

許願池是一個連接需求與服務的平台，讓使用者能夠：

- 發布他們的願望與需求
- 瀏覽並幫助實現他人的願望
- 透過社交功能（留言、私訊）進行溝通
- 實現願望後提供反饋與評價

## 技術框架

本專案使用以下技術：

- **前端**：Next.js 15.3 (App Router)、React 19、Tailwind CSS、shadcn/ui
- **後端**：Next.js API Routes、Prisma、PostgreSQL
- **認證**：NextAuth.js
- **部署**：Vercel

## 開發計劃

專案開發分為三個主要階段：

- **第一階段**：核心功能開發（許願功能、社交功能）
- **第二階段**：功能強化與優化（進階功能、整合測試）
- **第三階段**：發布與持續改進

詳細開發計劃請參考 [docs/wishing_pool_development_plan.md](docs/wishing_pool_development_plan.md)。

## 部署

最簡單的部署方式是使用 [Vercel 平台](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)。

更多部署相關資訊請參考 [Next.js 部署文檔](https://nextjs.org/docs/app/building-your-application/deploying)。

## Google 登入設定

本專案使用 NextAuth.js 實現 Google 登入功能。設定步驟如下：

1. 前往 [Google Cloud Console](https://console.cloud.google.com/) 創建專案
2. 設定 OAuth 同意畫面
3. 創建 OAuth 憑證（Web 應用）
4. 添加授權的重定向 URI：`http://localhost:3000/api/auth/callback/google`（開發環境）
5. 獲取 Client ID 和 Client Secret
6. 更新 `.env` 文件中的 `GOOGLE_CLIENT_ID` 和 `GOOGLE_CLIENT_SECRET`

詳細設定指南請參考 [Google 登入設定指南](./docs/google_auth_setup.md)

## 許可證

MIT License
