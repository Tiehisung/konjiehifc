"use client";

import MasonryGallery from "@/components/Gallery/Masonry";
import { IPlayer } from "@/types/player.interface";
import CloudinaryUploader from "@/components/cloudinary/FileUploadWidget";
import { useState } from "react";
import { ActionButton } from "@/components/buttons/ActionButton";
import { apiConfig } from "@/lib/configs";
import { ICldFileUploadResult } from "@/types/file.interface";

export function PlayerFeatureMedia({ player }: { player?: IPlayer }) {
  const [uploadedFile, setUploadedFile] = useState<ICldFileUploadResult | null>(
    null
  );
  return (
    <div className="p-6 grow min-h-44 my-10 w-full ring">
      

      {player?.featureMedia?.length && (
        <MasonryGallery files={player?.featureMedia ?? []} useSize />
      )}
    </div>
  );
}
