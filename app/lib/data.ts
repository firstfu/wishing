// data.ts - 資料相關函式與常數
//
// 本檔案負責模擬許願池平台的資料存取邏輯，包含：
// 1. 許願（Wish）與留言（Comment）等資料結構定義
// 2. 取得熱門、最新、篩選、單一許願、相關許願、分類、留言等模擬 API 函式
// 3. 提供前端頁面開發時的台灣本土化的真實內容資料與資料操作介面
//
// 實際專案中應由後端 API 或資料庫取代本檔案邏輯
import { Wish } from "../components/wishes/WishCard";

// 台灣常見姓氏
const lastNames = ["陳", "林", "黃", "張", "李", "王", "吳", "劉", "蔡", "楊", "許", "鄭", "謝", "郭", "洪", "曾", "邱", "廖", "賴", "徐"];

// 台灣常見名字組合
const firstNamePatterns = ["家豪", "志明", "俊傑", "建宏", "志豪", "文彬", "冠宇", "怡婷", "佳穎", "欣怡", "雅婷", "佳蓉", "怡君", "詩涵", "馨儀"];

// 隨機生成台灣風格人名
function generateTaiwanName() {
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const firstName = firstNamePatterns[Math.floor(Math.random() * firstNamePatterns.length)];
  return `${lastName}${firstName}`;
}

// 真實的用戶資料
export const users = [
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
];

// 真實的許願資料
export const wishes: Wish[] = [
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
    title: "徵求台北市搬家服務，單身小套房",
    description: `因工作調動需要在下個月底前搬家，從台北市大安區搬到信義區，距離大約5公里。是個單身小套房，家具不多：

搬運物品清單：
• 單人床墊和床架（可拆卸）
• 小型衣櫃一個（約120公分寬）
• 書桌、椅子各一
• 電視和電視櫃
• 約10個紙箱的生活用品和書籍
• 小型電器（電鍋、烤箱、吹風機等）

希望能找專業的搬家服務，最好能提供基本打包服務，因為我工作很忙沒太多時間整理。搬家時間預計在週末，確切日期可以再協調。

期望價格在2000-3000元之間，歡迎提供估價，謝謝！`,
    price: 2500,
    isPinned: true,
    category: "lifestyle",
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
];

// 更多許願資料
export const additionalWishes: Wish[] = [
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
    title: "尋找陪伴年長父母看診的照顧者",
    description: `我父母年紀都已經70多歲，每週都需要去醫院做復健和定期檢查，但我因工作無法每次都陪同前往。希望能找到有愛心、有耐心的人協助陪伴。

需求說明：
• 每週一、四早上9點至12點，台北榮總復健科看診
• 需要協助掛號、陪同看診、紀錄醫囑
• 協助搭乘計程車往返醫院與家中（松山區）
• 父母行動較緩慢但可自行走動，主要需要精神上的陪伴
• 希望固定由同一位照顧者協助，以建立信任關係

提供每次服務1,000元，包含車資。希望能找到醫護相關背景或有照顧經驗的人，最好能說台語。期待能長期合作，謝謝！`,
    price: 1000,
    isPinned: false,
    category: "health",
    createdAt: "2023-10-22T20:15:00Z",
    user: {
      id: "user-9",
      name: "楊志豪",
    },
  },
  {
    id: "wish-9",
    title: "徵求親子共讀繪本老師，啟發孩子閱讀興趣",
    description: `我有一個4歲的女兒，希望能培養她的閱讀習慣和語言表達能力。尋找有經驗的繪本老師，可以透過說故事、角色扮演和互動遊戲等方式，引導孩子愛上閱讀。

課程需求：
• 適合4歲幼兒的繪本閱讀和延伸活動
• 每週六上午10-11點，每次1小時
• 地點在家中（新北市新店區）
• 希望能結合一些基礎英文學習
• 需要老師自備教材和繪本

期待老師能夠活潑有趣，懂得引導孩子發問和思考，而不只是單純讀故事。希望老師有幼教背景或相關證照更佳。每堂課預算800元，如果效果好願意長期合作。請附上您的經驗和教學理念，謝謝！`,
    price: 800,
    isPinned: false,
    category: "education",
    createdAt: "2023-10-25T10:30:00Z",
    user: {
      id: "user-2",
      name: "林怡婷",
    },
  },
  {
    id: "wish-10",
    title: "尋找居家水電維修師傅，檢修老舊公寓水電",
    description: `我最近搬進一間20年以上的老公寓，發現有幾處水電問題需要處理，希望能找專業水電師傅一次性檢修。

問題包括：
• 浴室洗手台下方漏水
• 廚房水龍頭出水量小且不穩定
• 客廳和臥室的部分插座無法使用
• 廁所排水孔時常發出異味
• 電燈開關有時會卡住

公寓位於台北市萬華區，約35坪大小。希望能找有經驗的師傅，先來勘查並提供報價，之後再約時間進行維修。預算視檢修項目而定，但希望能一次解決所有問題。感謝！`,
    price: 3000,
    isPinned: true,
    category: "lifestyle",
    createdAt: "2023-10-26T15:50:00Z",
    user: {
      id: "user-10",
      name: "許佳穎",
    },
  },
];

