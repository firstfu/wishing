import { getServerSession } from "next-auth/next";
import { AuthOptions } from "next-auth";
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

// Google Profile 擴展型別，包含 email_verified 屬性
interface GoogleProfile {
  sub: string;
  name: string;
  email: string;
  picture: string;
  email_verified: boolean;
}

// NextAuth 配置
export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          email_verified: profile.email_verified,
        };
      },
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
      // 對於 Google 登入，可以檢查電子郵件是否已驗證
      if (account?.provider === "google" && profile && "email_verified" in profile && profile.email_verified === false) {
        return false; // 拒絕未驗證的 Google 帳戶
      }

      return true; // 允許其他登入
    },
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 天
  },
  secret: process.env.NEXTAUTH_SECRET,
};

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
