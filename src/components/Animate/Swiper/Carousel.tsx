"use client";

import React, { ReactNode, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper"; // Import Swiper type
import { Navigation, Pagination, Autoplay, EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-cards"; // Import Cards Effect styles
import "./carouselStyles.module.css"; // Custom styles

interface ISwiperCarousel {
  children: ReactNode[];
  wrapperStyles?: string;
  className?: string;
  gap?:   number;
  effects?:
    | "slide"
    | "fade"
    | "cube"
    | "coverflow"
    | "flip"
    | "creative"
    | "cards";
  delay?: number;
  disableOnInteraction?: boolean;
  navigation?: boolean;
  slidesPerVeiw?: "auto" | number;
}

const SwiperCarousel = ({
  children,
  className,
  wrapperStyles,
  delay = 3000,
  navigation = true,
  gap = 0,
  effects = "cards",
  disableOnInteraction = false,
  slidesPerVeiw = "auto",
}: ISwiperCarousel) => {
  const handleMouseEnter = () => {
    const swiperElement = document.querySelector(".swiper") as HTMLElement & {
      swiper?: SwiperInstance;
    };
    swiperElement?.swiper?.autoplay.stop();
  };

  const handleMouseLeave = () => {
    const swiperElement = document.querySelector(".swiper") as HTMLElement & {
      swiper?: SwiperInstance;
    };
    swiperElement?.swiper?.autoplay.start();
  };

  useEffect(() => {
    const swiperElement = document.querySelector(".swiper") as HTMLElement & {
      swiper?: SwiperInstance;
    };
    swiperElement?.addEventListener("mouseenter", handleMouseEnter);
    swiperElement?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      swiperElement?.removeEventListener("mouseenter", handleMouseEnter);
      swiperElement?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const pagination = {
    clickable: true,
    renderBullet: function (_index: number, className: string) {
      return '<button class="' + className + '"> </button>';
    },
  };

  return (
    <Swiper
      navigation={navigation}
      pagination={pagination}
      autoplay={{
        delay: delay,
        disableOnInteraction: disableOnInteraction,
      }}
      modules={[Navigation, Pagination, Autoplay, EffectCards]}
      effect={effects} // Apply Cards Effect
      slidesPerView={slidesPerVeiw} // Cards effect works best with 1 slide per view
      spaceBetween={gap}
      className={`swiper py-6 border ${wrapperStyles}`}
    >
      {children?.map((component, index) => (
        <SwiperSlide
          key={index}
          className={`overflow-hidden rounded-lg max-w-[400px] ${className}`}
        >
          {component}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperCarousel;
