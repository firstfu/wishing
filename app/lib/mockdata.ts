// mockdata.ts - 真實模擬資料
//
// 本檔案提供逼近現實場景的假資料，包含：
// 1. 用戶資料 - 使用接近台灣的人名和真實的用戶情境
// 2. 許願資料 - 模擬真實用戶會發布的許願內容和需求
// 3. 留言資料 - 模擬真實對話互動和溝通模式
// 4. 訊息資料 - 模擬用戶間私訊的真實對話場景
//
// 使用方式：引入此檔案中的函式取代 data.ts 中的假資料生成函式

import { Wish } from "../components/wishes/WishCard";
import { Comment, Message, Conversation, CreateWishInput } from "./data";

// 台灣常見姓氏
const lastNames = [
  "陳",
  "林",
  "黃",
  "張",
  "李",
  "王",
  "吳",
  "劉",
  "蔡",
  "楊",
  "許",
  "鄭",
  "謝",
  "郭",
  "洪",
  "曾",
  "邱",
  "廖",
  "賴",
  "徐",
  "周",
  "葉",
  "蘇",
  "莊",
  "呂",
  "江",
  "何",
  "蕭",
  "羅",
  "高",
  "潘",
  "簡",
  "朱",
  "鍾",
  "游",
  "彭",
  "詹",
  "胡",
  "施",
  "沈",
  "余",
  "趙",
  "盧",
  "梁",
  "顏",
  "柯",
  "孫",
  "魏",
  "翁",
  "戴",
];

// 台灣常見名字組合
const firstNamePatterns = [
  "家豪",
  "志明",
  "俊傑",
  "建宏",
  "志豪",
  "志偉",
  "文彬",
  "彥廷",
  "冠宇",
  "宗翰",
  "家瑋",
  "冠廷",
  "彥甫",
  "家銘",
  "志宏",
  "志強",
  "俊宏",
  "建志",
  "俊賢",
  "智凱",
  "怡婷",
  "佳穎",
  "欣怡",
  "雅婷",
  "佳蓉",
  "怡君",
  "怡萱",
  "詩涵",
  "馨儀",
  "佩珊",
  "佳欣",
  "怡如",
  "詩婷",
  "雅雯",
  "雅玲",
  "鈺婷",
  "佳玲",
  "怡伶",
  "宜芳",
  "郁婷",
];

// 隨機生成台灣風格人名
function generateTaiwanName() {
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const firstName = firstNamePatterns[Math.floor(Math.random() * firstNamePatterns.length)];
  return `${lastName}${firstName}`;
}

