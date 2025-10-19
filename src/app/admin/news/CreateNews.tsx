"use client";

import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Input } from "@/components/input/Inputs";
import { Button } from "@/components/buttons/Button";
import { RemoveButton } from "@/components/buttons/DelClearRemove";
import SingleFilePicker from "@/components/files/SingleFilePicker";
import MultiFilePicker from "@/components/files/MultiFilePicker";
import { RichTextEditor } from "@/components/editor/TipTap";

import { getErrorMessage } from "@/lib";
import { apiConfig } from "@/lib/configs";
import { IResultProps, TConvertedFile } from "@/types";
import { Plus } from "lucide-react";

export interface IPostNews {
  headlineText: string;
  headlineImage: TConvertedFile | null;
  details: {
    text?: string;
    media?: TConvertedFile[];
  }[];
}

const CreateNews = () => {
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);

  const { control, handleSubmit, reset } = useForm<IPostNews>({
    defaultValues: {
      headlineText: "",
      headlineImage: null,
      details: [{ text: "<p>Start typing...</p><br/>" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "details",
  });

  // console.log(formState.errors);

  const onSubmit = async (data: IPostNews) => {
    try {
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
          name="headlineText"
          control={control}
          rules={{ required: "Headline is required" }}
          render={({ field }) => (
            <Input
              {...field}
              label="Headline text"
              placeholder="Type headline here..."
            />
          )}
        />

        <Controller
          name="headlineImage"
          control={control}
          render={({ field }) => (
            <div>
              <p className="_label">Wall image</p>
              <SingleFilePicker
                exportFile={(file) => field.onChange(file)}
                pickerId="news-headline"
                required
                className="border-none "
              />
            </div>
          )}
        />
      </header>

      {/* Details Section */}
      <h1 className="_subtitle">Details</h1>
      <main className=" space-y-16 p-4 divide-y-2 divide-accent">
        {fields.map((item, index) => (
          <div
            key={item.id}
            className="flex items-start gap-2 border-l-2 border-blue-200"
          >
            <RemoveButton
              handleRemove={async () => remove(index)}
              buttonText=""
              className="w-fit text-xl text-red-500 rounded-full _borderColor"
            />
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

              <Controller
                control={control}
                name={`details.${index}.media`}
                render={({ field }) => (
                  <MultiFilePicker
                    uniqueId={`media-${index}`}
                    exportFiles={(files) => field.onChange(files)}
                    className="mb-3"
                  />
                )}
              />
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
