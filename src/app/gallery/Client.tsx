// components/gallery/Gallery.tsx
"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Download from "yet-another-react-lightbox/plugins/download";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export type GalleryImage = {
  src: string; // absolute or application-root path e.g. '/images/1.jpg'
  width?: number; // optional width for layout (helps lightbox)
  height?: number; // optional height
  title?: string;
  description?: string;
};

type Props = {
  images: GalleryImage[];
  className?: string;
  startIndex?: number;
};

export default function GalleryClient({
  images,
  className = "",
  startIndex = 0,
}: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(startIndex);

  // Prepare slides for lightbox
  const slides = useMemo(
    () =>
      images?.map((img) => ({
        src: img.src,
        width: img.width ?? 1600,
        height: img.height ?? 900,
        title: img.title,
        description: img.description,
      })),
    [images]
  );

  return (
    <div className={`gallery-root ${className}`}>
      {/* Grid */}
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {images.map((img, i) => (
          <button
            key={img.src + i}
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
            className="relative overflow-hidden rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={img.title ?? `Open image ${i + 1}`}
            type="button"
          >
            <div className="relative w-full aspect-[4/3] bg-gray-100">
              <Image
                src={img.src}
                alt={img.title ?? `Image ${i + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover transform transition-transform duration-300 hover:scale-105"
                priority={i < 3} // preload a few for speed
              />
            </div>

            {/* overlay */}
            <div className="absolute inset-0 flex items-end p-2">
              <div className="bg-modalOverlay text-white text-xs rounded px-2 py-1 backdrop-blur-sm">
                {img.title ?? `Image ${i + 1}`}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        plugins={[Zoom, Download, Thumbnails]}
        controller={{
          // keyboard, swipe
          closeOnBackdropClick: true,
        }}
        on={{
          view: ({ index: i }) => setIndex(i),
        }}
        styles={{
          // small visual customizations (optional)
          container: { zIndex: 1400 },
        }}
        download={{download: ({saveAs,slide}) =>    saveAs(slide.src)}}
      />
    </div>
  );
}
