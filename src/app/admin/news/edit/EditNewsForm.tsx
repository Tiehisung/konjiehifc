"use client";

import React, { useState } from "react";
import {
  useForm,
  Controller,
  useFieldArray,
  SubmitHandler,
} from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Input } from "@/components/input/Inputs";
import { Button } from "@/components/buttons/Button";
import { apiConfig } from "@/lib/configs";
import { IResultProps } from "@/types";
import { IFileProps } from "@/types/file.interface";
import { Plus, X } from "lucide-react";
import CloudinaryUploader from "@/components/cloudinary/FileUploadWidget";
import { CgAttachment, CgRemove } from "react-icons/cg";
import QuillEditor from "@/components/editor/Quill";
import { INewsProps } from "@/types/news.interface";
import Image from "next/image";
import FileRenderer from "@/components/files/FileRender";
import { ICldFileUploadResult } from "@/types/file.interface";

interface IPostNews {
  details: {
    text?: string;
    media?: ICldFileUploadResult[];
  }[];

  headline: {
    text: string;
    image: string;
    hasVideo?: boolean;
    sponsor?: Partial<IFileProps>;
  };

  metaDetails?: unknown;
  reporter?: {
    name: string;
    avatar: string;
  };
  isPublished?: boolean;
  type?: "squad" | "signing" | "match" | "training" | "general";
}

interface INewsForm {
  newsItem?: INewsProps;
}

