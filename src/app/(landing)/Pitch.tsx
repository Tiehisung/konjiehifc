"use client";
import { pitch } from "@/assets/images/pitch";
import { ThumbsGallery } from "@/components/carousel/ThumbsGallery";
import { useIsMobile } from "@/hooks/use-mobile";
import { IFileProps } from "@/types";

export function PitchGallery() {
  const isMobile = useIsMobile("md");
  const slides = [
    {
      secure_url: pitch.dimensions,
      description: "Pitch Dimemsions",
      name: "Know the dimensions of a standard pitch",
      _id: "1",
    },
    {
      secure_url: pitch.labeling,
      description: "Labeled Pitch",
      name: "Know the parts of your pitch",
      _id: "2",
    },
    {
      secure_url: pitch.positioning,
      description: "Pitch Positions",
      name: "Positions",
      _id: "3",
    },
    {
      secure_url: pitch.positions,
      description: "Player Positions",
      name: "Where to position players",
      _id: "4",
    },
  ] as unknown as IFileProps[];
  return (
    <div className="_page">
      <ThumbsGallery
        images={slides}
        mainSlideStyles={{
          width: isMobile ? "100%" : "70%",
          height: "600px",
        }}
        enableBlur
        descriptionStyles="flex flex-col justify-center items-center"
        thumbnailSwiperStyles={{ width: "100%",margin:'auto' }}
      />
    </div>
  );
}
