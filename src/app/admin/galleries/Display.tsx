"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Download, View } from "lucide-react";
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

interface GalleryDisplayProps {
  galleries: IGalleryProps[];
}

export function GalleryDisplay({ galleries }: GalleryDisplayProps) {
  const [selectedGallery, setSelectedGallery] = useState<
    IGalleryProps | undefined
  >(undefined);

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
        <motion.div
          key={gallery._id || i}
          className="relative rounded-xl overflow-hidden shadow-sm group bg-card hover:shadow-lg transition-all"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: i * 0.05 }}
          onClick={() => {
            setSelectedGallery(gallery);
            setIsOpen(true);
          }}
        >
          {/* Cover Image */}
          {gallery.files?.[0]?.secure_url && (
            <div
              className="relative w-full aspect-4/3"
              onClick={() => {
                setSelectedGallery(gallery);
                toggleClick(gallery?._id);
              }}
            >
              <Image
                src={gallery.files[0].secure_url}
                alt={gallery.title || "Gallery image"}
                fill
                className="object-cover"
              />
            </div>
          )}
          {/* Info */}
          <div className="p-4 space-y-1">
            <h3 className=" text-sm flex items-center gap-4 justify-between text-nowrap">
              <span className="font-semibold line-clamp-1 grow">
                {gallery.title || "Untitled"}
              </span>
              <span className="font-light ml-auto">
                {formatDate(gallery?.createdAt, "March 2, 2025")}
              </span>
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {gallery.description || "No description"}
            </p>
          </div>
          {/* Dropdown Menu */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition"
          >
            <PrimaryDropdown id={""} className="h-fit ">
              <DropdownMenuItem
                onClick={() =>
                  downloadFile(
                    gallery.files?.[0]?.secure_url || "",
                    gallery.files?.[0]?.original_filename as string
                  )
                }
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  gallery.files?.forEach((f) =>
                    downloadFile(
                      f?.secure_url || "",
                      f?.original_filename as string
                    )
                  );
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Gallery
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {
                  setSelectedGallery(gallery);
                  setIsOpen(true);
                }}
                hidden={!isAdmin}
              >
                <View className="w-4 h-4 mr-2" />
                View Gallery
              </DropdownMenuItem>

              <ConfirmActionButton
                primaryText={"Delete"}
                method={"DELETE"}
                confirmText="Delete Gallery?"
                uri={`${apiConfig.galleries}/${gallery?._id}`}
                className="h-fit"
                variant="destructive"
              />
            </PrimaryDropdown>
          </div>
        </motion.div>
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
