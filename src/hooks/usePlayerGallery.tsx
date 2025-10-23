"use client";

import { useMemo } from "react";
import {   IFileProps,  } from "@/types";
import { IPlayer } from "@/app/players/page";

/**
 * Hook for managing a player's gallery content.
 * - Random image or video selection
 * - Avatar fallback
 * - Flattened slides for carousel/lightbox
 */
export const usePlayerGalleryUtils = (player?: IPlayer) => {
  return useMemo(() => {
    if (!player) {
      return {
        randomImage: undefined,
        randomGallery: undefined,
        slides: [] as IFileProps[],
        images: [] as IFileProps[],
        videos: [] as IFileProps[],
        totalImages: 0,
        totalVideos: 0,
        totalGalleries: 0,
      };
    }

    const galleries = player.galleries || [];

    // 🖼 Flatten all files across galleries
    const allFiles = galleries.flatMap((g) => g.files || []);

    // Separate by type
    const images = allFiles.filter((f) => f.resource_type === "image");
    const videos = allFiles.filter((f) => f.resource_type === "video");

    // Pick a random gallery
    const randomGallery =
      galleries.length > 0
        ? galleries[Math.floor(Math.random() * galleries.length)]
        : undefined;

    // Pick a random image (fallback to avatar if none)
    const randomImage =
      images.length > 0
        ? images[Math.floor(Math.random() * images.length)]
        : player.avatar;

    // Combine all media for slides
    const slides = allFiles.length > 0 ? allFiles : [player.avatar];

    return {
      randomImage,
      randomGallery,
      slides,
      images,
      videos,
      totalImages: images.length,
      totalVideos: videos.length,
      totalGalleries: galleries.length,
    };
  }, [player]);
};
