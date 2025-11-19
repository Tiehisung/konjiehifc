import HEADER from "@/components/Element";
import React from "react";
import GalleryClient from "./Client";
import { IGalleryProps, IQueryResponse } from "@/types";
import { getGalleries } from "../players/details/page";
import InfiniteLimitScroller from "@/components/InfiniteScroll";

const GalleryPage = async () => {
  const galleries: IQueryResponse<IGalleryProps[]> = await getGalleries();

  return (
    <div>
      <HEADER
        title="Gallery"
        subtitle="Explore our galleries "
        isPage={false}
      />
      <GalleryClient galleries={galleries} />
      <InfiniteLimitScroller pagination={galleries?.pagination} />
    </div>
  );
};

export default GalleryPage;
