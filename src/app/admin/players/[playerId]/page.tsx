import { FaEdit } from "react-icons/fa";
import { ScrollToPointBtn } from "@/components/scroll/ScrollToPoint";
import { FcGallery } from "react-icons/fc";
import PlayerActivation from "./Activation";
import UpdatePlayerIssuesAndFitness from "./IssuesUpdate";
import { GiHealthNormal, GiPresent } from "react-icons/gi";
import { getPlayerById } from "../page";
import { RiDeleteBin2Line } from "react-icons/ri";
import PlayerProfileForm from "../NewSigningForms";
import Loader from "@/components/loaders/Loader";
import { SubTitle } from "@/components/Elements";
import { ConfirmActionButton } from "@/components/buttons/ConfirmAction";
import { apiConfig } from "@/lib/configs";
import { IPlayer } from "@/app/players/page";

export default async function PlayerProfilePage({
  params,
}: {
  params: Promise<{ playerId: string }>;
}) {
  const playerId = (await params).playerId;
  const player:IPlayer = await getPlayerById(playerId);

  if (!player) return <Loader message="Loading player..." />;

  return (
    <main className="relative bg-cover py-8 ">
      {/* Cover image  */}

      <div
        className="h-screen w-full rounded-t-md z-[-1] fixed inset-0 bottom-0 bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${player?.featureMedia?.[0]?.secure_url??player?.avatar})` }}
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

        <section id="danger-zone">
          <SubTitle className="text-lg text-primaryRed font-light mb-4">
            Danger zone
          </SubTitle>
          <div className="grid items-start gap-10 md:flex flex-wrap  ">
            <PlayerActivation playerId={playerId} isActive={player?.isActive} />

            <ConfirmActionButton
              uri={`${apiConfig.players}/${playerId}`}
              method="DELETE"
              primaryText="DELETE PLAYER"
              loadingText="DELETING..."
              confirmText={`Do you want to delete ${player?.firstName}?`}
              gobackAfter
              variant="destructive"
              title="Delete Player"
            />
          </div>
        </section>
      </main>
    </main>
  );
}
