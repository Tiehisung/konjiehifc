// import { IPlayer } from "@/app/players/page";
// import { getPlayers } from "../players/page";
// import ChangePlayerTeam from "./ChangeTeam";

export default async function TrainingSettingsAdm() {
  // // const players:IPlayer[] = await getPlayers();
  // const teamA = players.filter(
  //   (player) => player.training?.team?.toLowerCase() == "a"
  // );
  // const teamB = players.filter(
  //   (player) => player.training?.team?.toLowerCase() == "b"
  // );

  return (
    <main className="grid px-1">
      <div className="grid grid-cols-2 justify-between items-center bg-white px-2">
        <p>Training</p>
        <div className="text-2xl flex gap-5 p-1 float-right">
          <p className="border-b-2 border-green-500">
            <span className="text-yellow-500">A</span>{" "}
            {/* <span className="text-yellow-950">{teamA?.length}</span> */}
          </p>
          <p className="border-b-2 border-yellow-600">
            <span className="text-yellow-500">B</span>{" "}
            {/* <span className="text-yellow-950">{teamB?.length}</span> */}
          </p>
        </div>
      </div>
      <div className="bg-gradient-to-br from-indigo-950 to-slate-900 rounded-2xl p-2 md:p-3 text-yellow-50">
        {/* <table>
          <tbody>
            {players.map((player, index) => (
              <tr className="shadow" key={index}>
                <td className=" p-2">{player.jersey}</td>
                <td className=" md:w-60 truncate text-sm p-2">
                  {player.firstName + " " + player.lastName}
                </td>
                <td className="">
                  <ChangePlayerTeam player={player} />
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>
    </main>
  );
}
