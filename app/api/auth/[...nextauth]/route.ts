import NextAuth from "next-auth";
import { authOptions } from "@/app/lib/auth";

// 使用配置創建處理程序
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
