"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">許願池</h3>
            <p className="text-muted-foreground">讓您的願望被看見，讓幫助更容易傳遞。</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">連結</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary">
                  首頁
                </Link>
              </li>
              <li>
                <Link href="/wishes" className="text-muted-foreground hover:text-primary">
                  許願列表
                </Link>
              </li>
              <li>
                <Link href="/wishes/create" className="text-muted-foreground hover:text-primary">
                  發布許願
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">聯絡我們</h3>
            <p className="text-muted-foreground">電子郵件：contact@wishingpool.com</p>
            <p className="text-muted-foreground">客服電話：+886 2 12345678</p>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-6 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} 許願池. 保留所有權利。</p>
        </div>
      </div>
    </footer>
  );
}
