"use client";

import React, { ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./vertical.css";

interface IProps {
  slides: ReactNode[];
  autoplay?: boolean;
  showNavigation?: boolean;
  showPagination?: boolean;
  delay?: number;
  loop?: boolean;
}

export default function VerticalSwiper({
  slides = [],
  autoplay = true,
  showNavigation = false,
  showPagination = true,
  delay = 5000,
  loop = true,
}: IProps) {
  return (
    <Swiper
      direction="vertical"
      className="mySwiper w-full"
      modules={[Pagination, Autoplay, Navigation]}
      pagination={showPagination ? { clickable: true } : undefined}
      navigation={showNavigation}
      autoplay={
        autoplay
          ? {
              delay,
              disableOnInteraction: false,
            }
          : undefined
      }
      loop={loop}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>{slide}</SwiperSlide>
      ))}
    </Swiper>
  );
}
