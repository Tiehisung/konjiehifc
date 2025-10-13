"use client";
 
//carousels/Responsive.js
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function CarouselTest() {
  return (
    <Carousel
      showArrows={true}
      showIndicators
      autoPlay
      interval={2000}
      showThumbs={false}
      infiniteLoop={true}
      dynamicHeight={false}
      className={`min-w-[240px] max-w-[90vw] md:w-[70vw] py-20 `}
      verticalSwipe="natural"
      
    >
        <div className="text-xl font-bold border text-center h-20 w-60 mx-auto bg-primaryGreen">Test item 1</div>
        <div className="text-xl font-bold border text-center h-20 w-60 mx-auto bg-primaryGreen">Test item 2</div>
        <div className="text-xl font-bold border text-center h-20 w-60 mx-auto bg-primaryGreen">Test item 3</div>
        <div className="text-xl font-bold border text-center h-20 w-60 mx-auto bg-primaryGreen">Test item 4</div>
        <div className="text-xl font-bold border text-center h-20 w-60 mx-auto bg-primaryGreen">Test item 5</div>
    </Carousel>
  );
}
