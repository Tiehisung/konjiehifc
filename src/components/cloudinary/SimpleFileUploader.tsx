"use client";

import { staticImages } from "@/assets/images";
import { bytesToMB, getErrorMessage, getFilePath, shortText } from "@/lib";
import { apiConfig } from "@/lib/configs";
import { IQueryResponse } from "@/types";
import Image from "next/image";
import React, { ReactNode, useState } from "react";
import { FcCamera } from "react-icons/fc";
import { toast } from "sonner";
import { ICldFileUploadResult } from "./FileUploadWidget";
import { OverlayLoader } from "../loaders/OverlayLoader";

interface FileUploaderProps {
  initialFileUrl?: string;
  exportFileData: (data: ICldFileUploadResult) => void;
  className?: string;
  name: string;
  titleStyles?: string;
  folder?: string;
  trigger?: ReactNode;
  showName?: boolean;
  fileStyles?: string;
  maxSize?: number;
}

const FileUploader = ({
  initialFileUrl,
  exportFileData,
  className,
  name,
  maxSize = 3524000,
  folder,
  trigger = <FcCamera size={30} />,
  showName,
  fileStyles,
}: FileUploaderProps) => {
  const [waiting, setWaiting] = useState(false);

  const [uploadedFile, setUploadedFile] = useState<ICldFileUploadResult | null>(
    null
  );
  const currentSrc =
    uploadedFile?.secure_url || initialFileUrl || staticImages.avatar.src;
  console.log({ uploadedFile });

  async function handleImageSelection(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    try {
      setWaiting(true);
      const selectedFile = event.target.files ? event.target.files[0] : null;
      if (!selectedFile) return;
      if (selectedFile.size > maxSize) {
        toast.error(` File should not exceed ${bytesToMB(maxSize)}`);
        return;
      }

      const fileString = await getFilePath(selectedFile);

      //Now Upload
      if (fileString) {
        const upload = await fetch(apiConfig.fileUpload, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: selectedFile.name,
            path: fileString,
            type: "image",
            preset: "konjiehifc",
            folder: folder ?? "files",
            presetType: "authenticated",
          }),
        });
        const uploadRsp: IQueryResponse<ICldFileUploadResult> =
          await upload.json();
        if (!uploadRsp.success) {
          toast.error(uploadRsp.message, { position: "bottom-center" });
          setUploadedFile(null);
          return;
        }
        setUploadedFile(uploadRsp.data as ICldFileUploadResult);
        exportFileData(uploadRsp.data as ICldFileUploadResult);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setWaiting(false);
    }
  }
  return (
    <div
      className={`relative flex flex-col gap-1 justify-center items-center text-sm ${className}`}
    >
      <OverlayLoader isLoading={waiting} />
      <Image
        src={currentSrc}
        width={300}
        height={300}
        alt="desc image"
        className={`h-36 w-36 rounded-xl shadow ${fileStyles}`}
      />
      {showName && (
        <span className="text-sm line-clamp-1">
          {shortText(uploadedFile?.original_filename ?? "")}
        </span>
      )}
      <label
        htmlFor={`id${name}`}
        className="flex items-center shadow w-fit p-1 rounded mt-3 cursor-pointer"
        title="Choose file"
        aria-disabled={waiting}
      >
        {trigger}
        <input
          id={`id${name}`}
          hidden
          type="file"
          onChange={handleImageSelection}
          name="image"
          className=""
          accept="image/*"
          disabled={waiting}
        />
      </label>
    </div>
  );
};

export default FileUploader;
