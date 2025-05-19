# 許願池 API 端點設計

本文檔列出了許願池應用程式所需的所有 API 端點。API 採用 RESTful 設計風格，所有響應均以 JSON 格式返回。

## 基礎 URL

```
/api/v1
```

## 認證與授權

除了明確標記為公開的端點外，所有 API 調用都需要在請求頭中包含有效的 JWT 令牌：

```
Authorization: Bearer {token}
```

## 用戶相關端點

### 註冊

- **URL**: `/auth/register`
- **方法**: `POST`
- **權限**: 公開
- **請求體**:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **響應**:
  ```json
  {
    "success": true,
    "message": "註冊成功",
    "data": {
      "user_id": "integer",
      "username": "string",
      "email": "string",
      "token": "string"
    }
  }
  ```

### 登入

- **URL**: `/auth/login`
- **方法**: `POST`
- **權限**: 公開
- **請求體**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **響應**:
  ```json
  {
    "success": true,
    "message": "登入成功",
    "data": {
      "user_id": "integer",
      "username": "string",
      "token": "string"
    }
  }
  ```

### 取得當前用戶資訊

- **URL**: `/users/me`
- **方法**: `GET`
- **權限**: 已登入用戶
- **響應**:
  ```json
  {
    "success": true,
    "data": {
      "user_id": "integer",
      "username": "string",
      "email": "string",
      "avatar_url": "string",
      "balance": "number",
      "created_at": "datetime"
    }
  }
  ```

### 更新用戶資料

- **URL**: `/users/me`
- **方法**: `PUT`
- **權限**: 已登入用戶
- **請求體**:
  ```json
  {
    "username": "string",
    "avatar_url": "string"
  }
  ```
- **響應**:
  ```json
  {
    "success": true,
    "message": "資料更新成功",
    "data": {
      "user_id": "integer",
      "username": "string",
      "avatar_url": "string"
    }
  }
  ```

## 許願相關端點

### 獲取許願列表

- **URL**: `/wishes`
- **方法**: `GET`
- **權限**: 公開
- **查詢參數**:
  - `page`: 頁碼 (默認: 1)
  - `limit`: 每頁數量 (默認: 10)
  - `category_id`: 分類 ID (可選)
  - `search`: 搜尋關鍵字 (可選)
  - `sort`: 排序方式 (newest, oldest, pinned) (默認: newest)
- **響應**:
  ```json
  {
    "success": true,
    "data": {
      "wishes": [
        {
          "id": "integer",
          "title": "string",
          "description": "string",
          "category": {
            "id": "integer",
            "name": "string"
          },
          "user": {
            "id": "integer",
            "username": "string",
            "avatar_url": "string"
          },
          "min_budget": "number",
          "max_budget": "number",
          "deadline": "datetime",
          "is_pinned": "boolean",
          "image_url": "string",
          "created_at": "datetime",
          "status": "string"
        }
      ],
      "pagination": {
        "total": "integer",
        "current_page": "integer",
        "total_pages": "integer",
        "limit": "integer"
      }
    }
  }
  ```

### 獲取單個許願詳情

- **URL**: `/wishes/{wish_id}`
- **方法**: `GET`
- **權限**: 公開
- **響應**:
  ```json
  {
    "success": true,
    "data": {
      "id": "integer",
      "title": "string",
      "description": "string",
      "category": {
        "id": "integer",
        "name": "string"
      },
      "user": {
        "id": "integer",
        "username": "string",
        "avatar_url": "string"
      },
      "min_budget": "number",
      "max_budget": "number",
      "deadline": "datetime",
      "is_pinned": "boolean",
      "image_url": "string",
      "created_at": "datetime",
      "status": "string",
      "comments": [
        {
          "id": "integer",
          "content": "string",
          "user": {
            "id": "integer",
            "username": "string",
            "avatar_url": "string"
          },
          "created_at": "datetime"
        }
      ]
    }
  }
  ```

### 發布許願

