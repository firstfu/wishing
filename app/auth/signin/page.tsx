"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/app/components/ui/Button";
import { useSearchParams, useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">歡迎使用許願池</h2>
          <p className="mt-2 text-sm text-gray-600">使用 Google 帳號登入，立即開始您的願望之旅</p>
        </div>

        <div className="mt-8 space-y-6">
          {error && (
            <div className="bg-red-50 p-4 rounded-md border border-red-200">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <Button
              type="button"
              className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 hover:bg-gray-50 border border-gray-300"
              onClick={handleGoogleSignIn}
              isLoading={isLoading}
            >
              {!isLoading && <Image src="/google-logo.svg" alt="Google 標誌" width={20} height={20} />}
              使用 Google 帳號登入
            </Button>
          </div>

          <div className="mt-6">
            <p className="text-center text-sm text-gray-600">
              登入即表示您同意我們的{" "}
              <a href="/about/terms" className="text-primary hover:underline">
                服務條款
              </a>{" "}
              以及{" "}
              <a href="/about/privacy" className="text-primary hover:underline">
                隱私政策
              </a>
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-gray-600">首次登入將自動為您創建帳號，無需額外註冊步驟</p>
        </div>
      </div>
    </div>
  );
}