// 真實的留言資料
export const comments: Comment[] = [
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
      "張小姐您好，我是專業搬家公司的負責人，看到您的需求，這類單身小套房的搬遷是我們的專長。以您描述的物品數量，我們建議使用3.5噸小貨車加上2位搬運人員，大約2小時可以完成整個搬遷過程。我們提供免費紙箱和基本打包服務，費用為2,800元（含稅、油資和搬運保險）。如果您有興趣，可以私訊我討論細節和確認日期。",
    createdAt: "2023-09-29T11:05:00Z",
    user: {
      id: "user-11",
      name: "王威廷",
    },
  },
  {
    id: "comment-4",
    content:
      "您好，請問這個共乘的路線大約幾點會到內湖科學園區？我在瑞光路附近上班，早上大約8:15需要到公司，不知道時間上是否能配合？另外，如果偶爾需要加班，回程時間會比較晚，這種情況是否方便？謝謝！",
    createdAt: "2023-10-10T12:40:00Z",
    user: {
      id: "user-13",
      name: "吳曉芬",
    },
  },
  {
    id: "comment-5",
    content:
      "黃先生您好，我對這次的淨灘活動很有興趣！請問目前已經有多少人報名了？另外，當天會如何分配工作？我之前參加過類似活動，可以協助帶領小組或是進行垃圾分類的工作。",
    createdAt: "2023-10-13T18:10:00Z",
    user: {
      id: "user-14",
      name: "陳雅文",
    },
  },
];

// 真實的訊息對話資料
export const messages: Message[] = [
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
  // 對話二：搬家服務相關
  {
    id: "msg-3",
    content: "張小姐您好，我是王威廷，看到您需要搬家服務。想請問您確切的搬家日期和時間，以及新住處是否有電梯？這會影響我們的搬運人力安排。",
    createdAt: "2023-09-29T14:30:00Z",
    senderId: "user-11",
    receiverId: "user-4",
    wishId: "wish-2",
    isRead: true,
  },
  {
    id: "msg-4",
    content:
      "王先生您好，謝謝回覆。我預計在10月15日(週六)上午搬家。新住處是有電梯的大樓，在6樓。原本的住處是2樓公寓，沒有電梯。請問這樣的話需要多少人力和時間？",
    createdAt: "2023-09-29T15:45:00Z",
    senderId: "user-4",
    receiverId: "user-11",
    wishId: "wish-2",
    isRead: true,
  },
  // 對話三：淨灘活動相關
  {
    id: "msg-5",
    content: "黃先生您好，我和朋友對淨灘活動很有興趣，想確認是否還有名額？我們有5人，都是大學生，之前有參加過類似活動。",
    createdAt: "2023-10-14T13:20:00Z",
    senderId: "user-17",
    receiverId: "user-3",
    wishId: "wish-4",
    isRead: true,
  },
  {
    id: "msg-6",
    content: "你好！目前還有名額，5人沒問題。很高興你們有興趣參加！請問可以提供每位參加者的姓名和聯絡電話嗎？到時會建立一個LINE群組方便聯繫。",
    createdAt: "2023-10-14T14:45:00Z",
    senderId: "user-3",
    receiverId: "user-17",
    wishId: "wish-4",
    isRead: true,
  },
];

