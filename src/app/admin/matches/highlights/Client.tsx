"use client";

import LightboxViewer from "@/components/viewer/LightBox";
import { getVideoThumbnail } from "@/lib/file";
import { IQueryResponse } from "@/types";
import { IMatchHighlight } from "@/types/match.interface";
import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Props {
  highlights?: IQueryResponse<IMatchHighlight[]>;
}

export const MatchHighlights = ({ highlights }: Props) => {
  const [activeVideo, setActiveVideo] = useState<IMatchHighlight | null>(null);

  if (!highlights?.data?.length) {
    return (
      <div className="text-center text-gray-500 py-10">
        No match highlights yet.
      </div>
    );
  }

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
        {highlights?.data?.map((video, i) => (
          <div
            key={video?._id ?? "" + i}
            onClick={() => setActiveVideo(video)}
            className="group relative cursor-pointer rounded-xl overflow-hidden bg-modalOverlay shadow-lg hover:scale-[1.02] transition"
          >
            <Image
              src={
                getVideoThumbnail(video?.public_id, { second: 4 }) ||
                (video?.thumbnail_url as string)
              }
              width={600}
              height={340}
              quality={100}
              unoptimized
              alt={video?.title}
              className="w-full h-48 object-cover opacity-80 group-hover:opacity-60 transition"
            />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-Orange/20 p-4 rounded-full">
                <Play className="w-8 h-8 text-Red" />
              </div>
            </div>

            {/* Title */}
            <div className="absolute bottom-0 w-full p-3 bg-linear-to-t from-black/80 to-transparent">
              <p className="text-white font-normal text-sm truncate">
                {video?.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <LightboxViewer
          open={true}
          onClose={() => setActiveVideo(null)}
          files={[
            activeVideo,
            ...highlights?.data?.filter((h) => h._id !== activeVideo?._id),
          ]?.map((v) => ({
            type: "video",
            src: v.secure_url,
            width: v.width,
            height: v.height,
            alt: v.name ?? v.original_filename,
          }))}
          index={0}
        />
      )}
    </>
  );
};
