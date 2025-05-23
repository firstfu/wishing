"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/Button";
import { formatPrice, formatDate } from "@/app/lib/utils";

// 許願池點數儲值頁面
// ---------------------------------------------
// 用途：
//   - 提供用戶購買點數功能的完整頁面
//   - 顯示點數交易歷史記錄
//   - 提供點數儲值方案
// 設計重點：
//   - 清晰的購買流程
//   - 詳細的交易記錄
//   - 響應式設計
// ---------------------------------------------

// 模擬交易記錄數據
const MOCK_TRANSACTIONS = [
  { id: "tx-001", points: 100, bonus: 50, amount: 100, method: "信用卡", status: "成功", date: "2023-12-15T08:30:00Z" },
  { id: "tx-002", points: 30, bonus: 0, amount: 30, method: "信用卡", status: "成功", date: "2023-11-28T14:45:00Z" },
  { id: "tx-003", points: 500, bonus: 200, amount: 500, method: "信用卡", status: "成功", date: "2023-10-05T11:20:00Z" },
  { id: "tx-004", points: 200, bonus: 100, amount: 200, method: "信用卡", status: "處理中", date: "2023-09-18T16:10:00Z" },
];

// 點數方案及贈送點數設定
const POINT_PACKAGES = [
  { points: 30, bonus: 0, price: 30 },
  { points: 100, bonus: 50, price: 100 },
  { points: 200, bonus: 100, price: 200 },
  { points: 500, bonus: 200, price: 500 },
];

// 支付方式選項
const PAYMENT_METHODS = [
  { id: "credit_card", name: "信用卡", icon: "💳" },
  // 未來可能會新增更多支付方式
  // { id: "line_pay", name: "LINE Pay", icon: "📱" },
  // { id: "apple_pay", name: "Apple Pay", icon: "🍎" },
  // { id: "bank_transfer", name: "銀行轉帳", icon: "🏦" },
];

export default function DepositPage() {
  const [selectedPackage, setSelectedPackage] = useState<(typeof POINT_PACKAGES)[0]>(POINT_PACKAGES[1]);
  const [paymentMethod, setPaymentMethod] = useState<string>(PAYMENT_METHODS[0].id);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  // 處理點數方案選擇
  const handlePackageSelect = (packageOption: (typeof POINT_PACKAGES)[0]) => {
    setSelectedPackage(packageOption);
  };

  // 處理支付方式選擇
  const handlePaymentMethodChange = (id: string) => {
    setPaymentMethod(id);
  };

  // 處理儲值提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 模擬 API 請求
      await new Promise(resolve => setTimeout(resolve, 1500));

      // 顯示成功訊息
      setShowSuccessMessage(true);

      // 3秒後隱藏成功訊息
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);

      // 重置表單
      setSelectedPackage(POINT_PACKAGES[1]);
      setPaymentMethod(PAYMENT_METHODS[0].id);
    } catch (error) {
      console.error("購買點數失敗", error);
      alert("購買點數失敗，請稍後再試");
    } finally {
      setIsLoading(false);
    }
  };

  // 獲取當前支付方式名稱
  const getCurrentPaymentMethodName = () => {
    return PAYMENT_METHODS.find(m => m.id === paymentMethod)?.name || "信用卡";
  };

  // 獲取當前支付方式圖示
  const getCurrentPaymentMethodIcon = () => {
    return PAYMENT_METHODS.find(m => m.id === paymentMethod)?.icon || "💳";
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold">點數購買</h2>

      {/* 成功訊息 */}
      {showSuccessMessage && (
        <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 px-4 py-3 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">
                點數購買成功！獲得 {selectedPackage.points} 點
                {selectedPackage.bonus > 0 ? `，贈送 ${selectedPackage.bonus} 點，總共 ${selectedPackage.points + selectedPackage.bonus} 點` : ""}。
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 儲值表單 */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-medium mb-4">點數方案</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 點數方案選擇 */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">選擇點數方案</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {POINT_PACKAGES.map(pkg => (
                    <button
                      key={pkg.points}
                      type="button"
                      onClick={() => handlePackageSelect(pkg)}
                      className={`py-3 px-4 rounded-md border text-center transition-colors ${
                        selectedPackage.points === pkg.points
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

              {/* 支付方式選擇區塊永遠顯示 */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">選擇支付方式</label>
                <div className="grid grid-cols-2 gap-3">
                  {PAYMENT_METHODS.map(method => (
                    <div
                      key={method.id}
                      onClick={() => handlePaymentMethodChange(method.id)}
                      className={`flex items-center p-3 border rounded-md cursor-pointer transition-colors ${
                        paymentMethod === method.id ? "border-purple-500 bg-purple-50 dark:bg-purple-900/30" : "border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      <span className="text-xl mr-3">{method.icon}</span>
                      <span>{method.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 交易摘要 */}
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <h4 className="font-medium mb-3">交易摘要</h4>
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
                    <span>
                      <span className="inline-block mr-1">{getCurrentPaymentMethodIcon()}</span>
                      {getCurrentPaymentMethodName()}
                    </span>
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

              {/* 服務條款 */}
              <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  點擊「確認購買」按鈕，表示您同意我們的
                  <a href="/about/terms" className="text-purple-600 dark:text-purple-300 hover:underline mx-1">
                    服務條款
                  </a>
                  和
                  <a href="/about/privacy" className="text-purple-600 dark:text-purple-300 hover:underline mx-1">
                    隱私政策
                  </a>
                  。
                </p>
              </div>

              {/* 提交按鈕 */}
              <div>
                <Button type="submit" className="w-full" isLoading={isLoading} disabled={selectedPackage.points <= 0}>
                  確認購買
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* 點數說明 */}
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
            <h3 className="text-lg font-medium mb-4">點數說明</h3>
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <span className="font-medium text-gray-900 dark:text-gray-200">點數用途：</span> 點數可用於購買置頂服務、贊助他人願望等功能。
              </p>
              <p>
                <span className="font-medium text-gray-900 dark:text-gray-200">點數價值：</span> 每點等值 1 元新台幣，依照方案贈送不同點數。
              </p>
              <p>
                <span className="font-medium text-gray-900 dark:text-gray-200">支付方式：</span> 目前支援信用卡付款，交易安全有保障。未來將支援更多支付方式。
              </p>
              <p>
                <span className="font-medium text-gray-900 dark:text-gray-200">處理時間：</span> 信用卡支付通常立即到帳，可直接使用點數。
              </p>
              <p>
                <span className="font-medium text-gray-900 dark:text-gray-200">退款政策：</span> 點數一旦使用將無法退款，未使用點數可申請退款，處理時間為 7-14 個工作日。
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-medium mb-4">常見問題</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-200">點數後多久可以使用？</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">信用卡支付購買點數成功後可立即使用。</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-200">點數有最低購買限制嗎？</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">最低可購買 30 點，每點等值 1 元新台幣。</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-200">購買哪種方案最划算？</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">500 點方案贈送 200 點，相當於 28.6% 折扣。</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-200">點數會過期嗎？</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">點數無使用期限，可永久保留在您的帳戶中。</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 交易歷史 */}
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">點數交易歷史</h3>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    交易編號
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    日期
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    購買點數
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    贈送點數
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    支付金額
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    支付方式
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    狀態
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {MOCK_TRANSACTIONS.map(transaction => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">{transaction.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{formatDate(transaction.date)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{transaction.points} 點</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400">{transaction.bonus > 0 ? `+${transaction.bonus} 點` : "-"}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{formatPrice(transaction.amount)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{transaction.method}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          transaction.status === "成功"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
