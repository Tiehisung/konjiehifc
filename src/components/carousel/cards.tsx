"use client";

import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

import "./card.css";

// import required modules
import { EffectCards } from "swiper/modules";

export interface ICardCarouselProps {
  cards: Array<React.ReactNode>;
}

export default function CardCarousel({
  cards = [1, 2, 3, 4, 5, 6, 7],
}: ICardCarouselProps) {
  return (
    <>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        {cards.map((card, index) => (
          <SwiperSlide key={index}>Slide {card}</SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
