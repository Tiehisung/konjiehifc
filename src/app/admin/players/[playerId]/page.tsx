import { FaEdit } from "react-icons/fa";
import { ScrollToPointBtn } from "@/components/scroll/ScrollToPoint";
import { FcGallery } from "react-icons/fc";
import UpdatePlayerIssuesAndFitness from "./IssuesUpdate";
import { GiHealthNormal, GiPresent } from "react-icons/gi";
import { getPlayerById, getPlayers } from "../page";
import { RiDeleteBin2Line } from "react-icons/ri";
import PlayerProfileForm from "../new/NewSigningForms";
import Loader from "@/components/loaders/Loader";
import { ConfirmActionButton } from "@/components/buttons/ConfirmAction";
import { apiConfig } from "@/lib/configs";
import { IPlayer } from "@/types/player.interface";
import GalleryGrid from "@/components/Gallery/GallaryGrid";
import { GalleryUpload } from "@/components/Gallery/GalleryUpload";
import { IQueryResponse } from "@/types";
import { IGallery } from "@/types/file.interface";
import { getGallery } from "../../galleries/page";
import { PrimaryCollapsible } from "@/components/Collapsible";
import { icons } from "@/assets/icons/icons";
import NotifierWrapper from "@/components/Notifier";

export default async function PlayerProfilePage({
  params,
}: {
  params: Promise<{ playerId: string }>;
}) {
  const playerId = (await params).playerId;
  const player: IPlayer = await getPlayerById(playerId);

  const galleries: IQueryResponse<IGallery[]> = await getGallery(
    `?tags=${[playerId].filter(Boolean).join(",")}`
  );
  const players: IQueryResponse<IPlayer[]> = await getPlayers();

  if (!player) return <Loader message="Loading player..." />;

  const fullname = `${player?.lastName} ${player?.firstName}`;

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
      <div className="bg-modalOverlay text-white w-full px-1 flex gap-2 overflow-x-auto sticky z-10 top-0 hidden__scrollbar">
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
          label={player?.isCurrentPlayer ? "Deactivate" : "Activate"}
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
        {!player?.isCurrentPlayer && (
          <NotifierWrapper
            message={"Unconfirmed player"}
            className="text-Red"
            inDismissible
          >
            <p>{fullname} is not visible to the public</p>
          </NotifierWrapper>
        )}

        <h1 className="_heading backdrop-blur-xs p-0 flex items-center gap-6 justify-between flex-wrap ">
          <span>{fullname}</span>{" "}
          <span className="text-muted-foreground">{player?.code} </span>
        </h1>

        <div className="my-3.5 space-y-2">
          <p>{player?.email}</p>
          <p>{player?.code}</p>
        </div>

        <UpdatePlayerIssuesAndFitness player={player} />

        <section id="edit-player">
          <PrimaryCollapsible
            header={{
              label: "Edit Player",
              icon: <icons.edit />,
              className: "ring",
            }}
          >
            <PlayerProfileForm player={player} />
          </PrimaryCollapsible>
        </section>

        <section id="galleries">
          <header className="my-6 _title _gradient p-4 flex items-center justify-between gap-6">
            GALLERIES <GalleryGrid galleries={galleries?.data as IGallery[]} />
          </header>

          <GalleryUpload
            tags={[fullname, playerId].filter(Boolean) as string[]}
            players={players?.data}
          />
        </section>

        <section id="danger-zone" className="">
          <h3 className="text-lg font-light mb-4 _label border-b pb-2">
            DANGER ZONE
          </h3>
          <div className="flex gap-10 max-sm:flex-col flex-wrap justify-center items-center bg-card py-6">
            {!player?.isCurrentPlayer && (
              <ConfirmActionButton
                uri={`${apiConfig.players}/${playerId}`}
                method="PUT"
                body={{ isCurrentPlayer: true }}
                primaryText="CONFIRM PLAYER"
                loadingText="Approving..."
                confirmText={`Do you want to confirm ${fullname}?`}
                title="Confirm Player"
                variant={"default"}
              />
            )}
            <ConfirmActionButton
              uri={`${apiConfig.players}/${playerId}`}
              method="PUT"
              body={{ isCurrentPlayer: false }}
              primaryText="DEACTIVATE PLAYER"
              loadingText="DELETING..."
              confirmText={`Do you want to disable ${fullname}?`}
              variant="destructive"
              title="Deactivate Player"
            />
            <ConfirmActionButton
              uri={`${apiConfig.players}/${playerId}`}
              method="DELETE"
              primaryText="DELETE PLAYER"
              loadingText="DELETING..."
              confirmText={`Do you want to delete ${fullname}?`}
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