// 真實的用戶資料
export const mockUsers = [
  {
    id: "user-1",
    name: "陳家豪",
    bio: "台大資工畢業，現為軟體工程師，專注於前端開發，喜歡分享技術經驗。",
    occupation: "軟體工程師",
    location: "台北市",
    joinedAt: "2022-03-15T08:30:00Z",
    avatarUrl: "/avatars/user1.jpg",
    wishesFulfilled: 12,
    wishesCreated: 5,
    rating: 4.8,
  },
  {
    id: "user-2",
    name: "林怡婷",
    bio: "政治大學企管系畢業，行銷專員，對社群媒體經營有豐富經驗，也喜歡手作和烘焙。",
    occupation: "行銷專員",
    location: "新北市",
    joinedAt: "2022-05-22T14:45:00Z",
    avatarUrl: "/avatars/user2.jpg",
    wishesFulfilled: 8,
    wishesCreated: 7,
    rating: 4.9,
  },
  {
    id: "user-3",
    name: "黃志明",
    bio: "退休教師，現在有更多時間做志工，希望能幫助更多需要協助的人。",
    occupation: "退休教師",
    location: "桃園市",
    joinedAt: "2022-01-10T09:15:00Z",
    avatarUrl: "/avatars/user3.jpg",
    wishesFulfilled: 23,
    wishesCreated: 3,
    rating: 5.0,
  },
  {
    id: "user-4",
    name: "張雅雯",
    bio: "插畫家，擅長水彩和數位繪圖，喜歡將生活中的小確幸畫下來分享。",
    occupation: "自由插畫家",
    location: "台中市",
    joinedAt: "2022-06-05T16:20:00Z",
    avatarUrl: "/avatars/user4.jpg",
    wishesFulfilled: 5,
    wishesCreated: 9,
    rating: 4.7,
  },
  {
    id: "user-5",
    name: "李俊傑",
    bio: "餐飲創業者，經營一家小型咖啡店，喜歡交朋友和分享烹飪技巧。",
    occupation: "咖啡店老闆",
    location: "高雄市",
    joinedAt: "2022-04-18T11:40:00Z",
    avatarUrl: "/avatars/user5.jpg",
    wishesFulfilled: 14,
    wishesCreated: 6,
    rating: 4.6,
  },
  {
    id: "user-6",
    name: "王佳蓉",
    bio: "研究所學生，正在撰寫論文，對教育議題有濃厚興趣，週末喜歡爬山。",
    occupation: "研究生",
    location: "新竹市",
    joinedAt: "2022-07-30T13:10:00Z",
    avatarUrl: "/avatars/user6.jpg",
    wishesFulfilled: 3,
    wishesCreated: 8,
    rating: 4.5,
  },
  {
    id: "user-7",
    name: "吳建宏",
    bio: "程式教育講師，致力於推廣程式教育，希望能幫助更多人學習coding。",
    occupation: "教育工作者",
    location: "台南市",
    joinedAt: "2022-02-25T10:05:00Z",
    avatarUrl: "/avatars/user7.jpg",
    wishesFulfilled: 19,
    wishesCreated: 4,
    rating: 4.9,
  },
  {
    id: "user-8",
    name: "蔡欣怡",
    bio: "室內設計師，擅長空間規劃與色彩搭配，喜歡簡約風格的設計。",
    occupation: "室內設計師",
    location: "台北市",
    joinedAt: "2022-08-12T15:30:00Z",
    avatarUrl: "/avatars/user8.jpg",
    wishesFulfilled: 7,
    wishesCreated: 11,
    rating: 4.8,
  },
  {
    id: "user-9",
    name: "楊志豪",
    bio: "攝影師，擅長風景和人像攝影，作品曾在多個展覽中展出。",
    occupation: "攝影師",
    location: "宜蘭縣",
    joinedAt: "2022-09-03T12:45:00Z",
    avatarUrl: "/avatars/user9.jpg",
    wishesFulfilled: 6,
    wishesCreated: 8,
    rating: 4.7,
  },
  {
    id: "user-10",
    name: "許佳穎",
    bio: "瑜伽老師，致力於推廣健康生活方式，希望能幫助更多人找到身心平衡。",
    occupation: "瑜伽老師",
    location: "台中市",
    joinedAt: "2022-10-20T09:55:00Z",
    avatarUrl: "/avatars/user10.jpg",
    wishesFulfilled: 11,
    wishesCreated: 5,
    rating: 5.0,
  },
];

// 更多隨機用戶
for (let i = 11; i <= 30; i++) {
  mockUsers.push({
    id: `user-${i}`,
    name: generateTaiwanName(),
    bio: "用戶簡介",
    occupation: ["學生", "上班族", "自由工作者", "教師", "醫護人員"][Math.floor(Math.random() * 5)],
    location: ["台北市", "新北市", "桃園市", "台中市", "台南市", "高雄市", "新竹市", "嘉義市"][Math.floor(Math.random() * 8)],
    joinedAt: new Date(Date.now() - Math.floor(Math.random() * 365) * 86400000).toISOString(),
    avatarUrl: `/avatars/default.jpg`,
    wishesFulfilled: Math.floor(Math.random() * 20),
    wishesCreated: Math.floor(Math.random() * 10),
    rating: 3.5 + Math.random() * 1.5,
  });
}

