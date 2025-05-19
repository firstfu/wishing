// 許願池專案全域根布局組件
// - 設定全站字體、全域樣式與 SEO metadata
// - 提供全站共用的 Navbar 與 Footer
// - 所有頁面內容會渲染於 <main> 內
//
// 位置：app/layout.tsx
//
// 本檔案為 Next.js App Router 架構的全域布局，所有子頁面都會套用此結構

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "許願池 - 讓願望被看見，讓幫助更容易傳遞",
  description: "在許願池發布您的願望，獲得來自社群的幫助和支持。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
