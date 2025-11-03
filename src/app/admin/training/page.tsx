import { IPlayer } from "@/app/players/page";
import { IQueryResponse } from "@/types";
import { getPlayers } from "../players/page";
import ChangePlayerTeam from "./ChangeTeam";
import { PreviewTeamGroups } from "./TeamGroups";
import { AVATAR } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function TrainingSettingsAdm() {
  const players: IQueryResponse<IPlayer[]> = await getPlayers();
  const teamA = players?.data?.filter(
    (p) => p.training?.team?.toLowerCase() == "a"
  );
  const teamB = players?.data?.filter(
    (p) => p.training?.team?.toLowerCase() == "b"
  );

  return (
    <main className="grid px-1 _page">
      <div className="rounded-2xl p-2 md:p-3 mb-10">
        <Table>
          <TableCaption>Training Teaming</TableCaption>
          <TableHeader>
            <TableHead>PLAYER</TableHead>

            <TableHead className="grid grid-cols-2 items-center justify-center">
              <span>Team A</span> <span>Team B</span>
            </TableHead>
          </TableHeader>
          <TableBody>
            {players?.data?.map((player) => (
              <TableRow className="shadow" key={player?._id}>
                <TableCell className=" flex items-center gap-4">
                  <AVATAR
                    className="h-12 w-12"
                    src={player?.avatar}
                    alt={player?.lastName}
                    fallbackText={`${player.firstName} ${player.lastName}`}
                  />

                  <span>
                    {`${player.firstName} ${player.lastName}(${player.number})`}
                  </span>
                </TableCell>

                <TableCell className="">
                  <ChangePlayerTeam player={player} />
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell>{players?.data?.length}</TableCell>
              <TableCell className='grid grid-cols-2'>
                <span>{teamA?.length??0}</span>
                <span>{teamB?.length??0}</span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <PreviewTeamGroups teamA={teamA} teamB={teamB} />
    </main>
  );
}
