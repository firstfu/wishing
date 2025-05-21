import React from "react";
import Link from "next/link";

export const metadata = {
  title: "關於我們 | 許願池",
  description: "了解許願池的團隊、使命與價值觀，以及如何聯繫我們。",
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen">
      {/* 裝飾性背景元素 */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-[5%] right-[15%] w-80 h-80 rounded-full bg-primary/5 animate-pulse-slow"></div>
        <div className="absolute bottom-[20%] left-[10%] w-96 h-96 rounded-full bg-secondary/5 animate-pulse-slow animation-delay-600"></div>
        <div className="absolute inset-0 bg-pattern-dots opacity-40"></div>
      </div>

      <div className="container mx-auto py-12 px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* 頁面標題區 */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">關於我們</h1>
            <div className="w-20 h-1 bg-gradient mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              許願池是一個連接有需求和有能力的人的平台，我們致力於創造一個更加友善、互助的社群。
            </p>
          </div>

          {/* 使命和願景 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 animate-fade-in animation-delay-200">
            <div className="bg-card border border-border p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold mb-3">我們的使命</h2>
              <p className="text-muted-foreground">
                我們的使命是創造一個讓每個願望都能被看見，每個幫助都能找到需要的人的平台。透過許願池，我們希望打破人與人之間的隔閡，讓幫助變得更容易，更直接。
              </p>
            </div>

            <div className="bg-card border border-border p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold mb-3">我們的願景</h2>
              <p className="text-muted-foreground">
                我們的願景是成為全球最溫暖的互助平台，在這裡，每個人都可以找到支持和理解。我們相信，當人們互相幫助時，不僅能解決問題，更能建立深厚的情感連結和社群歸屬感。
              </p>
            </div>
          </div>

          {/* 我們的價值觀 */}
          <div className="mb-16 animate-fade-in animation-delay-400">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">我們的價值觀</h2>
            <div className="w-16 h-1 bg-gradient mx-auto rounded-full mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-background p-6 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">以人為本</h3>
                <p className="text-muted-foreground">我們始終以用戶的需求和體驗為中心，確保每個人在平台上都能得到尊重和關注。</p>
              </div>

              <div className="bg-background p-6 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">安全透明</h3>
                <p className="text-muted-foreground">我們致力於建立一個安全、透明的環境，讓所有用戶都能信任彼此和平台。</p>
              </div>

              <div className="bg-background p-6 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">社群力量</h3>
                <p className="text-muted-foreground">我們相信集體的力量，當社群共同參與時，能夠產生巨大的正向影響。</p>
              </div>

              <div className="bg-background p-6 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">普惠愛心</h3>
                <p className="text-muted-foreground">我們認為每個人都有能力給予和接受幫助，無論大小，每一份愛心都值得珍視。</p>
              </div>
            </div>
          </div>

          {/* 團隊成員 - 改為使用SVG圖 */}
          <div className="mb-16 animate-fade-in animation-delay-600">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">我們的團隊</h2>
            <div className="w-16 h-1 bg-gradient mx-auto rounded-full mb-8"></div>
            <div className="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" className="w-full max-w-3xl mx-auto" style={{ maxHeight: "350px" }}>
                <defs>
                  <linearGradient id="teamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="var(--color-secondary)" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--color-muted)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="var(--color-muted)" stopOpacity="0.1" />
                  </linearGradient>
                  <pattern id="teamPattern" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <circle cx="20" cy="20" r="1" fill="var(--color-primary)" fillOpacity="0.3" />
                  </pattern>
                </defs>

                {/* 背景和裝飾元素 */}
                <rect width="800" height="400" fill="url(#bgGradient)" rx="12" />
                <rect width="800" height="400" fill="url(#teamPattern)" rx="12" />

                {/* 團隊圖形表示 */}
                <g transform="translate(400, 200)">
                  {/* 中心圓 */}
                  <circle cx="0" cy="0" r="60" fill="url(#teamGradient)" stroke="var(--color-primary)" strokeWidth="2" />
                  <text x="0" y="8" textAnchor="middle" fill="var(--color-foreground)" fontSize="18" fontWeight="600">
                    願景實現
                  </text>

                  {/* 圍繞的六個圓 */}
                  <g>
                    {/* 技術團隊 */}
                    <circle cx="-170" cy="-50" r="50" fill="url(#teamGradient)" stroke="var(--color-primary)" strokeWidth="2" />
                    <text x="-170" y="-55" textAnchor="middle" fill="var(--color-foreground)" fontSize="16" fontWeight="600">
                      技術團隊
                    </text>
                    <text x="-170" y="-35" textAnchor="middle" fill="var(--color-muted-foreground)" fontSize="12">
                      開發 & 維護
                    </text>
                    <line x1="-110" y1="-30" x2="-30" y2="-10" stroke="var(--color-border)" strokeWidth="1" />
                  </g>

                  <g>
                    {/* 設計團隊 */}
                    <circle cx="-120" cy="100" r="50" fill="url(#teamGradient)" stroke="var(--color-primary)" strokeWidth="2" />
                    <text x="-120" y="95" textAnchor="middle" fill="var(--color-foreground)" fontSize="16" fontWeight="600">
                      設計團隊
                    </text>
                    <text x="-120" y="115" textAnchor="middle" fill="var(--color-muted-foreground)" fontSize="12">
                      使用者體驗
                    </text>
                    <line x1="-80" y1="60" x2="-30" y2="20" stroke="var(--color-border)" strokeWidth="1" />
                  </g>

                  <g>
                    {/* 社群團隊 */}
                    <circle cx="170" cy="-50" r="50" fill="url(#teamGradient)" stroke="var(--color-primary)" strokeWidth="2" />
                    <text x="170" y="-55" textAnchor="middle" fill="var(--color-foreground)" fontSize="16" fontWeight="600">
                      社群團隊
                    </text>
                    <text x="170" y="-35" textAnchor="middle" fill="var(--color-muted-foreground)" fontSize="12">
                      社群經營
                    </text>
                    <line x1="110" y1="-30" x2="30" y2="-10" stroke="var(--color-border)" strokeWidth="1" />
                  </g>

                  <g>
                    {/* 支援團隊 */}
                    <circle cx="120" cy="100" r="50" fill="url(#teamGradient)" stroke="var(--color-primary)" strokeWidth="2" />
                    <text x="120" y="95" textAnchor="middle" fill="var(--color-foreground)" fontSize="16" fontWeight="600">
                      支援團隊
                    </text>
                    <text x="120" y="115" textAnchor="middle" fill="var(--color-muted-foreground)" fontSize="12">
                      用戶支援
                    </text>
                    <line x1="80" y1="60" x2="30" y2="20" stroke="var(--color-border)" strokeWidth="1" />
                  </g>

                  <g>
                    {/* 行銷團隊 */}
                    <circle cx="0" cy="-150" r="50" fill="url(#teamGradient)" stroke="var(--color-primary)" strokeWidth="2" />
                    <text x="0" y="-155" textAnchor="middle" fill="var(--color-foreground)" fontSize="16" fontWeight="600">
                      行銷團隊
                    </text>
                    <text x="0" y="-135" textAnchor="middle" fill="var(--color-muted-foreground)" fontSize="12">
                      市場推廣
                    </text>
                    <line x1="0" y1="-100" x2="0" y2="-60" stroke="var(--color-border)" strokeWidth="1" />
                  </g>

                  <g>
                    {/* 營運團隊 */}
                    <circle cx="0" cy="150" r="50" fill="url(#teamGradient)" stroke="var(--color-primary)" strokeWidth="2" />
                    <text x="0" y="145" textAnchor="middle" fill="var(--color-foreground)" fontSize="16" fontWeight="600">
                      營運團隊
                    </text>
                    <text x="0" y="165" textAnchor="middle" fill="var(--color-muted-foreground)" fontSize="12">
                      業務發展
                    </text>
                    <line x1="0" y1="100" x2="0" y2="60" stroke="var(--color-border)" strokeWidth="1" />
                  </g>
                </g>

                {/* 小裝飾元素 */}
                <circle cx="50" cy="50" r="30" fill="none" stroke="var(--color-primary)" strokeWidth="1" strokeOpacity="0.3" />
                <circle cx="750" cy="350" r="30" fill="none" stroke="var(--color-primary)" strokeWidth="1" strokeOpacity="0.3" />
                <circle cx="750" cy="50" r="20" fill="none" stroke="var(--color-secondary)" strokeWidth="1" strokeOpacity="0.3" />
                <circle cx="50" cy="350" r="20" fill="none" stroke="var(--color-secondary)" strokeWidth="1" strokeOpacity="0.3" />
              </svg>
            </div>
            <p className="text-center text-muted-foreground mt-6 max-w-2xl mx-auto">
              我們擁有專業且充滿熱情的團隊，共同致力於實現許願池的願景與使命，為用戶打造最好的互助平台體驗。
            </p>
          </div>

          {/* 聯絡我們 */}
          <div className="bg-card border border-border rounded-xl p-8 md:p-10 shadow-sm animate-fade-in animation-delay-800">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">聯絡我們</h2>
              <div className="w-16 h-1 bg-gradient mx-auto rounded-full mb-6"></div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                如果您有任何問題、建議或合作提案，我們很樂意聽取您的意見。請透過以下方式與我們取得聯繫。
              </p>
            </div>

            <div className="flex justify-center">
              <div className="p-6 rounded-lg bg-background border border-border hover:border-primary transition-colors flex flex-col items-center text-center max-w-md mx-auto">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">電子郵件</h3>
                <p className="text-muted-foreground mb-3">發送郵件給我們，我們會在24小時內回覆</p>
                <a href="mailto:contact@wishingpool.com" className="text-primary hover:underline font-medium">
                  contact@wishingpool.com
                </a>
              </div>
            </div>
          </div>

          {/* 瞭解更多區塊 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in animation-delay-1000">
            <Link href="/about/our-story" className="group block p-6 rounded-lg bg-muted border border-border hover:border-primary transition-colors">
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">我們的故事</h3>
              <p className="text-muted-foreground text-sm">了解許願池的起源、發展歷程和我們的創辦初衷。</p>
            </Link>

            <Link href="/about/terms" className="group block p-6 rounded-lg bg-muted border border-border hover:border-primary transition-colors">
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">使用條款</h3>
              <p className="text-muted-foreground text-sm">查看我們的使用條款和政策，了解您的權利和責任。</p>
            </Link>

            <Link href="/about/privacy" className="group block p-6 rounded-lg bg-muted border border-border hover:border-primary transition-colors">
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">隱私政策</h3>
              <p className="text-muted-foreground text-sm">了解我們如何保護和處理您的個人資訊。</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
