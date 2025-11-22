"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import LightboxViewer from "@/components/viewer/LightBox";
import { IGalleryProps, IQueryResponse } from "@/types";
import { shortText } from "@/lib";
import { PrimarySearch } from "@/components/Search";
import { ClearFiltersBtn } from "@/components/buttons/ClearFilters";

type Props = {
  galleries: IQueryResponse<IGalleryProps[]>;
  className?: string;
  startIndex?: number;
};

export default function GalleryClient({ galleries, className = "" }: Props) {
  return (
    <div className={`p-3 ${className}`}>
      <div className="flex items-center gap-2 justify-between my-6 _page">
        <PrimarySearch
          placeholder="Search Gallery"
          inputStyles="h-9"
          className="bg-secondary w-fit focus-within:grow"
          searchKey="gallery_search"
        />
        <ClearFiltersBtn className="border border-border shadow p-1.5 rounded-md h-9 " />
      </div>
      {/* Grid */}
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {galleries?.data?.map((gallery, i) => (
          <GalleryThumbnail key={"gallery" + i} gallery={gallery} />
        ))}
      </div>
    </div>
  );
}

export type GalleryImage = {
  src: string;
  width?: number;
  height?: number;
  title?: string;
  description?: string;
};

type GalleryProps = {
  gallery: IGalleryProps;
  className?: string;
};

export function GalleryThumbnail({ gallery, className = "" }: GalleryProps) {
  const [open, setOpen] = useState(false);

  // Prepare slides for lightbox
  const files = useMemo(
    () =>
      gallery?.files
        ?.filter(
          (f) => f.resource_type == "image" || f.resource_type == "video"
        )
        ?.map((file) => ({
          src: file.secure_url,
          width: file.width ?? 1600,
          height: file.height ?? 900,
          title: shortText(
            file?.original_filename ?? file?.name ?? "Image",
            20
          ),
          description: file.description,
          type: file.resource_type as "image" | "video",
        })),
    [gallery]
  );

  const thumbnailFile = gallery?.files?.[0];

  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
        }}
        className={`relative overflow-hidden rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-primary w-full h-auto ${className}`}
        aria-label={thumbnailFile?.original_filename ?? `Open image`}
        type="button"
      >
        <div className="relative w-full aspect-[4/3] bg-gray-100 flex items-start">
          <Image
            src={
              (thumbnailFile?.resource_type == "video"
                ? thumbnailFile?.thumbnail_url
                : thumbnailFile?.secure_url) as string
            }
            alt={thumbnailFile?.original_filename ?? `Image `}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transform transition-transform duration-300 hover:scale-105 grow"
            priority={true} // preload a few for speed
          />
        </div>

        {/* overlay */}
        <div className="absolute bottom-0 right-0 left-0 flex flex-wrap items-center justify-between gap-2 p-2 h-fit">
          <div className="bg-modalOverlay text-white text-xs rounded px-2 py-1 backdrop-blur-sm line-clamp-1">
            {shortText((gallery?.title as string) ?? gallery?.title, 32)}
          </div>
          {files.length > 1 && (
            <span className="backdrop-blur-sm text-white text-xs font-thin">
              +{files?.length - 1}
            </span>
          )}
        </div>
      </button>

      {/* Lightbox */}
      <LightboxViewer
        open={open}
        onClose={() => setOpen(false)}
        files={files ?? []}
        index={0}
      />
    </>
  );
}
