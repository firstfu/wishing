# 許願池認證系統

許願池專案使用 NextAuth.js 實現用戶認證系統，目前支援 Google 帳號登入。本文檔簡要說明如何設置和使用認證系統。

## 功能概述

- Google 帳號登入
- 登出功能
- 會話管理
- 權限控制
- 用戶資料自動同步

## 設置流程

設置 Google 登入需要完成以下步驟：

1. 創建 Google Cloud 專案
2. 設置 OAuth 同意畫面
3. 創建 OAuth 憑證
4. 配置環境變數
5. 啟動應用程式測試

詳細步驟請參考 [Google OAuth 認證設置指南](./google_auth_setup.md)。

## 使用方法

許願池提供了簡單易用的登入/登出元件：

```tsx
// 登入按鈕
<LoginButton callbackUrl="/profile" />

// 登出按鈕
<LogoutButton redirectUrl="/" />
```

檢查用戶登入狀態：

```tsx
const { data: session, status } = useSession();

if (status === "authenticated") {
  // 用戶已登入
  console.log("用戶資訊:", session.user);
}
```

完整使用指南請參考 [認證系統使用手冊](./auth_usage_guide.md)。

## 資料夾結構

```
app/
  api/
    auth/
      [...nextauth]/    - NextAuth.js API 路由
      logout/           - 登出處理 API
  components/
    auth/
      AuthProvider.tsx  - 認證狀態提供者
      LoginButton.tsx   - 登入按鈕元件
      LogoutButton.tsx  - 登出按鈕元件
      SignInForm.tsx    - 登入表單元件
  lib/
    auth.ts            - NextAuth 配置和助手函數
    userAuth.ts        - 用戶認證相關函數
  (views)/
    auth/
      signin/          - 登入頁面
```

## 環境變數

認證系統需要以下環境變數：

```
# 基本設定
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Google OAuth 設定
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

請參考 `envLocal.example` 文件，並創建自己的 `.env.local` 文件。

## 相關文件

- [Google OAuth 認證設置指南](./google_auth_setup.md) - 詳細的 Google 登入設置步驟
- [認證系統使用手冊](./auth_usage_guide.md) - 如何在專案中使用認證功能

## 後續發展

未來計劃添加更多認證方式：

- LINE 登入
- Facebook 登入
- Apple 登入

如有任何問題或建議，請開啟 Issue 討論。
