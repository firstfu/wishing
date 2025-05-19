// wishes/RelatedWishes.tsx - 相關願望元件
import { Wish } from "./WishCard";
import Link from "next/link";

// 格式化價格顯示
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("zh-TW", {
    style: "currency",
    currency: "TWD",
    minimumFractionDigits: 0,
  }).format(price);
};

interface RelatedWishesProps {
  wishes: Wish[];
}

export default function RelatedWishes({ wishes }: RelatedWishesProps) {
  if (wishes.length === 0) {
    return null;
  }

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden p-6">
      <h2 className="text-xl font-bold mb-4">相關許願</h2>
      <div className="space-y-4">
        {wishes.map(wish => (
          <Link href={`/wishes/${wish.id}`} key={wish.id} className="block">
            <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-accent/50 transition-colors">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{wish.title}</h3>
                <p className="text-muted-foreground text-sm line-clamp-1 mt-1">{wish.description.split("\n")[0]}</p>
                <div className="text-xs text-muted-foreground mt-2">
                  發布者: {wish.user.name} • {new Date(wish.createdAt).toLocaleDateString("zh-TW")}
                </div>
              </div>
              <div className="font-medium text-primary whitespace-nowrap">{formatPrice(wish.price)}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
