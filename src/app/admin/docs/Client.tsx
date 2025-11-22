"use client";

import { IPlayer } from "@/app/players/page";
import { ConsentForm } from "@/components/pdf/ConsentForm";
import { DownloadPlayerForm } from "@/components/pdf/PlayerSigningForm";
import { IQueryResponse } from "@/types";

export function ClientDocuments({
  players,
}: {
  players?: IQueryResponse<IPlayer[]>;
}) {
  return (
    <div>
      <DownloadPlayerForm player={players?.data?.[0]} />
      <ConsentForm player={players?.data?.[0]} />
    </div>
  );
}
