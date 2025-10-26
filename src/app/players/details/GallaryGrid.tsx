"use client";

import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IFileProps, IGalleryProps } from "@/types";

interface GalleryGridProps {
  galleries: IGalleryProps[];
  showDate?: boolean;
  onSelect?: (gallery: IGalleryProps) => void;
}

export default function GalleryGrid({
  galleries,
  showDate = true,
  onSelect,
}: GalleryGridProps) {
  if (!galleries?.length) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        No galleries found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {galleries.map((gallery) => (
        <Card
          key={gallery._id}
          onClick={() => onSelect?.(gallery)}
          className="cursor-pointer hover:shadow-lg transition-all duration-200"
        >
          <CardHeader>
            <CardTitle className="flex flex-wrap justify-between items-center gap-2">
              <span className="font-bold text-lg truncate">
                {gallery.name || "Untitled Gallery"}
              </span>

              {showDate && gallery.createdAt && (
                <span className="text-xs text-muted-foreground">
                  {format(new Date(gallery.createdAt), "MMM d, yyyy")}
                </span>
              )}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {/* Media grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {gallery.files.slice(0, 6).map((file) => (
                <MediaPreview key={file._id} file={file} />
              ))}

              {gallery.files.length > 6 && (
                <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-semibold text-muted-foreground">
                  +{gallery.files.length - 6} more
                </div>
              )}
            </div>

            {/* Description */}
            {gallery.description && (
              <p className="text-sm text-muted-foreground line-clamp-3">
                {gallery.description}
              </p>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {gallery.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  #{tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function MediaPreview({ file }: { file: IFileProps }) {
  const isVideo = file.resource_type === "video";

  return (
    <div className="relative aspect-square overflow-hidden rounded-lg">
      {isVideo ? (
        <video
          src={file.secure_url}
          controls={false}
          className="w-full h-full object-cover"
          muted
          playsInline
        />
      ) : (
        <Image
          src={file.secure_url}
          alt={file.name || "gallery file"}
          width={400}
          height={400}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}
