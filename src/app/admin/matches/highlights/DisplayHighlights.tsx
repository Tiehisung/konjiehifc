"use client";

import { icons } from "@/assets/icons/icons";
import { auth } from "@/auth";
import { Button } from "@/components/buttons/Button";
import { ConfirmActionButton } from "@/components/buttons/ConfirmAction";
import { PrimaryDropdown } from "@/components/Dropdown";
import { POPOVER } from "@/components/ui/popover";
import LightboxViewer from "@/components/viewer/LightBox";
import { apiConfig } from "@/lib/configs";
import { downloadFile } from "@/lib/file";
import { getVideoThumbnail } from "@/lib/file";
import { IQueryResponse } from "@/types";
import { IMatchHighlight } from "@/types/match.interface";
import { ISession } from "@/types/user";
import { Download, Play } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

interface Props {
  highlights?: IQueryResponse<IMatchHighlight[]>;
}

export const MatchHighlights = ({ highlights }: Props) => {
  const [activeVideo, setActiveVideo] = useState<IMatchHighlight | null>(null);

  if (!((highlights?.data?.length ?? 0) > 0)) {
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
            className="group relative cursor-pointer rounded-xl overflow-hidden bg-modalOverlay shadow-lg hover:scale-[1.01] transition"
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

            <HighlightMediaActions highlight={video} />
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
            ...(highlights?.data?.filter((h) => h._id !== activeVideo?._id) ??
              []),
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

export const HighlightMediaActions = ({
  highlight,
}: {
  highlight?: IMatchHighlight;
}) => {
  const { data: session } = useSession();
  if (!(session as ISession)?.user?.role?.includes("admin")) return null;
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition"
    >
      <POPOVER
        variant={"secondary"}
        className="h-fit "
        triggerClassNames="rounded-full w-7 h-7"
      >
        <Button
          onClick={() =>
            downloadFile(
              highlight?.secure_url || "",
              highlight?.original_filename as string
            )
          }
          className="flex items-center gap-1 _hover p-1.5 px-3.5 w-full justify-start"
          variant={"ghost"}
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>

        <ConfirmActionButton
          title={`Delete - ${highlight?.title}`}
          primaryText={"Delete"}
          method={"DELETE"}
          confirmText="Do you want to delete this highlight?"
          uri={`${apiConfig.highlights}/${highlight?._id}`}
          className="h-fit w-full"
          variant="destructive"
          confirmVariant={"delete"}
          trigger={
            <>
              <icons.trash /> Delete
            </>
          }
          triggerStyles="px-6 w-full justify-start"
          escapeOnEnd
        />
      </POPOVER>
    </div>
  );
};
