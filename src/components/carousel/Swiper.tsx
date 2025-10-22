"use client";

import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./swiper-styles.css";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";

interface SwiperCarouselProps {
  children?: React.ReactNode[];
  slideClassName?: string;
}
export default function SwiperCarousel({
  children = ["", "", ""],
  slideClassName = "max-w-64 h-64 flex items-center justify-center bg-gray-300 rounded-lg",
}: SwiperCarouselProps) {
  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {children.map((slide, i) => (
          <SwiperSlide key={i} className={slideClassName}>
            <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
