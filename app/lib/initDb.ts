import prisma from "./prisma";

/**
 * 初始化資料庫
 * 創建必要的初始數據，如默認分類等
 */
export async function initializeDatabase() {
  try {
    // 檢查分類表是否為空
    const categoriesCount = await prisma.category.count();

    // 如果沒有分類，則創建默認分類
    if (categoriesCount === 0) {
      console.log("創建默認分類...");

      const defaultCategories = [
        { name: "日用品", description: "日常生活用品相關需求" },
        { name: "食品", description: "食品飲料相關需求" },
        { name: "服飾", description: "服裝、鞋帽、配飾相關需求" },
        { name: "電子產品", description: "電腦、手機、家電等電子產品相關需求" },
        { name: "其他", description: "其他類型的需求" },
      ];

      // 批量創建分類
      await prisma.category.createMany({
        data: defaultCategories,
      });

      console.log(`已創建 ${defaultCategories.length} 個默認分類`);
    }

    console.log("資料庫初始化完成");
    return true;
  } catch (error) {
    console.error("資料庫初始化失敗:", error);
    return false;
  }
}

/**
 * 驗證資料庫連接
 */
export async function verifyDatabaseConnection() {
  try {
    // 嘗試執行簡單查詢
    await prisma.$queryRaw`SELECT 1`;
    console.log("資料庫連接成功");
    return true;
  } catch (error) {
    console.error("資料庫連接失敗:", error);
    return false;
  }
}

// 在開發模式下直接初始化數據庫
if (process.env.NODE_ENV === "development") {
  // 設置延遲，避免與其他啟動程序衝突
  setTimeout(async () => {
    try {
      await verifyDatabaseConnection();
      await initializeDatabase();
    } catch (error) {
      console.error("啟動時初始化資料庫失敗:", error);
    }
  }, 1000);
}
