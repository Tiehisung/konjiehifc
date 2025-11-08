"use client";

import { useState, FormEvent, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ReactSelect from "react-select";
import { Button } from "@/components/buttons/Button";
import CloudinaryUploader, {
  ICldFileUploadResult,
} from "@/components/cloudinary/FileUploadWidget";
import { Input } from "@/components/input/Inputs";
import { apiConfig } from "@/lib/configs";
import { getErrorMessage } from "@/lib";
import { IGalleryProps, IQueryResponse } from "@/types";
import { IPlayer } from "@/app/players/page";

interface GalleryUploadProps {
  tags?: string[];
  players?: IPlayer[];
}

export function GalleryUpload({ tags = [], players = [] }: GalleryUploadProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<ICldFileUploadResult[]>([]);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [taggedPlayers, setTaggedPlayers] = useState<string[]>([]);
  const [clearTrigger, setClearTrigger] = useState(0);

  /** Reset form state */
  const resetForm = useCallback(() => {
    setDescription("");
    setTitle("");
    setFiles([]);
    setTaggedPlayers([]);
    setClearTrigger((n) => n + 1);
  }, []);

  /** Handle gallery save */
  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (files.length === 0) {
      toast.error("Please upload at least one file.");
      return;
    }

    try {
      setIsLoading(true);

      const payload: IGalleryProps = {
        title,
        description,
        files: files.map((file) => ({
          ...file,
          tags: [...tags].filter(Boolean),
        })),
        tags: [
          ...tags,
          ...taggedPlayers.map((t) => t.split(" ").flat()).flat(),
        ].filter(Boolean),
      };

      const response = await fetch(apiConfig.galleries, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-cache",
        body: JSON.stringify(payload),
      });

      const result: IQueryResponse = await response.json();
      if (result.success) {
        toast.success(result.message || "Gallery saved successfully!");
        resetForm();
        router.refresh();
      } else {
        toast.error(result.message || "Failed to save gallery");
      }
    } catch (error) {
      toast.error(getErrorMessage(error, "Something went wrong"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full border rounded-xl p-8 bg-card/30 shadow-sm space-y-8">
      <CloudinaryUploader
        triggerId=""
        setUploadedFiles={setFiles}
        successMessage="Gallery updated"
        clearTrigger={clearTrigger}
        maxFiles={16}
      />

      {files.length > 0 && (
        <form
          onSubmit={handleSave}
          className="flex flex-col gap-6 md:gap-8 max-w-2xl mx-auto"
        >
          <p className="text-sm text-muted-foreground text-center">
            {files.length} file{files.length !== 1 ? "s" : ""} selected
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              value={title}
              placeholder="Gallery title"
            />
            <Input
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              value={description}
              placeholder="Description"
            />
          </div>

          {players.length > 0 && (
            <div className="w-full">
              <p className="_label mb-2">Tag Players</p>
              <ReactSelect
                onChange={(selected) =>
                  setTaggedPlayers(selected.map((item) => item.value))
                }
                options={players.map((p) => ({
                  label: `${p.firstName} ${p.lastName}`,
                  value: `${p._id} ${p.firstName} ${p.lastName}`,
                }))}
                isMulti
                className="text-sm"
                placeholder="Select players to tag"
              />
            </div>
          )}

          <div className="flex justify-center">
            <Button
              type="submit"
              waiting={isLoading}
              waitingText="Saving..."
              primaryText="Save Gallery"
              className="_primaryBtn w-48 h-10 justify-center"
            />
          </div>
        </form>
      )}
    </div>
  );
}
