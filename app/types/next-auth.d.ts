import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * 擴展 NextAuth 的 Session 介面，添加自定義屬性
   */
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

// NextAuth JWT 介面擴展
declare module "next-auth/jwt" {
  /**
   * 擴展 JWT 介面，確保與 Session 的 user 屬性一致
   */
  interface JWT {
    id?: string;
    sub?: string;
  }
}
