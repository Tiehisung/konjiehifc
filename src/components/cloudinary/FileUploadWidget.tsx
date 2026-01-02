"use client";

import { fireEscape } from "@/hooks/Esc";
import { ICldFileUploadResult } from "@/types/file.interface";
import { X } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";

interface ICloudinaryUploaderProps {
  uploadPreset?: string;
  multiple?: boolean;
  maxFiles?: number;
  folder?: string;
  resourceType?: "image" | "video" | "raw" | "auto";
  deletable?: boolean;
  hidePreview?: boolean;
  trigger?: ReactNode;
  triggerId?: string;
  dismissOnComplete?: boolean;
  cropping?: boolean;
  successMessage?: string;
  clearTrigger?: number;
  wrapperStyles?: string;
  setUploadedFiles: (files: ICldFileUploadResult[]) => void;
  mediaDisplayStyles?: string;
  maxFileSize?:
    | "2_000_000"
    | "5_000_000"
    | "10_000_000"
    | "20_000_000"
    | "40_000_000"
    | "60_000_000"
    | "80_000_000"
    | "100_000_000";
}

export default function CloudinaryUploader({
  multiple = true,
  maxFiles = 4,
  folder = "players/gallery",
  clearTrigger,
  setUploadedFiles,
  resourceType = "auto",
  deletable = true,
  hidePreview = false,
  trigger = "Upload Media",
  triggerId = "cloudinary-uploader",
  dismissOnComplete = true,
  cropping = false,
  successMessage,
  wrapperStyles,
  mediaDisplayStyles,
  maxFileSize = "20_000_000",
}: ICloudinaryUploaderProps) {
  const [files, setFiles] = useState<ICldFileUploadResult[]>([]);

  useEffect(() => {
    setFiles([]);
  }, [clearTrigger]);

  useEffect(() => {
    if (files) {
      setUploadedFiles(files);
    }
  }, [files]);

  const allowedFormats =
    resourceType === "image"
      ? ["jpg", "png", "jpeg", "webp"]
      : resourceType === "video"
      ? ["mp4", "mov", "avi", "webm"]
      : [
          "jpg",
          "png",
          "jpeg",
          "mp4",
          "mov",
          "webm",
          "webp",
          "avi",
          "mkv",
          "flv",
          "wmv",
          "m4v",
        ];

  const handleRemove = async (public_id: string) => {
    try {
      setFiles((p) => p.filter((f) => f.public_id !== public_id));
      setUploadedFiles(files.filter((f) => f.public_id !== public_id));

      // Optionally hit your API to delete from Cloudinary
      const res = await fetch("/api/deleteFile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id }),
      });

      if (!res.ok) throw new Error("Failed to delete file");
      toast.success("File deleted successfully");
    } catch {
      // toast.error("Failed to delete file");
    }
  };

  return (
    <div className={`flex flex-col items-center gap-4 ${wrapperStyles}`}>
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        options={{
          cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
          sources: ["local", "camera", "url", "google_drive", "image_search"],
          multiple,
          maxFiles,
          folder,
          resourceType: resourceType ?? "auto",
          clientAllowedFormats: allowedFormats,
          maxFileSize: Number(maxFileSize), // 20MB
          theme: "minimal",
          showPoweredBy: false,
          cropping: cropping,
        }}
        onSuccess={(result) => {
          // Each successful upload fires this event
          if (result?.info) {
            const file = result.info as unknown as ICldFileUploadResult;
            setFiles((prev) => {
              const updated = [...prev, file];
              setUploadedFiles(updated);
              return updated;
            });
          }
        }}
        onQueuesEnd={({ info }) => {
          // Fires when all uploads are done
          if (info) toast.success(successMessage ?? `Finished`);
          if (dismissOnComplete) fireEscape();
        }}
      >
        {({ open }) => (
          <div
            id={triggerId}
            onClick={() => open()}
            className={`font-semibold cursor-pointer transition-colors select-none `}
          >
            {trigger ?? (
              <span
                className={
                  "bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white "
                }
              >
                Upload Media
              </span>
            )}
          </div>
        )}
      </CldUploadWidget>

      {/* Uploaded previews */}
      {!hidePreview && files?.length > 0 && (
        <div
          className={`flex items-center flex-wrap justify-center gap-3 mt-4 ${mediaDisplayStyles}`}
        >
          {files.map((f) => (
            <div
              key={f.public_id}
              className="relative rounded-lg overflow-hidden group max-h-80"
            >
              {f.resource_type === "video" ? (
                <video
                  src={f.secure_url}
                  controls
                  className="rounded-lg object-cover"
                />
              ) : (
                <Image
                  width={400}
                  height={400}
                  src={f.secure_url}
                  alt={f.original_filename ?? ""}
                  className="rounded-lg object-cover"
                />
              )}

              {deletable && (
                <button
                  type="button"
                  onClick={() => handleRemove(f.public_id)}
                  className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
