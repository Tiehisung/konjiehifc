"use client";

import { useState, ReactNode, useEffect } from "react";
import { toast } from "sonner";
import { bytesToMB, getErrorMessage, getFilePath } from "@/lib";
import { OverlayLoader } from "@/components/loaders/OverlayLoader";
import { apiConfig } from "@/lib/configs";
import { useRouter } from "next/navigation";
import { IQueryResponse } from "@/types";
import { ICldFileUploadResult } from "./cloudinary/FileUploadWidget";
import { fireDoubleEscape } from "@/hooks/Esc";
import { validateFile } from "@/lib/file";
import { Upload } from "lucide-react";

export const DragAndDropUpload = ({
  onChange,
  className,
  fileType = "pdf",
  children,
  folder = "files",
  escapeOnEnd,
  exportRaw,
  maxFileSize = 100000000,
}: {
  onChange: (file: ICldFileUploadResult) => void;
  className?: string;
  error?: string;
  fileType: "image" | "pdf" | "video" | "all";
  children: ReactNode;
  folder?: string;
  escapeOnEnd?: boolean;
  maxFileSize?: number;
  exportRaw?: (file: File) => void;
}) => {
  const [file, setFile] = useState<File | null | undefined>(null);
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);

  const handleUpload = async () => {
    try {
      const { status, message } = validateFile(
        file as File,
        fileType,
        maxFileSize
      );

      if (!status) {
        toast.error(message);
        return;
      }

      setWaiting(true);

      const response = await fetch(apiConfig.fileUpload, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: file?.name,
          path: await getFilePath(file as File),
          preset: "konjiehifc",
          folder,
          presetType: "authenticated",
        }),
      });

      const result: IQueryResponse<ICldFileUploadResult> =
        await response.json();

      if (result.success) {
        setFile(null);
        toast.success(result.message);
        router.refresh();
        onChange(result?.data as ICldFileUploadResult);
        if (escapeOnEnd) fireDoubleEscape();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setWaiting(false);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      const { status, message } = validateFile(file, fileType, maxFileSize);
      if (status) {
        setFile(file);
      } else return toast.error(message);
    }
    setIsDragOver(false);
  };

  const [isDragOver, setIsDragOver] = useState(false);

  //Controller
  useEffect(() => {
    if (exportRaw) exportRaw(file as File);
    else {
      if (file) handleUpload();
      toast.loading("Uploading...", {
        description: file?.name,
        position: "bottom-right",
        dismissible: !waiting,
      });
    }
  }, [file, exportRaw]);
  return (
    <div
      className={`border-2 ${waiting && " pointer-events-none"} ${
        isDragOver ? " border-dotted border-Green" : "border-transparent"
      } ${className}`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDrop={handleDrop}
    >
      {children}
      {/* <OverlayLoader isLoading={waiting} /> */}
    </div>
  );
};
