"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { toggleClick } from "@/lib/DOM";
import { MediaPreview } from "../files/MediaView";
import { isObjectId } from "@/lib/validate";
import { formatDate } from "@/lib/timeAndDate";
import LightboxViewer from "../viewer/LightBox";
import { IGallery } from "@/types/file.interface";
import { GalleryCard } from "./GalleryCard";

interface GalleryGridProps {
  galleries: IGallery[];
  showDate?: boolean;
}

export default function GalleryGrid({
  galleries,
  showDate = true,
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
          <GalleryCard key={gallery?._id} gallery={gallery} />
        ))}
      </div>
      
    </>
  );
}
