import GalleryClient from "./Client";
import { IGalleryProps, IQueryResponse, IRecord } from "@/types";
import InfiniteLimitScroller from "@/components/InfiniteScroll";
import { IntroSection } from "@/components/IntroSection";
import { staticImages } from "@/assets/images";
import { GrGallery } from "react-icons/gr";
import { buildQueryStringServer } from "@/lib";
import { getGallery } from "../admin/galleries/page";
import { GalleryUpload } from "@/components/Gallery/GalleryUpload";
import { getPlayers } from "../admin/players/page";
import { IPlayer } from "@/types/player.interface";
import { auth } from "@/auth";
import { ISession } from "@/types/user";

interface IProps {
  params: Promise<{ newsId: string }>;
  searchParams: Promise<IRecord>;
}

const GalleryPage = async ({ searchParams }: IProps) => {
  const qs = buildQueryStringServer(await searchParams);
  const galleries: IQueryResponse<IGalleryProps[]> = await getGallery(qs);
  const players: IQueryResponse<IPlayer[]> = await getPlayers();
  const featureImage =
    galleries?.data?.[0]?.files?.find((f) => f.resource_type === "image")
      ?.secure_url ?? staticImages.ballOnGrass.src;

  const session = (await auth()) as ISession | null;

  const isAdmin = session?.user?.role?.includes("admin");

  return (
    <div>
      <IntroSection
        image={featureImage}
        title="Gallery"
        subtitle="Capture and relive your best moments"
        icon={<GrGallery />}
        className="rounded-b-2xl py-6"
      >
        <br />
        {isAdmin && <GalleryUpload players={players?.data} />}
      </IntroSection>
      <GalleryClient galleries={galleries} />
      <InfiniteLimitScroller pagination={galleries?.pagination} />
    </div>
  );
};

export default GalleryPage;
