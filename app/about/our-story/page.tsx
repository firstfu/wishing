import React from "react";

export const metadata = {
  title: "我們的故事 | 許願池",
  description: "了解許願池的起源、使命與願景，以及我們如何致力於讓世界充滿更多善意和幫助。",
};

export default function OurStoryPage() {
  return (
    <div className="relative min-h-screen">
      {/* 裝飾性背景元素 */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-10 right-[10%] w-72 h-72 rounded-full bg-primary/5 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 left-[5%] w-64 h-64 rounded-full bg-secondary/5 animate-pulse-slow animation-delay-400"></div>
        <div className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full bg-primary/5 animate-pulse-slow animation-delay-800"></div>
        <div className="absolute inset-0 bg-pattern-dots opacity-50"></div>
      </div>

      <div className="container mx-auto py-12 px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* 頁面標題區 */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">我們的故事</h1>
            <div className="w-16 h-1 bg-gradient mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-muted-foreground">
              許願池誕生於 2023 年，源於一個簡單而溫暖的想法：打造一個平台，讓人們可以分享他們的願望，也讓有能力幫助的人能夠輕鬆找到需要幫助的對象。
            </p>
          </div>

          <div className="prose prose-lg max-w-none space-y-12">
            {/* 起源區塊 */}
            <div className="bg-card border border-border rounded-xl p-8 shadow-sm animate-fade-in">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold m-0">我們的起源</h2>
              </div>
              <p>
                在現代社會中，人與人之間的聯繫似乎越來越薄弱，而實際上，每個人心中都有想要幫助他人的善意。許願池的創始團隊相信，如果能夠建立一個橋樑，連接有需求的人和願意伸出援手的人，世界將會變得更加美好。
              </p>
              <p className="mb-0">我們的靈感來自於傳統文化中的「許願」概念，人們將心願寫下並放入許願池中，希望能被看見、被實現。我們將這個概念數位化，創造了一個現代版的許願池。</p>
            </div>

            {/* 使命區塊 */}
            <div className="bg-card border border-border rounded-xl p-8 shadow-sm animate-fade-in animation-delay-200">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold m-0">我們的使命</h2>
              </div>
              <p>許願池的使命是創造一個充滿善意和互助的社群，我們相信：</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>每個人都有值得被實現的願望</li>
                <li>分享困境不是軟弱，而是勇氣</li>
                <li>給予幫助是人類最美好的特質之一</li>
                <li>小小的幫助也能帶來巨大的改變</li>
              </ul>
            </div>

            {/* 價值觀區塊 */}
            <div className="animate-fade-in animation-delay-400">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.25 2.25m-10.5-2.25L4.5 7.5m8.25-3l2.25 2.25m-10.5-2.25L4.5 7.5m8.25-3l2.25 2.25m-10.5-2.25L4.5 7.5m0 0l2.25 2.25m-2.25-2.25l2.25 2.25m0 0l2.25 2.25M4.5 7.5l2.25 2.25"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold m-0">我們的價值觀</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div className="bg-card p-6 rounded-lg border border-border hover:border-primary transition-colors">
                  <h3 className="text-xl font-medium mb-3">真誠透明</h3>
                  <p className="m-0">我們鼓勵真實的故事分享，並確保平台上的每一筆互動都是透明可信的。</p>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border hover:border-primary transition-colors">
                  <h3 className="text-xl font-medium mb-3">尊重隱私</h3>
                  <p className="m-0">我們尊重每位用戶的隱私，同時提供足夠的資訊讓幫助能夠順利進行。</p>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border hover:border-primary transition-colors">
                  <h3 className="text-xl font-medium mb-3">普惠共享</h3>
                  <p className="m-0">我們相信幫助不分大小，平台對所有真誠的願望一視同仁。</p>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border hover:border-primary transition-colors">
                  <h3 className="text-xl font-medium mb-3">社群賦能</h3>
                  <p className="m-0">我們相信社群的力量，每一次幫助都能在社會中產生正向的漣漪效應。</p>
                </div>
              </div>
            </div>

            {/* 願景區塊 */}
            <div className="bg-card border border-border rounded-xl p-8 shadow-sm animate-fade-in animation-delay-600">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold m-0">我們的願景</h2>
              </div>
              <p>許願池的願景是成為全球最溫暖的互助平台，打破人與人之間的隔閡，創造一個更加關懷、友善的社會。我們希望有一天，每個願望都能被看見，每個人都能在需要時得到幫助。</p>
            </div>

            {/* 加入我們區塊 */}
            <div className="bg-gradient-banner text-white rounded-xl p-8 mb-0 animate-fade-in animation-delay-800">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold m-0 text-white">加入我們</h2>
              </div>
              <p>許願池是由一群充滿熱情的開發者、設計師和社群建設者組成的團隊。我們歡迎所有認同我們理念的朋友加入，一起打造這個充滿善意的平台。</p>
              <p className="mt-4 mb-0">
                如果您有任何問題、建議或合作提案，請隨時與我們聯繫：
                <a href="mailto:contact@wishingpool.com" className="text-white hover:underline ml-1 font-medium">
                  contact@wishingpool.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
