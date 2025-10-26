"use client";

import { Button } from "@/components/buttons/Button";
import CloudinaryUploader, {
  ICldFileUploadResult,
} from "@/components/Cloudinary";
import { Input } from "@/components/input/Inputs";
import { getErrorMessage } from "@/lib";
import { apiConfig } from "@/lib/configs";
import { IGalleryProps, IQueryResponse } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, FormEvent } from "react";
import { toast } from "sonner";

export function PlayerGalleryUpload() {
  const router = useRouter();
  const [isLoading, setIsBusy] = useState(false);
  const searchParams = useSearchParams();
  const playerId = searchParams.get("playerId") || "";
  const [files, setFiles] = useState<ICldFileUploadResult[]>([]);

  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsBusy(true);
      const response = await fetch(apiConfig.galleries, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-cache",
        body: JSON.stringify({
          description,
          files: files.map((file) => ({ ...file, tags: [playerId] })),
          title,
          tags: [playerId],
        } as IGalleryProps),
      });
      const result: IQueryResponse = await response.json();
      toast.success(result.message);
      setDescription("");
      setFiles([]);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      router.refresh();
      setIsBusy(false);
    }
  };

  return (
    <div className="my-4">
      <CloudinaryUploader triggerId={""} onComplete={setFiles} />

      {files.length > 0 && (
        <form
          onSubmit={handleSave}
          className="mx-auto p-4 flex flex-col items-center "
        >
          <p>
            {files.length} file{files.length !== 1 ? "s" : ""} selected.
          </p>
          <Input
            onChange={(e) => setDescription(e.target.value)}
            name={"description"}
            value={description}
            placeholder="Description"
          />
          <Input
            onChange={(e) => setTitle(e.target.value)}
            name={"title"}
            value={description}
            placeholder="Title"
          />
          <Button
            type="submit"
            waiting={isLoading}
            className="mt-2 _primaryBtn h-12 w-48 justify-center"
            primaryText="Save Gallery"
          />
        </form>
      )}
    </div>
  );
}
