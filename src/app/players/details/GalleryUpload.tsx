"use client";

import { Button } from "@/components/buttons/Button";
import CloudinaryUploader, {
  ICldFileUploadResult,
} from "@/components/Cloudinary";
import { getErrorMessage } from "@/lib";
import { apiConfig } from "@/lib/configs";
import { IGalleryProps, IQueryResponse } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function PlayerGalleryUpload() {
  const router = useRouter();
  const [isLoading, setIsBusy] = useState(false);
  const searchParams = useSearchParams();
  const playerId = searchParams.get("playerId") || "";
  const [files, setFiles] = useState<ICldFileUploadResult[]>([]);

  const handleSave = async () => {
    try {
      setIsBusy(true);
      const response = await fetch(apiConfig.galleries, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-cache",
        body: JSON.stringify({
          description: "gallery for player " + playerId,
          files: files.map((file) => ({ ...file, tags: [playerId] })),
          name: "test gallery",
          tags: [playerId],
        } as IGalleryProps),
      });
      const result: IQueryResponse = await response.json();
      toast.success(result.message);
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
        <div>
          {files.length} file{files.length !== 1 ? "s" : ""} selected.
          <Button
            waiting={isLoading}
            className="mt-2 _primaryBtn"
            primaryText="Save Gallery"
            onClick={handleSave}
          />
        </div>
      )}
    </div>
  );
}
