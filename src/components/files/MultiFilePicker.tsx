"use client";

import { LiaTimesSolid } from "react-icons/lia";
import { ChangeEvent, useEffect, useState } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import FileRenderer from "./FileRender";
import { Button } from "../buttons/Button";
import { getFilePath } from "@/lib";
import { TConvertedFile } from "@/types";

export type TFilePicker = {
  fileStyles?: string;
  className?: string;
  fileWrapperStyles?: string;
  exportFiles: (f: TConvertedFile[]) => void;
  uniqueId?: string;
  accept?: string;
};
export default function MultiFilePicker({
  fileStyles,
  fileWrapperStyles,
  className,
  uniqueId = "input-file",
  accept = "image/*",
  exportFiles,
}: TFilePicker) {
  const [localFiles, setLocalFiles] = useState<Array<File> | []>([]);
  //On file selection
  const handleSelection = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLocalFiles((p) => [...p, file]);
  };

  useEffect(() => {
    const converted: TConvertedFile[] = [];
    async function handleConversion() {
      for (const file of localFiles) {
        const f = await getFilePath(file);
        converted.push({ name: file.name, path: f, type: file.type });
      }
      exportFiles(converted);
    }
    handleConversion();
  }, [localFiles]);

  const hasFiles = localFiles.length > 0;
  return (
    <div className={` rounded p-4 border ${className} ${hasFiles && "  "}`}>
      <section
        className={`relative group flex flex-wrap gap-2 mb-7 w-full  ${
          hasFiles && " bg-white border "
        } ${fileWrapperStyles}`}
      >
        <ul className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 container">
          {localFiles.map((file, i: number) => (
            <li key={i} className="relative w-full h-auto shadow-sm border">
              <FileRenderer localFile={file} className={fileStyles} />

              <div className=" flex items-center gap-4 max-w-full max-h-8 bg-liteGrey/80 line-clamp-1 text-xs font-light absolute bottom-3 left-3 text-gray-950 border border-mediumGrey/50 rounded-full pl-4 ">
                {file?.name}
                <Button
                  primaryText=""
                  title="Remove"
                  className="tooltip-bottom tooltip-warning text-Red rounded-r-full hover:scale-110 hover:transform hover:bg-mediumGrey p-1"
                >
                  <LiaTimesSolid
                    size={24}
                    role="button"
                    onClick={() =>
                      setLocalFiles(
                        localFiles.filter((_, index) => index !== i)
                      )
                    }
                  />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Picker */}
      <section
        className={`flex items-center gap-2 w-full ${
          hasFiles ? "justify-end" : "justify-center"
        }`}
      >
        <span>
          {localFiles.length == 0 ? "None" : localFiles.length + " files"}
        </span>
        <label
          data-tip="Add file"
          htmlFor={uniqueId}
          className="_p primary__btn flex gap-2 items-center shadow w-fit p-1 rounded cursor-pointer tooltip "
        >
          <AiOutlineFileAdd size={24} /> Add file
          <input
            id={uniqueId}
            type="file"
            accept={accept ?? "image/*"}
            onChange={handleSelection}
            name="image"
            className={`max-w-52 text-sm invisible w-0 file:text-transparent `}
          />
        </label>
      </section>
    </div>
  );
}
