import HEADER from "@/components/Element";
import { getPlayers } from "../players/page";
import { IQueryResponse } from "@/types";
import { IPlayer } from "@/app/players/page";
import { ClientDocuments } from "./Client";

export default async function DocsPage() {
  const players: IQueryResponse<IPlayer[]> = await getPlayers();

  return (
    <div className="px-4">
      <HEADER title="DOCUMENTATION " />
      <main className="_page px-3 mt-6">
        <section>
          <ClientDocuments players={players} />
        </section>
      </main>
    </div>
  );
}