// 真實的許願資料
export const mockWishes: Wish[] = [
  {
    id: "wish-1",
    title: "尋找數學家教協助高中數學準備學測",
    description: `我是一位高三學生，目前在準備明年一月的學測，但數學一直是我的弱項，特別是在機率與統計部分。我希望能找到有經驗的數學家教，最好是有教過學測的，能夠針對我的弱點給予指導。

我的情況是：
• 基礎計算沒問題，但遇到應用題時常常卡住
• 需要加強的部分主要是機率、統計和三角函數
• 希望能一週上課1-2次，每次2小時左右
• 可以線上教學，但更偏好實體面對面指導

預算每小時500-600元，希望能在12月前有明顯的進步。如果您是數學系學生或有豐富教學經驗的老師，非常歡迎與我聯繫，謝謝！`,
    price: 550,
    isPinned: false,
    category: "education",
    createdAt: "2023-10-05T14:23:00Z",
    user: {
      id: "user-6",
      name: "王佳蓉",
    },
  },
  {
    id: "wish-2",
    title: "徵求網站前端開發協助，建立個人作品集網站",
    description: `我是一位平面設計師，想建立一個展示自己作品的個人網站，但對程式設計不熟悉。希望能找到熟悉前端開發的人協助我完成這個專案。

需求說明：
• 一個簡潔但有設計感的個人作品集網站
• 需要有作品展示區（大約20-30個作品，含圖片與簡短描述）
• 需要簡單的關於我、聯絡方式頁面
• 希望能有基本的RWD功能，在手機和平板上也能正常瀏覽
• 最好能有簡單的CMS，讓我之後能自己更新作品

我已經做好了網站的視覺設計稿（使用Figma），需要有人將它實際做成網站。預算為20,000元，希望能在一個月內完成。如果您對這個專案有興趣，請聯繫我討論詳情，謝謝！`,
    price: 20000,
    isPinned: true,
    category: "technology",
    createdAt: "2023-09-28T09:45:00Z",
    user: {
      id: "user-4",
      name: "張雅雯",
    },
  },
  {
    id: "wish-3",
    title: "尋找台北市松山區共乘夥伴，每週一至五上下班",
    description: `我住在台北市松山區，上班地點在內湖科學園區。每天開車上下班，車上常常只有我一人，既浪費油錢又不環保，因此想尋找同路線的共乘夥伴。

詳細資訊：
• 週一至週五上班時間約7:30從松山區出發，下班約18:00從內湖回松山
• 路線：松山區健康路 → 基隆路 → 內湖科學園區
• 車輛是五人座轎車，乾淨整潔，有定期保養
• 可搭載2-3人，每人每個月分攤油錢約2,000元
• 我個性隨和，不抽菸，車上可以聊天或安靜各做各的事都可以

如果您住在類似路線且上下班時間相近，歡迎聯繫我詳談，謝謝！`,
    price: 2000,
    isPinned: false,
    category: "lifestyle",
    createdAt: "2023-10-10T08:15:00Z",
    user: {
      id: "user-1",
      name: "陳家豪",
    },
  },
  {
    id: "wish-4",
    title: "招募台中后里淨灘志工，10/29早上一起守護海洋",
    description: `我是台中環保協會的志工，預計在10/29(週日)早上舉辦一場淨灘活動，希望能招募20位志工一起參與，為我們的海洋盡一份心力。

活動詳情：
• 日期：10/29(週日)
• 時間：早上08:00-12:00
• 地點：台中市后里區麗水漁港
• 提供：手套、夾子、垃圾袋等工具，以及礦泉水和點心
• 建議自備：帽子、防曬用品、替換衣物、環保餐具

注意事項：
• 活動全程免費參加，但請務必確定能出席再報名
• 若當天天氣不佳，將提前一天通知是否延期
• 適合12歲以上的參加者，未成年請由家長陪同
• 活動結束後將提供志工服務證明

如果您關心海洋環境，想為地球盡一份心力，歡迎加入我們的行列！`,
    price: 0,
    isPinned: true,
    category: "lifestyle",
    createdAt: "2023-10-12T16:30:00Z",
    user: {
      id: "user-3",
      name: "黃志明",
    },
  },
  {
    id: "wish-5",
    title: "徵求烘焙老師教學製作生日蛋糕，送給女友驚喜",
    description: `女友下個月生日，想親手做一個蛋糕給她當作驚喜，但我完全沒有烘焙經驗。希望能找到有耐心的烘焙老師教我一對一製作，最好是能在我家進行教學。

我的需求：
• 希望學習做一個6吋的草莓慕斯蛋糕（這是她最喜歡的口味）
• 需要從基礎教起，包括材料準備、步驟、裝飾等
• 預計在女友生日前一週進行教學（11月第一週的週末）
• 地點可以在我家（新北市板橋區）或是老師的工作室
• 材料費我會負責，也可以請老師代購

預算3,000-5,000元不等，視教學內容和時間調整。希望能找到有教學經驗且願意針對新手耐心指導的老師，謝謝！`,
    price: 4000,
    isPinned: false,
    category: "food",
    createdAt: "2023-10-15T19:20:00Z",
    user: {
      id: "user-7",
      name: "吳建宏",
    },
  },
  {
    id: "wish-6",
    title: "尋找有經驗的遛狗人士，每週遛狗3-5次",
    description: `因工作日程變得更忙碌，希望能找到可靠的人幫忙遛我家的黃金獵犬，每週3-5次。我家狗狗非常友善，已經3歲，訓練得很好，不會亂吠或是有攻擊性。

需求細節：
• 遛狗時間：平日下午3-5點之間，每次約45分鐘
• 地點：台北市大安區和平東路附近
• 希望能有遛狗經驗，且真心喜歡狗的人士
• 需要能提供簡單的狗狗照顧，如餵水和整理牽繩等
• 如果狗狗有任何異常，希望能立即通知我

提供每次300元，每月結算一次。如果長期合作順利，願意調整報酬。請有興趣的人士提供過去照顧寵物的經驗，謝謝！`,
    price: 300,
    isPinned: false,
    category: "lifestyle",
    createdAt: "2023-10-18T11:05:00Z",
    user: {
      id: "user-8",
      name: "蔡欣怡",
    },
  },
  {
    id: "wish-7",
    title: "徵求攝影師為咖啡店拍攝產品與空間照片",
    description: `我是一家新開咖啡店的負責人，需要專業攝影師為店內環境和產品拍攝照片，用於社群媒體和官網宣傳。

拍攝需求：
• 咖啡店空間照（內外觀，約10-15張）
• 咖啡和糕點產品照（約15-20張）
• 簡單的場景照，如客人在店內用餐、咖啡師製作咖啡的畫面等（約5-10張）

我們希望風格自然清新，能夠呈現出店內溫馨舒適的氛圍。拍攝時間可以配合攝影師的行程，最好在平日人少的時候進行。預算1萬元，包含後製和檔案交付。如果作品品質好，未來有機會長期合作，每月都有新品項需要拍攝。

咖啡店位於台北市中山區，交通便利。期待能找到風格契合的攝影師合作，謝謝！`,
    price: 10000,
    isPinned: true,
    category: "entertainment",
    createdAt: "2023-10-20T13:40:00Z",
    user: {
      id: "user-5",
      name: "李俊傑",
    },
  },
  {
    id: "wish-8",
    title: "急徵英文論文潤稿，學術用語研究生水平",
    description: `我是一名科技大學的研究生，目前正在準備投稿國際期刊的論文，需要有經驗的人協助進行英文潤稿。論文主題是關於人工智能在製造業的應用，全文約8000字。

需求說明：
• 文法和拼字檢查
• 學術用語的適當使用
• 句子結構優化，使其符合學術寫作風格
• 不需要修改論文內容和專業術語
• 希望能在一週內完成

要求潤稿者有碩士以上學歷，最好是理工背景，且有學術論文寫作或編輯經驗。預算5,000元，如果品質好且能準時交付，未來還有其他論文會繼續合作。請提供過去的潤稿經驗和相關背景，謝謝！`,
    price: 5000,
    isPinned: false,
    category: "education",
    createdAt: "2023-10-22T20:15:00Z",
    user: {
      id: "user-9",
      name: "楊志豪",
    },
  },
  {
    id: "wish-9",
    title: "尋找瑜伽私人教練，初學者零基礎",
    description: `我是一位上班族，因長期久坐造成肩頸僵硬和輕微背痛，醫生建議可以嘗試瑜伽改善。由於沒有任何瑜伽經驗，且希望能有針對性的指導，因此想尋找私人教練一對一教學。

我的情況：
• 完全零基礎，從未接觸過瑜伽
• 肩頸和腰背部位較為僵硬，柔軟度不佳
• 希望以改善身體狀況為主，非以塑身為目標
• 希望每週固定1-2次課程，每次60-90分鐘
• 可以在家中進行，或到教練的場地也可以（居住在台北市信義區）

預算每堂課1,000-1,500元，希望能找到有耐心、專業且能針對我的身體狀況設計課程的教練。煩請有興趣的老師提供教學經驗和專長領域，謝謝！`,
    price: 1200,
    isPinned: false,
    category: "health",
    createdAt: "2023-10-25T10:30:00Z",
    user: {
      id: "user-2",
      name: "林怡婷",
    },
  },
  {
    id: "wish-10",
    title: "徵求家庭教師指導小五數學和英文，每週兩次",
    description: `我的小孩目前讀小學五年級，數學和英文需要加強，希望能找到有耐心的家教老師指導。

需求說明：
• 主要加強數學計算和應用題，英文文法和閱讀理解
• 每週安排兩次課程，每次2小時
• 時間希望在平日下午4-6點或週末
• 地點在我家（台中市西屯區）
• 希望老師能幫忙檢查作業，並針對弱點加強

小孩個性比較內向，需要老師有耐心引導。希望老師至少是大學生，有家教經驗更佳。每小時400元，交通費另計。如有意願，請提供簡單的自我介紹和教學經驗，謝謝！`,
    price: 3200,
    isPinned: true,
    category: "education",
    createdAt: "2023-10-26T15:50:00Z",
    user: {
      id: "user-10",
      name: "許佳穎",
    },
  },
];

