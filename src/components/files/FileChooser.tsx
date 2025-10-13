"use client";

import { generateLocalPaths } from "@/lib/file-handlers";
import { ChangeEvent, useState } from "react";
import { AiOutlineAudio } from "react-icons/ai";
import { GrFormAttachment } from "react-icons/gr";
import { FaImage, FaVideo } from "react-icons/fa";
import { BsFileEarmark } from "react-icons/bs";
import HideOnClickOutside from "../HideOnClickOutside";

interface FileChooserCpProps {
  setLocalFilePaths: (paths: string[]) => void;
  disabled?: boolean;
  allowAny?: boolean;
}

export default function FileChooserCp({
  setLocalFilePaths,
  disabled = false,
  allowAny = true,
}: FileChooserCpProps) {
  const [showFileTypes, setShowFileType] = useState(false);

  const [fileType, setFileType] = useState("image/*");

  //onChange eventhandler
  function handleFileInput(e:ChangeEvent<HTMLInputElement>) {
    const myfiles = e.target.files;
    generateLocalPaths({
      files: myfiles,
      setLocalPaths: setLocalFilePaths,
    });
  }

  return (
    <>
      <div className="relative w-fit flex flex-col ">
        {/* Filetype */}
        <HideOnClickOutside className="z-10" setIsVisible={setShowFileType}>
          <button
            onClick={() => setShowFileType((prev) => !prev)}
            type="button"
            className="secondary__btn px-2 h-9 text-yellow-50 text-sm rounded flex items-center gap-2"
            disabled={disabled}
            title="Attach files"
          >
            <GrFormAttachment size={30} />
            <span className="max-md:hidden">Attach files </span>
          </button>

          <div
            className={`absolute bottom-full opacity-0 max-w-[120px] z-20 border flex flex-col p-2 rounded-md bg-gray-100 shadow-md shadow-black ${
              showFileTypes
                ? " transform duration-300 delay-150 opacity-100 scale-105"
                : "scale-0"
            }`}
          >
            <input
              id="file-chooser"
              type="file"
              accept={fileType || "/*"}
              onChange={handleFileInput}
              multiple
              hidden
              className=""
            />

            {/* VIDEO -------------------------*/}
            <label
              onClick={() => {
                setShowFileType(false);
                setFileType("video/*");
              }}
              className="feel__natural py-3 px-3  flex gap-3 items-center w-[100px]"
              htmlFor="file-chooser"
            >
              <FaVideo /> Video
            </label>

            {/* AUDIO ---------------------------*/}
            <label
              onClick={() => {
                setShowFileType(false);
                setFileType("audio/*");
              }}
              className="feel__natural py-3 px-3  flex gap-3 items-center w-[100px]"
              htmlFor="file-chooser"
            >
              <AiOutlineAudio /> Audio
            </label>

            {/* IMAGE ----------------------------*/}
            <label
              onClick={() => {
                setShowFileType(false);
                setFileType("image/*");
              }}
              className="feel__natural py-3 px-3  flex gap-3 items-center w-[100px]"
              htmlFor="file-chooser"
            >
              <FaImage /> Image
            </label>

            {/* ANY ----------------------------*/}
            <label
              onClick={() => {
                setShowFileType(false);
                setFileType("");
              }}
              className={`feel__natural py-3 px-3 gap-3 items-center w-[100px] ${
                allowAny ? "flex" : "hidden"
              }`}
              htmlFor="file-chooser"
            >
              <BsFileEarmark /> Any
            </label>
          </div>
        </HideOnClickOutside>

        <br />
      </div>
    </>
  );
}
