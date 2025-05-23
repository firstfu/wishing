// auth/AuthProvider.tsx - 認證狀態提供者元件
//
// 使用 NextAuth SessionProvider 包裝整個應用，提供全域認證狀態管理。
// 讓所有子元件都能透過 useSession 鉤子存取使用者登入狀態和資訊。

"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function AuthProvider({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
