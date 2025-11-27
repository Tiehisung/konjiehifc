"use client";

import { useState, useRef, ReactNode, useMemo } from "react";
import { toast } from "sonner";
import Loader from "@/components/loaders/Loader";
import { CircleCheck, Image, Upload, Video } from "lucide-react";
import { FcDocument } from "react-icons/fc";
import { TbPdf } from "react-icons/tb";
import { Button } from "@/components/buttons/Button";
import { BiError } from "react-icons/bi";
import { bytesToMB } from "@/lib";
import { OverlayLoader } from "@/components/loaders/OverlayLoader";

const DragAndDropUpload = ({
  name,
  onChange,
  label,
  className,
  wrapperStyles,
  isUploading,
  error,
  value,
  required = false,
  accept = "application/pdf",
}: {
  name: string;
  onChange: (file: File) => void;
  label?: ReactNode;
  wrapperStyles?: string;
  className?: string;
  isUploading: boolean;
  error?: string;
  value?: File | null;
  required?: boolean;
  accept?: string;
}) => {
  const [file, setFile] = useState<File | null | undefined>(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useMemo(() => {
    if (!value) {
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [value]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (isValidFile(file)) {
        setFile(event.target.files[0]);
        onChange(event.target.files[0]);
      }
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      if (isValidFile(file)) {
        setFile(file);
        onChange(file);
      }
    }
  };

  const isValidFile = (file: File) => {
    if (bytesToMB(file.size) > 2) {
      toast.error("File too large");
      return false;
    }
    if (!accept) {
      toast.error("Invalid file type: pdf accepted.");
      return false;
    }
    return true;
  };
  return (
    <div className={`w-full mx-auto select-none ${wrapperStyles}`}>
      <div className="_label mb-2">{label}</div>
      <input
        type="file"
        accept={accept}
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        id={name}
        name={name}
        required={required}
      />

      <div
        className={`max-sm:hidden border-2 border-dotted border-gray-400 p-6 rounded-lg text-center cursor-pointer hover:bg-gray-100 ${
          isUploading && " pointer-events-none"
        } ${className}`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {isUploading ? (
          <Loader message="Uploading..." />
        ) : (
          <>
            {file ? (
              <div className={`text-green-600 flex items-center gap-2 `}>
                <CircleCheck size={36} className={` `} />
                Upload: {file.name}{" "}
                {accept ? (
                  <FcDocument className=" ml-auto" />
                ) : accept == "pdf" ? (
                  <TbPdf className="text-error ml-auto" />
                ) : accept == "image" ? (
                  <Image className="text-error ml-auto" />
                ) : accept == "video" ? (
                  <Video className="text-error ml-auto" />
                ) : (
                  <FcDocument className="text-error ml-auto" />
                )}
              </div>
            ) : (
              <div className="text-gray-600 _label">
                <Upload
                  size={50}
                  className="mx-auto float-start bg-background p-2 rounded-full "
                />
                <p className="_p">
                  <span className="text-secondary">Click to upload</span>{" "}
                  <span className="max-sm:hidden">or drag and drop</span>
                </p>
                <p className="_small">.pdf or .doc (max 2MB)</p>
              </div>
            )}
          </>
        )}
      </div>
      {/* Mobile */}
      <div className="sm:hidden">
        <Button
          className={` border-border border rounded w-full _subtitle py-3 gap-3 ${
            isUploading && " pointer-events-none"
          } ${className}`}
          onClick={() => document.getElementById(name)?.click()}
          primaryText={isUploading ? "Uploading..." : "Choose File"}
        />
        <p className="_p my-2">PDF(max 2mb)</p>
      </div>
      {file && (
        <p className="_small opacity-50 line-clamp-1 text-right max-w-sm ">
          {file.name}
        </p>
      )}
      {error && (
        <div className="flex items-center gap-2 text-error _small line-clamp-1 text-right max-w-sm ">
          <BiError /> {error}
        </div>
      )}
    </div>
  );
};

export default DragAndDropUpload;

export const DragAndDropUploader = ({
  onChange,
  className,
  isUploading,
  accept = "application/pdf",
  children,
}: {
  onChange: (file: File) => void;
  className?: string;
  isUploading: boolean;
  error?: string;
  accept?: string;
  children: ReactNode;
}) => {
  const [file, setFile] = useState<File | null | undefined>(null);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      if (isValidFile(file)) {
        setFile(file);
        onChange(file);
      }
    }
  };

  const isValidFile = (file: File) => {
    if (bytesToMB(file.size) > 2) {
      toast.error("File too large");
      return false;
    }
    if (!accept) {
      toast.error("Invalid file type: pdf accepted.");
      return false;
    }
    return true;
  };
  const [isDragOver, setIsDragOver] = useState(false);
  return (
    <div
      className={`${isUploading && " pointer-events-none"} ${
        isDragOver ? "border-2 border-dotted border-Green" : ""
      } ${className}`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragExit={() => setIsDragOver(false)}
      onDrop={handleDrop}
    >
      {children}
      <OverlayLoader isLoading={isUploading} />
    </div>
  );
};
