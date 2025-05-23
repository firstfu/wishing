"use client";

import React, { useState } from "react";
import { formatPrice, formatDate } from "@/app/lib/utils";

// 許願池交易紀錄頁面
// ---------------------------------------------
// 用途：
//   - 顯示用戶的所有交易歷史
//   - 包含儲值和消費記錄
//   - 提供交易類型篩選功能
// 設計重點：
//   - 清晰的交易列表展示
//   - 交易類型篩選
//   - 交易詳情查看
//   - 響應式設計
// ---------------------------------------------

// 交易類型
type TransactionType = "全部" | "儲值" | "消費" | "退款";

// 模擬交易數據
const MOCK_TRANSACTIONS = [
  {
    id: "tx-001",
    type: "儲值",
    amount: 500,
    method: "信用卡",
    status: "成功",
    date: "2023-12-15T08:30:00Z",
    description: "帳戶儲值",
    details: {
      paymentMethod: "信用卡",
      cardLastFour: "1234",
      transactionId: "pay_1234567890",
    },
  },
  {
    id: "tx-002",
    type: "消費",
    amount: -200,
    method: "帳戶餘額",
    status: "成功",
    date: "2023-12-10T14:45:00Z",
    description: "購買願望置頂服務",
    details: {
      wishId: "wish-003",
      wishTitle: "尋找資深 React 開發者進行專案諮詢",
      serviceName: "7天置頂服務",
    },
  },
  {
    id: "tx-003",
    type: "儲值",
    amount: 1000,
    method: "銀行轉帳",
    status: "成功",
    date: "2023-11-05T11:20:00Z",
    description: "帳戶儲值",
    details: {
      paymentMethod: "銀行轉帳",
      bankAccount: "****1234",
      transactionId: "bank_9876543210",
    },
  },
  {
    id: "tx-004",
    type: "消費",
    amount: -300,
    method: "帳戶餘額",
    status: "成功",
    date: "2023-10-28T16:10:00Z",
    description: "贊助願望",
    details: {
      wishId: "wish-007",
      wishTitle: "徵求平面設計師設計公司 Logo",
      recipientName: "王小明",
    },
  },
  {
    id: "tx-005",
    type: "退款",
    amount: 150,
    method: "帳戶餘額",
    status: "成功",
    date: "2023-10-15T09:30:00Z",
    description: "願望關閉退款",
    details: {
      wishId: "wish-004",
      wishTitle: "徵求二手健身器材",
      refundReason: "願望已關閉，未使用的置頂費用退款",
    },
  },
  {
    id: "tx-006",
    type: "儲值",
    amount: 200,
    method: "LINE Pay",
    status: "成功",
    date: "2023-09-20T13:25:00Z",
    description: "帳戶儲值",
    details: {
      paymentMethod: "LINE Pay",
      transactionId: "line_2468135790",
    },
  },
];

// 交易類型顏色映射
const TRANSACTION_TYPE_COLORS: Record<string, string> = {
  儲值: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  消費: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  退款: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
};

