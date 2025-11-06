"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Camera, X } from "lucide-react";
import { fireEscape } from "@/hooks/Esc";
import { staticImages } from "@/assets/images";

interface ICldUploadResult {
  secure_url: string;
  public_id: string;
  resource_type: "image" | "video" | "raw" | string;
  format?: string;
  bytes?: number;
  original_filename?: string;
  width?: number;
  height?: number;
  created_at?: string;
  folder?: string;
  thumbnail_url?: string;
}

interface IImageUploaderCldWidgetProps {
  /** Initial image URL or default */
  initialAvatar?: string;
  /** Fallback image when none is available */
  defaultImage?: string;
  /** Folder path on Cloudinary */
  folder?: string;
  /** Cloudinary upload preset */
  uploadPreset?: string;
  /** Fires when upload completes */
  onUploaded: (file: ICldUploadResult | null) => void;
  /** Trigger external clearing */
  clearTrigger?: number;
  /** Button label */
  label?: string;
  /** Disable cropping if not needed */
  cropping?: boolean;
  successMessage?: string;
  className?: string;
  escapeOnEnd?: boolean;
}

/**
 * ImageUploaderCldWidget — Cloudinary-powered single-image uploader
 * - Allows camera upload
 * - Enables cropping for all sources
 * - Displays preview with fallback
 */
export default function ImageUploaderCldWidget({
  initialAvatar,
  defaultImage = staticImages.avatar.src,
  folder = "players/",
  uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
  onUploaded,
  clearTrigger = 0,
  label = "Upload Avatar",
  successMessage = "File uploaded successfully!",
  cropping = true,
  className = " bg-blue-600 hover:bg-blue-700 text-white ",
  escapeOnEnd,
}: IImageUploaderCldWidgetProps) {
  const [file, setFile] = useState<ICldUploadResult | null>(null);

  // Reset when trigger changes
  useEffect(() => {
    setFile(null);
  }, [clearTrigger]);

  const currentSrc = file?.secure_url || initialAvatar || defaultImage;

  const handleRemove = () => {
    setFile(null);
    onUploaded(null);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Avatar Preview */}
      <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-md">
        <Image
          src={currentSrc}
          alt="avatar preview"
          fill
          sizes="128px"
          className="object-cover"
        />
        {file && (
          <button
            onClick={handleRemove}
            type="button"
            title="Remove"
            className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white p-1 rounded-full transition"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Upload Trigger */}
      <CldUploadWidget
        uploadPreset={uploadPreset}
        options={{
          cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
          multiple: false,
          maxFiles: 1,
          folder,
          cropping,
          croppingAspectRatio: 1, // force square
          resourceType: "image",
          sources: ["local", "url","camera",  "google_drive", "image_search"],
          clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
          showPoweredBy: false,
          theme: "minimal",
        }}
        onSuccess={(result) => {
          if (result?.info) {
            const uploaded = result.info as ICldUploadResult;
            setFile(uploaded);
            onUploaded(uploaded);
            if (successMessage) toast.success(successMessage);
          }
        }}
        onError={(e) => {
          if (e) toast.success(e.toString());
        }}
        onQueuesEnd={() => {
          if (escapeOnEnd) fireEscape();
        }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            className={`${className} flex gap-2 px-4 py-2 rounded-md text-sm font-semibold shadow transition cursor-pointer`}
          >
            {label}
            <Camera />
          </button>
        )}
      </CldUploadWidget>
    </div>
  );
}