// 真實的留言資料
export const mockComments: Comment[] = [
  {
    id: "comment-1",
    content:
      "您好，我是台大數學系大四學生，暑假期間有教過幾個高中生準備學測，成效不錯。我數學成績一直都很穩定，對高中數學教學方法也有研究。請問您方便哪幾天上課？我可以配合您的時間。",
    createdAt: "2023-10-05T15:40:00Z",
    user: {
      id: "user-12",
      name: "李伯勳",
    },
  },
  {
    id: "comment-2",
    content:
      "王同學你好，我是補習班數學老師，有超過5年教學經驗，專攻學測與指考。看到您提到機率統計和三角函數這兩個部分，這恰好是我的專長，可以針對性輔導。我可以提供線上或實體教學，也有自編的講義和題庫。有興趣的話可以先安排一次免費試教，看看合不合適。",
    createdAt: "2023-10-06T09:15:00Z",
    user: {
      id: "user-15",
      name: "張明德",
    },
  },
  {
    id: "comment-3",
    content:
      "我是應屆畢業的師大數學系學生，去年才考完學測（數學15級分），對現行課綱和題型都很熟悉。我教學方式偏向引導式而非直接告訴答案，希望能培養同學的數學思維。我住台北市，可配合您的時間，每週末或平日晚上都可以。",
    createdAt: "2023-10-06T16:50:00Z",
    user: {
      id: "user-18",
      name: "周雅琪",
    },
  },
  {
    id: "comment-4",
    content:
      "您好，我是前端開發工程師，有5年React開發經驗，作品集網站是我的拿手好戲。看到您已經有Figma設計稿很棒，這會節省不少時間。我用Next.js+Tailwind可以快速實現您的設計，並可以整合Contentful CMS讓您日後輕鬆更新內容。時程一個月綽綽有餘，預算也合理。可以看看我的作品集了解我的風格：https://portfolio.example.com",
    createdAt: "2023-09-28T14:20:00Z",
    user: {
      id: "user-1",
      name: "陳家豪",
    },
  },
  {
    id: "comment-5",
    content:
      "張小姐您好，我是專職接案的網頁設計師，曾幫多位藝術家和設計師建立過作品集網站。我可以使用無頭CMS如Strapi或Sanity搭配前端框架，讓您的網站既美觀又易於管理。如果您有興趣，我可以提供之前的案例給您參考，並約時間詳談專案細節。",
    createdAt: "2023-09-29T11:05:00Z",
    user: {
      id: "user-11",
      name: "王威廷",
    },
  },
  {
    id: "comment-6",
    content:
      "您好，請問這個共乘的路線大約幾點會到內湖科學園區？我在瑞光路附近上班，早上大約8:15需要到公司，不知道時間上是否能配合？另外，如果偶爾需要加班，回程時間會比較晚，這種情況是否方便？謝謝！",
    createdAt: "2023-10-10T12:40:00Z",
    user: {
      id: "user-13",
      name: "吳曉芬",
    },
  },
  {
    id: "comment-7",
    content:
      "陳先生您好，我住在松山區南京東路，上班地點在內湖科技園區的陽光街，時間上很接近。我平常7:45左右出門，晚上大約6:30回家，不知道您方便載我嗎？另外想請問，若偶爾臨時有事無法共乘，費用會如何計算？謝謝！",
    createdAt: "2023-10-11T08:25:00Z",
    user: {
      id: "user-21",
      name: "林書豪",
    },
  },
  {
    id: "comment-8",
    content: "黃先生您好，我對這次的淨灘活動很有興趣！請問目前已經有多少人報名了？另外，當天會如何分配工作？我之前參加過類似活動，可以協助帶領小組或是進行垃圾分類的工作。",
    createdAt: "2023-10-13T18:10:00Z",
    user: {
      id: "user-14",
      name: "陳雅文",
    },
  },
  {
    id: "comment-9",
    content: "您好，我有兩個問題：第一，我可以帶小孩一起參加嗎？他10歲，我想讓他從小培養環保意識；第二，如果當天天氣不佳，有預備的雨天備案嗎？謝謝您舉辦這麼有意義的活動！",
    createdAt: "2023-10-14T10:35:00Z",
    user: {
      id: "user-22",
      name: "蘇怡萱",
    },
  },
  {
    id: "comment-10",
    content:
      "吳先生您好，我是專業烘焙老師，有五年開班教學經驗，草莓慕斯蛋糕是我的招牌之一。看到您想為女友親手製作蛋糕的心意很感動，我很樂意協助您。我可以帶著所有需要的工具和食材到府教學，保證一次就能學會。可以請您提供您方便的確切日期嗎？我好安排時間。",
    createdAt: "2023-10-16T14:15:00Z",
    user: {
      id: "user-16",
      name: "楊美玲",
    },
  },
];

