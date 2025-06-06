"use client";

import { signOut } from "next-auth/react";
import { Button, ButtonProps } from "@/app/components/ui/Button";

interface LogoutButtonProps extends Omit<ButtonProps, "onClick"> {
  redirectUrl?: string;
}

export default function LogoutButton({ redirectUrl = "/", children = "登出", ...props }: LogoutButtonProps) {
  const handleLogout = async () => {
    await signOut({ callbackUrl: redirectUrl });
  };

  return (
    <Button onClick={handleLogout} {...props}>
      {children}
    </Button>
  );
}
