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
      }許願的詳細描述。這裡應該包含關於這個願望的更多信息，包括需求細節、預算、時間限制等。這些信息將幫助潛在的提供者了解如何最好地滿足這個願望。`,
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
