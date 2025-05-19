import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 合併並優化 Tailwind CSS 的 className
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 格式化日期
 */
export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat("zh-TW", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(typeof date === "string" ? new Date(date) : date);
}

/**
 * 格式化金額
 */
export function formatPrice(price: number) {
  return new Intl.NumberFormat("zh-TW", {
    style: "currency",
    currency: "TWD",
    currencyDisplay: "symbol",
    minimumFractionDigits: 0,
  }).format(price);
}

/**
 * 截斷文字
 */
export function truncateText(text: string, length: number) {
  if (text.length <= length) return text;
  return `${text.substring(0, length).trim()}...`;
}

/**
 * 生成隨機ID
 */
export function generateId(length = 6) {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}
