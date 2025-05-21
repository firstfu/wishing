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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // 添加進場動畫效果
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError("");
      await signIn("google", { callbackUrl });
    } catch (error) {
      setError("登入時發生錯誤，請稍後再試");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8 z-10">
      <div className={`w-full max-w-md transition-all duration-700 ease-out ${animationComplete ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        {/* 品牌標誌 */}
        <div className="text-center mb-6">
          <div className="inline-flex justify-center items-center h-16 w-16 rounded-full bg-primary text-white shadow-md shadow-primary/20 mb-4 animate-float">
            <Image src="/wishing-icon.svg" alt="許願池" width={32} height={32} className="brightness-200" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">歡迎使用許願池</h2>
          <p className="mt-2 text-sm text-muted-foreground">使用 Google 帳號登入，立即開始您的願望之旅</p>
        </div>

        {/* 登入卡片 */}
        <div className="bg-card/90 backdrop-blur-sm rounded-xl shadow-md border border-border p-6 space-y-5">
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
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 border border-border rounded-lg py-2.5 transition-all hover:shadow-sm"
            onClick={handleGoogleSignIn}
            isLoading={isLoading}
          >
            {!isLoading && <Image src="/google-logo.svg" alt="Google 標誌" width={20} height={20} />}
            使用 Google 帳號登入
          </Button>

          <div className="relative py-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-card text-xs text-muted-foreground">或者</span>
            </div>
          </div>

          <Button type="button" variant="secondary" className="w-full rounded-lg py-2.5 transition-all" onClick={() => router.push("/wishes/mock-demo")}>
            以訪客身份瀏覽
          </Button>

          <div className="pt-2">
            <p className="text-center text-xs text-muted-foreground">
              登入即表示您同意我們的{" "}
              <a href="/about/terms" className="text-primary hover:underline font-medium">
                服務條款
              </a>{" "}
              以及{" "}
              <a href="/about/privacy" className="text-primary hover:underline font-medium">
                隱私政策
              </a>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full inline-block shadow-sm">
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
    <div className="min-h-screen overflow-hidden bg-background">
      {/* 背景裝飾 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-3xl animate-pulse-slow animation-delay-400"></div>

        {/* 裝飾圓點 */}
        <div className="absolute inset-0 opacity-10">
          <Image src="/grid-dots.svg" alt="裝飾點" fill className="object-cover" />
        </div>
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