- **URL**: `/wishes`
- **方法**: `POST`
- **權限**: 已登入用戶
- **請求體**:
  ```json
  {
    "title": "string",
    "description": "string",
    "category_id": "integer",
    "min_budget": "number",
    "max_budget": "number",
    "deadline": "datetime",
    "is_pinned": "boolean",
    "image_url": "string"
  }
  ```
- **響應**:
  ```json
  {
    "success": true,
    "message": "許願發布成功",
    "data": {
      "wish_id": "integer",
      "title": "string",
      "transaction": {
        "id": "integer",
        "amount": "number",
        "status": "string"
      }
    }
  }
  ```

### 更新許願

- **URL**: `/wishes/{wish_id}`
- **方法**: `PUT`
- **權限**: 許願發布者
- **請求體**:
  ```json
  {
    "title": "string",
    "description": "string",
    "category_id": "integer",
    "min_budget": "number",
    "max_budget": "number",
    "deadline": "datetime",
    "image_url": "string"
  }
  ```
- **響應**:
  ```json
  {
    "success": true,
    "message": "許願更新成功",
    "data": {
      "wish_id": "integer",
      "title": "string"
    }
  }
  ```

### 許願置頂

- **URL**: `/wishes/{wish_id}/pin`
- **方法**: `POST`
- **權限**: 許願發布者
- **響應**:
  ```json
  {
    "success": true,
    "message": "許願置頂成功",
    "data": {
      "wish_id": "integer",
      "is_pinned": true,
      "pin_until": "datetime",
      "transaction": {
        "id": "integer",
        "amount": "number",
        "status": "string"
      }
    }
  }
  ```

### 刪除許願

- **URL**: `/wishes/{wish_id}`
- **方法**: `DELETE`
- **權限**: 許願發布者
- **響應**:
  ```json
  {
    "success": true,
    "message": "許願已刪除"
  }
  ```

## 留言相關端點

### 獲取許願留言

- **URL**: `/wishes/{wish_id}/comments`
- **方法**: `GET`
- **權限**: 公開
- **查詢參數**:
  - `page`: 頁碼 (默認: 1)
  - `limit`: 每頁數量 (默認: 20)
- **響應**:
  ```json
  {
    "success": true,
    "data": {
      "comments": [
        {
          "id": "integer",
          "content": "string",
          "user": {
            "id": "integer",
            "username": "string",
            "avatar_url": "string"
          },
          "created_at": "datetime"
        }
      ],
      "pagination": {
        "total": "integer",
        "current_page": "integer",
        "total_pages": "integer",
        "limit": "integer"
      }
    }
  }
  ```

### 發表留言

- **URL**: `/wishes/{wish_id}/comments`
- **方法**: `POST`
- **權限**: 已登入用戶
- **請求體**:
  ```json
  {
    "content": "string"
  }
  ```
- **響應**:
  ```json
  {
    "success": true,
    "message": "留言發表成功",
    "data": {
      "comment_id": "integer",
      "content": "string",
      "created_at": "datetime"
    }
  }
  ```

### 刪除留言

- **URL**: `/comments/{comment_id}`
- **方法**: `DELETE`
- **權限**: 留言發布者或許願發布者
- **響應**:
  ```json
  {
    "success": true,
    "message": "留言已刪除"
  }
  ```

## 私訊相關端點

### 獲取對話列表

- **URL**: `/messages/conversations`
- **方法**: `GET`
- **權限**: 已登入用戶
- **響應**:
  ```json
  {
    "success": true,
    "data": {
      "conversations": [
        {
          "user": {
            "id": "integer",
            "username": "string",
            "avatar_url": "string"
          },
          "wish": {
            "id": "integer",
            "title": "string"
          },
          "last_message": "string",
          "unread_count": "integer",
          "updated_at": "datetime"
        }
      ]
    }
  }
  ```

### 獲取對話消息

- **URL**: `/messages/conversations/{user_id}?wish_id={wish_id}`
- **方法**: `GET`
- **權限**: 對話參與者
- **查詢參數**:
  - `page`: 頁碼 (默認: 1)
  - `limit`: 每頁數量 (默認: 50)
