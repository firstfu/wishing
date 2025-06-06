"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button, ButtonProps } from "@/app/components/ui/Button";

interface LoginButtonProps extends Omit<ButtonProps, "onClick"> {
  provider?: string;
  callbackUrl?: string;
  children?: React.ReactNode;
}

export default function LoginButton({ provider = "google", callbackUrl = "/", children = "使用 Google 登入", ...props }: LoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await signIn(provider, { callbackUrl, redirect: true });
    } catch (error) {
      console.error(`${provider} 登入錯誤:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleLogin} isLoading={isLoading} disabled={isLoading} {...props}>
      {children}
    </Button>
  );
}
