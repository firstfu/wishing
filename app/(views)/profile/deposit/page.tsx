"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/Button";
import { formatPrice, formatDate } from "@/app/lib/utils";

// 許願池儲值頁面
// ---------------------------------------------
// 用途：
//   - 提供用戶儲值功能的完整頁面
//   - 顯示儲值歷史記錄
//   - 提供多種儲值方式和金額選擇
// 設計重點：
//   - 清晰的儲值流程
//   - 詳細的交易記錄
//   - 響應式設計
// ---------------------------------------------

// 模擬交易記錄數據
const MOCK_TRANSACTIONS = [
  { id: "tx-001", amount: 500, method: "信用卡", status: "成功", date: "2023-12-15T08:30:00Z" },
  { id: "tx-002", amount: 200, method: "LINE Pay", status: "成功", date: "2023-11-28T14:45:00Z" },
  { id: "tx-003", amount: 1000, method: "銀行轉帳", status: "成功", date: "2023-10-05T11:20:00Z" },
  { id: "tx-004", amount: 100, method: "Apple Pay", status: "處理中", date: "2023-09-18T16:10:00Z" },
];

// 支付方式選項
const PAYMENT_METHODS = [
  { id: "credit_card", name: "信用卡", icon: "💳" },
  { id: "line_pay", name: "LINE Pay", icon: "📱" },
  { id: "apple_pay", name: "Apple Pay", icon: "🍎" },
  { id: "bank_transfer", name: "銀行轉帳", icon: "🏦" },
];

// 預設儲值金額選項
const DEPOSIT_AMOUNTS = [100, 200, 500, 1000, 2000];

export default function DepositPage() {
  const [amount, setAmount] = useState<number>(500);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("credit_card");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

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
      setAmount(500);
      setCustomAmount("");
      setPaymentMethod("credit_card");
    } catch (error) {
      console.error("儲值失敗", error);
      alert("儲值失敗，請稍後再試");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold">帳戶儲值</h2>

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
              <p className="text-sm font-medium">儲值成功！已將 {formatPrice(amount)} 加入您的帳戶。</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 儲值表單 */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-medium mb-4">儲值表單</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 金額選擇 */}
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

              {/* 自訂金額 */}
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

              {/* 支付方式 */}
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

              {/* 服務條款 */}
              <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  點擊「確認儲值」按鈕，表示您同意我們的
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
                <Button type="submit" className="w-full" isLoading={isLoading} disabled={amount <= 0}>
                  確認儲值
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* 儲值說明 */}
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
            <h3 className="text-lg font-medium mb-4">儲值說明</h3>
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <span className="font-medium text-gray-900 dark:text-gray-200">儲值用途：</span> 儲值金額可用於購買置頂服務、贊助他人願望等功能。
              </p>
              <p>
                <span className="font-medium text-gray-900 dark:text-gray-200">儲值方式：</span> 支援多種支付方式，包括信用卡、LINE Pay、Apple Pay 和銀行轉帳。
              </p>
              <p>
                <span className="font-medium text-gray-900 dark:text-gray-200">處理時間：</span> 信用卡和行動支付通常立即到帳，銀行轉帳可能需要 1-3 個工作日。
              </p>
              <p>
                <span className="font-medium text-gray-900 dark:text-gray-200">退款政策：</span> 儲值金額一旦使用將無法退款，未使用餘額可申請退款，處理時間為 7-14 個工作日。
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-medium mb-4">常見問題</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-200">儲值後多久可以使用？</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">大多數支付方式儲值成功後可立即使用，銀行轉帳可能需要等待銀行處理。</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-200">儲值有最低限制嗎？</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">最低儲值金額為 $100 新台幣。</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-200">儲值金額會過期嗎？</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">儲值金額無使用期限，可永久保留在您的帳戶中。</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 儲值歷史 */}
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">儲值歷史</h3>
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
                    金額
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
