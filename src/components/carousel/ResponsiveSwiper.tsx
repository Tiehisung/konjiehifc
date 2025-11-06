"use client";

import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./responsive-swiper.css";

interface ResponsiveSwiperProps {
  slides: Array<ReactNode>;
  autoplay?: boolean;
  showNavigation?: boolean;
  showPagination?: boolean;
  noSpacing?: boolean;
  swiperStyles?: CSSProperties;
  slideStyles?: CSSProperties;
  doubleCount?: boolean;
}

export function ResponsiveSwiper({
  slides,
  autoplay = true,
  showNavigation = true,
  showPagination = true,
  noSpacing,
  swiperStyles = {},
  slideStyles = {},
  doubleCount,
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
        slidesPerView={slidesPerView * (doubleCount ? 2 : 1)}
        spaceBetween={noSpacing ? 0 : spaceBetween}
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
        style={{ ...swiperStyles }}
      >
        {slides.map((slide, i) => (
          <SwiperSlide
            key={i}
            className="flex items-center justify-center"
            style={slideStyles}
          >
            {slide}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
