'use client'

import React, { ReactNode } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface ReactResponsiveCarouselProps {
  children: ReactNode[]; // Array of items to display in the carousel
  slidesPerView?: number; // Number of slides visible at a time
  infiniteLoop?: boolean; // Loop through slides
  autoPlay?: boolean; // Autoplay slides
  showThumbs?: boolean; // Show thumbnails
  showIndicators?: boolean; // Show navigation indicators
  showStatus?: boolean; // Show slide status
  interval?: number; // Set delay to 3 seconds (3000 milliseconds)
  transitionTime?: number; // Transition duration of 500ms
  stopOnHover?: boolean;
  className?: string;
}

const ReactResponsiveCarousel: React.FC<ReactResponsiveCarouselProps> = ({
  children,
  slidesPerView = 2,
  infiniteLoop = true,
  autoPlay = false,
  showThumbs = false,
  showIndicators = true,
  showStatus = true,
  interval = 3000,
  stopOnHover = true,
  transitionTime = 500,
  className,
}) => {
  return (
    <Carousel
      className={` ${className}`}
      centerMode={slidesPerView > 1}
      centerSlidePercentage={100 / slidesPerView}
      infiniteLoop={infiniteLoop}
      showThumbs={showThumbs}
      showIndicators={showIndicators}
      showStatus={showStatus}
      autoPlay={autoPlay}
      interval={interval}
      transitionTime={transitionTime}
      stopOnHover={stopOnHover}
    >
      {children.map((item, i) => (
        <div key={i}>{item}</div>
      ))}
    </Carousel>
  );
};

export default ReactResponsiveCarousel;