// 真實的訊息對話資料
export const mockMessages: Message[] = [
  // 對話一：關於數學家教的訊息
  {
    id: "msg-1",
    content: "王同學你好，我是李伯勳，剛才在你的數學家教許願下留了言。想更詳細地了解你需要加強的部分，方便私訊討論嗎？",
    createdAt: "2023-10-05T16:10:00Z",
    senderId: "user-12",
    receiverId: "user-6",
    wishId: "wish-1",
    isRead: true,
  },
  {
    id: "msg-2",
    content: "李學長你好！謝謝你的回覆。我主要是機率與統計不太理解，特別是排列組合和期望值的應用題常常卡關。你有空的話，我們可以約週末見面詳談嗎？",
    createdAt: "2023-10-05T17:25:00Z",
    senderId: "user-6",
    receiverId: "user-12",
    wishId: "wish-1",
    isRead: true,
  },
  {
    id: "msg-3",
    content: "沒問題，這週六下午2點如何？我可以帶一些相關題目，我們一起看看你卡在哪裡。另外，你平常用什麼方式複習數學？",
    createdAt: "2023-10-05T19:40:00Z",
    senderId: "user-12",
    receiverId: "user-6",
    wishId: "wish-1",
    isRead: true,
  },
  {
    id: "msg-4",
    content: "週六下午2點可以，我們在哪裡見面呢？我家在信義區，附近有很多咖啡廳。平常我都是看影片和做題目，但做題常常找不到方向...",
    createdAt: "2023-10-05T20:15:00Z",
    senderId: "user-6",
    receiverId: "user-12",
    wishId: "wish-1",
    isRead: true,
  },
  {
    id: "msg-5",
    content:
      "信義區誠品附近的湛盧咖啡如何？環境安靜適合討論。了解了，看來我們需要先建立一些解題的思路和方法，這樣做題目時才不會沒方向。我會準備一些學測常考的機率題型，循序漸進地帶你理解。",
    createdAt: "2023-10-06T08:30:00Z",
    senderId: "user-12",
    receiverId: "user-6",
    wishId: "wish-1",
    isRead: true,
  },
  // 對話二：關於網站開發的訊息
  {
    id: "msg-6",
    content: "張小姐您好，我是陳家豪，關於您的作品集網站需求，我有一些想法想跟您討論。方便的話可以詳談嗎？",
    createdAt: "2023-09-28T15:05:00Z",
    senderId: "user-1",
    receiverId: "user-4",
    wishId: "wish-2",
    isRead: true,
  },
  {
    id: "msg-7",
    content: "陳先生你好，很高興收到你的訊息。我對你之前做的作品很感興趣，尤其是那個攝影師的作品集網站。我的設計稿已經完成了，有空的話可以分享給你看看嗎？",
    createdAt: "2023-09-28T16:20:00Z",
    senderId: "user-4",
    receiverId: "user-1",
    wishId: "wish-2",
    isRead: true,
  },
  {
    id: "msg-8",
    content: "當然可以，很期待看到您的設計。我這邊週一到週五都可以安排視訊會議，您方便哪個時段？在會議中我們可以討論技術實現方案和時程規劃。",
    createdAt: "2023-09-28T17:45:00Z",
    senderId: "user-1",
    receiverId: "user-4",
    wishId: "wish-2",
    isRead: true,
  },
  {
    id: "msg-9",
    content:
      "週二下午3點可以嗎？我已經將設計稿整理好了，這裡是Figma連結：[Figma連結]。裡面包含了首頁、作品集頁面、單一作品頁和關於我頁面的設計。另外，關於網站維護和更新的部分，你有什麼建議嗎？",
    createdAt: "2023-09-29T09:10:00Z",
    senderId: "user-4",
    receiverId: "user-1",
    wishId: "wish-2",
    isRead: true,
  },
  {
    id: "msg-10",
    content:
      "週二下午3點沒問題。謝謝分享設計稿，我會先看過並準備一些技術建議。關於網站維護，我建議使用像Contentful這樣的headless CMS，介面友善又強大，您可以輕鬆管理作品和內容，無需寫程式碼。我們可以在週二會議上詳細討論這部分。",
    createdAt: "2023-09-29T10:35:00Z",
    senderId: "user-1",
    receiverId: "user-4",
    wishId: "wish-2",
    isRead: true,
  },
  // 對話三：關於淨灘活動的訊息
  {
    id: "msg-11",
    content: "黃先生您好，我和朋友對淨灘活動很有興趣，想確認是否還有名額？我們有5人，都是大學生，之前有參加過類似活動。",
    createdAt: "2023-10-14T13:20:00Z",
    senderId: "user-17",
    receiverId: "user-3",
    wishId: "wish-4",
    isRead: true,
  },
  {
    id: "msg-12",
    content: "你好！目前還有名額，5人沒問題。很高興你們有興趣參加！請問可以提供每位參加者的姓名和聯絡電話嗎？到時會建立一個LINE群組方便聯繫。",
    createdAt: "2023-10-14T14:45:00Z",
    senderId: "user-3",
    receiverId: "user-17",
    wishId: "wish-4",
    isRead: true,
  },
  {
    id: "msg-13",
    content: "好的，我整理一下資料發給您。另外，當天我們可以自行開車前往嗎？還是有統一集合地點？",
    createdAt: "2023-10-14T16:10:00Z",
    senderId: "user-17",
    receiverId: "user-3",
    wishId: "wish-4",
    isRead: true,
  },
  {
    id: "msg-14",
    content: "可以自行開車前往，我們當天早上7:30在麗水漁港停車場集合。如果需要共乘，也可以安排，台中市區有幾個定點可以接送。期待見到你們！",
    createdAt: "2023-10-14T17:30:00Z",
    senderId: "user-3",
    receiverId: "user-17",
    wishId: "wish-4",
    isRead: false,
  },
];

