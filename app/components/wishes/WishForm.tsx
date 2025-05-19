"use client";

import { useState } from "react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { createWish, CreateWishInput } from "@/app/lib/data";
import { useRouter } from "next/navigation";

// 定義分類類型
interface Category {
  id: string;
  name: string;
  icon: string;
}

interface WishFormProps {
  categories: Category[];
}

export default function WishForm({ categories }: WishFormProps) {
  const router = useRouter();

  // 表單狀態
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    title?: string;
    description?: string;
    price?: string;
    category?: string;
  }>({});

  // 表單驗證
  const validateForm = () => {
    const errors: {
      title?: string;
      description?: string;
      price?: string;
      category?: string;
    } = {};

    if (!title || title.length < 5) {
      errors.title = "標題必須至少包含 5 個字元";
    }

    if (!description || description.length < 20) {
      errors.description = "描述必須至少包含 20 個字元";
    }

    if (!price) {
      errors.price = "請輸入價格";
    } else if (Number(price) < 0) {
      errors.price = "價格不能為負數";
    }

    if (!selectedCategory) {
      errors.category = "請選擇一個分類";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // 提交表單
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 驗證表單
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // 準備許願資料
      const wishData: CreateWishInput = {
        title,
        description,
        price: Number(price),
        category: selectedCategory,
      };

      // 呼叫 API 創建許願
      await createWish(wishData);

      // 顯示成功訊息並導航到許願列表頁
      alert("許願已成功發布！");
      router.push("/wishes");
    } catch (error) {
      console.error("發布許願失敗:", error);
      alert("發布許願失敗，請稍後再試。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-6">填寫許願詳情</h2>
        <p className="text-muted-foreground mb-6">請詳細描述您的需求，以便其他人能夠更好地了解並提供幫助。</p>
      </div>

      {/* 許願標題 */}
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium">
          許願標題 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="例如：需要專業攝影師拍攝產品照片"
          className={`w-full px-4 py-2 rounded-lg border ${
            validationErrors.title ? "border-red-300 focus:ring-red-500" : "border-input focus:ring-primary"
          } focus:outline-none focus:ring-2 transition-colors`}
        />
        {validationErrors.title && <p className="text-sm text-red-500">{validationErrors.title}</p>}
      </div>

      {/* 詳細描述 */}
      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium">
          詳細描述 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="請詳細描述您的需求，包括時間、地點、要求等..."
          rows={6}
          className={`w-full px-4 py-2 rounded-lg border ${
            validationErrors.description ? "border-red-300 focus:ring-red-500" : "border-input focus:ring-primary"
          } focus:outline-none focus:ring-2 transition-colors`}
        />
        {validationErrors.description && <p className="text-sm text-red-500">{validationErrors.description}</p>}
      </div>

      {/* 價格 */}
      <div className="space-y-2">
        <label htmlFor="price" className="block text-sm font-medium">
          預算價格 <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
          <input
            type="number"
            id="price"
            value={price}
            onChange={e => setPrice(e.target.value)}
            placeholder="0"
            min="0"
            className={`w-full pl-8 pr-4 py-2 rounded-lg border ${
              validationErrors.price ? "border-red-300 focus:ring-red-500" : "border-input focus:ring-primary"
            } focus:outline-none focus:ring-2 transition-colors`}
          />
        </div>
        {validationErrors.price && <p className="text-sm text-red-500">{validationErrors.price}</p>}
        <p className="text-sm text-muted-foreground">設定為 0 表示您願意免費接受幫助，或是可以通過其他方式答謝。</p>
      </div>

      {/* 分類選擇 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium mb-2">
          許願分類 <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Badge
              key={category.id}
              className={`px-3 py-1 cursor-pointer text-sm ${
                selectedCategory === category.id ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-muted hover:bg-muted/80 text-foreground/70"
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.icon} {category.name}
            </Badge>
          ))}
        </div>
        {validationErrors.category && <p className="text-sm text-red-500">{validationErrors.category}</p>}
      </div>

      {/* 提交按鈕 */}
      <div className="pt-4">
        <Button
          type="submit"
          className="w-full py-6 rounded-lg text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-200"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          發布許願
        </Button>
      </div>
    </form>
  );
}
