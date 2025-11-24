"use client";

import { IPlayer } from "@/app/players/page";
import { ConsentForm } from "@/components/pdf/ConsentForm";
import { IQueryResponse } from "@/types";

export function ClientDocuments({
  players,
}: {
  players?: IQueryResponse<IPlayer[]>;
}) {
  return (
    <div>
 
      <ConsentForm players={players?.data} />
    </div>
  );
}
