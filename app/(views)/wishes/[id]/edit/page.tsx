// ====================================================================
// wishes/[id]/edit/page.tsx - 許願編輯頁面
// ====================================================================
import { Suspense } from "react";
import { getWishById, getCategories } from "@/app/lib/data";
import EditWishForm from "./EditWishForm";

// 載入狀態組件
function LoadingState() {
  return (
    <div className="animate-pulse mt-6">
      <div className="h-12 bg-muted rounded-lg mb-4 w-1/2"></div>
      <div className="h-8 bg-muted rounded-lg mb-4 w-1/4"></div>
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="h-16 bg-muted rounded-lg"></div>
        ))}
      </div>
    </div>
  );
}

// 取得 wish 與分類
async function WishEditProvider({ id }: { id: string }) {
  // 嘗試原始 id
  let wish = await getWishById(id);

  // 若找不到，嘗試將 wish-001 轉換為 wish-1 格式
  if (!wish && /^wish-\d+$/.test(id)) {
    // 從 id 中提取數字部分，移除前導零
    const numPart = id.replace("wish-", "");
    const cleanNum = parseInt(numPart, 10).toString();
    const altId = `wish-${cleanNum}`;

    // 使用轉換後的 id 再次嘗試
    wish = await getWishById(altId);

    // 如果仍然找不到，嘗試額外 id 格式 (wish-extra-X)
    if (!wish) {
      wish = await getWishById(`wish-${cleanNum}`);
    }

    console.log(`原始 id: ${id}, 嘗試轉換 id: ${altId}`);
  }

  const categories = await getCategories();

  if (!wish) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-bold mb-4">找不到許願資料</h2>
        <p className="text-muted-foreground">無法找到 ID 為 {id} 的許願，可能已被刪除或不存在。</p>
        <p className="mt-4">
          <a href="/profile/wishes" className="text-primary hover:underline">
            返回我的許願
          </a>
        </p>
      </div>
    );
  }

  return <EditWishForm wish={wish} categories={categories} />;
}

export default function EditWishPage({ params }: { params: { id: string } }) {
  return (
    <div className="bg-background min-h-screen">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-pink-400"></div>
        <div className="container mx-auto px-4 py-12 md:py-16 relative">
          <div className="max-w-3xl animate-fade-in">
            <div className="inline-block px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm mb-6">
              <span className="text-sm font-medium text-white">📝 編輯願望</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-sm">
              編輯<span className="relative bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-100 font-black px-1">許願</span>
            </h1>
            <p className="text-lg text-white mb-4 drop-shadow-sm">修改您的願望內容，讓更多人能幫助您</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/10 to-transparent"></div>
      </section>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto bg-card border border-border rounded-xl shadow-sm p-6 md:p-8">
          <Suspense fallback={<LoadingState />}>
            <WishEditProvider id={params.id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