// 模擬留言介面
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

// 訊息相關介面與功能
export interface Message {
  id: string;
  content: string;
  createdAt: string;
  senderId: string;
  receiverId: string;
  wishId?: string;
  isRead: boolean;
}

export interface Conversation {
  userId: string;
  userName: string;
  userAvatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  relatedWishId?: string;
  relatedWishTitle?: string;
}

// 創建新許願
export interface CreateWishInput {
  title: string;
  description: string;
  price: number;
  category: string;
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
    const randomUser = users[Math.floor(Math.random() * users.length)];
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

// 模擬 API 函數

// 獲取熱門許願
export async function getFeaturedWishes(): Promise<Wish[]> {
  // 模擬網絡延遲
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...wishes, ...additionalWishes].filter(wish => wish.isPinned).slice(0, 5);
}

// 獲取最新許願
export async function getLatestWishes(): Promise<Wish[]> {
  // 模擬網絡延遲
  await new Promise(resolve => setTimeout(resolve, 800));

  // 複製並按創建時間排序
  const sortedWishes = [...wishes, ...additionalWishes].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return sortedWishes.slice(0, 6);
}

// 獲取單個許願詳情
export async function getWishById(id: string): Promise<Wish | null> {
  // 模擬網絡延遲
  await new Promise(resolve => setTimeout(resolve, 300));

  // 包含額外生成的許願
  const allWishes = [...wishes, ...additionalWishes, ...generateMoreWishes(15)];

  // 查找對應 ID 的許願
  const wish = allWishes.find(wish => wish.id === id);

  return wish || null;
}

