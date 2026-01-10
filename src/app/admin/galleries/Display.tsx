"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Download, Trash, View } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { IGallery } from "@/types/file.interface";
import { apiConfig } from "@/lib/configs";
import { PrimaryDropdown } from "@/components/Dropdown";
import { downloadFile } from "@/lib/file";
import { ConfirmActionButton } from "@/components/buttons/ConfirmAction";
import { useState } from "react";
import { toggleClick } from "@/lib/DOM";
import { formatDate } from "@/lib/timeAndDate";
import { useSession } from "next-auth/react";
import { IUser } from "@/types/user";
import LightboxViewer from "@/components/viewer/LightBox";
import { GalleryCard } from "./Card";

interface GalleryDisplayProps {
  galleries: IGallery[];
}

export function GalleryDisplay({ galleries }: GalleryDisplayProps) {
  const [selectedGallery, setSelectedGallery] = useState<IGallery | undefined>(
    undefined
  );

  const session = useSession();
  const isAdmin = (session?.data?.user as IUser)?.role?.includes("admin");

  const [isOpen, setIsOpen] = useState(false);

  if (!galleries?.length)
    return (
      <p className="text-center text-muted-foreground py-8">
        No galleries uploaded yet.
      </p>
    );

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {galleries.map((gallery, i) => (
        <GalleryCard gallery={gallery} key={i} />
      ))}
      <LightboxViewer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        files={
          selectedGallery?.files
            ?.filter((f) => f?.resource_type == "image" || f?.type == "video")
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
    </div>
  );
}
