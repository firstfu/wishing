import React from "react";

export const metadata = {
  title: "我們的故事 | 許願池",
  description: "了解許願池的起源、使命與願景，以及我們如何致力於讓世界充滿更多善意和幫助。",
};

export default function OurStoryPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">我們的故事</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-muted-foreground mb-8">
            許願池誕生於 2023 年，源於一個簡單而溫暖的想法：打造一個平台，讓人們可以分享他們的願望，也讓有能力幫助的人能夠輕鬆找到需要幫助的對象。
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">我們的起源</h2>
          <p>
            在現代社會中，人與人之間的聯繫似乎越來越薄弱，而實際上，每個人心中都有想要幫助他人的善意。許願池的創始團隊相信，如果能夠建立一個橋樑，連接有需求的人和願意伸出援手的人，世界將會變得更加美好。
          </p>
          <p>我們的靈感來自於傳統文化中的「許願」概念，人們將心願寫下並放入許願池中，希望能被看見、被實現。我們將這個概念數位化，創造了一個現代版的許願池。</p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">我們的使命</h2>
          <p>許願池的使命是創造一個充滿善意和互助的社群，我們相信：</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>每個人都有值得被實現的願望</li>
            <li>分享困境不是軟弱，而是勇氣</li>
            <li>給予幫助是人類最美好的特質之一</li>
            <li>小小的幫助也能帶來巨大的改變</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-10 mb-4">我們的價值觀</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="text-xl font-medium mb-3">真誠透明</h3>
              <p>我們鼓勵真實的故事分享，並確保平台上的每一筆互動都是透明可信的。</p>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="text-xl font-medium mb-3">尊重隱私</h3>
              <p>我們尊重每位用戶的隱私，同時提供足夠的資訊讓幫助能夠順利進行。</p>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="text-xl font-medium mb-3">普惠共享</h3>
              <p>我們相信幫助不分大小，平台對所有真誠的願望一視同仁。</p>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="text-xl font-medium mb-3">社群賦能</h3>
              <p>我們相信社群的力量，每一次幫助都能在社會中產生正向的漣漪效應。</p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mt-10 mb-4">我們的願景</h2>
          <p>許願池的願景是成為全球最溫暖的互助平台，打破人與人之間的隔閡，創造一個更加關懷、友善的社會。我們希望有一天，每個願望都能被看見，每個人都能在需要時得到幫助。</p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">加入我們</h2>
          <p>許願池是由一群充滿熱情的開發者、設計師和社群建設者組成的團隊。我們歡迎所有認同我們理念的朋友加入，一起打造這個充滿善意的平台。</p>
          <p className="mt-4">
            如果您有任何問題、建議或合作提案，請隨時與我們聯繫：
            <a href="mailto:contact@wishingpool.com" className="text-primary hover:underline ml-1">
              contact@wishingpool.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
