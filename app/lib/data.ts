// 模擬數據
import { Wish } from "../components/wishes/WishCard";

// 生成隨機許願
function generateWishes(count: number, isPinned: boolean = false): Wish[] {
  const wishes: Wish[] = [];

  for (let i = 0; i < count; i++) {
    const id = `wish-${isPinned ? "pinned-" : ""}${i + 1}`;
    wishes.push({
      id,
      title: isPinned
        ? `置頂許願：我想要${["一台新筆電", "學習編程", "尋找工作機會", "改善英語能力", "找到志同道合的夥伴"][i % 5]}`
        : `我需要幫助：${["解決程式問題", "搬家", "尋找兼職機會", "學習烹飪", "練習演講", "指導數學", "找健身教練", "攝影教學"][i % 8]}`,
      description: `這是一個${
        isPinned ? "置頂" : ""
      }許願的詳細描述。這裡應該包含關於這個願望的更多信息，包括需求細節、預算、時間限制等。這些信息將幫助潛在的提供者了解如何最好地滿足這個願望。

lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

我期望的條件是：
• 有經驗的專業人士
• 可以在一周內完成
• 希望能夠提供清晰的溝通和進度報告
• 最好有相關領域的背景知識

如果您有興趣幫助我實現這個願望，請與我聯繫，我們可以討論更多細節。謝謝！`,
      price: isPinned ? 5000 + Math.floor(Math.random() * 5000) : 1000 + Math.floor(Math.random() * 3000),
      isPinned,
      category: ["technology", "education", "lifestyle", "health", "food", "travel", "entertainment", "sports"][i % 8],
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000).toISOString(),
      user: {
        id: `user-${(i % 5) + 1}`,
        name: ["王小明", "李小花", "張大山", "陳小雲", "林小樹"][i % 5],
      },
    });
  }

  return wishes;
}

// 模擬 API 請求
export async function getFeaturedWishes(): Promise<Wish[]> {
  // 模擬網絡延遲
  await new Promise(resolve => setTimeout(resolve, 500));
  return generateWishes(5, true);
}

export async function getLatestWishes(): Promise<Wish[]> {
  // 模擬網絡延遲
  await new Promise(resolve => setTimeout(resolve, 800));
  return generateWishes(6);
}

// 獲取單個許願詳情
export async function getWishById(id: string): Promise<Wish | null> {
  // 模擬網絡延遲
  await new Promise(resolve => setTimeout(resolve, 300));

  // 生成所有許願數據
  const allWishes = [...generateWishes(20, true), ...generateWishes(30)];

  // 查找對應 ID 的許願
  const wish = allWishes.find(wish => wish.id === id);

  return wish || null;
}

// 獲取相關許願（基於同一分類）
export async function getRelatedWishes(wishId: string, categoryId: string, limit: number = 3): Promise<Wish[]> {
  // 模擬網絡延遲
  await new Promise(resolve => setTimeout(resolve, 400));

  // 生成所有許願數據
  const allWishes = [...generateWishes(20, true), ...generateWishes(30)];

  // 過濾同分類且非當前許願的項目
  const relatedWishes = allWishes.filter(wish => wish.category === categoryId && wish.id !== wishId).slice(0, limit);

  return relatedWishes;
}

// 模擬獲取分類
export async function getCategories() {
  await new Promise(resolve => setTimeout(resolve, 300));
  return [
    { id: "technology", name: "科技", icon: "💻" },
    { id: "education", name: "教育", icon: "📚" },
    { id: "lifestyle", name: "生活", icon: "🏡" },
    { id: "health", name: "健康", icon: "💪" },
    { id: "food", name: "美食", icon: "🍜" },
    { id: "travel", name: "旅遊", icon: "✈️" },
    { id: "entertainment", name: "娛樂", icon: "🎮" },
    { id: "sports", name: "運動", icon: "⚽" },
  ];
}

// 根據搜尋條件獲取許願
export async function getWishesByFilter(
  search: string = "",
  category: string = "",
  sort: string = "latest",
  page: number = 1,
  limit: number = 9,
  minPrice?: number,
  maxPrice?: number
): Promise<{ wishes: Wish[]; total: number }> {
  // 模擬網絡延遲
  await new Promise(resolve => setTimeout(resolve, 600));

  // 生成大量許願數據用於測試
  const allWishes = [...generateWishes(20, true), ...generateWishes(30)];

  // 過濾許願
  let filteredWishes = allWishes;

  // 關鍵字搜尋
  if (search) {
    const searchLower = search.toLowerCase();
    filteredWishes = filteredWishes.filter(wish => wish.title.toLowerCase().includes(searchLower) || wish.description.toLowerCase().includes(searchLower));
  }

  // 分類過濾
  if (category) {
    filteredWishes = filteredWishes.filter(wish => wish.category === category);
  }

  // 價格範圍過濾
  if (minPrice !== undefined) {
    filteredWishes = filteredWishes.filter(wish => wish.price >= minPrice);
  }

  if (maxPrice !== undefined) {
    filteredWishes = filteredWishes.filter(wish => wish.price <= maxPrice);
  }

  // 排序
  switch (sort) {
    case "oldest":
      filteredWishes.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      break;
    case "price_low":
      filteredWishes.sort((a, b) => a.price - b.price);
      break;
    case "price_high":
      filteredWishes.sort((a, b) => b.price - a.price);
      break;
    default: // latest
      filteredWishes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
  }

  // 分頁
  const total = filteredWishes.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedWishes = filteredWishes.slice(start, end);

  return {
    wishes: paginatedWishes,
    total,
  };
}

// 模擬獲取許願的留言數據
export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    image?: string;
  };
}

export async function getWishComments(wishId: string, page: number = 1, limit: number = 10): Promise<{ comments: Comment[]; total: number }> {
  // 模擬網絡延遲
  await new Promise(resolve => setTimeout(resolve, 500));

  // 為特定許願生成模擬留言
  const comments: Comment[] = Array.from({ length: 15 }, (_, i) => ({
    id: `comment-${i + 1}`,
    content: `這是對許願 ${wishId} 的第 ${i + 1} 條留言。這是一個模擬的留言內容，可能包含對許願的問題或討論。${
      i % 3 === 0
        ? "我很有興趣幫助您實現這個願望，可以提供更多詳情嗎？"
        : i % 3 === 1
        ? "這個價格對於所描述的需求來說合理嗎？我有一些疑問..."
        : "我有類似的經驗，願意分享一些想法，希望對您有所幫助。"
    }`,
    createdAt: new Date(Date.now() - (15 - i) * 86400000 * Math.random()).toISOString(),
    user: {
      id: `user-comment-${(i % 7) + 1}`,
      name: ["陳大文", "林小美", "張建國", "李雅婷", "王志明", "黃麗華", "吳俊傑"][i % 7],
    },
  }));

  // 按時間排序（最新的在前）
  comments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // 分頁
  const total = comments.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedComments = comments.slice(start, end);

  return {
    comments: paginatedComments,
    total,
  };
}
