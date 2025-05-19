"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/Button";

// 許願的類型定義
export interface Wish {
  id: string;
  title: string;
  description: string;
  price: number;
  isPinned: boolean;
  category: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    image?: string;
  };
}

interface WishCardProps {
  wish: Wish;
  variant?: "default" | "compact";
}

export default function WishCard({ wish, variant = "default" }: WishCardProps) {
  // 格式化描述文字，限制字數
  const formatDescription = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // 格式化價格顯示
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("zh-TW", {
      style: "currency",
      currency: "TWD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (variant === "compact") {
    return (
      <Link href={`/wishes/${wish.id}`}>
        <div className="border border-border rounded-lg p-3 hover:shadow-md transition-shadow">
          <h3 className="font-semibold truncate">{wish.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{formatPrice(wish.price)}</p>
        </div>
      </Link>
    );
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <Link href={`/wishes/${wish.id}`} className="block">
        <div className="p-4">
          {wish.isPinned && <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full inline-block mb-2">置頂</div>}
          <h3 className="font-semibold text-lg mb-2">{wish.title}</h3>
          <p className="text-muted-foreground text-sm mb-3">{formatDescription(wish.description)}</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center text-xs">{wish.user.name.charAt(0)}</div>
              <span className="text-sm">{wish.user.name}</span>
            </div>
            <div className="font-medium text-primary">{formatPrice(wish.price)}</div>
          </div>
          <div className="mt-3 text-xs text-muted-foreground">{new Date(wish.createdAt).toLocaleDateString("zh-TW")}</div>
        </div>
      </Link>
    </div>
  );
}
