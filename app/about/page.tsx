import React from "react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "關於我們 | 許願池",
  description: "了解許願池的團隊、使命與價值觀，以及如何聯繫我們。",
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen">
      {/* 裝飾性背景元素 - 增強版 */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-[5%] right-[15%] w-72 h-72 rounded-full bg-primary/5 animate-pulse-slow"></div>
        <div className="absolute bottom-[20%] left-[10%] w-96 h-96 rounded-full bg-secondary/5 animate-pulse-slow animation-delay-600"></div>
        <div className="absolute top-[40%] left-[20%] w-24 h-24 rounded-full bg-primary/5 animate-pulse-slow animation-delay-300"></div>
        <div className="absolute bottom-[40%] right-[15%] w-48 h-48 rounded-full bg-secondary/5 animate-pulse-slow animation-delay-900"></div>
        <div className="absolute inset-0 bg-pattern-dots opacity-30"></div>

        {/* 頂部波浪 */}
        <div className="absolute top-0 inset-x-0 -z-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto text-background">
            <path
              fill="currentColor"
              fillOpacity="0.05"
              d="M0,160L60,165.3C120,171,240,181,360,186.7C480,192,600,192,720,181.3C840,171,960,149,1080,149.3C1200,149,1320,171,1380,181.3L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            ></path>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto text-primary absolute top-0 left-0">
            <path
              fill="currentColor"
              fillOpacity="0.03"
              d="M0,64L40,69.3C80,75,160,85,240,117.3C320,149,400,203,480,208C560,213,640,171,720,138.7C800,107,880,85,960,96C1040,107,1120,149,1200,144C1280,139,1360,85,1400,58.7L1440,32L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
            ></path>
          </svg>
        </div>
      </div>

      <div className="container mx-auto py-16 px-4 relative z-10">
        {/* 飄動星星裝飾 */}
        <div className="absolute top-24 left-0 w-8 h-8 text-primary opacity-30 animate-float">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="absolute top-72 right-20 w-6 h-6 text-secondary opacity-30 animate-float animation-delay-500">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* 頁面標題區 - 增強版 */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="relative inline-block mb-6">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl opacity-70 animate-pulse-slow"></div>
              <h1 className="relative text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                關於我們
              </h1>
            </div>
            <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              許願池是一個連接有需求和有能力的人的平台，我們致力於創造一個更加友善、互助的社群，讓每個願望都能被聽見，每份幫助都有意義。
            </p>
          </div>

          {/* 使命和願景 - 增強版 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20 animate-fade-in animation-delay-200">
            <div className="bg-card border border-border p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                  />
                </svg>
              </div>
              <div className="relative">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">我們的使命</h2>
                <div className="w-12 h-1 bg-primary/30 rounded-full mb-4 group-hover:w-20 transition-all duration-300"></div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  我們的使命是創造一個讓每個願望都能被看見，每個幫助都能找到需要的人的平台。透過許願池，我們希望打破人與人之間的隔閡，讓幫助變得更容易，更直接。
                </p>
              </div>
            </div>

            <div className="bg-card border border-border p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-bl from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-secondary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="relative">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-secondary transition-colors duration-300">我們的願景</h2>
                <div className="w-12 h-1 bg-secondary/30 rounded-full mb-4 group-hover:w-20 transition-all duration-300"></div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  我們的願景是成為全球最溫暖的互助平台，在這裡，每個人都可以找到支持和理解。我們相信，當人們互相幫助時，不僅能解決問題，更能建立深厚的情感連結和社群歸屬感。
                </p>
              </div>
            </div>
          </div>

          {/* 我們的價值觀 - 增強版 */}
          <div className="mb-20 animate-fade-in animation-delay-400">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text inline-block">
                我們的價值觀
              </h2>
              <div className="w-20 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6"></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">我們的價值觀指引著我們的決策和行動，塑造著許願池的文化和發展方向。</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-background p-8 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all duration-300 group">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-7 h-7 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">以人為本</h3>
                <div className="w-8 h-0.5 bg-primary/30 mb-4 group-hover:w-16 transition-all duration-300"></div>
                <p className="text-muted-foreground leading-relaxed">我們始終以用戶的需求和體驗為中心，確保每個人在平台上都能得到尊重和關注。</p>
              </div>

              <div className="bg-background p-8 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all duration-300 group">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-7 h-7 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">安全透明</h3>
                <div className="w-8 h-0.5 bg-primary/30 mb-4 group-hover:w-16 transition-all duration-300"></div>
                <p className="text-muted-foreground leading-relaxed">我們致力於建立一個安全、透明的環境，讓所有用戶都能信任彼此和平台。</p>
              </div>

              <div className="bg-background p-8 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all duration-300 group">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-7 h-7 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">社群力量</h3>
                <div className="w-8 h-0.5 bg-primary/30 mb-4 group-hover:w-16 transition-all duration-300"></div>
                <p className="text-muted-foreground leading-relaxed">我們相信集體的力量，當社群共同參與時，能夠產生巨大的正向影響。</p>
              </div>

              <div className="bg-background p-8 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all duration-300 group">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-7 h-7 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">普惠愛心</h3>
                <div className="w-8 h-0.5 bg-primary/30 mb-4 group-hover:w-16 transition-all duration-300"></div>
                <p className="text-muted-foreground leading-relaxed">我們認為每個人都有能力給予和接受幫助，無論大小，每一份愛心都值得珍視。</p>
              </div>
            </div>
          </div>

          {/* 團隊成員 - 現代化互動版 */}
          <div className="mb-20 animate-fade-in animation-delay-600">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text inline-block">
                我們的團隊
              </h2>
              <div className="w-20 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6"></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                我們擁有專業且充滿熱情的團隊，共同致力於實現許願池的願景與使命，為用戶打造最好的互助平台體驗。
              </p>
            </div>

            <div className="relative">
              {/* 動態背景元素 */}
              <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute left-1/4 top-1/4 w-32 h-32 rounded-full bg-primary/5 animate-pulse-slow"></div>
                <div className="absolute right-1/4 bottom-1/4 w-48 h-48 rounded-full bg-secondary/5 animate-pulse-slow animation-delay-600"></div>
              </div>

              {/* 互動式團隊展示 */}
              <div className="relative bg-card border border-border rounded-2xl p-8 md:p-10 shadow-sm overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* 左側：功能團隊 */}
                  <div className="space-y-6 relative">
                    <div className="bg-background rounded-xl p-5 border border-border hover:border-primary/40 hover:shadow-md transition-all duration-300 group/item">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-6 h-6 text-primary"
                          >
                            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg group-hover/item:text-primary transition-colors duration-300">技術團隊</h3>
                          <p className="text-muted-foreground text-sm">開發 & 維護</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-background rounded-xl p-5 border border-border hover:border-primary/40 hover:shadow-md transition-all duration-300 group/item">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-6 h-6 text-primary"
                          >
                            <path d="M2 9a10 10 0 0 1 2 -2a10 10 0 0 1 5 -1h8a10 10 0 0 1 5 1a10 10 0 0 1 2 2" />
                            <path d="M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                            <path d="M12 14l0 4" />
                            <path d="M9 17l3 3l3 -3" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg group-hover/item:text-primary transition-colors duration-300">設計團隊</h3>
                          <p className="text-muted-foreground text-sm">使用者體驗</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 中間：核心圖示 */}
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border-4 border-dashed border-primary/20 animate-spin-slow"></div>
                        <div className="w-36 h-36 rounded-full bg-card flex items-center justify-center relative">
                          <div className="text-center">
                            <div className="w-20 h-20 flex items-center justify-center mx-auto mb-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-12 h-12 text-primary"
                              >
                                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                                <path d="M12 7v5l3 3"></path>
                              </svg>
                            </div>
                            <h3 className="font-bold text-xl bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">願景實現</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 右側：支援團隊 */}
                  <div className="space-y-6 relative">
                    <div className="bg-background rounded-xl p-5 border border-border hover:border-primary/40 hover:shadow-md transition-all duration-300 group/item">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-6 h-6 text-primary"
                          >
                            <path d="M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2" />
                            <path d="M12 3v3m0 12v3" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg group-hover/item:text-primary transition-colors duration-300">營運團隊</h3>
                          <p className="text-muted-foreground text-sm">業務發展</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-background rounded-xl p-5 border border-border hover:border-primary/40 hover:shadow-md transition-all duration-300 group/item">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-6 h-6 text-primary"
                          >
                            <path d="M8 9h8" />
                            <path d="M8 13h6" />
                            <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg group-hover/item:text-primary transition-colors duration-300">社群團隊</h3>
                          <p className="text-muted-foreground text-sm">社群經營</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 隨機裝飾性元素 */}
                <div className="absolute top-5 left-5 w-2 h-2 rounded-full bg-primary/40"></div>
                <div className="absolute top-20 right-10 w-3 h-3 rounded-full bg-secondary/40"></div>
                <div className="absolute bottom-10 left-1/4 w-2 h-2 rounded-full bg-primary/40"></div>
                <div className="absolute bottom-5 right-1/3 w-3 h-3 rounded-full bg-secondary/40"></div>
              </div>
            </div>
          </div>

          {/* 聯絡我們 - 增強版 */}
          <div className="relative overflow-hidden bg-card border border-border rounded-xl p-8 md:p-12 shadow-sm animate-fade-in animation-delay-800 group">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-primary/5 blur-2xl transform group-hover:scale-150 transition-transform duration-700"></div>
            <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-secondary/5 blur-2xl transform group-hover:scale-150 transition-transform duration-700"></div>

            <div className="relative">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text inline-block">
                  聯絡我們
                </h2>
                <div className="w-20 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6"></div>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  如果您有任何問題、建議或合作提案，我們很樂意聽取您的意見。請透過以下方式與我們取得聯繫。
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="p-6 rounded-xl bg-background border border-border hover:border-primary/40 hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group/item">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-5 group-hover/item:scale-110 transition-transform duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-7 h-7 text-primary"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover/item:text-primary transition-colors duration-300">電子郵件</h3>
                  <p className="text-muted-foreground mb-4">發送郵件給我們，我們會在24小時內回覆</p>
                  <a href="mailto:contact@wishingpool.com" className="text-primary hover:text-primary/80 font-medium inline-flex items-center group/link">
                    contact@wishingpool.com
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>

                <div className="p-6 rounded-xl bg-background border border-border hover:border-primary/40 hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group/item">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-5 group-hover/item:scale-110 transition-transform duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-7 h-7 text-primary"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover/item:text-primary transition-colors duration-300">客服專線</h3>
                  <p className="text-muted-foreground mb-4">我們的客服團隊隨時為您服務</p>
                  <a href="tel:+886212345678" className="text-primary hover:text-primary/80 font-medium inline-flex items-center group/link">
                    (02) 1234-5678
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>

                <div className="p-6 rounded-xl bg-background border border-border hover:border-primary/40 hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group/item">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-5 group-hover/item:scale-110 transition-transform duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-7 h-7 text-primary"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover/item:text-primary transition-colors duration-300">常見問題</h3>
                  <p className="text-muted-foreground mb-4">在我們的幫助中心尋找解答</p>
                  <a href="/help" className="text-primary hover:text-primary/80 font-medium inline-flex items-center group/link">
                    幫助中心
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 瞭解更多區塊 - 增強版 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 animate-fade-in animation-delay-1000">
            <Link
              href="/about/our-story"
              className="group block p-8 rounded-xl bg-background border border-border hover:border-primary/40 hover:shadow-md transition-all duration-300 overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
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
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                  />
                </svg>
              </div>
              <div className="relative">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">我們的故事</h3>
                <div className="w-8 h-0.5 bg-primary/30 mb-4 group-hover:w-16 transition-all duration-300"></div>
                <p className="text-muted-foreground">了解許願池的起源、發展歷程和我們的創辦初衷。</p>
                <div className="mt-6 text-primary flex items-center text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-4 group-hover:translate-x-0">
                  <span>繼續閱讀</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1">
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </Link>

            <Link
              href="/about/terms"
              className="group block p-8 rounded-xl bg-background border border-border hover:border-primary/40 hover:shadow-md transition-all duration-300 overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
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
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
              </div>
              <div className="relative">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">使用條款</h3>
                <div className="w-8 h-0.5 bg-primary/30 mb-4 group-hover:w-16 transition-all duration-300"></div>
                <p className="text-muted-foreground">查看我們的使用條款和政策，了解您的權利和責任。</p>
                <div className="mt-6 text-primary flex items-center text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-4 group-hover:translate-x-0">
                  <span>繼續閱讀</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1">
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </Link>

            <Link
              href="/about/privacy"
              className="group block p-8 rounded-xl bg-background border border-border hover:border-primary/40 hover:shadow-md transition-all duration-300 overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
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
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
              </div>
              <div className="relative">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">隱私政策</h3>
                <div className="w-8 h-0.5 bg-primary/30 mb-4 group-hover:w-16 transition-all duration-300"></div>
                <p className="text-muted-foreground">了解我們如何保護和處理您的個人資訊。</p>
                <div className="mt-6 text-primary flex items-center text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-4 group-hover:translate-x-0">
                  <span>繼續閱讀</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1">
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* 底部裝飾元素 */}
      <div className="relative h-24 mt-16 overflow-hidden">
        <div className="absolute inset-x-0 bottom-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto text-background">
            <path
              fill="currentColor"
              fillOpacity="0.05"
              d="M0,192L48,176C96,160,192,128,288,128C384,128,480,160,576,165.3C672,171,768,149,864,154.7C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto text-primary absolute bottom-0 left-0">
            <path
              fill="currentColor"
              fillOpacity="0.03"
              d="M0,32L48,58.7C96,85,192,139,288,144C384,149,480,107,576,112C672,117,768,171,864,176C960,181,1056,139,1152,117.3C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
