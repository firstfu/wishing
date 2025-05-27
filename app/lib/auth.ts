import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// 獲取當前會話用戶
export async function getSession() {
  return await getServerSession(authOptions);
}

// 獲取當前登入用戶
export async function getCurrentUser() {
  const session = await getSession();

  return session?.user;
}

// 檢查用戶是否已登入
export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}

// 獲取當前用戶 ID
export async function getCurrentUserId() {
  const user = await getCurrentUser();
  return user?.id;
}

// 用於客戶端組件的會話提供者和鉤子在 next-auth/react 中使用
// 這裡主要提供服務器端獲取用戶資訊的功能
