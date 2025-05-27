# Google 登入設定指南

本文檔提供設定許願池專案 Google 登入功能的完整步驟。

## 步驟 1: 創建 Google Cloud 專案

1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. 點擊右上角的專案選擇器，然後點擊「新增專案」
3. 輸入專案名稱 (如「許願池」)，點擊「建立」
4. 等待專案建立完成

## 步驟 2: 設定 OAuth 同意畫面

1. 在左側導航選單中，進入「APIs & Services」>「OAuth consent screen」
2. 選擇使用者類型 (建議開發階段選「External」)，點擊「CREATE」
3. 填寫應用程式資訊：
   - 應用程式名稱：許願池
   - 使用者支援電子郵件：您的電子郵件
   - 開發者聯絡資訊：您的電子郵件
4. 點擊「SAVE AND CONTINUE」
5. 在「Scopes」頁面，點擊「ADD OR REMOVE SCOPES」，選擇以下範圍：
   - `userinfo.email`
   - `userinfo.profile`
   - `openid`
6. 點擊「UPDATE」，然後「SAVE AND CONTINUE」
7. 在「Test users」頁面，點擊「ADD USERS」，添加您的電子郵件和測試用戶的電子郵件
8. 點擊「SAVE AND CONTINUE」，然後「BACK TO DASHBOARD」

## 步驟 3: 創建 OAuth 憑證

1. 在左側導航選單中，進入「APIs & Services」>「Credentials」
2. 點擊頂部的「CREATE CREDENTIALS」，選擇「OAuth client ID」
3. 選擇應用程式類型為「Web application」
4. 輸入名稱 (如「許願池 Web Client」)
5. 在「Authorized JavaScript origins」中，點擊「ADD URI」，添加：
   - 開發環境：`http://localhost:3000`
   - 生產環境：您的實際網域 (例如 `https://wishing.example.com`)
6. 在「Authorized redirect URIs」中，點擊「ADD URI」，添加：
   - 開發環境：`http://localhost:3000/api/auth/callback/google`
   - 生產環境：`https://wishing.example.com/api/auth/callback/google`
7. 點擊「CREATE」
8. 系統會顯示您的「Client ID」和「Client Secret」，請妥善記錄這些資訊

## 步驟 4: 設定環境變數

1. 在專案根目錄中，創建或更新 `.env` 文件
2. 添加以下環境變數：

   ```
   # NextAuth.js 設定
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret_key_here  # 可使用 openssl rand -base64 32 生成

   # Google OAuth 設定
   GOOGLE_CLIENT_ID=您剛才獲取的Client_ID
   GOOGLE_CLIENT_SECRET=您剛才獲取的Client_Secret

   # 資料庫連接
   DATABASE_URL=您的資料庫連接字串
   ```

3. 在生產環境，請更新 `NEXTAUTH_URL` 為您的實際網域
4. 確保將 `.env` 文件添加到 `.gitignore` 中，避免洩漏敏感資訊

## 步驟 5: 用戶資料處理機制

本專案使用手動方式處理 Google 登入後的用戶資料，主要在 NextAuth.js 的 JWT 回調中實現：

1. 當用戶通過 Google 登入時，會觸發 JWT 回調
2. 系統會檢查該電子郵件是否已存在於資料庫
3. 如果不存在，創建新用戶記錄
4. 如果已存在，更新用戶資訊（名稱、頭像等）
5. 將用戶 ID 和餘額等資訊添加到 JWT token 中
6. Session 回調會從 token 中讀取用戶資訊，並添加到 session 中

這種手動處理方式的優點：

- 對用戶資料處理有更大的控制權
- 可以實現自定義的用戶資料處理邏輯
- 不依賴特定的適配器，降低套件依賴性

## 步驟 6: 測試登入功能

1. 啟動開發伺服器：`npm run dev`
2. 前往登入頁面：http://localhost:3000/auth/signin
3. 點擊「使用 Google 帳號登入」按鈕
4. 選擇或輸入您的 Google 帳號
5. 授權應用程式存取您的資訊
6. 確認是否成功重定向到應用程式，並且登入狀態正確

## 注意事項

1. 在開發階段，Google OAuth 同意畫面處於「測試」模式，只有添加的測試用戶可以登入
2. 發布前，請將 OAuth 同意畫面設為「正式版」，以允許所有用戶登入
3. 確保生產環境中的重定向 URI 正確配置
4. 定期檢查 OAuth 憑證的有效性和安全性
5. 定期審核應用程式的權限請求，確保只請求必要的權限

## 常見問題

### 登入時出現「invalid_request」或「redirect_uri_mismatch」錯誤

確保您在 Google Cloud Console 中配置的重定向 URI 與應用程式中使用的完全一致，包括 HTTP/HTTPS 和任何子路徑。

### 登入後立即被登出

檢查 `NEXTAUTH_SECRET` 是否正確設定，並且在部署時保持一致。更改此值會使所有現有會話失效。

### 無法獲取用戶資訊

確保請求了正確的 OAuth 範圍 (`userinfo.profile`, `userinfo.email`, `openid`)，並且用戶已授予這些權限。

### 找不到用戶資料或無法創建用戶

檢查資料庫連接是否正確，以及是否有適當的寫入權限。查看伺服器日誌以獲取更多錯誤詳情。
