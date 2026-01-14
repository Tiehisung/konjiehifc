"use client";

import MasonryGallery from "@/components/Gallery/Masonry";
import { IPlayer } from "@/types/player.interface";
import CloudinaryUploader from "@/components/cloudinary/FileUploadWidget";
import { useState } from "react";
import { ActionButton } from "@/components/buttons/ActionButton";
import { apiConfig } from "@/lib/configs";
import { ICldFileUploadResult } from "@/types/file.interface";
import { Button } from "@/components/buttons/Button";

export function PlayerFeatureMedia({ player }: { player?: IPlayer }) {
  const [uploadedFile, setUploadedFile] = useState<ICldFileUploadResult | null>(
    null
  );
  return (
    <div className="p-6 grow min-h-44 my-10 w-full ">
      <h3 className="text-lg font-semibold mb-4"> Featured Media</h3>
      <div className="flex flex-col gap-6 mb-6 ">
        <CloudinaryUploader
          triggerId="feature-image"
          setUploadedFiles={(fs) => setUploadedFile(fs?.[0])}
          maxFiles={1}
          multiple={false}
          trigger={<span className="_secondaryBtn">Add Feature Media</span>}
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
        <MasonryGallery
          files={player?.featureMedia ?? []}
          useSize
          action={(f) => (
            <div className='space-y-1.5'>
              <ActionButton
                method={"PUT"}
                primaryText="Set as Wallpaper"
                loadingText="Finalizing..."
                uri={`${apiConfig.players}/${player?._id}`}
                body={{
                  featureMedia: [
                    f,
                    ...(player?.featureMedia?.filter(
                      (m) => m.public_id !== f.public_id
                    ) ?? []),
                  ],
                }}
                variant="secondary"
                className="w-full _hover"
              />
              <ActionButton
                method={"PUT"}
                primaryText="Delete"
                loadingText="Wait..."
                uri={`${apiConfig.players}/${player?._id}`}
                body={{
                  featureMedia: [
                    
                    ...(player?.featureMedia?.filter(
                      (m) => m.public_id !== f.public_id
                    ) ?? []),
                  ],
                }}
                variant="secondary"
                className="w-full _hover"
              />
            </div>
          )}
        />
      )}
    </div>
  );
}
