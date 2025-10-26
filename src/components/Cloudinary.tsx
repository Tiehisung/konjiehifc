"use client";

import { fireEscape } from "@/hooks/Esc";
import { X } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import {
  ReactNode,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { toast } from "sonner";

export interface ICldFileUploadResult {
  secure_url: string;
  public_id: string;
  resource_type: "image" | "video" | "raw" | string;
  format?: string;
  bytes?: number;
  original_filename?: string;
  id: string;
  batchId: string;
  asset_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  created_at?: string;
  tags: string[];
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  folder?: string;
  access_mode: string;
  existing: boolean;
  path?: string;
  thumbnail_url?: string;
}

export interface ICloudinaryUploaderProps {
  uploadPreset?: string;
  multiple?: boolean;
  maxFiles?: number;
  folder?: string;
  resourceType?: "image" | "video" | "raw" | "auto";
  deletable?: boolean;
  preview?: boolean;
  className?: string;
  trigger?: ReactNode;
  triggerId: string;
  dismissOnComplete?: boolean;
  cropping?: boolean;
  successMessage?: string;
  uploadedFiles: ICldFileUploadResult[];
  setUploadedFiles: (files: ICldFileUploadResult[]) => void;
}

export default function CloudinaryUploader({
  multiple = true,
  maxFiles = 4,
  folder = "players/gallery",
  uploadedFiles,
  setUploadedFiles,
  resourceType = "auto",
  deletable = true,
  preview = true,
  className = "bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white ",
  trigger = "Upload Media",
  triggerId = "cloudinary-uploader",
  dismissOnComplete = true,
  cropping = false,
  successMessage,
}: ICloudinaryUploaderProps) {
  useEffect(() => {}, []);

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
      setUploadedFiles(uploadedFiles.filter((f) => f.public_id !== public_id));

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
    <div className="flex flex-col items-center gap-4">
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
          maxFileSize: 20_000_000, // 20MB
          theme: "minimal",
          showPoweredBy: false,
          cropping: cropping,
        }}
        onSuccess={(result) => {
          // Each successful upload fires this event
          if (result?.info) {
            const file = result.info as unknown as ICldFileUploadResult;
            const updated = [...uploadedFiles, file];
            setUploadedFiles(updated);
          }
        }}
        onQueuesEnd={(result) => {
          // Fires when all uploads are done
          toast.success(
            successMessage ??
              `${result.info?.length} of ${uploadedFiles.length} uploads complete`
          );
          if (dismissOnComplete) fireEscape();
        }}
      >
        {({ open }) => (
          <div
            id={triggerId}
            onClick={() => open()}
            className={`font-semibold cursor-pointer transition-colors select-none ${className}`}
          >
            {trigger}
            {/* ({files.length}/{maxFiles}) */}
          </div>
        )}
      </CldUploadWidget>

      {/* Uploaded previews */}
      {preview && uploadedFiles?.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
          {uploadedFiles.map((f) => (
            <div
              key={f.public_id}
              className="relative rounded-lg overflow-hidden shadow-md group"
            >
              {f.resource_type === "video" ? (
                <video
                  src={f.secure_url}
                  controls
                  className="rounded-lg shadow-md object-cover"
                />
              ) : (
                <Image
                  width={400}
                  height={400}
                  src={f.secure_url}
                  alt={f.original_filename ?? ""}
                  className="rounded-lg shadow-md object-cover"
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

// const _ = {
//   id: "uw-file6",
//   batchId: "uw-batch5",
//   asset_id: "2e3cf4fb7df0261d0b84212a1fc66aec",
//   public_id: "players/gallery/framer-motion-1_e9ktzy",
//   version: 1761433501,
//   version_id: "81de845e43a5890550b32e4308109e07",
//   signature: "423c36c2cbeb3060289be92b6ab751a985af3d5e",
//   width: 631,
//   height: 528,
//   format: "png",
//   resource_type: "image",
//   created_at: "2025-10-25T23:05:01Z",
//   tags: [],
//   bytes: 60640,
//   type: "upload",
//   etag: "fc21cb3316a01071025f361721f12134",
//   placeholder: false,
//   url: "http://res.cloudinary.com/dgp4vzn3m/image/upload/v1761433501/players/gallery/framer-motion-1_e9ktzy.png",
//   secure_url:
//     "https://res.cloudinary.com/dgp4vzn3m/image/upload/v1761433501/players/gallery/framer-motion-1_e9ktzy.png",
//   folder: "players/gallery",
//   access_mode: "public",
//   existing: false,
//   original_filename: "framer-motion-1",
//   path: "v1761433501/players/gallery/framer-motion-1_e9ktzy.png",
//   thumbnail_url:
//     "https://res.cloudinary.com/dgp4vzn3m/image/upload/c_limit,h_60,w_90/v1761433501/players/gallery/framer-motion-1_e9ktzy.png",
// };
