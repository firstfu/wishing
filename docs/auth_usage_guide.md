# 許願池認證系統使用手冊

本手冊將說明如何在許願池專案中使用認證系統功能，包括登入、登出和權限控制。

## 基本概念

許願池使用 NextAuth.js 實現認證系統，支援 Google 帳號登入。認證系統主要組件包括：

1. **登入按鈕** - 提供簡單的 Google 登入功能
2. **登出按鈕** - 讓用戶登出系統
3. **會話管理** - 處理用戶登入狀態
4. **權限控制** - 根據登入狀態控制頁面訪問權限

## 在元件中使用認證功能

### 引入必要的 hooks 和組件

```tsx
// 客戶端元件中
"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import LoginButton from "@/app/components/auth/LoginButton";
import LogoutButton from "@/app/components/auth/LogoutButton";
```

### 檢查用戶登入狀態

```tsx
function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>載入中...</div>;
  }

  if (status === "unauthenticated") {
    return <div>請先登入以查看個人資料</div>;
  }

  // 用戶已登入
  return (
    <div>
      <h1>歡迎, {session?.user?.name}!</h1>
      <p>您的電子郵件: {session?.user?.email}</p>
    </div>
  );
}
```

### 使用登入按鈕

```tsx
// 基本用法
<LoginButton />

// 自訂文字
<LoginButton>使用 Google 繼續</LoginButton>

// 自訂重定向頁面
<LoginButton callbackUrl="/profile" />

// 自訂樣式
<LoginButton
  variant="outline"
  size="lg"
  className="rounded-full px-6"
>
  登入帳號
</LoginButton>
```

### 使用登出按鈕

```tsx
// 基本用法
<LogoutButton />

// 自訂文字
<LogoutButton>登出系統</LogoutButton>

// 自訂重定向頁面
<LogoutButton redirectUrl="/auth/signin" />

// 自訂樣式
<LogoutButton
  variant="ghost"
  size="sm"
  className="text-red-500"
>
  登出帳號
</LogoutButton>
```

## 在伺服器元件中獲取用戶資訊

在伺服器元件中，可以使用 `getServerSession` 函數獲取用戶資訊：

```tsx
// 伺服器元件
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";

export default async function ProfileServerPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>請先登入以查看個人資料</div>;
  }

  return (
    <div>
      <h1>歡迎, {session.user.name}!</h1>
      <p>您的電子郵件: {session.user.email}</p>
    </div>
  );
}
```

## 權限控制

### 客戶端權限控制

```tsx
"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedClientPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin?callbackUrl=" + encodeURIComponent(window.location.href));
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>載入中...</div>;
  }

  if (status === "unauthenticated") {
    return <div>重定向至登入頁面...</div>;
  }

  return <div>受保護的內容</div>;
}
```

### 伺服器端權限控制

```tsx
// 伺服器元件
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export default async function ProtectedServerPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin?callbackUrl=" + encodeURIComponent("/protected-page"));
  }

  return <div>受保護的內容</div>;
}
```

### 在中間件中進行權限控制

可以使用 Next.js 中間件來保護多個路由：

```tsx
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  // 獲取 token，如果用戶已登入則存在
  const token = await getToken({ req: request });

  // 要保護的路徑
  const protectedPaths = ["/profile", "/wishes/create"];

  // 檢查當前路徑是否需要保護
  const isProtectedPath = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path));

  // 如果是保護路徑且用戶未登入，重定向到登入頁面
  if (isProtectedPath && !token) {
    const url = new URL("/auth/signin", request.url);
    url.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/wishes/create/:path*"],
};
```

## 獲取用戶額外資訊

通過 session 可以獲取基本用戶資訊，包括我們自定義的餘額屬性：

```tsx
const { data: session } = useSession();

// 獲取用戶餘額
const userBalance = session?.user?.balance || 0;
```

## 開發環境測試

1. 確保您已設置好 Google OAuth 憑證（參考 `docs/google_auth_setup.md`）
2. 確保您已正確配置 `.env.local` 文件
3. 啟動開發服務器：`npm run dev`
4. 訪問登入頁面：`http://localhost:3000/auth/signin`
5. 使用 Google 帳號登入
6. 登入後，您應該能夠在 `/profile` 頁面看到您的用戶資訊
