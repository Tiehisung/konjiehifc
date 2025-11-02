"use client";

import { useState, useRef } from "react";
import type { Swiper as SwiperClass } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./thumbs-image-gallery.css";

import Image from "next/image";
import { staticImages } from "@/assets/images";
import { IFileProps } from "@/types";

interface ThumbsGalleryProps {
  images: IFileProps[];
  className?: string;
  thumbClassName?: string;
}

export function ThumbsImageGallery({ images = [], ...props }: ThumbsGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const mainSwiperRef = useRef<SwiperClass | null>(null);

  return (
    <div className={`w-full bg-card rounded-lg overflow-hidden border border-border shadow-lg  `}>
      {/* Main Gallery */}
      <div className="w-full bg-muted/50">
        <Swiper
          onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className={`main-swiper w-full aspect-video min-w-full ${props.className}`}
        >
          {images?.map((image, i) => (
            <SwiperSlide
              key={image._id}
              className="bg-muted flex items-center justify-center"
            >
              <div className="relative w-full h-full">
                <Image
                  src={staticImages.manager}
                  alt={
                    (image?.original_filename as string) ??
                    image?.name ??
                    "Gallery " + (i + 1)
                  }
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Thumbnails */}
      <div className="bg-background p-4 border-t border-border">
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={8}
          slidesPerView={5}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="thumbs-swiper"
          breakpoints={{
            320: {
              slidesPerView: 3,
              spaceBetween: 6,
            },
            640: {
              slidesPerView: 4,
              spaceBetween: 8,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 8,
            },
          }}
        >
          {images?.map((image, i) => (
            <SwiperSlide
              key={image._id}
              className="cursor-pointer opacity-50 hover:opacity-75 transition-opacity"
            >
              <div className="relative w-full aspect-square rounded border border-border overflow-hidden hover:border-primary transition-colors">
                <Image
                  src={staticImages.manager}
                  alt={
                    (image?.original_filename as string) ??
                    image?.name ??
                    "Thumb " + (i + 1)
                  }
                  fill
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
/* Styles for Swiper navigation and active thumb 
      <style jsx global>{`
        .main-swiper {
          --swiper-navigation-color: rgb(var(--color-primary) / 1);
          --swiper-pagination-color: rgb(var(--color-primary) / 1);
        }

        .main-swiper .swiper-button-next,
        .main-swiper .swiper-button-prev {
          width: 44px;
          height: 44px;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 4px;
          backdrop-filter: blur(4px);
        }

        .main-swiper .swiper-button-next:after,
        .main-swiper .swiper-button-prev:after {
          font-size: 20px;
          color: white;
        }

        .main-swiper .swiper-button-next:hover,
        .main-swiper .swiper-button-prev:hover {
          background: rgba(0, 0, 0, 0.6);
        }

        .thumbs-swiper .swiper-slide-thumb-active {
          opacity: 1 !important;
          border-color: rgb(var(--color-primary) / 1) !important;
        }

        .thumbs-swiper .swiper-slide-thumb-active img {
          filter: brightness(1.1);
        }
      `}</style>*/
