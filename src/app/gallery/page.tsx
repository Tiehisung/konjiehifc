// import HEADER from "@/components/Element";
import React from "react";
import GalleryClient from "./Client";
import { IGalleryProps, IQueryResponse, IRecord } from "@/types";
import InfiniteLimitScroller from "@/components/InfiniteScroll";
import { IntroSection } from "@/components/IntroSection";
import { staticImages } from "@/assets/images";
import { GrGallery } from "react-icons/gr";
import { buildQueryStringServer } from "@/lib";
import { getGallery } from "../admin/galleries/page";

interface IProps {
  params: Promise<{ newsId: string }>;
  searchParams: Promise<IRecord>;
}

const GalleryPage = async ({ searchParams }: IProps) => {
  const qs = buildQueryStringServer(await searchParams);
  const galleries: IQueryResponse<IGalleryProps[]> = await getGallery(qs);

  return (
    <div>
      {/* <HEADER
        title="Gallery"
        subtitle="Explore our galleries "
        isPage={false}
      /> */}
      <IntroSection
        image={staticImages.ronaldo}
        title="Gallery"
        subtitle="Capture and relive your best moments"
        icon={<GrGallery />}
        className="rounded-b-2xl"
      />
      <GalleryClient galleries={galleries} />
      <InfiniteLimitScroller pagination={galleries?.pagination} />
    </div>
  );
};

export default GalleryPage;