// 生成對話列表
export function getMockConversations(): Conversation[] {
  // 整理訊息資料，按照對話分組
  const conversationMap = new Map<string, Message[]>();

  mockMessages.forEach(message => {
    // 為每個用戶建立對話
    const keyForSender = `${message.senderId}-${message.receiverId}`;
    const keyForReceiver = `${message.receiverId}-${message.senderId}`;

    if (conversationMap.has(keyForSender)) {
      conversationMap.get(keyForSender)?.push(message);
    } else if (conversationMap.has(keyForReceiver)) {
      conversationMap.get(keyForReceiver)?.push(message);
    } else {
      conversationMap.set(keyForSender, [message]);
    }
  });

  // 轉換為對話列表
  const conversations: Conversation[] = [];

  conversationMap.forEach((messages, key) => {
    const [user1, user2] = key.split("-");

    // 排序訊息，取最新的一則
    messages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const lastMessage = messages[0];

    // 找出相關許願
    let wishTitle = "";
    if (lastMessage.wishId) {
      const wish = mockWishes.find(w => w.id === lastMessage.wishId);
      if (wish) {
        wishTitle = wish.title;
      }
    }

    // 計算未讀訊息
    const unreadCount = messages.filter(m => m.receiverId === user1 && !m.isRead).length;

    // 找出對話對象的資料
    const otherUser = mockUsers.find(u => u.id === user2);

    if (otherUser) {
      conversations.push({
        userId: user2,
        userName: otherUser.name,
        userAvatar: otherUser.avatarUrl,
        lastMessage: lastMessage.content,
        lastMessageTime: lastMessage.createdAt,
        unreadCount,
        relatedWishId: lastMessage.wishId,
        relatedWishTitle: wishTitle,
      });
    }
  });

  return conversations;
}

