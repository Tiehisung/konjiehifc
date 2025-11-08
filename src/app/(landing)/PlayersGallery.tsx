"use client";

import { MediaPreview } from "@/components/files/MediaView";
import { IGalleryProps, IQueryResponse } from "@/types";
import { useState } from "react";
import { MotionWrapper } from "@/components/Animate/MotionWrapper";
import { AnimateOnView } from "@/components/Animate/AnimateOnView";
import CardCarousel from "@/components/carousel/cards";

export function HomePlayersGallery({
  galleries,
  initialCount = 10,
}: {
  galleries?: IQueryResponse<IGalleryProps[]>;
  initialCount?: number;
}) {
  const [limit, setLimit] = useState(initialCount);

  console.log({ galleries });

  return (
    <section className="space-y-3">
      {/* Media grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {galleries?.data?.slice(0, limit)?.map((galF, i) => (
          <MotionWrapper key={galF?._id}>
            <AnimateOnView index={i}>
              <CardCarousel
                effect="creative"
                cards={galF?.files?.map((f) => (
                  <MediaPreview file={f} key={f.secure_url} />
                ))}
              />
            </AnimateOnView>
          </MotionWrapper>
        ))}

        {(galleries?.data?.length ?? 0) > limit && (
          <div
            onClick={() => setLimit((p) => p + 5)}
            className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-semibold text-muted-foreground"
          >
            +{(galleries?.data?.length ?? 0) - limit} more
          </div>
        )}
      </div>

      {/* Description */}

      <p className="text-sm text-muted-foreground line-clamp-3">
        Our galleries
      </p>

      {/* Tags */}
      {/* <div className="flex flex-wrap gap-1">
        {galleries?.data
          ?.filter((p) => p?.captaincy)
          ?.map((pl) => (
            <Badge key={pl._id} variant="outline">
              #{pl.captaincy}
              {pl.firstName}
            </Badge>
          ))}
      </div> */}
    </section>
  );
}
