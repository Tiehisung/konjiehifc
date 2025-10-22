"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./responsive-swiper-styles.css";

interface ResponsiveSwiperProps {
  slides: Array<ReactNode>;
  autoplay?: boolean;
  showNavigation?: boolean;
  showPagination?: boolean;
}

export function ResponsiveSwiper({
  slides,
  autoplay = true,
  showNavigation = true,
  showPagination = true,
}: ResponsiveSwiperProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [spaceBetween, setSpaceBetween] = useState(16);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 640) {
        // Mobile: sm
        setSlidesPerView(1);
        setSpaceBetween(12);
      } else if (width < 768) {
        // Tablet: md
        setSlidesPerView(2);
        setSpaceBetween(16);
      } else if (width < 1024) {
        // Laptop: lg
        setSlidesPerView(3);
        setSpaceBetween(20);
      } else {
        // Desktop: xl
        setSlidesPerView(4);
        setSpaceBetween(24);
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full">
      <Swiper
        onSwiper={(s) => (swiperRef.current = s)}
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        navigation={showNavigation}
        pagination={showPagination ? { clickable: true } : false}
        autoplay={
          autoplay
            ? {
                delay: 5000,
                disableOnInteraction: false,
              }
            : false
        }
        loop
        className="w-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i} className="flex items-center justify-center">
            {slide}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: var(--primary);
          background: var(--card);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: var(--primary);
          color: var(--primary-foreground);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 18px;
        }

        .swiper-pagination-bullet {
          background: var(--muted);
          opacity: 0.5;
          transition: all 0.3s ease;
        }

        .swiper-pagination-bullet-active {
          background: var(--primary);
          opacity: 1;
        }

        @media (max-width: 640px) {
          .swiper-button-next,
          .swiper-button-prev {
            width: 32px;
            height: 32px;
          }

          .swiper-button-next::after,
          .swiper-button-prev::after {
            font-size: 14px;
          }
        }
      `}</style> */}
    </div>
  );
}