// 產生更多隨機許願
export function generateMoreWishes(count: number): Wish[] {
  const wishes: Wish[] = [];

  const wishTitles = [
    "尋找會計師協助報稅事宜",
    "需要搬家工人本週六搬運家具",
    "徵求有經驗的寵物攝影師為毛小孩拍照",
    "找尋共學夥伴一起準備多益考試",
    "徵求烹飪老師教授台式家常菜",
    "需要專業健身教練制定減重計畫",
    "徵求經驗豐富的日語家教",
    "尋找園藝專家協助陽台花園規劃",
    "招募桌遊同好週末一起玩聚會遊戲",
    "尋找兒童繪畫老師教導基礎素描",
    "徵求專業履歷顧問優化求職履歷",
    "需要經驗豐富的月子媽媽",
    "尋找修電腦達人解決軟體問題",
    "徵求兼職司機代駕返鄉過節",
    "尋找居家收納顧問整理小套房",
  ];

  const descriptions = [
    "希望能找到專業人士協助，價格合理即可。",
    "時間有點急，希望能盡快找到幫手。",
    "預算有限，但很重視品質和專業度。",
    "第一次嘗試，需要有耐心的人指導。",
    "長期合作機會，希望能建立穩定的合作關係。",
  ];

  for (let i = 0; i < count; i++) {
    const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
    const randomTitle = wishTitles[Math.floor(Math.random() * wishTitles.length)];
    const randomDesc = descriptions[Math.floor(Math.random() * descriptions.length)];
    const randomCategory = ["technology", "education", "lifestyle", "health", "food", "travel", "entertainment", "sports"][Math.floor(Math.random() * 8)];
    const randomPrice = Math.floor(Math.random() * 10000);
    const randomDate = new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000).toISOString();

    wishes.push({
      id: `wish-extra-${i + 1}`,
      title: randomTitle,
      description: `${randomDesc}\n\n這是一個詳細的說明，包含我的需求和期望。希望能找到合適的人選協助我完成這個願望。`,
      price: randomPrice,
      isPinned: Math.random() > 0.8, // 20%機率為置頂
      category: randomCategory,
      createdAt: randomDate,
      user: {
        id: randomUser.id,
        name: randomUser.name,
      },
    });
  }

  return wishes;
}

