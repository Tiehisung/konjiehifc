"use client";

import MasonryGallery from "@/components/Gallery/Masonry";
import { IPlayer } from "../page";
import CloudinaryUploader, {
  ICldFileUploadResult,
} from "@/components/cloudinary/FileUploadWidget";
import { useState } from "react";
import { ActionButton } from "@/components/buttons/ActionButton";
import { apiConfig } from "@/lib/configs";

export function PlayerFeatureMedia({ player }: { player?: IPlayer }) {
  const [uploadedFile, setUploadedFile] = useState<ICldFileUploadResult | null>(
    null
  );
  return (
    <div className="p-6 grow min-h-44 my-10 w-full ring">
      <div className="flex flex-col gap-6 mb-6 ">
        <CloudinaryUploader
          triggerId="feature-image"
          setUploadedFiles={(fs) => setUploadedFile(fs?.[0])}
          maxFiles={1}
          multiple={false}
          trigger={<span>Add Feature Media</span>}
          className="_secondaryBtn"
          clearTrigger={player?.featureMedia?.length as number}
        />

        {uploadedFile && (
          <ActionButton
            method={"PUT"}
            body={{
              featureMedia: [
                uploadedFile,
                ...(player?.featureMedia ?? []),
              ].filter(Boolean),
            }}
            primaryText="SAVE MEDIA"
            uri={`${apiConfig.players}/${player?._id}`}
            loadingText="SAVING..."
            className="w-52 justify-center"
          />
        )}
      </div>

      {player?.featureMedia?.length && (
        <MasonryGallery items={player?.featureMedia ?? []} useSize />
      )}
    </div>
  );
}
