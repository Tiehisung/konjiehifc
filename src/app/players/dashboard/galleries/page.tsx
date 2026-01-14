import { getGallery } from "@/app/admin/galleries/page";
import { getPlayerById } from "@/app/admin/players/page";
import { auth } from "@/auth";
import { buildQueryStringServer } from "@/lib";
import { IPageProps, IQueryResponse } from "@/types";
import { IGallery } from "@/types/file.interface";
import { IPlayer } from "@/types/player.interface";
import { PlayerGalleriesClient } from "../Galleries";
import HEADER from "@/components/Element";

const PlayerGalleries = async ({ searchParams }: IPageProps) => {
  const session = await auth();
  const playerId = (await searchParams).playerId;

  const qs = buildQueryStringServer({
    ...(await searchParams),
    tags: [playerId as string, session?.user?.name].filter(Boolean).join(","),
  });

  console.log({ qs });

  const player: IPlayer = await getPlayerById(session?.user?.email as string);

  const galleries: IQueryResponse<IGallery[]> = await getGallery(qs);

  console.log({ galleries });
  return (
    <div className="_page">
      <HEADER title="My Galleries" subtitle="Manage your own galleries" />
      <PlayerGalleriesClient player={player} galleries={galleries} />
    </div>
  );
};

export default PlayerGalleries;