// 模擬API函數 - 可用來替換data.ts中的函數

// 獲取熱門許願
export async function getMockFeaturedWishes(): Promise<Wish[]> {
  // 模擬網絡延遲
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockWishes.filter(wish => wish.isPinned).slice(0, 5);
}

// 獲取最新許願
export async function getMockLatestWishes(): Promise<Wish[]> {
  // 模擬網絡延遲
  await new Promise(resolve => setTimeout(resolve, 800));

  // 複製並按創建時間排序
  const sortedWishes = [...mockWishes].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return sortedWishes.slice(0, 6);
}

// 獲取單個許願詳情
export async function getMockWishById(id: string): Promise<Wish | null> {
  // 模擬網絡延遲
  await new Promise(resolve => setTimeout(resolve, 300));

  // 包含額外生成的許願
  const allWishes = [...mockWishes, ...generateMoreWishes(15)];

  // 查找對應 ID 的許願
  const wish = allWishes.find(wish => wish.id === id);

  return wish || null;
}

// 獲取相關許願（基於同一分類）
export async function getMockRelatedWishes(wishId: string, categoryId: string, limit: number = 3): Promise<Wish[]> {
  // 模擬網絡延遲
  await new Promise(resolve => setTimeout(resolve, 400));

  // 包含額外生成的許願
  const allWishes = [...mockWishes, ...generateMoreWishes(15)];

  // 過濾同分類且非當前許願的項目
  const relatedWishes = allWishes.filter(wish => wish.category === categoryId && wish.id !== wishId).slice(0, limit);

  return relatedWishes;
}

// 根據搜尋條件獲取許願
export async function getMockWishesByFilter(
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

  // 包含額外生成的許願
  const allWishes = [...mockWishes, ...generateMoreWishes(20)];

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

// 獲取許願的留言
export async function getMockWishComments(wishId: string, page: number = 1, limit: number = 10): Promise<{ comments: Comment[]; total: number }> {
  // 模擬網絡延遲
  await new Promise(resolve => setTimeout(resolve, 500));

  // 使用真實留言數據
  const wishComments = mockComments.filter((_, index) => index < 5);

  // 按時間排序（最新的在前）
  wishComments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // 分頁
  const total = wishComments.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedComments = wishComments.slice(start, end);

  return {
    comments: paginatedComments,
    total,
  };
}

// 創建新許願
export async function createMockWish(wishData: CreateWishInput): Promise<Wish> {
  // 模擬網絡延遲
  await new Promise(resolve => setTimeout(resolve, 800));

  // 創建新許願
  const newWish: Wish = {
    id: `wish-new-${Date.now()}`,
    title: wishData.title,
    description: wishData.description,
    price: wishData.price,
    isPinned: false,
    category: wishData.category,
    createdAt: new Date().toISOString(),
    user: {
      id: "user-current", // 假設當前用戶ID
      name: "當前用戶",
    },
  };

  // 實際應用中應將新願望添加到數據庫
  return newWish;
}

// 獲取用戶對話
export async function getMockUserConversations(userId: string): Promise<Conversation[]> {
  // 模擬網絡延遲
  await new Promise(resolve => setTimeout(resolve, 400));

  // 獲取所有對話
  const allConversations = getMockConversations();

  // 實際應用中應該按照當前用戶來過濾
  return allConversations;
}

// 獲取與特定用戶的訊息
export async function getMockMessagesWithUser(userId: string, otherUserId: string): Promise<Message[]> {
  // 模擬網絡延遲
  await new Promise(resolve => setTimeout(resolve, 500));

  // 篩選出當前用戶與指定用戶間的消息
  const relevantMessages = mockMessages.filter(msg => (msg.senderId === userId && msg.receiverId === otherUserId) || (msg.senderId === otherUserId && msg.receiverId === userId));

  // 按時間排序（舊的在前）
  relevantMessages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  return relevantMessages;
}

// 發送訊息
export async function sendMockMessage(receiverId: string, content: string, wishId?: string): Promise<Message> {
  // 模擬網絡延遲
  await new Promise(resolve => setTimeout(resolve, 300));

  // 創建新訊息
  const newMessage: Message = {
    id: `msg-new-${Date.now()}`,
    content,
    createdAt: new Date().toISOString(),
    senderId: "user-current", // 假設當前用戶ID
    receiverId,
    wishId,
    isRead: false,
  };

  // 實際應用中應將消息添加到數據庫
  return newMessage;
}

// 取得分類
export async function getMockCategories() {
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
