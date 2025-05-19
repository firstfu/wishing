"use client";

import { useState, useEffect } from "react";
import WishCard, { Wish } from "./WishCard";

interface FeaturedWishesCarouselProps {
  wishes: Wish[];
}

export default function FeaturedWishesCarousel({ wishes }: FeaturedWishesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 自動輪播
  useEffect(() => {
    if (wishes.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % wishes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [wishes.length]);

  if (!wishes || wishes.length === 0) {
    return (
      <div className="h-60 flex items-center justify-center bg-muted rounded-lg">
        <p className="text-muted-foreground">目前沒有置頂許願</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            width: `${wishes.length * 100}%`,
          }}
        >
          {wishes.map(wish => (
            <div key={wish.id} className="w-full shrink-0" style={{ width: `${100 / wishes.length}%` }}>
              <WishCard wish={wish} />
            </div>
          ))}
        </div>
      </div>

      {wishes.length > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {wishes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-primary" : "bg-muted"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
