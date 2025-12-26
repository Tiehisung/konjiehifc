"use client";

import BottomSheetModal from "./modals/BottomSheet";
import { ReactNode } from "react";
import Image from "next/image";
import { useGetViewportWidth } from "@/hooks/windowXY";
import { getFileExtension, openFileInTab } from "@/lib/file";

const FilePreviewModal = ({
  url,
  trigger = "Preview",
  className = " _label _secondaryBtn",
  type = "any",
  fileClassName,
  modalClassName = "z-[100]",
}: {
  url: string;
  title: string;
  trigger?: ReactNode;
  className?: string;
  type?: "image" | "video" | "pdf" | "any";
  fileClassName?: string;
  modalClassName?: string;
}) => {
  //Open all pdf in new tab for small screen
  const extension = getFileExtension(url);

  const viewport = useGetViewportWidth();

  if (extension.includes("pdf") && viewport <= 768) {
    return (
      <span
        onClick={() => openFileInTab(url)}
        className={`flex items-center gap-1 cursor-pointer ${className}`}
        title="Open file"
      >
        <span>{trigger}</span>
      </span>
    );
  }
  return (
    <BottomSheetModal
      id={`${url}`}
      trigger={
        <span
          className={`flex items-center gap-1 ${className}`}
          title="Open file"
        >
          <span>{trigger}</span>
        </span>
      }
      className={`relative ${modalClassName}`}
    >
      {type == "image" && (
        <Image
          alt=""
          src={url}
          className={fileClassName}
          width={500}
          height={500}
        />
      )}
      {type == "video" && <video src={url} className={fileClassName} />}
      {(type == "pdf" || type == "any") && (
        <>
          <iframe
            src={url}
            className={`min-h-[80vh] h-fit min-w-[75vw] w-fit aspect-square z-1 ${fileClassName}`}
          />
        </>
      )}
    </BottomSheetModal>
  );
};

export default FilePreviewModal;
