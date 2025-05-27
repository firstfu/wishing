import prisma from "@/app/lib/prisma";

/**
 * 獲取或創建 OAuth 登入用戶
 * @param email 用戶電子郵件
 * @param name 用戶名稱
 * @param image 用戶頭像
 * @param provider 認證提供者 (google, github 等)
 * @param providerAccountId 提供者給的帳號 ID
 */
export async function getOrCreateOAuthUser({
  email,
  name,
  image,
  provider,
  providerAccountId,
}: {
  email: string;
  name?: string | null;
  image?: string | null;
  provider: string;
  providerAccountId: string;
}) {
  if (!email) {
    throw new Error("電子郵件是必須的");
  }

  try {
    // 使用事務確保用戶和帳號關聯的完整性
    return await prisma.$transaction(async tx => {
      // 首先嘗試通過電子郵件查找用戶
      let user = await tx.user.findUnique({
        where: { email },
      });

      // 如果用戶不存在，創建新用戶
      if (!user) {
        user = await tx.user.create({
          data: {
            email,
            name,
            image,
            balance: 0,
          },
        });
      }
      // 如果用戶存在但資訊需要更新
      else if (user.name !== name || user.image !== image) {
        user = await tx.user.update({
          where: { id: user.id },
          data: {
            name,
            image,
          },
        });
      }

      // 檢查用戶是否已有該提供者的帳號關聯
      const existingAccount = await tx.account.findFirst({
        where: {
          userId: user.id,
          provider,
          providerAccountId,
        },
      });

      // 如果沒有帳號關聯，創建一個
      if (!existingAccount) {
        await tx.account.create({
          data: {
            userId: user.id,
            type: "oauth",
            provider,
            providerAccountId,
          },
        });
      }

      return user;
    });
  } catch (error) {
    console.error("處理 OAuth 用戶時出錯:", error);
    throw new Error(`無法處理 OAuth 登入: ${error instanceof Error ? error.message : "未知錯誤"}`);
  }
}

/**
 * 獲取用戶餘額
 * @param userId 用戶 ID
 */
export async function getUserBalance(userId: string) {
  if (!userId) {
    return 0;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { balance: true },
    });

    return user ? Number(user.balance) : 0;
  } catch (error) {
    console.error("獲取用戶餘額出錯:", error);
    return 0;
  }
}

/**
 * 更新用戶餘額
 * @param userId 用戶 ID
 * @param amount 變更金額 (正數為增加，負數為減少)
 */
export async function updateUserBalance(userId: string, amount: number) {
  if (!userId) {
    throw new Error("用戶 ID 是必須的");
  }

  try {
    // 使用事務確保餘額更新的原子性
    return await prisma.$transaction(async tx => {
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: { balance: true },
      });

      if (!user) {
        throw new Error(`找不到用戶: ${userId}`);
      }

      const newBalance = Number(user.balance) + amount;

      // 防止餘額為負
      if (newBalance < 0) {
        throw new Error("餘額不足");
      }

      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: { balance: newBalance },
      });

      return Number(updatedUser.balance);
    });
  } catch (error) {
    console.error("更新用戶餘額出錯:", error);
    throw error;
  }
}
