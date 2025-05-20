import React from "react";

export const metadata = {
  title: "使用條款 | 許願池",
  description: "許願池的使用條款與協議，了解使用服務時的權利與義務。",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">使用條款</h1>
        <p className="text-muted-foreground mb-8">最後更新日期：{new Date().toISOString().split("T")[0]}</p>

        <div className="prose prose-lg max-w-none">
          <p>
            歡迎使用許願池！本使用條款（「條款」）規定了您使用我們網站、服務和應用程式的條件，請您在使用許願池前仔細閱讀以下內容。當您使用許願池服務時，即表示您同意接受本條款的約束。
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">1. 使用資格</h2>
          <p>您必須年滿 13 歲才能使用我們的服務。如果您未滿 18 歲，您應當在父母或法定監護人的同意下使用我們的服務。使用我們的服務，即表示您聲明並保證您符合上述資格要求。</p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">2. 用戶帳號</h2>
          <p>為了使用許願池的某些功能，您可能需要創建一個帳號。您有責任維護您帳號的安全性，並且您同意對在您帳號下發生的所有活動負全部責任。您同意：</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>提供準確、完整的個人資料</li>
            <li>妥善保管您的帳號和密碼</li>
            <li>立即通知我們任何未經授權使用您帳號的情況</li>
            <li>確保每次使用完畢後登出您的帳號</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-10 mb-4">3. 用戶內容</h2>
          <p>我們平台允許用戶發布願望、回應和其他內容（「用戶內容」）。您對您創建並發布的所有用戶內容負完全責任，並聲明您擁有或已獲得發布這些內容的所有必要權利。</p>
          <p>您同意不會發布：</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>違法、有害、威脅、虐待、騷擾、誹謗、侮辱或其他令人反感的內容</li>
            <li>侵犯他人智慧財產權的內容</li>
            <li>虛假或誤導性的資訊</li>
            <li>包含個人或敏感資訊的內容</li>
            <li>垃圾訊息或商業宣傳</li>
          </ul>
          <p>我們保留在不通知的情況下刪除任何違反這些條款的用戶內容的權利。</p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">4. 許願與幫助機制</h2>
          <p>
            許願池提供平台讓用戶發布願望並獲得來自社群的幫助。用戶之間的任何互動和交易都是用戶之間的直接行為，許願池不參與也不保證這些交易。我們建議用戶在提供或接受幫助時採取以下預防措施：
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>驗證對方身份與資訊的真實性</li>
            <li>建立清晰的期望與界限</li>
            <li>採取適當的安全措施保護個人資訊</li>
            <li>報告任何可疑或不當行為</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-10 mb-4">5. 免責聲明</h2>
          <p>許願池的服務按「現狀」和「可用性」提供，不提供任何明示或暗示的保證。我們不保證服務將不間斷或無錯誤，也不保證將修復任何缺陷。您使用服務的風險由您自行承擔。</p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">6. 責任限制</h2>
          <p>在法律允許的最大範圍內，許願池及其管理人員、董事、員工和代理人對於因使用或無法使用我們的服務而導致的任何間接、附帶、特殊、後果性或懲罰性損害不承擔責任。</p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">7. 終止</h2>
          <p>我們保留在任何時候，因任何理由，在有或沒有事先通知的情況下終止或暫停您的帳號和訪問服務的權利。</p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">8. 修改條款</h2>
          <p>我們可能會不定時修改這些條款。修改後的條款將在我們的網站上發布，並在發布後立即生效。您繼續使用我們的服務即表示您接受修改後的條款。</p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">9. 聯絡我們</h2>
          <p>
            如果您對這些使用條款有任何問題或意見，請聯絡我們：
            <a href="mailto:contact@wishingpool.com" className="text-primary hover:underline ml-1">
              contact@wishingpool.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
