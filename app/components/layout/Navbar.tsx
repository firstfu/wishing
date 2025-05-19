"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/Button";

export default function Navbar() {
  // 模擬登入狀態，後續會替換為實際的認證邏輯
  const isLoggedIn = false;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary">許願池</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-2">
          <Link href="/wishes" className="px-3 py-2 hover:text-primary">
            許願列表
          </Link>
          {/* 其他頂部導航項目 */}
        </div>

        <div className="flex items-center space-x-2">
          {isLoggedIn ? (
            <>
              <Link href="/wishes/create">
                <Button variant="outline" size="sm">
                  發布許願
                </Button>
              </Link>
              <Link href="/profile">
                <Button variant="ghost" size="sm">
                  個人中心
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="outline" size="sm">
                  登入
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button variant="default" size="sm">
                  註冊
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
