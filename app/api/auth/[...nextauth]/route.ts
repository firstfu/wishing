import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/app/lib/prisma";
import { getOrCreateOAuthUser, getUserBalance } from "@/app/lib/userAuth";

// 擴展 Session 的類型
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      balance?: number;
    };
  }
}

// 導出 AuthOptions 配置
export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // 實際應用中應添加實際的用戶驗證邏輯
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // 示例用戶，實際應用中應查詢數據庫
        const user = {
          id: "1",
          name: "測試用戶",
          email: credentials.email,
        };

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // 初次登入或更新資訊時
      if (user) {
        token.id = user.id;
      }

      // 如果是OAuth登入，處理使用者資料
      if (account && account.providerAccountId && token.email && (account.provider === "google" || account.provider === "github")) {
        try {
          // 使用工具函數處理 OAuth 用戶
          const dbUser = await getOrCreateOAuthUser({
            email: token.email as string,
            name: token.name as string,
            image: token.picture as string,
            provider: account.provider,
            providerAccountId: account.providerAccountId,
          });

          // 將用戶 ID 和餘額添加到 token
          token.id = dbUser.id;
          token.balance = Number(dbUser.balance);
        } catch (error) {
          console.error("處理 OAuth 用戶資料時出錯:", error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;

        // 添加額外的用戶資訊到 session
        if (typeof token.balance === "number") {
          session.user.balance = token.balance;
        } else if (token.id) {
          // 如果 token 中沒有餘額但有 ID，則從資料庫獲取
          try {
            session.user.balance = await getUserBalance(token.id as string);
          } catch (error) {
            console.error("獲取用戶餘額出錯:", error);
          }
        }
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      // 在這裡可以添加額外的登入條件檢查
      // 例如檢查用戶是否被禁用、是否在特定地區等
      return true; // 允許所有登入
    },
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// 使用配置創建處理程序
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
