"use client";

import { useState, useEffect } from "react";
import WishCard, { Wish } from "./WishCard";

// wishes/FeaturedWishesCarousel.tsx - 精選願望輪播元件

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

  // 上一張
  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + wishes.length) % wishes.length);
  };

  // 下一張
  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % wishes.length);
  };

  if (!wishes || wishes.length === 0) {
    return (
      <div className="h-60 flex items-center justify-center bg-muted rounded-lg">
        <p className="text-muted-foreground">目前沒有置頂許願</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-lg shadow-custom">
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
        <>
          {/* 導航控制 */}
          <div className="flex justify-center mt-6 gap-2">
            {wishes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-primary w-6" : "bg-muted hover:bg-muted-foreground/30"}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* 上下頁按鈕 */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 -translate-y-1/2 w-10 h-10 rounded-full bg-background/70 backdrop-blur-sm border border-border flex items-center justify-center text-foreground hover:bg-background transition-colors z-10"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 rounded-full bg-background/70 backdrop-blur-sm border border-border flex items-center justify-center text-foreground hover:bg-background transition-colors z-10"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
