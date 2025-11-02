"use client";

import { ThumbsGallery } from "@/components/carousel/ThumbsGallery";
import { SideDrawer } from "@/components/ShadSideDrawer";
import { useIsMobile } from "@/hooks/use-mobile";

import { usePlayerGalleryUtils } from "@/hooks/usePlayerGallery";
import { IGalleryProps } from "@/types";

interface IProps {
  gallery?: IGalleryProps;
  name?: string;
}
export function PlayerGalleryViewer({ gallery }: IProps) {
  const { images } = usePlayerGalleryUtils([gallery] as IGalleryProps[]);
  const isMobile = useIsMobile("md");
  return (
    <SideDrawer
      triggerId={gallery?._id as string}
      trigger={undefined}
      side="bottom"
      triggerStyles="hidden"
    >
      <ThumbsGallery
        title={"Player Gallery"}
        images={images}
        thumbnailSwiperStyles={{
          borderRadius: "0%",
          height: "70px",
          width: isMobile ? "100%" : "80%",
        }}
        enableBlur
        mainSlideStyles={{
          width: isMobile ? "100%" : "80%",
          aspectRatio: "auto",
          borderRadius: "0",
          height: "600px",
        }}
      />
    </SideDrawer>
  );
}
