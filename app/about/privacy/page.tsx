import React from "react";

export const metadata = {
  title: "隱私政策 | 許願池",
  description: "了解許願池如何收集、使用和保護您的個人資料的隱私政策。",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">隱私政策</h1>
        <p className="text-muted-foreground mb-8">最後更新日期：{new Date().toISOString().split("T")[0]}</p>

        <div className="prose prose-lg max-w-none">
          <p>
            許願池（「我們」、「我們的」或「本平台」）重視您的隱私。本隱私政策說明我們如何收集、使用、披露、處理和保護用戶提供給我們的資訊。請您仔細閱讀本隱私政策，以了解我們的資料處理實踐。
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">1. 我們收集的資訊</h2>
          <p>我們可能收集以下類型的資訊：</p>

          <h3 className="text-xl font-semibold mt-6 mb-3">1.1 您提供的資訊</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>
              <strong>帳號資訊：</strong> 當您註冊帳號時，我們會收集您的姓名、電子郵件地址、密碼等資訊。
            </li>
            <li>
              <strong>個人資料：</strong> 您可能會選擇提供個人資料，如頭像照片、聯絡方式、地理位置等。
            </li>
            <li>
              <strong>願望內容：</strong> 您在平台上發布的願望、評論、回應等內容。
            </li>
            <li>
              <strong>通訊內容：</strong> 與其他用戶或客服的通訊內容。
            </li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">1.2 自動收集的資訊</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>
              <strong>裝置資訊：</strong> 包括IP地址、裝置類型、操作系統版本等。
            </li>
            <li>
              <strong>使用資訊：</strong> 如您如何使用我們的服務、訪問的頁面、點擊的連結等。
            </li>
            <li>
              <strong>Cookie和類似技術：</strong> 我們使用cookies和類似技術來收集和存儲資訊。
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-10 mb-4">2. 我們如何使用資訊</h2>
          <p>我們使用收集的資訊用於：</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>提供、維護和改進我們的服務</li>
            <li>創建和維護您的帳號</li>
            <li>處理和完成交易</li>
            <li>向您發送技術通知、更新、安全警報和支持訊息</li>
            <li>回應您的評論、問題和請求</li>
            <li>與您溝通有關產品、服務、優惠和活動的資訊</li>
            <li>監控和分析趨勢、使用情況和活動</li>
            <li>偵測、調查和預防欺詐交易和其他非法活動</li>
            <li>保護許願池及我們用戶的權利和財產</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-10 mb-4">3. 資訊共享與披露</h2>
          <p>我們可能會在以下情況下共享您的資訊：</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>
              <strong>與其他用戶：</strong> 當您發布願望或回應願望時，您的公開資訊（如用戶名、頭像）將可見於其他用戶。
            </li>
            <li>
              <strong>服務供應商：</strong> 我們可能會與提供服務的第三方共享資訊，如託管、維護和分析服務。
            </li>
            <li>
              <strong>法律要求：</strong> 如果法律要求或在回應法律程序、政府要求或保護我們的權利時。
            </li>
            <li>
              <strong>業務轉讓：</strong> 在公司合併、收購或破產的情況下。
            </li>
            <li>
              <strong>您的同意：</strong> 在您同意的情況下。
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-10 mb-4">4. 資料安全</h2>
          <p>
            我們實施合理的安全措施，以保護您的個人資訊免受未經授權的訪問、更改、披露或破壞。但請注意，沒有任何一種電子傳輸或存儲方法是100%安全的。因此，我們無法保證您的個人資訊的絕對安全。
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">5. 您的選擇與權利</h2>
          <p>您對於我們收集的個人資訊有以下權利：</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>訪問和更新您的個人資訊</li>
            <li>刪除您的帳號和相關資訊</li>
            <li>選擇不接收我們的行銷通訊</li>
            <li>對Cookie使用表示反對</li>
          </ul>
          <p>
            要行使上述權利，請通過{" "}
            <a href="mailto:contact@wishingpool.com" className="text-primary hover:underline">
              contact@wishingpool.com
            </a>{" "}
            聯絡我們。
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">6. 兒童隱私</h2>
          <p>我們的服務不面向13歲以下的兒童。我們不會故意收集13歲以下兒童的個人資訊。如果您發現我們有可能收集了來自13歲以下兒童的資訊，請立即聯絡我們。</p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">7. 隱私政策的變更</h2>
          <p>我們可能會不時更新本隱私政策。我們會通過在我們的網站上發布新的隱私政策來通知您任何變更。建議您定期查看本隱私政策以了解任何變更。</p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">8. 聯絡我們</h2>
          <p>
            如果您對本隱私政策有任何問題、意見或請求，請聯絡我們：
            <a href="mailto:contact@wishingpool.com" className="text-primary hover:underline ml-1">
              contact@wishingpool.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