// 獲取相關許願（基於同一分類）
export async function getRelatedWishes(wishId: string, categoryId: string, limit: number = 3): Promise<Wish[]> {
  // 模擬網絡延遲
  await new Promise(resolve => setTimeout(resolve, 400));

  // 包含額外生成的許願
  const allWishes = [...wishes, ...additionalWishes, ...generateMoreWishes(15)];

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

  // 包含額外生成的許願
  const allWishes = [...wishes, ...additionalWishes, ...generateMoreWishes(20)];

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
export async function getWishComments(wishId: string, page: number = 1, limit: number = 10): Promise<{ comments: Comment[]; total: number }> {
  // 模擬網絡延遲
  await new Promise(resolve => setTimeout(resolve, 500));

  // 按時間排序（最新的在前）
  const sortedComments = [...comments].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // 分頁
  const total = comments.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedComments = sortedComments.slice(start, end);

  return {
    comments: paginatedComments,
    total,
  };
}

// 獲取熱門許願
export async function getTrendingWishes() {
  // 模擬網絡延遲
  await new Promise(resolve => setTimeout(resolve, 700));

  // 從現有許願中選出一些作為熱門許願
  return [
    {
      id: wishes[3].id,
      title: wishes[3].title,
      description: wishes[3].description,
      price: wishes[3].price,
      category: "環保",
      status: "open",
      createdAt: wishes[3].createdAt,
      updatedAt: new Date().toISOString(),
      user: wishes[3].user,
      viewCount: 358,
      commentCount: 24,
    },
    {
      id: additionalWishes[2].id,
      title: additionalWishes[2].title,
      description: additionalWishes[2].description,
      price: additionalWishes[2].price,
      category: "社會服務",
      status: "open",
      createdAt: additionalWishes[2].createdAt,
      updatedAt: new Date().toISOString(),
      user: additionalWishes[2].user,
      viewCount: 246,
      commentCount: 18,
    },
    {
      id: additionalWishes[4].id,
      title: additionalWishes[4].title,
      description: additionalWishes[4].description,
      price: additionalWishes[4].price,
      category: "居家",
      status: "open",
      createdAt: additionalWishes[4].createdAt,
      updatedAt: new Date().toISOString(),
      user: additionalWishes[4].user,
      viewCount: 302,
      commentCount: 29,
    },
  ];
}

// 創建新許願
export async function createWish(wishData: CreateWishInput): Promise<Wish> {
  // 模擬網絡延遲
  await new Promise(resolve => setTimeout(resolve, 1200));

  // 生成唯一ID (實際專案中應由後端生成)
  const id = `wish-${Date.now()}`;

  // 創建新許願
  const newWish: Wish = {
    id,
    title: wishData.title,
    description: wishData.description,
    price: wishData.price,
    category: wishData.category,
    isPinned: false,
    createdAt: new Date().toISOString(),
    user: {
      id: "user-self", // 在實際專案中，這裡會是實際的用戶ID
      name: "當前用戶", // 在實際專案中，這裡會是實際的用戶名稱
    },
  };

  // 返回創建的許願
  return newWish;
}

// 獲取對話列表
export async function getConversations(): Promise<Conversation[]> {
  // 模擬網絡延遲
  await new Promise(resolve => setTimeout(resolve, 800));

  // 整理訊息資料，按照對話分組
  const conversationMap = new Map<string, Message[]>();

  messages.forEach(message => {
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
      const wish = [...wishes, ...additionalWishes].find(w => w.id === lastMessage.wishId);
      if (wish) {
        wishTitle = wish.title;
      }
    }

    // 計算未讀訊息
    const unreadCount = messages.filter(m => m.receiverId === "current-user" && !m.isRead).length;

    // 找出對話對象的名稱
    const otherUserName = user2 === "current-user" ? "當前用戶" : users.find(u => u.id === user2)?.name || "未知用戶";

    conversations.push({
      userId: user2,
      userName: otherUserName,
      lastMessage: lastMessage.content,
      lastMessageTime: lastMessage.createdAt,
      unreadCount,
      relatedWishId: lastMessage.wishId,
      relatedWishTitle: wishTitle,
    });
  });

  // 按最後訊息時間排序（最新的在前）
  return conversations.sort((a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime());
}

// 獲取與特定用戶的訊息歷史
export async function getMessages(userId: string, wishId?: string): Promise<Message[]> {
  // 模擬網絡延遲
  await new Promise(resolve => setTimeout(resolve, 600));

  // 篩選訊息
  const filteredMessages = messages.filter(
    message => (message.senderId === "current-user" && message.receiverId === userId) || (message.senderId === userId && message.receiverId === "current-user")
  );

  // 如果有指定wishId，進一步過濾
  const resultMessages = wishId ? filteredMessages.filter(message => message.wishId === wishId) : filteredMessages;

  // 按時間排序（舊的在前）
  return resultMessages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
}

// 發送新訊息
export async function sendMessage(receiverId: string, content: string, wishId?: string): Promise<Message> {
  // 模擬網絡延遲
  await new Promise(resolve => setTimeout(resolve, 500));

  // 創建新訊息
  const newMessage: Message = {
    id: `msg-${Date.now()}`,
    content,
    createdAt: new Date().toISOString(),
    senderId: "current-user", // 模擬當前用戶ID
    receiverId,
    wishId,
    isRead: false,
  };

  return newMessage;
}

// 標記訊息為已讀
export async function markMessagesAsRead(senderId: string): Promise<boolean> {
  // 模擬網絡延遲
  await new Promise(resolve => setTimeout(resolve, 300));

  // 模擬標記已讀操作
  return true;
}

// 更新許願狀態
export async function updateWishStatus(
  wishId: string,
  status: "open" | "in_progress" | "completed",
  completionMessage?: string
): Promise<{ success: boolean; wish?: Wish }> {
  // 模擬網絡延遲
  await new Promise(resolve => setTimeout(resolve, 800));

  try {
    // 獲取願望
    const wish = await getWishById(wishId);

    if (!wish) {
      return { success: false };
    }

    // 更新願望狀態（使用類型斷言）
    (wish as any).status = status;

    // 如果有完成訊息且狀態為已完成，可以儲存這個訊息
    // 實際專案中，這裡應該將訊息保存到資料庫
    if (status === "completed" && completionMessage) {
      // 這裡可以將完成訊息存儲起來，例如添加到願望的屬性中
      // 本模擬中僅返回更新後的願望
    }

    return {
      success: true,
      wish: wish,
    };
  } catch (error) {
    console.error("更新願望狀態失敗:", error);
    return { success: false };
  }
}
