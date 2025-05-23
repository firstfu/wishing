// utils.ts - 共用工具函式庫
//
// 本檔案提供全站通用的工具函式，包括：
// 1. cn：合併 Tailwind CSS className，優化樣式組合並解決衝突
// 2. formatDate：格式化日期為繁體中文格式（年月日）
// 3. formatPrice：格式化金額為新台幣格式，包含貨幣符號
// 4. truncateText：截斷過長文字並添加省略號
// 5. generateId：產生隨機字串 ID，用於臨時識別符
//
// 這些工具可於元件、頁面、API 處理等多處重複使用，確保全站功能一致性
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
