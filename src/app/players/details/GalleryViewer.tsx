"use client";

import { ThumbsGallery } from "@/components/carousel/ThumbsGallery";

import { usePlayerGalleryUtils } from "@/hooks/usePlayerGallery";
import { IGalleryProps } from "@/types";

interface IProps {
  gallery?: IGalleryProps;
  name?: string;
}
export function PlayerGalleryViewer({ gallery }: IProps) {
  const { images } = usePlayerGalleryUtils([gallery] as IGalleryProps[]);
 
  if (!gallery)
    return (
      <div className="p-6 text-muted-foreground font-semibold text-center text-lg md:text-2xl m-auto">
        No content to display!
      </div>
    );
  return <ThumbsGallery title={"Player Gallery"} images={images} />;
}
