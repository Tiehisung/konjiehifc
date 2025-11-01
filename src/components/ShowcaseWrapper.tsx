"use client";

import React, { ReactNode } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

interface ShowcaseWrapperProps {
  children: ReactNode;
  tips?: ReactNode[]; // e.g. JSX slides or text
  images?: string[]; // URLs for carousel or static graphic
  autoplay?: boolean;
  delay?: number;
  loop?: boolean;
  className?: string; // tailwind class e.g. "bg-white" or "bg-gray-50"
  reverse?: boolean; // swap sides if true
  graphicsStyles?: string;
}

export default function ContentShowcaseWrapper({
  children,
  tips,
  images,
  autoplay = true,
  delay = 4000,
  loop = true,
  className = "bg-white",
  reverse = false,
  graphicsStyles,
}: ShowcaseWrapperProps) {
  const hasCarousel =
    (tips && tips.length > 0) || (images && images.length > 1);

  return (
    <div
      className={`flex flex-wrap max-md:flex-col items-start justify-between w-full ${
        reverse ? "md:flex-row-reverse" : ""
      } ${className}`}
    >
      {/* Left: Main Content */}
      <div className="max-md:w-full md:min-w-[60%] flex justify-center">{children}</div>

      {/* Right: Graphic / Tips Section */}
      <div
        className={`max-md:w-full grow md:w-1/5 flex items-center justify-center md:p-8 ${graphicsStyles}`}
      >
        {hasCarousel ? (
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={
              autoplay
                ? {
                    delay,
                    disableOnInteraction: false,
                  }
                : undefined
            }
            loop={loop}
            className="w-full max-w-md"
          >
            {images?.map((src, i) => (
              <SwiperSlide key={`img-${i}`}>
                <div className="flex justify-center">
                  <Image
                    src={src}
                    alt={`Slide ${i + 1}`}
                    width={500}
                    height={400}
                    className="rounded-xl object-contain bg-popover max-md:max-h-[70vh]"
                  />
                </div>
              </SwiperSlide>
            ))}

            {tips?.map((tip, i) => (
              <SwiperSlide key={`tip-${i}`} >
                <div className="text-center p-6">{tip}</div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : images?.length === 1 ? (
          <Image
            src={images[0]}
            alt="Showcase"
            width={600}
            height={400}
            className="rounded-xl object-contain grow"
          />
        ) : (
          <div className="text-gray-400 text-center italic">
            No graphics or tips provided
          </div>
        )}
      </div>
    </div>
  );
}
