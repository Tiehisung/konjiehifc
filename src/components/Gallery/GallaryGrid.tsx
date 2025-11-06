"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IFileProps, IGalleryProps } from "@/types";
import { getFormattedDate } from "@/lib/timeAndDate";
import { useState } from "react";
import { GalleryViewer } from "./GalleryViewer";
import { toggleClick } from "@/lib/DOM";

interface GalleryGridProps {
  galleries: IGalleryProps[];
  showDate?: boolean;
  name?: string;
}

export default function GalleryGrid({
  galleries,
  showDate = true,
  name,
}: GalleryGridProps) {
  const [selectedGallery, setSelectedGallery] = useState(galleries?.[0]);
  if (!galleries?.length) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        No galleries found.
      </div>
    );
  }

  return (
    <>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 _page"
        id="gallery"
      >
        {galleries?.map((gallery) => (
          <Card
            key={gallery?._id}
            className="cursor-pointer hover:shadow-lg transition-all duration-200 rounded-none"
          >
            <CardHeader>
              <CardTitle className="flex flex-wrap justify-between items-center gap-2">
                <span className="font-semibold line-clamp-2">
                  {gallery?.title || "Untitled Gallery"}
                </span>

                {showDate && gallery?.createdAt && (
                  <span className="text-xs text-muted-foreground">
                    {getFormattedDate(gallery?.createdAt, "March 2, 2025")}
                  </span>
                )}
              </CardTitle>
            </CardHeader>

            <CardContent
              className="space-y-3"
              onClick={() => {
                // control modal
                setSelectedGallery(gallery);
                toggleClick(gallery?._id);
              }}
            >
              {/* Media grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {gallery?.files.slice(0, 6).map((file) => (
                  <MediaPreview key={file?._id} file={file} />
                ))}

                {gallery?.files.length > 6 && (
                  <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-semibold text-muted-foreground">
                    +{gallery?.files.length - 6} more
                  </div>
                )}
              </div>

              {/* Description */}
              {gallery?.description && (
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {gallery?.description}
                </p>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {gallery?.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <GalleryViewer gallery={selectedGallery} title={name} />
    </>
  );
}

function MediaPreview({ file }: { file: IFileProps }) {
  const isVideo = file?.resource_type === "video";

  return (
    <div className="relative aspect-square overflow-hidden rounded-lg">
      {isVideo ? (
        <video
          src={file?.secure_url}
          controls={false}
          className="w-full h-full object-cover"
          muted
          playsInline
        />
      ) : (
        <Image
          src={file?.secure_url}
          alt={file?.name || "gallery file"}
          width={400}
          height={400}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}
