"use client";

import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Input } from "@/components/input/Inputs";
import { Button } from "@/components/buttons/Button";
import { RemoveButton } from "@/components/buttons/DelClearRemove";
import { RichTextEditor } from "@/components/editor/TipTap";

import { getErrorMessage } from "@/lib";
import { apiConfig } from "@/lib/configs";
import { IFileProps, IResultProps } from "@/types";
import { Plus } from "lucide-react";
import CloudinaryUploader, {
  ICldFileUploadResult,
} from "@/components/cloudinary/FileUploadWidget";
import { useSession } from "next-auth/react";
import { CgAttachment } from "react-icons/cg";

export interface IPostNews {
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
  type?: "squad" | "signing" | "match" | "general";
}

const CreateNews = () => {
  const session = useSession();
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);

  const { control, handleSubmit, reset ,watch} = useForm<IPostNews>({
    defaultValues: {
      headline: { text: "", image: "" },
      details: [{ text: "<p>Start typing...</p><br/>" }],
      reporter: {
        name: session.data?.user?.name as string,
        avatar: session.data?.user?.image as string,
      },
    },
  });

 

  const { fields, append, remove } = useFieldArray({
    control,
    name: "details",
  });

  const onSubmit = async (data: IPostNews) => {
    try {
      console.log(data)
      setWaiting(true);
      const res = await fetch(apiConfig.news, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result: IResultProps = await res.json();
      if (result.success) {
        reset();
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error(getErrorMessage(err, "News post failed"));
    } finally {
      router.refresh();
      setWaiting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-6">
      {/* Headline Section */}
      <header className="border-b-2 grid gap-4 py-4 mb-6 border px-2 border-border">
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
            <CloudinaryUploader
              triggerId={""}
              setUploadedFiles={(fs) => field.onChange(fs?.[0].secure_url)}
              successMessage=""
              maxFiles={1}
              className=" mr-auto _secondaryBtn "
              trigger={
                <>
                  <CgAttachment size={24} /> Upload Wall Image
                </>
              }
              folder={`news/media-${new Date().getFullYear()}`}
              multiple={false}
              cropping
            />
          )}
        />
      </header>

      {/* Details Section */}
      <h1 className="_subtitle">Details</h1>
      <main className=" space-y-10 divide-y-2 divide-accent ">
        {fields.map((item, index) => (
          <div key={item.id} className="flex items-start gap-2 ">
            <div className="grow space-y-3">
              <Controller
                control={control}
                name={`details.${index}.text`}
                render={({ field }) => (
                  <RichTextEditor
                    value={field.value || ""}
                    onChange={field.onChange}
                    className="w-full grow"
                  />
                )}
              />

              <div className="flex justify-between items-center mb-2">
                <Controller
                  control={control}
                  name={`details.${index}.media`}
                  render={({ field }) => (
                    <CloudinaryUploader
                      triggerId={""}
                      setUploadedFiles={(fs) =>
                        field.onChange(fs.map((f) => f.secure_url))
                      }
                      successMessage=""
                      maxFiles={6}
                      className="hover:bg-accent p-1.5 rounded-md flex text-xs items-center font-light"
                      trigger={
                        <>
                          <CgAttachment size={24} /> Attach Media
                        </>
                      }
                      folder={`news/media-${new Date().getFullYear()}`}
                    />
                  )}
                />

                <RemoveButton
                  handleRemove={async () => remove(index)}
                  buttonText="Remove"
                  className="w-fit text-sm text-red-500 rounded-full _borderColor"
                />
              </div>
            </div>
          </div>
        ))}

        <div className="flex items-center gap-2 justify-center">
          <button
            onClick={() => append({ text: "", media: [] })}
            className="rounded-full p-3 border _borderColor hover:opacity-90 bg-gray-700 text-white dark:text-gray-950 dark:bg-gray-200 justify-center"
            title="Add Content"
            type="button"
          >
            <Plus />
          </button>
        </div>
      </main>

      <br />

      <Button
        type="submit"
        primaryText="Post news"
        waiting={waiting}
        disabled={waiting}
        waitingText="Posting..."
        className="_primaryBtn p-3 ml-auto w-full justify-center h-12 uppercase"
      />
    </form>
  );
};

export default CreateNews;
