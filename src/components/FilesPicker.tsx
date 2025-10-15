"use client";

import { Button } from "@/components/buttons/Button";
import Image from "next/image";
import { CgClose } from "react-icons/cg";
import Loader from "./Loader";
import { getFilePath } from "@/lib";
import { ChangeEvent } from "react";
import { TConvertedFile } from "@/types";

interface FilesPickerProps {
  fileStyles?: string;
  wrapperStyles?: string;
  convertedFiles: TConvertedFile[];
  setConvertedFiles: (files: TConvertedFile[]) => void;
  // setConvertedFiles: React.Dispatch<React.SetStateAction<TConvertedFile[]>>;
  hiddenFilesAfterUpload?: TConvertedFile[];
  nowUploading?: TConvertedFile | null;
  inputId: string;
}

export default function FilesPicker({
  fileStyles,
  wrapperStyles,
  convertedFiles,
  setConvertedFiles,
  hiddenFilesAfterUpload = [],
  nowUploading = null,
  inputId,
}: FilesPickerProps) {
  //On file selection
  const handleFileSelection = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      for (const file of Array.from(selectedFiles)) {
        const filePath = await getFilePath(file);
        setConvertedFiles([
          ...convertedFiles,
          {
            name: file.name.substring(0, file.name.lastIndexOf(".")),
            type: file.type.split("/")[0],
            path: filePath,
          },
        ]);
      }
    }
  };

  return (
    <div className={`py-4 ${wrapperStyles}`}>
      <section
        className={` flex-wrap gap-2 py-2  ${
          convertedFiles?.length == 0 ? "hidden" : "flex"
        }  `}
      >
        {convertedFiles?.map((file, index) => (
          <div
            key={index}
            hidden={hiddenFilesAfterUpload?.includes(file)}
            className={`relative group `}
          >
            <Button
              className="_secondaryBtn hidden group-hover:flex absolute right-1 top-1 bg-conic font-semibold opacity-90 hover:opacity-100  p-1 shadow cursor-pointer z-10"
              title="Remove"
              onClick={() =>
                setConvertedFiles(convertedFiles.filter((cf) => cf !== file))
              }
              disabled={nowUploading == file}
            >
              <CgClose />
            </Button>

            {file.type.includes("image") && (
              <Image
                src={file.path}
                width={400}
                height={400}
                className={`bg-gray-400 ${fileStyles}`}
                alt="filetoupload"
              />
            )}
            {(file.type.includes("video") || file.type.includes("audio")) && (
              <video src={file.path} controls className={` ${fileStyles}`} />
            )}
            <h2 className="w-20 truncate text-xs font-light absolute bottom-0 pl-1 ">
              {file.name}
            </h2>
            <Loader
              className={`absolute text-sm text-teal-400 top-[20%] left-1/3 ${
                nowUploading !== file && "hidden"
              }`}
              iconStyles={"h-20 w-20"}
              message="Uploading..."
            />
          </div>
        ))}
      </section>

      <header className="flex flex-wrap items-center gap-3">
        <label
          htmlFor={inputId}
          className="flex gap-2 items-center shadow w-fit p-1 rounded cursor-pointer _secondaryBtn"
          title="Choose file"
        >
          <input
            id={inputId}
            type="file"
            multiple
            onChange={handleFileSelection}
            name="image"
            className="max-w-52 text-sm"
          />
        </label>

        <Button
          primaryText={"Clear files"}
          className=" text-sm _deleteBtn"
          onClick={() => setConvertedFiles([])}
        />
      </header>
    </div>
  );
}
