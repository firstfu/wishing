import { NextResponse } from "next/server";

// 處理登出請求，返回重定向回首頁
export async function GET() {
  return NextResponse.redirect(new URL("/", process.env.NEXTAUTH_URL || "http://localhost:3000"));
}
