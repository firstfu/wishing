# Google OAuth 認證設置指南

本指南將幫助您設置 Google OAuth 認證，以便在許願池應用程式中實現 Google 登入功能。

## 1. 建立 Google Cloud 專案

1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. 點擊頁面頂部的專案下拉選單，然後點擊「新建專案」
3. 輸入專案名稱（例如「許願池」），然後點擊「建立」
4. 等待專案建立完成，然後切換到新建立的專案

## 2. 設置 OAuth 同意畫面

1. 在左側選單中，找到並點擊「API 和服務」>「OAuth 同意畫面」
2. 選擇使用者類型（建議選擇「外部」，除非您有 Google Workspace），然後點擊「建立」
3. 填寫應用程式資訊：
   - 應用程式名稱：許願池
   - 使用者支援電子郵件：您的電子郵件
   - 開發者聯絡資訊：您的電子郵件
4. 點擊「儲存並繼續」
5. 在「範圍」步驟中，點擊「新增或移除範圍」，選擇以下範圍：
   - `userinfo.email`
   - `userinfo.profile`
   - `openid`
6. 點擊「更新」，然後點擊「儲存並繼續」
7. 在「測試使用者」步驟中，您可以新增測試使用者電子郵件以便測試。在開發階段，這是必要的。
8. 點擊「儲存並繼續」

## 3. 建立 OAuth 憑證

1. 在左側選單中，找到並點擊「API 和服務」>「憑證」
2. 點擊頁面頂部的「建立憑證」，然後選擇「OAuth 用戶端 ID」
3. 應用程式類型選擇「Web 應用程式」
4. 名稱輸入「許願池 Web 用戶端」
5. 在「已授權的重新導向 URI」下，點擊「新增 URI」
6. 針對本地開發，輸入：`http://localhost:3000/api/auth/callback/google`
7. 如果您有生產環境 URL，也請添加：`https://您的網域/api/auth/callback/google`
8. 點擊「建立」
9. 將顯示的「用戶端 ID」和「用戶端密鑰」保存下來，這些將用於環境變數

## 4. 設置環境變數

1. 在項目根目錄中，將 `envLocal.example` 檔案複製並重命名為 `.env.local`
2. 編輯 `.env.local` 檔案，填入您的 Google OAuth 憑證：

```
# 基本設定
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=生成一個隨機字串作為密鑰

# 資料庫連接
DATABASE_URL="postgresql://username:password@localhost:5432/wishing_pool?schema=public"

# Google OAuth 設定
GOOGLE_CLIENT_ID=您的Google客戶端ID
GOOGLE_CLIENT_SECRET=您的Google客戶端密鑰
```

3. 生成 `NEXTAUTH_SECRET`：您可以使用以下命令生成一個隨機字串：

   ```
   openssl rand -base64 32
   ```

   或者在 Node.js 中運行：

   ```javascript
   require("crypto").randomBytes(32).toString("hex");
   ```

4. 確保將正確的資料庫連接資訊填入 `DATABASE_URL`

## 5. 啟動應用程式

設置完成後，您可以啟動應用程式：

```
npm run dev
```

然後訪問 http://localhost:3000/auth/signin 來測試 Google 登入功能。

## 常見問題

### 登入時出現「invalid_request」或「redirect_uri_mismatch」錯誤

確保您在 Google Cloud Console 中配置的重定向 URI 與應用程式中使用的完全一致，包括 HTTP/HTTPS 和任何子路徑。

### 登入後立即被登出

檢查 `NEXTAUTH_SECRET` 是否正確設定，並且在部署時保持一致。更改此值會使所有現有會話失效。

### 無法獲取用戶資訊

確保請求了正確的 OAuth 範圍 (`userinfo.profile`, `userinfo.email`, `openid`)，並且用戶已授予這些權限。

### 找不到用戶資料或無法創建用戶

檢查資料庫連接是否正確，以及是否有適當的寫入權限。查看伺服器日誌以獲取更多錯誤詳情。
