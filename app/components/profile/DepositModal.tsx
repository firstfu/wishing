"use client";

import { useState } from "react";
import Modal from "@/app/components/ui/Modal";
import { Button } from "@/app/components/ui/Button";
import { formatPrice } from "@/app/lib/utils";

// 儲值模態框元件
// ---------------------------------------------
// 用途：
//   - 提供用戶儲值功能的介面
//   - 支援多種金額選擇和支付方式
// 設計重點：
//   - 簡潔直觀的儲值流程
//   - 預設金額選項和自訂金額輸入
//   - 多種支付方式選擇
//   - 交易確認和反饋
// ---------------------------------------------

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// 預設儲值金額選項
const DEPOSIT_AMOUNTS = [100, 200, 500, 1000, 2000];

// 支付方式選項
const PAYMENT_METHODS = [
  { id: "credit_card", name: "信用卡" },
  { id: "line_pay", name: "LINE Pay" },
  { id: "apple_pay", name: "Apple Pay" },
  { id: "bank_transfer", name: "銀行轉帳" },
];

export default function DepositModal({ isOpen, onClose }: DepositModalProps) {
  const [amount, setAmount] = useState<number>(500);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("credit_card");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [step, setStep] = useState<"amount" | "payment" | "confirm">("amount");

  // 處理金額選擇
  const handleAmountSelect = (value: number) => {
    setAmount(value);
    setCustomAmount("");
  };

  // 處理自訂金額輸入
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 只允許數字輸入
    if (/^\d*$/.test(value)) {
      setCustomAmount(value);
      if (value) {
        setAmount(parseInt(value, 10));
      } else {
        setAmount(0);
      }
    }
  };

  // 處理支付方式選擇
  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  };

  // 處理繼續按鈕
  const handleContinue = () => {
    if (step === "amount") {
      setStep("payment");
    } else if (step === "payment") {
      setStep("confirm");
    }
  };

  // 處理返回按鈕
  const handleBack = () => {
    if (step === "payment") {
      setStep("amount");
    } else if (step === "confirm") {
      setStep("payment");
    }
  };

  // 處理儲值提交
  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      // 模擬 API 請求
      await new Promise(resolve => setTimeout(resolve, 1500));

      // 成功後關閉模態框
      onClose();

      // 顯示成功訊息
      alert(`成功儲值 ${formatPrice(amount)}`);

      // 重置表單
      setAmount(500);
      setCustomAmount("");
      setPaymentMethod("credit_card");
      setStep("amount");
    } catch (error) {
      console.error("儲值失敗", error);
      alert("儲值失敗，請稍後再試");
    } finally {
      setIsLoading(false);
    }
  };

  // 處理模態框關閉
  const handleClose = () => {
    // 重置表單
    setAmount(500);
    setCustomAmount("");
    setPaymentMethod("credit_card");
    setStep("amount");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="儲值">
      {step === "amount" && (
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">選擇儲值金額</label>
            <div className="grid grid-cols-3 gap-2">
              {DEPOSIT_AMOUNTS.map(value => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleAmountSelect(value)}
                  className={`py-2 px-3 rounded-md border text-center transition-colors ${
                    amount === value && !customAmount
                      ? "border-purple-500 bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                      : "border-gray-300 hover:border-purple-300 dark:border-gray-600 dark:hover:border-purple-700"
                  }`}
                >
                  ${value}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="custom-amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              自訂金額
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="text"
                id="custom-amount"
                value={customAmount}
                onChange={handleCustomAmountChange}
                placeholder="輸入金額"
                className="block w-full pl-7 pr-12 py-2 border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">TWD</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button onClick={handleContinue} disabled={amount <= 0} className="w-full">
              繼續
            </Button>
          </div>
        </div>
      )}

      {step === "payment" && (
        <div className="space-y-6">
          <div>
            <p className="text-lg font-medium">
              儲值金額：<span className="text-purple-600 dark:text-purple-300">{formatPrice(amount)}</span>
            </p>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">選擇支付方式</label>
            <div className="space-y-2">
              {PAYMENT_METHODS.map(method => (
                <label
                  key={method.id}
                  className={`flex items-center p-3 border rounded-md cursor-pointer transition-colors ${
                    paymentMethod === method.id ? "border-purple-500 bg-purple-50 dark:bg-purple-900/30" : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment-method"
                    value={method.id}
                    checked={paymentMethod === method.id}
                    onChange={handlePaymentMethodChange}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 dark:focus:ring-purple-400"
                  />
                  <span className="ml-3">{method.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button variant="outline" onClick={handleBack} className="flex-1">
              返回
            </Button>
            <Button onClick={handleContinue} className="flex-1">
              繼續
            </Button>
          </div>
        </div>
      )}

      {step === "confirm" && (
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
            <h4 className="font-medium mb-3">交易資訊</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">儲值金額：</span>
                <span>{formatPrice(amount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">支付方式：</span>
                <span>{PAYMENT_METHODS.find(m => m.id === paymentMethod)?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">手續費：</span>
                <span>$0</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-600 font-medium">
                <span>總計：</span>
                <span className="text-purple-600 dark:text-purple-300">{formatPrice(amount)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              點擊「確認儲值」按鈕，表示您同意我們的
              <a href="/about/terms" className="text-purple-600 dark:text-purple-300 hover:underline">
                服務條款
              </a>
              和
              <a href="/about/privacy" className="text-purple-600 dark:text-purple-300 hover:underline">
                隱私政策
              </a>
              。
            </p>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button variant="outline" onClick={handleBack} className="flex-1" disabled={isLoading}>
              返回
            </Button>
            <Button onClick={handleSubmit} className="flex-1" isLoading={isLoading}>
              確認儲值
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
