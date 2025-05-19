import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/app/components/ui/Badge";

type Wish = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  viewCount: number;
  commentCount: number;
};

export default function TrendingWishesList({ wishes }: { wishes: Wish[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {wishes.map(wish => (
        <Link href={`/wishes/${wish.id}`} key={wish.id} className="group bg-card rounded-xl overflow-hidden border shadow-sm hover:shadow-md transition-all duration-200">
          <div className="relative bg-gradient-to-tr from-pink-100 to-purple-50 p-6 h-48 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <Badge className="bg-white/90 text-pink-600 hover:bg-white">{wish.category}</Badge>

              <div className="flex items-center text-sm text-muted-foreground">
                <span className="flex items-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1">
                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    <path
                      fillRule="evenodd"
                      d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {wish.viewCount}
                </span>
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1">
                    <path
                      fillRule="evenodd"
                      d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 0-1.5h-9Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {wish.commentCount}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 line-clamp-1 group-hover:text-pink-600 transition-colors">{wish.title}</h3>
              <p className="text-muted-foreground line-clamp-2">{wish.description}</p>
            </div>
          </div>

          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {wish.user.avatar ? (
                <Image src={wish.user.avatar} alt={wish.user.name} width={32} height={32} className="rounded-full" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-xs font-medium">{wish.user.name.charAt(0).toUpperCase()}</span>
                </div>
              )}
              <span className="text-sm font-medium">{wish.user.name}</span>
            </div>

            <div className="text-sm font-medium">{wish.price > 0 ? <span className="text-pink-600">${wish.price}</span> : <span className="text-emerald-600">免費</span>}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