export default function TransactionsPage() {
  const [typeFilter, setTypeFilter] = useState<TransactionType>("全部");
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);

  // 篩選交易
  const filteredTransactions = MOCK_TRANSACTIONS.filter(transaction => {
    if (typeFilter === "全部") return true;
    return transaction.type === typeFilter;
  });

  // 顯示交易詳情
  const handleViewDetails = (transactionId: string) => {
    setSelectedTransaction(transactionId === selectedTransaction ? null : transactionId);
  };

  // 獲取選中的交易
  const getSelectedTransaction = () => {
    return MOCK_TRANSACTIONS.find(tx => tx.id === selectedTransaction);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold">交易紀錄</h2>

      {/* 交易類型篩選器 */}
      <div className="flex flex-wrap gap-2">
        {(["全部", "儲值", "消費", "退款"] as TransactionType[]).map(type => (
          <button
            key={type}
            onClick={() => setTypeFilter(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              typeFilter === type
                ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* 交易列表 */}
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
                  類型
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  描述
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  金額
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  狀態
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredTransactions.map(transaction => (
                <React.Fragment key={transaction.id}>
                  <tr className={selectedTransaction === transaction.id ? "bg-purple-50 dark:bg-purple-900/10" : ""}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">{transaction.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{formatDate(transaction.date)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${TRANSACTION_TYPE_COLORS[transaction.type]}`}>{transaction.type}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{transaction.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={
                          transaction.amount > 0
                            ? "text-green-600 dark:text-green-400"
                            : transaction.amount < 0
                            ? "text-red-600 dark:text-red-400"
                            : "text-gray-600 dark:text-gray-400"
                        }
                      >
                        {transaction.amount > 0 ? "+" : ""}
                        {formatPrice(transaction.amount)}
                      </span>
                    </td>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <button onClick={() => handleViewDetails(transaction.id)} className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300">
                        {selectedTransaction === transaction.id ? "收起" : "詳情"}
                      </button>
                    </td>
                  </tr>
                  {selectedTransaction === transaction.id && (
                    <tr>
                      <td colSpan={7} className="px-6 py-4 bg-purple-50 dark:bg-purple-900/10">
                        <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                          <h4 className="font-medium">交易詳情</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                            {transaction.type === "儲值" && (
                              <>
                                <div>
                                  <p className="text-gray-600 dark:text-gray-400">支付方式</p>
                                  <p>{transaction.details.paymentMethod}</p>
                                </div>
                                {transaction.details.cardLastFour && (
                                  <div>
                                    <p className="text-gray-600 dark:text-gray-400">卡號末四碼</p>
                                    <p>**** **** **** {transaction.details.cardLastFour}</p>
                                  </div>
                                )}
                                {transaction.details.bankAccount && (
                                  <div>
                                    <p className="text-gray-600 dark:text-gray-400">銀行帳號</p>
                                    <p>{transaction.details.bankAccount}</p>
                                  </div>
                                )}
                                <div>
                                  <p className="text-gray-600 dark:text-gray-400">交易編號</p>
                                  <p>{transaction.details.transactionId}</p>
                                </div>
                              </>
                            )}

                            {transaction.type === "消費" && transaction.details.wishId && (
                              <>
                                <div>
                                  <p className="text-gray-600 dark:text-gray-400">願望 ID</p>
                                  <p>{transaction.details.wishId}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600 dark:text-gray-400">願望標題</p>
                                  <p>{transaction.details.wishTitle}</p>
                                </div>
                                {transaction.details.serviceName && (
                                  <div>
                                    <p className="text-gray-600 dark:text-gray-400">服務名稱</p>
                                    <p>{transaction.details.serviceName}</p>
                                  </div>
                                )}
                                {transaction.details.recipientName && (
                                  <div>
                                    <p className="text-gray-600 dark:text-gray-400">接收者</p>
                                    <p>{transaction.details.recipientName}</p>
                                  </div>
                                )}
                              </>
                            )}

                            {transaction.type === "退款" && (
                              <>
                                <div>
                                  <p className="text-gray-600 dark:text-gray-400">願望 ID</p>
                                  <p>{transaction.details.wishId}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600 dark:text-gray-400">願望標題</p>
                                  <p>{transaction.details.wishTitle}</p>
                                </div>
                                <div className="md:col-span-2">
                                  <p className="text-gray-600 dark:text-gray-400">退款原因</p>
                                  <p>{transaction.details.refundReason}</p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 空狀態 */}
      {filteredTransactions.length === 0 && (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">沒有符合條件的交易記錄</p>
        </div>
      )}

      {/* 交易說明 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium mb-4">交易說明</h3>
        <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-gray-200 mb-1">儲值</h4>
            <p>透過各種支付方式為帳戶增加餘額的交易，儲值後的金額可用於平台內的各種消費。</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-gray-200 mb-1">消費</h4>
            <p>使用帳戶餘額進行的支出，包括購買置頂服務、贊助他人願望等。</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-gray-200 mb-1">退款</h4>
            <p>因願望關閉、服務取消等原因而退回帳戶的金額。</p>
          </div>
        </div>
      </div>
    </div>
  );
}
