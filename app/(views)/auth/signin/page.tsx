// auth/signin/page.tsx - 許願池登入頁面
//
// 提供使用者登入許願池平台的介面，支援 Google 帳號登入及訪客瀏覽。
// 使用 NextAuth.js 處理第三方認證流程，支援重定向回原始頁面。
// 頁面包含品牌標誌、登入選項、服務條款連結，以及視覺化的背景裝飾。
// 包含動畫效果：元素進場動畫、載入狀態、錯誤提示動畫。
// 實現響應式設計，確保在各種裝置上的最佳登入體驗。
// 特別優化了 UX 流程，如錯誤處理、載入狀態顯示，以及清晰的使用引導。

"use client";

import { useState, useEffect, Suspense } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/app/components/ui/Button";
import { useSearchParams, useRouter } from "next/navigation";

// 創建一個包含 useSearchParams 的組件
function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const urlError = searchParams.get("error");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // 添加進場動畫效果
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 300);

    // 處理 URL 錯誤參數
    if (urlError) {
      const errorMessages: { [key: string]: string } = {
        OAuthAccountNotLinked: "此電子郵件已使用其他登入方式註冊，請使用原始登入方式",
        AccessDenied: "登入被拒絕，可能是您的帳戶沒有權限",
        Verification: "無法驗證您的帳戶，請確保您的電子郵件已驗證",
        Default: "登入時發生錯誤，請稍後再試",
      };

      setError(errorMessages[urlError] || errorMessages["Default"]);
    }

    return () => clearTimeout(timer);
  }, [urlError]);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError("");

      await signIn("google", {
        callbackUrl,
        redirect: true,
      });
    } catch (error) {
      setError("登入時發生錯誤，請稍後再試");
      console.error("Google 登入錯誤:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8 z-10">
      <div className={`w-full max-w-md transition-all duration-700 ease-out ${animationComplete ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        {/* 品牌標誌 */}
        <div className="text-center mb-8">
          <div className="inline-flex justify-center items-center h-20 w-20 rounded-full bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/30 mb-6 animate-float">
            <Image src="/wishing-icon.svg" alt="許願池" width={40} height={40} className="brightness-200" />
          </div>
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
            歡迎使用許願池
          </h2>
          <p className="mt-3 text-base text-muted-foreground">使用 Google 帳號登入，立即開始您的願望之旅</p>
        </div>

        {/* 登入卡片 */}
        <div className="bg-card/80 backdrop-blur-md rounded-2xl shadow-xl border border-border/50 p-8 space-y-6 transform transition-all hover:shadow-2xl hover:border-primary/20">
          {error && (
            <div className="bg-red-50 p-4 rounded-lg border border-red-200 animate-shake">
              <p className="text-sm text-red-600 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                {error}
              </p>
            </div>
          )}

          <Button
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl py-4 transition-all hover:shadow-md"
            onClick={handleGoogleSignIn}
            isLoading={isLoading}
            disabled={isLoading}
          >
            {!isLoading && (
              <div className="flex items-center">
                <div className="w-6 h-6 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                    <path fill="none" d="M0 0h48v48H0z" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium text-base">使用 Google 帳號登入</span>
              </div>
            )}
          </Button>

          <div className="relative py-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-card text-xs text-muted-foreground">或者</span>
            </div>
          </div>

          <Button
            type="button"
            variant="secondary"
            className="w-full rounded-xl py-3 transition-all hover:shadow-md"
            onClick={() => router.push("/wishes/mock-demo")}
          >
            以訪客身份瀏覽
          </Button>

          <div className="pt-3">
            <p className="text-center text-xs text-muted-foreground">
              登入即表示您同意我們的{" "}
              <a href="/about/terms" className="text-primary hover:underline font-medium transition-colors">
                服務條款
              </a>{" "}
              以及{" "}
              <a href="/about/privacy" className="text-primary hover:underline font-medium transition-colors">
                隱私政策
              </a>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground bg-card/50 backdrop-blur-sm px-5 py-3 rounded-full inline-block shadow-md border border-border/30">
            首次登入將自動為您創建帳號，無需額外註冊步驟
          </p>
        </div>
      </div>
    </div>
  );
}

// 主頁面組件，使用 Suspense 包裝 SignInContent
export default function SignInPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-background via-background to-background/95">
      {/* 背景裝飾 */}
      <div className="absolute inset-0 z-0">
        {/* 主要漸層背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-background"></div>

        {/* 動態光暈效果 */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-br from-primary/15 to-secondary/15 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-gradient-to-br from-secondary/15 to-primary/15 rounded-full blur-3xl animate-pulse-slow animation-delay-400"></div>

        {/* 小裝飾元素 */}
        <div className="absolute top-1/5 right-1/4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-secondary/10 rounded-full blur-xl"></div>

        {/* 裝飾圓點 */}
        <div className="absolute inset-0 opacity-[0.15]">
          <Image src="/grid-dots.svg" alt="裝飾點" fill className="object-cover" />
        </div>

        {/* 微妙的光線效果 */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-primary/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-secondary/10 to-transparent"></div>
      </div>

      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        }
      >
        <SignInContent />
      </Suspense>
    </div>
  );
}
