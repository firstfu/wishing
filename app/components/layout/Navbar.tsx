// layout/Navbar.tsx - 全站導覽列元件
//
// 提供全站主選單、Logo、登入/註冊/個人中心等入口。
// 支援滾動時背景透明/模糊效果，並根據登入狀態顯示不同按鈕。
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/Button";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  const [scrolled, setScrolled] = useState(false);

  // 監聽滾動事件
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md shadow-sm border-b border-border/40" : "bg-background border-b border-border"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded-full group-hover:scale-110 transition-transform overflow-hidden">
              <Image src="/wishing-icon-v2.svg" alt="許願池" width={32} height={32} className="w-full h-full" />
            </div>
            <span className="text-xl font-bold bg-gradient text-transparent bg-clip-text">許願池</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <Link href="/wishes" className="text-foreground/80 hover:text-primary transition-colors font-medium">
            許願列表
          </Link>
          <Link href="/wishes?sort=trending" className="text-foreground/80 hover:text-primary transition-colors font-medium">
            熱門許願
          </Link>
          <Link href="/about" className="text-foreground/80 hover:text-primary transition-colors font-medium">
            關於我們
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <Link href={isLoggedIn ? "/wishes/create" : "/auth/signin"}>
            <Button variant="outline" size="sm" className="rounded-full px-4">
              {isLoggedIn ? "發布許願" : "發布許願"}
            </Button>
          </Link>

          {isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <Link href="/profile">
                <div className="w-9 h-9 bg-primary/10 text-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors overflow-hidden">
                  {session?.user?.image ? (
                    <Image src={session.user.image} alt={session.user.name || "使用者頭像"} width={36} height={36} className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-medium text-sm">{session?.user?.name?.charAt(0) || "U"}</span>
                  )}
                </div>
              </Link>
              <Button variant="ghost" size="sm" className="text-foreground/70 hover:text-foreground" onClick={() => signOut({ callbackUrl: "/" })}>
                登出
              </Button>
            </div>
          ) : (
            <Link href="/auth/signin">
              <Button variant="default" size="sm" className="rounded-full px-4 bg-gradient hover:shadow-md hover:shadow-primary/20">
                登入
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
