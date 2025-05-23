// data.ts - 許願池模擬資料與 API 模擬函數
//
// 本檔案負責模擬許願池平台的資料存取邏輯，包含：
// 1. 資料結構定義 - 提供 Wish、Comment、Message 等介面定義
// 2. 模擬資料集 - 包含台灣風格的使用者資料、許願內容、留言與訊息
// 3. API 模擬函數 - 模擬後端 API 行為，如獲取熱門/最新許願、篩選許願、留言等
// 4. 互動功能 - 模擬留言、私訊、許願狀態更新等功能
//
// 所有資料內容均採用台灣本土化的人名、地點和情境，增加開發過程的真實感
// 資料包含延遲模擬，以便測試載入狀態和效能優化
// 在實際應用部署前，這些模擬函式應替換為真實的 API 呼叫
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
  // 許願1：尋找數學家教
  {
    id: "comment-1",
    content:
      "您好，我是台大數學系大四學生，暑假期間有教過幾個高中生準備學測，成效不錯。我數學成績一直都很穩定，對高中數學教學方法也有研究。請問您方便哪幾天上課？我可以配合您的時間。",
    createdAt: "2023-10-05T15:40:00Z",
    wishId: "wish-1",
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
    wishId: "wish-1",
    user: {
      id: "user-15",
      name: "張明德",
    },
  },
  {
    id: "comment-3",
    content:
      "我是今年考上台大的學長，高中時數學也是弱項，後來找到好方法才進步的。我可以分享我的讀書方法和解題技巧，收費比一般家教便宜，一小時只要450元。我住在台北，可以配合你的時間。",
    createdAt: "2023-10-07T11:35:00Z",
    wishId: "wish-1",
    user: {
      id: "user-21",
      name: "林政宏",
    },
  },

  // 許願2：搬家服務
  {
    id: "comment-4",
    content:
      "張小姐您好，我是專業搬家公司的負責人，看到您的需求，這類單身小套房的搬遷是我們的專長。以您描述的物品數量，我們建議使用3.5噸小貨車加上2位搬運人員，大約2小時可以完成整個搬遷過程。我們提供免費紙箱和基本打包服務，費用為2,800元（含稅、油資和搬運保險）。如果您有興趣，可以私訊我討論細節和確認日期。",
    createdAt: "2023-09-29T11:05:00Z",
    wishId: "wish-2",
    user: {
      id: "user-11",
      name: "王威廷",
    },
  },
  {
    id: "comment-5",
    content:
      "您好，我們是小型搬家團隊，專門處理單身套房搬遷，價格實惠。我們的收費是2,500元，包含紙箱、打包服務和搬運。我們有豐富經驗，保證小心處理您的所有物品。如果您願意在平日搬家，我們還可以提供額外200元折扣。",
    createdAt: "2023-09-30T14:20:00Z",
    wishId: "wish-2",
    user: {
      id: "user-22",
      name: "陳志明",
    },
  },

  // 許願3：共乘夥伴
  {
    id: "comment-6",
    content:
      "您好，請問這個共乘的路線大約幾點會到內湖科學園區？我在瑞光路附近上班，早上大約8:15需要到公司，不知道時間上是否能配合？另外，如果偶爾需要加班，回程時間會比較晚，這種情況是否方便？謝謝！",
    createdAt: "2023-10-10T12:40:00Z",
    wishId: "wish-3",
    user: {
      id: "user-13",
      name: "吳曉芬",
    },
  },
  {
    id: "comment-7",
    content:
      "陳先生您好，我也是住松山區，在內湖科技園區的仁寶電腦上班。您的時間剛好適合我，我的上下班時間也很固定。如果可以的話，希望能先了解您的確切路線，評估一下共乘的可行性。我也很希望能分攤油錢和停車費，對我們都是雙贏。",
    createdAt: "2023-10-11T08:30:00Z",
    wishId: "wish-3",
    user: {
      id: "user-23",
      name: "林建志",
    },
  },

  // 許願4：淨灘志工
  {
    id: "comment-8",
    content:
      "黃先生您好，我對這次的淨灘活動很有興趣！請問目前已經有多少人報名了？另外，當天會如何分配工作？我之前參加過類似活動，可以協助帶領小組或是進行垃圾分類的工作。",
    createdAt: "2023-10-13T18:10:00Z",
    wishId: "wish-4",
    user: {
      id: "user-14",
      name: "陳雅文",
    },
  },
  {
    id: "comment-9",
    content:
      "您好，我是台中海洋生態保育協會的成員，很高興看到這個活動。我們協會有5位成員想參加，也可以提供專業的海洋廢棄物分類指導，以及海洋生態簡介，讓參與者了解淨灘的重要性。請問還有名額嗎？",
    createdAt: "2023-10-15T10:25:00Z",
    wishId: "wish-4",
    user: {
      id: "user-24",
      name: "楊海寧",
    },
  },
  {
    id: "comment-10",
    content: "我和朋友對這個活動很有興趣，總共3人想報名。不過我們住在台中市北屯區，想請問有共乘計劃或是附近有什麼交通方式可以抵達活動地點？謝謝！",
    createdAt: "2023-10-17T14:40:00Z",
    wishId: "wish-4",
    user: {
      id: "user-25",
      name: "王俊傑",
    },
  },

  // 許願5：烘焙老師
  {
    id: "comment-11",
    content:
      "吳先生您好，我是專業蛋糕烘焙師，在台北市中山區有一家小型工作室。看到您想為女友準備的驚喜非常感動！草莓慕斯蛋糕是我的拿手項目之一，很適合新手學習。我可以在您家或我的工作室進行一對一教學，包含材料準備、製作過程到最後的裝飾。費用3,500元，包含所有材料。如果您有興趣，可以私訊我討論詳情！",
    createdAt: "2023-10-16T13:20:00Z",
    wishId: "wish-5",
    user: {
      id: "user-26",
      name: "林佳蓉",
    },
  },
  {
    id: "comment-12",
    content:
      "你好，我是甜點教室的老師，專門教導零基礎學員製作精美甜點。草莓慕斯確實是很棒的選擇，視覺效果佳又美味。我可以提供教學，費用4,000元，包含材料和工具租借，可以在您家進行。另外也可以教您一些裝飾小技巧，讓蛋糕更有驚喜感！",
    createdAt: "2023-10-17T19:50:00Z",
    wishId: "wish-5",
    user: {
      id: "user-27",
      name: "蔡美玲",
    },
  },

  // 許願6：遛狗服務
  {
    id: "comment-13",
    content:
      "蔡小姐您好，我是大安區的大學生，課餘時間很喜歡與狗狗互動。我有養黃金獵犬的經驗，也常幫朋友照顧他們的寵物。我住在和平東路，離您家應該不遠，時間也很彈性，週一到週五下午都可以配合您的需求。希望有機會能照顧您的毛孩！",
    createdAt: "2023-10-19T10:15:00Z",
    wishId: "wish-6",
    user: {
      id: "user-28",
      name: "周文傑",
    },
  },
  {
    id: "comment-14",
    content:
      "您好，我是專業的寵物照護人員，有寵物照護證照，也曾在動物醫院工作過。我可以在遛狗的同時觀察狗狗的健康狀況，並提供基礎護理。報價為每次350元，若長期合作可談優惠方案。我機動性高，可以配合您的時間。",
    createdAt: "2023-10-20T15:40:00Z",
    wishId: "wish-6",
    user: {
      id: "user-29",
      name: "許雅婷",
    },
  },

  // 許願7：咖啡店攝影
  {
    id: "comment-15",
    content:
      "李老闆您好，我是專業的美食攝影師，有多年為餐廳和咖啡店拍攝的經驗。我的攝影風格自然明亮，特別擅長捕捉咖啡飲品的質感和空間的溫馨氛圍。這幾天我剛完成一個咖啡廳的拍攝案子，可以把作品集傳給您參考。費用方面，整套服務含後製9,500元，如果長期合作可以談優惠方案。",
    createdAt: "2023-10-21T11:25:00Z",
    wishId: "wish-7",
    user: {
      id: "user-30",
      name: "王勝傑",
    },
  },
  {
    id: "comment-16",
    content:
      "您好，我是攝影工作室負責人，專門為中小型企業提供形象攝影服務。我們可以依您的需求提供不同風格的照片，並確保在一週內交付修圖完成的成品。基本方案收費12,000元，包含所有您列出的需求項目，且不限時間拍到滿意為止。若有興趣可以先看看我們的作品集。",
    createdAt: "2023-10-22T09:30:00Z",
    wishId: "wish-7",
    user: {
      id: "user-31",
      name: "林思妤",
    },
  },

  // 許願8：陪伴年長父母看診
  {
    id: "comment-17",
    content:
      "楊先生您好，我是有照顧服務員證照的陳小姐，專門陪伴長者就醫和生活照顧。我有豐富陪診經驗，包括在台北榮總，熟悉掛號和各科室流程。我能說流利台語，對長輩很有耐心。您提出的時間我都能配合，費用也合理。如果方便，希望能先了解長輩的身體狀況，以便提供更適切的協助。",
    createdAt: "2023-10-23T14:50:00Z",
    wishId: "wish-8",
    user: {
      id: "user-32",
      name: "陳美玲",
    },
  },
  {
    id: "comment-18",
    content:
      "您好，我曾在醫院擔任志工，現在退休有較多時間可以幫忙。我很理解子女忙碌無法陪伴父母看診的心情。我熟悉榮總的環境，也能說台語，可以記錄醫囑並轉達給您。收費950元一次，主要是希望能幫上忙，若覺得服務好也歡迎給小費。",
    createdAt: "2023-10-24T10:15:00Z",
    wishId: "wish-8",
    user: {
      id: "user-33",
      name: "王大明",
    },
  },

  // 許願9：親子共讀老師
  {
    id: "comment-19",
    content:
      "林媽媽您好，我是幼教老師，專長是幼兒閱讀啟發與語言發展。看到您希望為4歲的孩子培養閱讀興趣，這是很棒的想法！我的教學方式是結合故事、手偶和肢體活動，讓孩子在遊戲中愛上閱讀。課程中也會融入基礎英文單字和句型，讓孩子自然接觸雙語。我可以提供試教一次，看看孩子的反應如何。",
    createdAt: "2023-10-26T16:40:00Z",
    wishId: "wish-9",
    user: {
      id: "user-34",
      name: "陳怡君",
    },
  },
  {
    id: "comment-20",
    content:
      "您好，我是兒童英語繪本老師，有美國幼教學位及多年教學經驗。我的課程特色是透過互動遊戲和角色扮演，激發孩子的想像力和表達能力。每堂課都有主題，並結合歌曲和簡單手作，讓孩子全方位學習。收費每堂850元，包含教材和學習單。歡迎先安排一次免費體驗課。",
    createdAt: "2023-10-27T11:30:00Z",
    wishId: "wish-9",
    user: {
      id: "user-35",
      name: "蘇瑜婷",
    },
  },
  {
    id: "comment-21",
    content:
      "林小姐您好，我在兒童圖書館工作多年，專門設計幼兒閱讀活動。我的教學理念是讓孩子主導閱讀過程，通過提問和討論培養思考能力。每堂課會帶3-4本不同主題的繪本，並有延伸活動如畫畫或簡單遊戲。收費每次750元，可以到府授課。",
    createdAt: "2023-10-28T14:25:00Z",
    wishId: "wish-9",
    user: {
      id: "user-36",
      name: "黃詩涵",
    },
  },

  // 許願10：水電維修
  {
    id: "comment-22",
    content:
      "許小姐您好，我是專業水電師傅，有20年經驗，專長處理老舊公寓的水電問題。從您描述的狀況來看，可能是舊管線老化和水垢堆積導致。我可以先到府勘查，了解實際情況後提供報價，基本檢查不收費。通常類似的檢修在2,500-4,000元之間，取決於需要更換的零件。我這週末有空，方便的話可以約時間。",
    createdAt: "2023-10-27T09:10:00Z",
    wishId: "wish-10",
    user: {
      id: "user-37",
      name: "張志華",
    },
  },
  {
    id: "comment-23",
    content:
      "您好，我是水電行老闆，專門處理老屋翻修和維修。舊公寓常見的問題包括管線腐蝕、電路老化等，我們有完整的檢修設備可以診斷問題所在。維修費用依工程複雜度而定，一般檢修約3,000-5,000元。我們提供保固服務，如有問題可免費回修。歡迎來電或私訊預約勘查時間。",
    createdAt: "2023-10-28T15:45:00Z",
    wishId: "wish-10",
    user: {
      id: "user-38",
      name: "李正偉",
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
  wishId: string;
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

  // 按類別定義願望模板
  const wishTemplates = {
    technology: [
      {
        title: "尋找經驗豐富的網站開發工程師",
        description:
          "我有一個電商網站創業想法，需要專業的前後端工程師協助開發。希望能找到熟悉React、Node.js和資料庫的開發者，能夠從需求分析、網站架構到最終實現全程參與。預計開發時間約3個月，願意提供合理報酬。希望應徵者能提供過往作品集和開發經驗說明。",
      },
      {
        title: "徵求App測試人員",
        description:
          "我們正在開發一款生活服務類App，在正式上線前需要招募測試人員進行功能測試和用戶體驗反饋。測試期約為2週，每天需測試3-5個功能點並填寫詳細反饋表。有測試經驗者佳，但認真負責的新手也歡迎。測試結束後提供測試費用和App使用優惠券。",
      },
    ],
    education: [
      {
        title: "尋找大學學測英文家教",
        description:
          "高二學生，英文程度中等，希望能在學測前強化英文閱讀和寫作能力。尤其需要加強文法和長文閱讀理解。希望家教有耐心，能針對學測命題方向給予適當指導。每週兩次課程，每次2小時，地點可在台北市文山區或線上進行。",
      },
      {
        title: "徵求研究所考試指導老師",
        description:
          "計劃明年報考政治大學企管所，需要在統計學和經濟學方面尋找專業指導老師。我已經自學了基礎內容，但需要有經驗的老師針對考試重點和解題技巧進行指導。希望老師有相關科系背景，最好本身有考取研究所的經驗。",
      },
    ],
    lifestyle: [
      {
        title: "尋找台中市搬家服務",
        description:
          "計劃下個月從台中市西區搬到北區，是一間兩房一廳的住家，主要家具包括雙人床、衣櫃、書桌、餐桌椅、沙發和電視櫃等。希望搬家公司能提供打包服務，並小心處理貴重物品如電視和電腦設備。預計搬家日期為5/25週六，希望能提供合理估價。",
      },
      {
        title: "徵求居家收納整理專家",
        description:
          "家中雜物太多且擺放凌亂，需要專業收納師協助規劃空間利用並建立合理的收納系統。特別是廚房和衣物收納需要改善。希望收納師能提供實用的建議並協助執行，最好能一起採購必要的收納用品。居住在新北市三重區，房子約25坪。",
      },
    ],
    health: [
      {
        title: "尋找專業瑜伽老師一對一指導",
        description:
          "因為長期久坐辦公導致肩頸僵硬和輕微駝背，希望通過瑜伽改善身體狀況。我是瑜伽初學者，需要老師從基礎動作教起，特別注重正確姿勢和呼吸法。希望每週安排1-2次課程，每次60分鐘，可以在我家或瑜伽教室進行。",
      },
      {
        title: "徵求體重管理營養師",
        description:
          "近一年因工作壓力大導致體重增加15公斤，希望在專業營養師指導下健康減重。需要個人化的飲食計劃，考慮我的生活習慣和食物偏好。希望能學習健康烹飪和飲食搭配知識，建立長期可持續的飲食習慣。願意配合定期體重和身體數據監測。",
      },
    ],
    food: [
      {
        title: "尋找私人烘焙老師教製作生日蛋糕",
        description:
          "想為女友親手製作生日蛋糕，但烘焙經驗為零，需要老師從基本教起。希望學習製作巧克力慕斯蛋糕，包括麵糊調製、烘烤技巧和裝飾藝術。最好能在5月中前完成學習，上課地點希望在台北市松山區或老師工作室。願意支付材料費和合理的教學費用。",
      },
      {
        title: "徵求家常菜教學",
        description:
          "剛搬出來獨立生活，想學習10-15道簡單實用的家常菜。希望老師能教導基本烹飪技巧、食材選購和保存方法。菜色偏好台式和簡易中式料理，如三杯雞、炒青菜、滷肉飯等。希望老師有耐心且能用簡單易懂的方式教學。上課地點在我家（新北市新莊區）。",
      },
    ],
    travel: [
      {
        title: "尋找花蓮三天兩夜私人導遊",
        description:
          "計畫6月初與家人（4大2小）前往花蓮旅遊，希望找當地熟悉的導遊安排行程。希望能體驗在地文化和自然景點，不要過於商業化的路線。特別想去太魯閣和海洋公園，也希望品嚐道地美食。需要導遊協助安排住宿、交通和餐飲，全程陪同並提供解說服務。",
      },
      {
        title: "徵求登山嚮導帶隊玉山主峰",
        description:
          "三位登山初學者計畫8月攀登玉山主峰，需要經驗豐富的嚮導帶隊。我們有基本健行經驗但未挑戰過高山，希望嚮導能協助行前準備、裝備建議、體能訓練計畫和路線安排。重視安全第一，希望嚮導有豐富帶隊經驗和急救知識。需要協助申請入山證和安排食宿。",
      },
    ],
    entertainment: [
      {
        title: "尋找婚禮攝影師",
        description:
          "將於9月在台北市內舉辦婚禮，需要專業攝影師紀錄這重要時刻。希望風格自然真實，捕捉真情流露的瞬間而非過多擺拍。需求包括訂婚儀式、婚禮當天全程拍攝和精修照片製作。希望攝影師有豐富婚禮攝影經驗，能提供作品集參考。",
      },
      {
        title: "徵求吉他教學老師",
        description:
          "30歲上班族想學習木吉他，完全零基礎。希望從基本指法開始學起，目標是能彈唱簡單民謠歌曲。因工作繁忙，希望每週能有一次固定課程，時間約90分鐘，最好能在平日晚上或週末。教學地點希望在台北市信義區。希望老師有耐心，教學方式生動有趣。",
      },
    ],
    sports: [
      {
        title: "尋找羽球教練提升技術",
        description:
          "打羽球約兩年，已有基本技術但希望能更進步。特別想改善殺球技巧和步法移動，提高比賽中的應變能力。希望每週安排1-2次專業指導，地點在台北市內的羽球場。希望教練有比賽經驗，能針對我的弱點給予針對性訓練。",
      },
      {
        title: "徵求游泳教練一對一指導",
        description:
          "成人學游泳，目前只會簡單的自由式，希望能學習蛙式和仰式並改善自由式姿勢。有輕微怕水心理，需要有耐心的教練循序漸進指導。希望每週固定2次課程，每次1小時，地點希望在新北市板橋區的公立游泳池。期望3個月內能熟練掌握三種泳姿。",
      },
    ],
  };

  for (let i = 0; i < count; i++) {
    // 隨機選擇類別
    const categories = Object.keys(wishTemplates);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];

    // 從該類別中隨機選擇一個願望模板
    const categoryTemplates = wishTemplates[randomCategory as keyof typeof wishTemplates];
    const randomTemplate = categoryTemplates[Math.floor(Math.random() * categoryTemplates.length)];

    // 隨機選擇用戶
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomPrice = Math.floor(Math.random() * 10000);
    const randomDate = new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000).toISOString();

    wishes.push({
      id: `wish-extra-${i + 1}`,
      title: randomTemplate.title,
      description: randomTemplate.description,
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

  // 篩選特定許願的留言
  const wishComments = comments.filter(comment => comment.wishId === wishId);

  // 按時間排序（最新的在前）
  const sortedComments = [...wishComments].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // 分頁
  const total = sortedComments.length;
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
