"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IGalleryProps } from "@/types";
import { useState } from "react";
import { toggleClick } from "@/lib/DOM";
import { MediaPreview } from "../files/MediaView";
import { isObjectId } from "@/lib";
import { formatDate } from "@/lib/timeAndDate";
import LightboxViewer from "../viewer/LightBox";

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
  const [isOpen, setIsOpen] = useState(false);
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
                    {formatDate(gallery?.createdAt, "March 2, 2025")}
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
                {gallery?.tags?.slice(0, 10)?.map((tag) => (
                  <Badge key={tag} variant="outline" hidden={isObjectId(tag)}>
                    #{tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <LightboxViewer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        files={
          selectedGallery?.files
            ?.filter(
              (f) => f?.resource_type == "image" || f.resource_type == "video"
            )
            ?.map((f) => ({
              src: f.secure_url,
              alt: f.original_filename,
              height: f.height,
              width: f.width,
              type: f.resource_type as "image" | "video",
            })) ?? []
        }
        index={0}
      />
    </>
  );
}
