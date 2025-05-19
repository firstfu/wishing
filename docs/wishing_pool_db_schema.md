# 許願池資料庫結構設計

## 1. 資料表結構

### 1.1 使用者資料表 (users)

| 欄位名稱      | 資料類型      | 描述           | 索引/約束        |
| ------------- | ------------- | -------------- | ---------------- |
| id            | SERIAL        | 用戶唯一識別碼 | 主鍵             |
| username      | VARCHAR(50)   | 用戶名稱       | UNIQUE, NOT NULL |
| email         | VARCHAR(100)  | 電子郵件地址   | UNIQUE, NOT NULL |
| password_hash | VARCHAR(255)  | 密碼雜湊值     | NOT NULL         |
| avatar_url    | VARCHAR(255)  | 頭像 URL       |                  |
| balance       | DECIMAL(10,2) | 帳戶餘額       | DEFAULT 0.00     |
| created_at    | TIMESTAMP     | 註冊時間       | DEFAULT NOW()    |
| updated_at    | TIMESTAMP     | 最後更新時間   | DEFAULT NOW()    |
| is_active     | BOOLEAN       | 帳戶是否啟用   | DEFAULT TRUE     |

### 1.2 許願資料表 (wishes)

| 欄位名稱    | 資料類型      | 描述                           | 索引/約束           |
| ----------- | ------------- | ------------------------------ | ------------------- |
| id          | SERIAL        | 許願唯一識別碼                 | 主鍵                |
| user_id     | INTEGER       | 發布者 ID                      | 外鍵(users.id)      |
| title       | VARCHAR(100)  | 許願標題                       | NOT NULL            |
| category_id | INTEGER       | 分類 ID                        | 外鍵(categories.id) |
| description | TEXT          | 詳細描述                       | NOT NULL            |
| min_budget  | DECIMAL(10,2) | 最低預算                       |                     |
| max_budget  | DECIMAL(10,2) | 最高預算                       |                     |
| deadline    | TIMESTAMP     | 截止日期                       |                     |
| is_pinned   | BOOLEAN       | 是否置頂                       | DEFAULT FALSE       |
| pin_until   | TIMESTAMP     | 置頂截止時間                   |                     |
| image_url   | VARCHAR(255)  | 圖片 URL                       |                     |
| created_at  | TIMESTAMP     | 發布時間                       | DEFAULT NOW()       |
| updated_at  | TIMESTAMP     | 最後更新時間                   | DEFAULT NOW()       |
| status      | VARCHAR(20)   | 狀態(active/completed/expired) | DEFAULT 'active'    |

### 1.3 分類資料表 (categories)

| 欄位名稱    | 資料類型     | 描述           | 索引/約束        |
| ----------- | ------------ | -------------- | ---------------- |
| id          | SERIAL       | 分類唯一識別碼 | 主鍵             |
| name        | VARCHAR(50)  | 分類名稱       | UNIQUE, NOT NULL |
| description | VARCHAR(255) | 分類描述       |                  |
| created_at  | TIMESTAMP    | 創建時間       | DEFAULT NOW()    |

### 1.4 留言資料表 (comments)

| 欄位名稱   | 資料類型  | 描述           | 索引/約束       |
| ---------- | --------- | -------------- | --------------- |
| id         | SERIAL    | 留言唯一識別碼 | 主鍵            |
| wish_id    | INTEGER   | 許願 ID        | 外鍵(wishes.id) |
| user_id    | INTEGER   | 留言用戶 ID    | 外鍵(users.id)  |
| content    | TEXT      | 留言內容       | NOT NULL        |
| created_at | TIMESTAMP | 留言時間       | DEFAULT NOW()   |
| updated_at | TIMESTAMP | 最後更新時間   | DEFAULT NOW()   |

### 1.5 私訊資料表 (messages)

| 欄位名稱    | 資料類型  | 描述           | 索引/約束       |
| ----------- | --------- | -------------- | --------------- |
| id          | SERIAL    | 訊息唯一識別碼 | 主鍵            |
| sender_id   | INTEGER   | 發送者 ID      | 外鍵(users.id)  |
| receiver_id | INTEGER   | 接收者 ID      | 外鍵(users.id)  |
| wish_id     | INTEGER   | 相關許願 ID    | 外鍵(wishes.id) |
| content     | TEXT      | 訊息內容       | NOT NULL        |
| is_read     | BOOLEAN   | 是否已讀       | DEFAULT FALSE   |
| created_at  | TIMESTAMP | 發送時間       | DEFAULT NOW()   |

### 1.6 交易資料表 (transactions)

| 欄位名稱       | 資料類型      | 描述                           | 索引/約束         |
| -------------- | ------------- | ------------------------------ | ----------------- |
| id             | SERIAL        | 交易唯一識別碼                 | 主鍵              |
| user_id        | INTEGER       | 用戶 ID                        | 外鍵(users.id)    |
| amount         | DECIMAL(10,2) | 交易金額                       | NOT NULL          |
| type           | VARCHAR(20)   | 交易類型(deposit/wish/pin)     | NOT NULL          |
| wish_id        | INTEGER       | 關聯許願 ID                    | 外鍵(wishes.id)   |
| status         | VARCHAR(20)   | 狀態(pending/completed/failed) | DEFAULT 'pending' |
| payment_method | VARCHAR(50)   | 支付方式                       |                   |
| payment_id     | VARCHAR(100)  | 外部支付 ID                    |                   |
| created_at     | TIMESTAMP     | 交易時間                       | DEFAULT NOW()     |
| updated_at     | TIMESTAMP     | 最後更新時間                   | DEFAULT NOW()     |

## 2. 資料庫關聯圖

```
users --< wishes
users --< comments
users --< transactions
users --< messages (sender)
users --< messages (receiver)
categories --< wishes
wishes --< comments
wishes --< messages
wishes --< transactions
```

## 3. 索引設計

### 3.1 用戶資料表索引

- PRIMARY KEY on `users.id`
- UNIQUE INDEX on `users.email`
- UNIQUE INDEX on `users.username`

### 3.2 許願資料表索引

- PRIMARY KEY on `wishes.id`
- INDEX on `wishes.user_id`
- INDEX on `wishes.category_id`
- INDEX on `wishes.is_pinned`
- INDEX on `wishes.status`
- INDEX on `wishes.created_at`

### 3.3 留言資料表索引

- PRIMARY KEY on `comments.id`
- INDEX on `comments.wish_id`
- INDEX on `comments.user_id`

### 3.4 私訊資料表索引

- PRIMARY KEY on `messages.id`
- INDEX on `messages.sender_id`
- INDEX on `messages.receiver_id`
- INDEX on `messages.wish_id`
- INDEX on `messages.is_read`

### 3.5 交易資料表索引

- PRIMARY KEY on `transactions.id`
- INDEX on `transactions.user_id`
- INDEX on `transactions.wish_id`
- INDEX on `transactions.type`
- INDEX on `transactions.status`

## 4. 資料庫初始化資料

### 4.1 初始化分類

- 日用品
- 食品
- 服飾
- 電子產品
- 其他

## 5. 安全性考量

- 所有密碼使用 bcrypt 或 Argon2 進行雜湊處理
- 敏感資訊（如支付資訊）加密存儲
- 實施適當的資料庫存取權限控制
- 定期備份資料庫
- 實施資料庫交易以確保資料完整性
- 使用參數化查詢防止 SQL 注入攻擊
