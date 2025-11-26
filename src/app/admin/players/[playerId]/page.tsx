import { FaEdit } from "react-icons/fa";
import { ScrollToPointBtn } from "@/components/scroll/ScrollToPoint";
import { FcGallery } from "react-icons/fc";
import UpdatePlayerIssuesAndFitness from "./IssuesUpdate";
import { GiHealthNormal, GiPresent } from "react-icons/gi";
import { getPlayerById, getPlayers } from "../page";
import { RiDeleteBin2Line } from "react-icons/ri";
import PlayerProfileForm from "../NewSigningForms";
import Loader from "@/components/loaders/Loader";
import { ConfirmActionButton } from "@/components/buttons/ConfirmAction";
import { apiConfig } from "@/lib/configs";
import { IPlayer } from "@/app/players/page";
import GalleryGrid from "@/components/Gallery/GallaryGrid";
import { GalleryUpload } from "@/components/Gallery/GalleryUpload";
import { IGalleryProps, IQueryResponse } from "@/types";
import { getGallery } from "../../galleries/page";

export default async function PlayerProfilePage({
  params,
}: {
  params: Promise<{ playerId: string }>;
}) {
  const playerId = (await params).playerId;
  const player: IPlayer = await getPlayerById(playerId);

  const galleries: IQueryResponse<IGalleryProps[]> = await getGallery(
    `?tags=${[playerId].filter(Boolean).join(",")}`
  );
  const players: IQueryResponse<IPlayer[]> = await getPlayers();
  if (!player) return <Loader message="Loading player..." />;

  return (
    <main className="relative bg-cover py-8 ">
      {/* Cover image  */}

      <div
        className="h-screen w-full z-[-1] absolute inset-0 bottom-0 bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${
            player?.featureMedia?.[0]?.secure_url ?? player?.avatar
          })`,
        }}
      />

      {/*Nav Scroll controllers */}
      <div className="bg-[#000000ac] text-white w-full px-1 flex gap-2 overflow-x-auto sticky z-10 top-0 hidden__scrollbar">
        <ScrollToPointBtn
          sectionId={"edit-player"}
          className="flex gap-1 items-center shadow p-1 hover:text-blue-400 transition-transform"
          label={"Edit"}
        >
          <FaEdit />
        </ScrollToPointBtn>

        <ScrollToPointBtn
          sectionId={"fitness-update"}
          className="flex gap-1 items-center shadow p-1 hover:text-blue-400 transition-transform"
          label={"Fitness"}
        >
          <GiHealthNormal />
        </ScrollToPointBtn>

        <ScrollToPointBtn
          sectionId={"gallery"}
          className="flex gap-1 items-center shadow p-1 hover:text-blue-400 transition-transform"
          label={"Gallery"}
        >
          <FcGallery />
        </ScrollToPointBtn>

        <ScrollToPointBtn
          sectionId={"danger-zone"}
          className="flex gap-1 items-center shadow p-1 hover:text-blue-400 transition-transform"
          label={player?.isActive ? "Deactivate" : "Activate"}
        >
          <GiPresent />
        </ScrollToPointBtn>

        <ScrollToPointBtn
          sectionId={"danger-zone"}
          className="flex gap-1 items-center shadow p-1 hover:text-blue-400 transition-transform"
          label={"Delete"}
        >
          <RiDeleteBin2Line />
        </ScrollToPointBtn>
      </div>

      {/* Sections */}
      <main className="space-y-36 px-[2vw] pb-24 pt-7 ">
        <h1 className="_heading backdrop-blur-xs p-0 ">{`${player?.firstName} ${player?.lastName}`}</h1>

        <UpdatePlayerIssuesAndFitness player={player} />

        <section id="edit-player">
          <PlayerProfileForm player={player} />
        </section>

        <section id="galleries">
          <h1 className="my-6 _title _gradient p-4">GALLERIES</h1>
          <GalleryGrid
            galleries={galleries?.data as IGalleryProps[]}
            // name={`${player?.firstName} ${player?.lastName}`}
          />

          <GalleryUpload
            tags={
              [player?.lastName, player?.firstName, playerId].filter(
                Boolean
              ) as string[]
            }
            players={players?.data}
          />
        </section>

        <section id="danger-zone" className="">
          <h3 className="text-lg font-light mb-4 _label border-b pb-2">
            DANGER ZONE
          </h3>
          <div className="flex gap-10 max-sm:flex-col flex-wrap justify-center items-center bg-card py-6">
            <ConfirmActionButton
              uri={`${apiConfig.players}/${playerId}`}
              method="PUT"
              body={{ isActive: false }}
              primaryText="DEACTIVATE PLAYER"
              loadingText="DELETING..."
              confirmText={`Do you want to disable ${player?.firstName}?`}
              variant="destructive"
              title="Deactivate Player"
            />
            <ConfirmActionButton
              uri={`${apiConfig.players}/${playerId}`}
              method="DELETE"
              primaryText="DELETE PLAYER"
              loadingText="DELETING..."
              confirmText={`Do you want to delete ${player?.firstName}?`}
              gobackAfter
              variant="destructive"
              title="Delete Player"
              className="ring"
            />
          </div>
        </section>
      </main>
    </main>
  );
}
