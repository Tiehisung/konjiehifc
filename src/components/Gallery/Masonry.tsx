"use client";

import { IFileProps } from "@/types";
import Image from "next/image";
import { useState } from "react";
import LightboxViewer from "../viewer/LightBox";

interface MasonryGalleryProps {
  items: IFileProps[];
  useSize?: boolean;
  enableLightboxViewer?: boolean;
}

export default function MasonryGallery({
  items,
  useSize,
  enableLightboxViewer = true,
}: MasonryGalleryProps) {
  const [hoveredId, setHoveredId] = useState<string | undefined>(undefined);
  //For Lightbox
  const files = items
    .filter((f) => f.type === "image" || f.type === "video")
    .map((item) => ({
      src: item?.secure_url,
      alt: item?.original_filename ?? (item?.asset_id as string),
      width: item?.width,
      height: item?.height,
      type: item?.resource_type as "image" | "video",
    }));
  const [open, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  function getAspectRatio(bytes: number): string {
    if (bytes > 500000) {
      return "aspect-[2/3]"; // tall
    } else if (bytes > 300000) {
      return "aspect-[3/4]"; // medium-tall
    } else if (bytes > 150000) {
      return "aspect-square"; // square
    } else {
      return "aspect-[4/3]"; // wide
    }
  }
  if (useSize)
    return (
      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4">
        {items?.map((item, i) => (
          <div
            key={item?.asset_id + i}
            className="mb-6 break-inside-avoid overflow-hidden rounded-lg"
            onMouseEnter={() => setHoveredId(item?.asset_id)}
            onMouseLeave={() => setHoveredId(undefined)}
            onClick={() => {
              setPhotoIndex(i);
              enableLightboxViewer && setOpen(true);
            }}
          >
            <div
              className={`group relative ${getAspectRatio(
                item?.bytes as number
              )} w-full overflow-hidden bg-muted`}
            >
              <Image
                src={item?.secure_url}
                alt={item?.name ?? "img"}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              />

              <div
                className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                  hoveredId === item?.asset_id ? "opacity-40" : "opacity-20"
                }`}
              />

              {item?.description && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent px-4 py-6">
                  <p className="mt-1 text-sm text-gray-200 line-clamp-1">
                    {item?.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}

        <LightboxViewer
          open={open}
          onClose={() => setOpen(false)}
          files={files}
          index={photoIndex}
        />
      </div>
    );

  return (
    <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4">
      {items.map((item, i) => (
        <div
          key={item?.asset_id + i}
          className="mb-6 break-inside-avoid overflow-hidden rounded-lg"
          onClick={() => {
            setPhotoIndex(i);
            enableLightboxViewer && setOpen(true);
          }}
        >
          <div className="group relative aspect-[3/4] w-full overflow-hidden bg-muted">
            <Image
              src={item?.secure_url}
              alt={item?.original_filename ?? (item?.asset_id as string)}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            />

            <div className="absolute inset-0 bg-black transition-opacity duration-300 group-hover:opacity-40 opacity-20" />

            {item?.description && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent px-4 py-6">
                <p className="mt-1 text-sm text-gray-200 line-clamp-1">
                  {item?.description}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
      <LightboxViewer
        open={open}
        onClose={() => setOpen(false)}
        files={files}
        index={photoIndex}
      />
    </div>
  );
}