export const EditNewsForm = ({ newsItem }: INewsForm) => {
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);

  /** -------------------------
   *  CLEAN DEFAULT VALUES
   ------------------------- **/
  const defaultValues: IPostNews = {
    headline: newsItem?.headline || { text: "", image: "" },
    details:
      newsItem?.details?.map((d) => ({
        text: d.text || "",
        media: (d.media as ICldFileUploadResult[]) || [],
      })) || [],
  };

  const { control, handleSubmit, watch, setValue } = useForm<IPostNews>({
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "details",
  });

  const details = watch("details");

  /** -------------------------
   *  SUBMIT HANDLER
   ------------------------- **/
  const onSubmit: SubmitHandler<IPostNews> = async (data) => {
    try {
      setWaiting(true);
      const res = await fetch(`${apiConfig.news}/${newsItem?._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, _id: newsItem?._id }),
      });

      const result: IResultProps = await res.json();
      if (result.success) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error("Failed to edit news");
    } finally {
      setWaiting(false);
    }
  };

  /** -------------------------
   *  DEDUPE FUNCTION
   ------------------------- **/
  const dedupeFiles = (files: ICldFileUploadResult[]) => {
    return Array.from(new Map(files.map((f) => [f.secure_url, f])).values());
  };
  const [headlineImages, setHeadlineImages] = useState<string[]>([
    newsItem?.headline?.image as string,
  ]);
  /** -------------------------
   *  RENDER
   ------------------------- **/
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-6">
      {/* -----------------------------------------
          HEADLINE SECTION
      ------------------------------------------ */}
      <header className="border-b-2 grid gap-4 py-4 mb-6 px-2 border-primary">
        <Controller
          name="headline.text"
          control={control}
          rules={{ required: "Headline is required" }}
          render={({ field }) => (
            <Input
              {...field}
              label="Headline text"
              placeholder="Type headline here..."
              labelStyles="mb-3"
            />
          )}
        />

        <Controller
          name="headline.image"
          control={control}
          render={({ field }) => (
            <div className="grow w-full">
              {field.value && (
                <Image
                  width={1000}
                  height={500}
                  alt="headline"
                  src={field.value}
                  className="w-full min-w-64 bg-cover object-cover aspect-5/3"
                />
              )}
              <br />
              <CloudinaryUploader
                setUploadedFiles={(files) => {
                  field.onChange(files?.[0]?.secure_url);
                  setHeadlineImages(
                    [
                      newsItem?.headline?.image as string,
                      ...files?.map((f) => f.secure_url),
                    ].filter(Boolean)
                  );
                }}
                successMessage=""
                maxFiles={1}
                trigger={
                  <span className="_secondaryBtn text-sm">
                    <CgAttachment size={24} /> Upload Wall Image
                  </span>
                }
                folder={`news/media-${new Date().getFullYear()}`}
                hidePreview={true}
              />

              <br />
              <hr />
              <div className="flex gap-3 flex-wrap border-t pt-3">
                {headlineImages?.map((img, i) => (
                  <Image
                    alt={`img${i}` as string}
                    key={`img${1}`}
                    src={img}
                    width={150}
                    height={120}
                    className="w-20 h-12 rounded shadow _hover _shrink"
                    onClick={() => field.onChange(img)}
                  />
                ))}
              </div>
            </div>
          )}
        />
      </header>

      {/* -----------------------------------------
          DETAILS SECTION
      ------------------------------------------ */}
      <h1 className="_subtitle">Details</h1>

      <main className="space-y-10 divide-y-2 divide-primary">
        {fields.map((item, index) => (
          <div key={item.id} className="py-4">
            {/* TEXT EDITOR */}
            <Controller
              control={control}
              name={`details.${index}.text`}
              render={({ field }) => (
                <QuillEditor
                  value={field.value || ""}
                  onChange={field.onChange}
                  className="w-full"
                />
              )}
            />

            {/* EXISTING MEDIA */}
            <div className="flex flex-wrap gap-3 mt-4">
              {details?.[index]?.media?.map((file, mediaIdx) => (
                <div key={mediaIdx} className="relative">
                  <FileRenderer file={file as unknown as IFileProps} controls />

                  <Button
                    onClick={() => {
                      const newMedia = [...(details?.[index]?.media ?? [])];
                      newMedia.splice(mediaIdx, 1);
                      setValue(`details.${index}.media`, newMedia);
                    }}
                    className="absolute top-1 right-1 bg-red-500 hover:bg-red-400 text-white rounded-full p-1"
                  >
                    <X size={14} />
                  </Button>
                </div>
              ))}
            </div>

            {/* UPLOAD MEDIA */}
            <div className="flex justify-between items-center mt-3">
              <Controller
                control={control}
                name={`details.${index}.media`}
                render={({ field }) => (
                  <CloudinaryUploader
                    setUploadedFiles={(newFiles) => {
                      const normalized = newFiles.map((f) => ({
                        secure_url: f.secure_url,
                        public_id: f.public_id,
                        format: f.format,
                        resource_type: f.resource_type,
                      })) as ICldFileUploadResult[];

                      const merged = [...(field.value || []), ...normalized];
                      field.onChange(dedupeFiles(merged));
                    }}
                    successMessage=""
                    maxFiles={12}
                    folder={`news/media-${new Date().getFullYear()}`}
                    hidePreview={(field?.value?.length ?? 0) === 0}
                    trigger={
                      <span className="mr-auto _secondaryBtn">
                        <CgAttachment size={24} /> Add Media
                      </span>
                    }
                  />
                )}
              />

              <Button
                primaryText="Remove"
                onClick={async () => remove(index)}
                className="text-red-400 text-xs _deleteBtn"
              >
                <CgRemove />
              </Button>
            </div>
          </div>
        ))}

        {/* ADD NEW DETAIL BLOCK */}
        <div className="flex justify-center">
          <button
            onClick={() => append({ text: "", media: [] })}
            className="rounded-full p-3 border _borderColor bg-gray-700 text-white hover:opacity-90"
            type="button"
          >
            <Plus />
          </button>
        </div>
      </main>

      {/* SUBMIT */}
      <Button
        type="submit"
        primaryText="Save Changes"
        waiting={waiting}
        disabled={waiting}
        waitingText="Updating..."
        className="_primaryBtn p-3 ml-auto w-full justify-center h-12 uppercase"
      />
    </form>
  );
};
