"use client";

import { useState } from "react";
import Modal from "@/app/components/ui/Modal";
import { Button } from "@/app/components/ui/Button";
import { formatPrice } from "@/app/lib/utils";

// 儲值模態框元件
// ---------------------------------------------
// 用途：
//   - 提供用戶儲值點數功能的介面
//   - 支援多種點數選擇和信用卡支付
// 設計重點：
//   - 簡潔直觀的儲值流程
//   - 預設點數選項和自訂點數輸入
//   - 點數購買贈送機制
//   - 交易確認和反饋
// ---------------------------------------------

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// 點數方案及贈送點數設定
const POINT_PACKAGES = [
  { points: 30, bonus: 0, price: 30 },
  { points: 100, bonus: 50, price: 100 },
  { points: 200, bonus: 100, price: 200 },
  { points: 500, bonus: 700, price: 500 },
];

export default function DepositModal({ isOpen, onClose }: DepositModalProps) {
  const [selectedPackage, setSelectedPackage] = useState<(typeof POINT_PACKAGES)[0]>(POINT_PACKAGES[1]);
  const [customPoints, setCustomPoints] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [step, setStep] = useState<"amount" | "confirm">("amount");

  // 計算總點數（購買點數 + 贈送點數）
  const calculateTotalPoints = (points: number) => {
    if (points === 30) return 30; // 30點不送
    if (points === 100) return 150; // 100點送50
    if (points === 200) return 300; // 200點送100
    if (points === 500) return 1200; // 500點送700
    return points; // 自訂點數不送
  };

  // 處理點數方案選擇
  const handlePackageSelect = (packageOption: (typeof POINT_PACKAGES)[0]) => {
    setSelectedPackage(packageOption);
    setCustomPoints("");
  };

  // 處理自訂點數輸入
  const handleCustomPointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 只允許數字輸入
    if (/^\d*$/.test(value)) {
      setCustomPoints(value);
      if (value) {
        const points = parseInt(value, 10);
        // 自訂點數不享有贈送優惠
        setSelectedPackage({
          points,
          bonus: 0,
          price: points,
        });
      }
    }
  };

  // 處理繼續按鈕
  const handleContinue = () => {
    if (step === "amount") {
      setStep("confirm");
    }
  };

  // 處理返回按鈕
  const handleBack = () => {
    if (step === "confirm") {
      setStep("amount");
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
      const totalPoints = selectedPackage.points + selectedPackage.bonus;
      alert(`成功購買 ${selectedPackage.points} 點${selectedPackage.bonus > 0 ? `，贈送 ${selectedPackage.bonus} 點，總共 ${totalPoints} 點` : ""}`);

      // 重置表單
      setSelectedPackage(POINT_PACKAGES[1]);
      setCustomPoints("");
      setStep("amount");
    } catch (error) {
      console.error("購買點數失敗", error);
      alert("購買點數失敗，請稍後再試");
    } finally {
      setIsLoading(false);
    }
  };

  // 處理模態框關閉
  const handleClose = () => {
    // 重置表單
    setSelectedPackage(POINT_PACKAGES[1]);
    setCustomPoints("");
    setStep("amount");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="購買點數">
      {step === "amount" && (
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">選擇點數方案</label>
            <div className="grid grid-cols-2 gap-2">
              {POINT_PACKAGES.map(pkg => (
                <button
                  key={pkg.points}
                  type="button"
                  onClick={() => handlePackageSelect(pkg)}
                  className={`py-3 px-4 rounded-md border text-center transition-colors ${
                    selectedPackage.points === pkg.points && !customPoints
                      ? "border-purple-500 bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                      : "border-gray-300 hover:border-purple-300 dark:border-gray-600 dark:hover:border-purple-700"
                  }`}
                >
                  <div className="font-medium">{pkg.points} 點</div>
                  {pkg.bonus > 0 && <div className="text-xs mt-1 text-green-600 dark:text-green-400">送 {pkg.bonus} 點</div>}
                  <div className="mt-1">{formatPrice(pkg.price)}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="custom-points" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              自訂點數
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="text"
                id="custom-points"
                value={customPoints}
                onChange={handleCustomPointsChange}
                placeholder="輸入點數"
                className="block w-full pl-3 pr-12 py-2 border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">點</span>
              </div>
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">自訂點數無贈送優惠，1點 = 1元</p>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button onClick={handleContinue} disabled={selectedPackage.points <= 0} className="w-full">
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
                <span className="text-gray-600 dark:text-gray-400">購買點數：</span>
                <span>{selectedPackage.points} 點</span>
              </div>
              {selectedPackage.bonus > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">贈送點數：</span>
                  <span className="text-green-600 dark:text-green-400">+{selectedPackage.bonus} 點</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">支付方式：</span>
                <span>信用卡</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">手續費：</span>
                <span>$0</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-600 font-medium">
                <span>應付金額：</span>
                <span className="text-purple-600 dark:text-purple-300">{formatPrice(selectedPackage.price)}</span>
              </div>
              {selectedPackage.bonus > 0 && (
                <div className="flex justify-between mt-3 pt-2 border-t border-gray-200 dark:border-gray-600 font-medium">
                  <span>總獲得點數：</span>
                  <span className="text-green-600 dark:text-green-400">{selectedPackage.points + selectedPackage.bonus} 點</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              點擊「確認購買」按鈕，表示您同意我們的
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
              確認購買
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
