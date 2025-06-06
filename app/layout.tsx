// 許願池專案全域根布局組件
// - 設定全站字體、全域樣式與 SEO metadata
// - 提供全站共用的 Navbar 與 Footer
// - 所有頁面內容會渲染於 <main> 內
//
// 位置：app/layout.tsx
//
// 本檔案為 Next.js App Router 架構的全域布局，所有子頁面都會套用此結構

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import AuthProvider from "@/app/components/auth/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "許願池 - 實現願望的社群平台",
  description: "許願池是一個幫助人們發布願望並獲得幫助的社群平台，連結有愛心和能力的人，共同實現美好願望。",
  keywords: "許願池, 願望, 幫助, 社群, 募資, 心願, 夢想實現",
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/wishing-icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/wishing-icon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <AuthProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