- **響應**:
  ```json
  {
    "success": true,
    "data": {
      "messages": [
        {
          "id": "integer",
          "sender_id": "integer",
          "receiver_id": "integer",
          "content": "string",
          "is_read": "boolean",
          "created_at": "datetime"
        }
      ],
      "wish": {
        "id": "integer",
        "title": "string"
      },
      "pagination": {
        "total": "integer",
        "current_page": "integer",
        "total_pages": "integer",
        "limit": "integer"
      }
    }
  }
  ```

### 發送私訊

- **URL**: `/messages`
- **方法**: `POST`
- **權限**: 已登入用戶
- **請求體**:
  ```json
  {
    "receiver_id": "integer",
    "wish_id": "integer",
    "content": "string"
  }
  ```
- **響應**:
  ```json
  {
    "success": true,
    "message": "訊息發送成功",
    "data": {
      "message_id": "integer",
      "content": "string",
      "created_at": "datetime"
    }
  }
  ```

### 標記訊息為已讀

- **URL**: `/messages/read`
- **方法**: `PUT`
- **權限**: 訊息接收者
- **請求體**:
  ```json
  {
    "sender_id": "integer",
    "wish_id": "integer"
  }
  ```
- **響應**:
  ```json
  {
    "success": true,
    "message": "訊息已標記為已讀"
  }
  ```

## 支付相關端點

### 獲取用戶交易紀錄

- **URL**: `/transactions`
- **方法**: `GET`
- **權限**: 已登入用戶
- **查詢參數**:
  - `page`: 頁碼 (默認: 1)
  - `limit`: 每頁數量 (默認: 20)
  - `type`: 交易類型 (deposit, wish, pin) (可選)
- **響應**:
  ```json
  {
    "success": true,
    "data": {
      "transactions": [
        {
          "id": "integer",
          "amount": "number",
          "type": "string",
          "wish": {
            "id": "integer",
            "title": "string"
          },
          "status": "string",
          "payment_method": "string",
          "created_at": "datetime"
        }
      ],
      "pagination": {
        "total": "integer",
        "current_page": "integer",
        "total_pages": "integer",
        "limit": "integer"
      }
    }
  }
  ```

### 儲值

- **URL**: `/transactions/deposit`
- **方法**: `POST`
- **權限**: 已登入用戶
- **請求體**:
  ```json
  {
    "amount": "number",
    "payment_method": "string"
  }
  ```
- **響應**:
  ```json
  {
    "success": true,
    "message": "儲值請求已建立",
    "data": {
      "transaction_id": "integer",
      "amount": "number",
      "payment_url": "string"
    }
  }
  ```

### 支付回調

- **URL**: `/transactions/callback`
- **方法**: `POST`
- **權限**: 支付服務提供商
- **請求體**: 依賴於支付服務提供商的格式
- **響應**:
  ```json
  {
    "success": true
  }
  ```

## 分類相關端點

### 獲取分類列表

- **URL**: `/categories`
- **方法**: `GET`
- **權限**: 公開
- **響應**:
  ```json
  {
    "success": true,
    "data": {
      "categories": [
        {
          "id": "integer",
          "name": "string",
          "description": "string"
        }
      ]
    }
  }
  ```

## 錯誤響應

所有請求在發生錯誤時將返回一個一致的錯誤格式：

```json
{
  "success": false,
  "error": {
    "code": "string",
    "message": "string"
  }
}
```

常見錯誤代碼：

- `UNAUTHORIZED`: 未經授權的訪問
- `FORBIDDEN`: 權限不足
- `NOT_FOUND`: 資源不存在
- `BAD_REQUEST`: 請求格式不正確
- `VALIDATION_ERROR`: 驗證錯誤
- `PAYMENT_ERROR`: 支付相關錯誤
- `INTERNAL_ERROR`: 服務器內部錯誤
